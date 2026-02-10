// lib/auth.ts
// Client-side auth utilities for managing JWT tokens

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export class AuthManager {
  // Save access token to storage (both localStorage and cookie)
  static saveToken(token: string): void {
    if (typeof window === 'undefined') return;
    
    // Save to localStorage for easy access
    localStorage.setItem('accessToken', token);
    
    // Also save to cookie for server-side middleware access
    const expiresIn = 15 * 60; // 15 minutes (matches backend expiry)
    document.cookie = `token=${token}; path=/; max-age=${expiresIn}; SameSite=Lax`;
  }

  // Save refresh token to storage
  static saveRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    
    // Save to localStorage
    localStorage.setItem('refreshToken', token);
    
    // Save to httpOnly cookie (this is more secure but requires server-side handling)
    const expiresIn = 30 * 24 * 60 * 60; // 30 days
    document.cookie = `refreshToken=${token}; path=/; max-age=${expiresIn}; SameSite=Lax; Secure`;
  }

  // Save user data
  static saveUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get access token from storage
  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    // Try localStorage first (faster)
    const localToken = localStorage.getItem('accessToken');
    if (localToken) return localToken;
    
    // Fallback to cookie
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(c => c.trim().startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }

  // Get refresh token from storage
  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    // Try localStorage first
    const localToken = localStorage.getItem('refreshToken');
    if (localToken) return localToken;
    
    // Fallback to cookie
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(c => c.trim().startsWith('refreshToken='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }

  // Get saved user data
  static getUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem('user');
    if (!userData) return null;
    
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  // Remove all tokens and user data from storage
  static removeToken(): void {
    if (typeof window === 'undefined') return;
    
    // Clear from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Legacy support
    
    // Clear from cookies
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Check if token is expired
    const decoded = this.decodeToken(token);
    if (!decoded) return false;
    
    if (decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    }
    
    return true;
  }

  // Decode JWT token (basic - for getting user info)
  static decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Get current user from token or stored user data
  static getCurrentUser(): User | null {
    // First try to get from stored user data
    const storedUser = this.getUser();
    if (storedUser) return storedUser;
    
    // Fallback to decoding token
    const token = this.getToken();
    if (!token) return null;
    
    const decoded = this.decodeToken(token);
    if (!decoded) return null;
    
    // Handle different token payload formats from Kotlin backend
    // Kotlin backend uses: sub (UUID), email, type, role
    return {
      id: decoded.sub || decoded.userId || decoded.id || '',
      email: decoded.email || '',
      name: decoded.name || decoded.username || decoded.email?.split('@')[0] || '',
    };
  }

  // Check if token is about to expire (within 5 minutes)
  static isTokenExpiringSoon(): boolean {
    const token = this.getToken();
    if (!token) return true;
    
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    const fiveMinutes = 5 * 60;
    return decoded.exp - currentTime < fiveMinutes;
  }

  // Get token expiration time
  static getTokenExpiration(): Date | null {
    const token = this.getToken();
    if (!token) return null;
    
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return null;
    
    return new Date(decoded.exp * 1000);
  }
}
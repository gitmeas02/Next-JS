const API_BASE_URL:string = process.env.NEXT_PUBLIC_API_BASE_URL!;
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}
class APiClient {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const token = this.getToken();

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
      };

      if (token) {
        (headers as Record<string, string>)["Authorization"] =
          `Bearer ${token}`;
      }
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include", // Send cookies
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        return {
          error: data?.message || data?.error || "An error occurred",
          status: response.status,
          data: data ?? null,
        };
      }
      return {
        data: data ?? null,
        status: response.status,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Network error",
        status: 500,
      };
    }
  }
  private getToken(): string | null {
    if (typeof window !== "undefined") {
      const cookie = document.cookie.split(";");
      const tokenCookie = cookie.find((c) => c.trim().startsWith("token="));
      if (tokenCookie) {
        return tokenCookie.split("=")[1];
      }
      return localStorage.getItem("token");
    }
    return null;
    // or if(typeof window === "undefined") return null;
  }
  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string) {
    return this.request<{ token: string; user: any }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  async logout() {
    // Clear token
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }

    // Call backend logout if endpoint exists
    return this.request("/auth/logout", {
      method: "POST",
    });
  }
    // User endpoints
    async getUsers(){
        return this.request<any[]>('/users');
    }
    async getUserById(id: string){
        return this.request<any>(`/users/${id}`);
    }
    // Company endpoints
  async getCompanies() {
    return this.request<any[]>('/company');
  }

  async getCompanyById(id: string) {
    return this.request<any>(`/company/${id}`);
  } 
   
  // Products endpoints (add based on your Kotlin backend)
  async getProducts() {
    return this.request<any[]>('/products');
  }

  async getProductById(id: string) {
    return this.request<any>(`/products/${id}`);
  }
  // Generic methods for custom endpoints
  async get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }
   async delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async patch<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }
}
export const apiClient = new APiClient(API_BASE_URL);

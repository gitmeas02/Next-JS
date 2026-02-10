# Enterprise Admin Dashboard

A modern full-stack enterprise admin dashboard built with **Next.js 15**, **Spring Boot**, and **SQL Server**. Features JWT authentication, role-based access control, and a responsive UI using **Tailwind CSS** and **Shadcn UI**.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 15)                     │
│  - App Router with TypeScript                               │
│  - Tailwind CSS + Shadcn UI Components                       │
│  - JWT Authentication & Token Management                    │
│  - Middleware-based Route Protection                        │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST
┌──────────────────────▼──────────────────────────────────────┐
│                Backend (Spring Boot)                         │
│  - Kotlin + JPA/Hibernate ORM                               │
│  - JWT Token Generation & Validation                        │
│  - Role-Based Authorization (@PreAuthorize)                │
│  - CORS Configuration for Frontend                          │
└──────────────────────┬──────────────────────────────────────┘
                       │ JDBC
┌──────────────────────▼──────────────────────────────────────┐
│              Database (SQL Server in Docker)                 │
│  - UUID Primary Keys                                        │
│  - Many-to-Many User-Role Relationships                    │
│  - Connection Pooling (HikariCP)                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Features

### Authentication & Authorization
- **JWT Tokens**: Access (15 min) + Refresh (30 days) tokens with proper claims
- **User Registration**: Email validation, password hashing with BCrypt
- **Role-Based Access Control**: Users can have multiple roles (many-to-many)
- **Token Refresh**: Automatic token rotation with version tracking
- **Protected Routes**: Middleware-based authentication & redirection
- **CORS Enabled**: Configured from `http://localhost:3000`

### User Management
- User registration and login flows
- User profiles with metadata (avatar, email, roles)
- Role assignment system (one user → many roles)
- User listing with nested role information
- Protected user endpoints with JWT validation

### UI/UX
- Responsive design (mobile-first approach)
- Dark mode support via Tailwind CSS
- Server-side rendering (SSR) compatible
- Shadcn UI component library
- Lucide React icons for consistency
- Smooth transitions and Suspense boundaries

### Responsive Features
- Collapsible sidebar with icons
- Mobile-friendly navigation drawer (Sheet component)
- Sticky top navbar with breadcrumb trail
- User profile dropdown menu

---

## Getting Started

### Prerequisites
- **Node.js** 18+ (for Next.js)
- **Java** 21+ (for Spring Boot)
- **Docker** (for SQL Server & Docker Compose)
- **npm** or **pnpm** (for package management)

### Backend Setup (Kotlin/Spring Boot)

1. **Start SQL Server in Docker**
   ```bash
   cd d:\Kotlin\kotlin-jvm21
   docker-compose up -d
   ```

2. **Build the Project**
   ```bash
   ./gradlew clean build -x test
   ```

3. **Run Spring Boot**
   ```bash
   ./gradlew bootRun
   ```
   
   Server runs on: `http://localhost:8081`

### Frontend Setup (Next.js)

1. **Install Dependencies**
   ```bash
   cd d:\Kotlin\next
   npm install
   ```

2. **Configure Environment Variables**
   
   Create or update `.env`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8081
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   App runs on: `http://localhost:3000`

---

## Project Structure

### Frontend (`/next`)
```
next/
├── app/
│   ├── middleware.ts                 # Auth middleware - redirects to /signin
│   ├── layout.tsx                    # Root layout with suppressHydrationWarning
│   ├── (auth)/                       # Auth route group
│   │   ├── signin/
│   │   │   ├── page.tsx             # Login page
│   │   │   └── components/
│   │   │       └── login-form.tsx   # Login form with API integration
│   │   ├── register/
│   │   │   ├── page.tsx             # Registration page
│   │   │   └── components/
│   │   │       └── signup-form.tsx  # Registration form
│   │   └── layout.tsx
│   └── (dashboard)/                  # Protected dashboard routes
│       ├── page.tsx                 # Dashboard home
│       ├── products/                # Products page
│       ├── users/                   # Users management
│       └── layout.tsx
├── components/
│   ├── ui/                          # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── field.tsx
│   │   ├── sidebar.tsx
│   │   └── ...
│   └── AppBreadcrumb.tsx            # Breadcrumb navigation
├── lib/
│   ├── auth.ts                      # AuthManager - token & user management
│   ├── api-client.ts                # Typed REST client with CORS support
│   └── utils.ts                     # Utility functions
├── context/
│   └── AuthContext.tsx              # Auth state management
├── hooks/
│   └── use-mobile.ts                # Mobile detection hook
└── middleware.ts                    # Route protection middleware
```

### Backend (`/kotlin-jvm21`)
```
app/src/main/kotlin/org/example/
├── security/
│   └── SecurityConfig.kt            # Spring Security + CORS configuration
├── users/
│   ├── controller/
│   │   ├── authentication/
│   │   │   ├── AuthController.kt    # Register, login, refresh endpoints
│   │   │   ├── JwtTokenUtil.kt      # Token generation & validation
│   │   │   ├── JwtAuthorizationFilter.kt  # JWT filter
│   │   │   ├── CustomUserDetailsService.kt
│   │   │   └── UserSecurity.kt
│   │   ├── UserController.kt        # User CRUD endpoints
│   │   └── RoleController.kt        # Role management
│   ├── entity/
│   │   ├── User.kt                  # User entity - UUID PK, many-to-many roles
│   │   ├── Role.kt                  # Role entity
│   │   └── ... (other entities)
│   ├── repository/
│   │   ├── UserRepository.kt        # JPA repository for users
│   │   ├── RoleRepository.kt        # JPA repository for roles
│   │   └── ... 
│   ├── service/
│   │   ├── UserService.kt
│   │   ├── RoleService.kt
│   │   └── ...
│   └── dto/
│       ├── UserResponseDTO.kt       # DTO with nested roles
│       └── ...
├── ApiResponse.kt                   # Generic API response wrapper
└── Application.kt                   # Spring Boot entry point

resources/
├── application.properties            # Database & server config
└── db/
    ├── init.sql                     # Database initialization
    └── migration.sql                # Schema migration
```

---

## API Reference

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response (200 OK):
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response (200 OK):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "John Doe",
      "email": "john@example.com",
      "avatar": null
    }
  }
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response (200 OK):
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Protected Endpoints

#### Get All Users
```http
GET /users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response (200 OK):
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": null,
      "roles": [
        { "name": "user" },
        { "name": "admin" }
      ]
    }
  ]
}
```

---

## JWT Token Structure

### Access Token (15 minutes validity)
```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",  // User UUID
  "email": "john@example.com",
  "role": "user",
  "type": "access",
  "iat": 1707541200,
  "exp": 1707542100
}
```

### Refresh Token (30 days validity)
```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john@example.com",
  "token_version": 1,
  "type": "refresh",
  "iat": 1707541200,
  "exp": 1739077200
}
```

---

## Authentication Flow

### 1. User Registration
```
User → Registration Form → POST /api/auth/register
                         ← User Created
                         → Redirect to /signin?registered=true
```

### 2. User Login
```
User → Login Form → POST /api/auth/login
                  ← {accessToken, refreshToken, user}
                  → Save tokens (localStorage + cookie)
                  → Redirect to /products or original destination
```

### 3. Protected Route Access
```
Request: GET /products
         → Middleware checks token
         → Valid? → Allow
         → Invalid/Missing? → Redirect to /signin?redirect=/products
         
After login → Redirect to /products (original destination)
```

### 4. Token Refresh (Auto)
```
Access Token expires (15 min) → Detect in API client
                              → POST /api/auth/refresh
                              ← New Access Token
                              → Retry original request
```

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | Next.js | 15 (App Router) |
| **Frontend** | TypeScript | Latest |
| **Frontend** | Tailwind CSS | 4 |
| **Frontend** | Shadcn UI | Latest |
| **Frontend** | Lucide React | Latest |
| **Backend** | Kotlin | Latest |
| **Backend** | Spring Boot | 3.x |
| **Backend** | Spring Security | 6.x |
| **Backend** | JPA/Hibernate | Latest |
| **Database** | SQL Server | 2022 |
| **Authentication** | JWT | Standard (jsonwebtoken) |
| **Connection Pool** | HikariCP | Latest |

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  uuid VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  token_version INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Roles Table
```sql
CREATE TABLE roles (
  name VARCHAR(50) PRIMARY KEY,
  description VARCHAR(255)
);
```

### User-Roles Join Table (Many-to-Many)
```sql
CREATE TABLE user_roles (
  user_uuid VARCHAR(36) NOT NULL,
  role_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (user_uuid, role_name),
  FOREIGN KEY (user_uuid) REFERENCES users(uuid) ON DELETE CASCADE,
  FOREIGN KEY (role_name) REFERENCES roles(name) ON DELETE CASCADE
);
```

---

## Implemented Features

- [x] User Registration with validation
- [x] User Login with JWT tokens
- [x] Access + Refresh token flow
- [x] Token refresh endpoint
- [x] Role-based authorization (many-to-many)
- [x] Protected routes via middleware
- [x] CORS configuration
- [x] User profiles with metadata
- [x] Responsive UI (mobile-friendly)
- [x] Dark mode support
- [x] Authentication context
- [x] API client with error handling

## Upcoming Features

- [ ] Role-based authorization guards (@PreAuthorize)
- [ ] User deletion endpoint
- [ ] User update endpoint
- [ ] User search/filtering
- [ ] Pagination for user list
- [ ] Two-factor authentication (2FA)
- [ ] OAuth2 integration
- [ ] Email verification
- [ ] Password reset flow
- [ ] User activity logging

---

## Troubleshooting

### CORS Error: Access-Control-Allow-Origin
**Issue**: `Response to preflight request doesn't pass access control check`

**Solution**: 
- Ensure Spring Boot is running on port 8081
- Check SecurityConfig.kt CORS configuration
- Verify frontend origin is `http://localhost:3000`
```kotlin
configuration.allowedOrigins = listOf("http://localhost:3000")
configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
configuration.allowCredentials = true
```

### Hydration Mismatch Warning
**Issue**: `A tree hydrated but some attributes of the server rendered HTML didn't match...`

**Solution**: Added `suppressHydrationWarning` to root layout
```tsx
<html lang="en" suppressHydrationWarning>
  <body suppressHydrationWarning>
```

### JSON Parse Error (Unexpected token '<')
**Issue**: `api-client.ts:39 JSON parse error for /api/auth/register: SyntaxError: Unexpected token '<'`

**Solution**: Backend returning HTML error page instead of JSON
- Verify backend API endpoint: `http://localhost:8081/api/auth/register`
- Check Java process is running: `Get-Process -Name java`
- Rebuild backend: `./gradlew clean build -x test`

### Middleware Not Redirecting
**Issue**: Can access protected routes without login

**Solution**: 
- Middleware must be at root level: `/middleware.ts` (not `app/middleware.ts`)
- Restart Next.js server after moving middleware
- Verify token is being saved: Check localStorage/cookies

### No Token Found Error
**Issue**: Login successful but token not saved

**Solution**: 
- Check browser console for save errors
- Verify localStorage is enabled
- Check API response contains `accessToken` field

---

## Environment Variables

### Frontend (`.env`)
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8081

# For production, use:
# NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

### Backend (`application.properties`)
```properties
# SQL Server Configuration
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=KotlinDB;encrypt=false
spring.datasource.username=smeyusername
spring.datasource.password=Smeypassword123!

# Hibernate/JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Server Configuration
server.port=8081

# Logging
logging.level.root=WARN
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate=ERROR
```

---

## Learning Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Spring Boot Security](https://spring.io/projects/spring-security)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Components](https://ui.shadcn.com)
- [Kotlin Language](https://kotlinlang.org/docs)
- [SQL Server Documentation](https://learn.microsoft.com/en-us/sql/sql-server/)

---

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

---

## License

Licensed under the MIT License - see LICENSE file for details.

---

## Author

**SEAN RAKSMEY** - Full Stack Developer

Built with Next.js 15 and Spring Boot

### Connect
- GitHub: [@gitmeas02](https://github.com)
- Email: measreaksmey01@gmail.com

---

**Last Updated**: February 10, 2026
# SmartBite - Full Stack Food Ordering Platform

A modern, market-ready food ordering website built with React (frontend) and Spring Boot (backend).

## 🏗️ Project Structure

```
HCL-Project/
│
├── 📱 Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.jsx          # Main layout with SmartBite header
│   │   ├── pages/
│   │   │   ├── Welcome.jsx         # Landing page
│   │   │   ├── Login.jsx           # Login page with validation
│   │   │   ├── Signup.jsx          # Signup page with validation
│   │   │   └── Dashboard.jsx       # Protected dashboard page
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Authentication state management
│   │   ├── services/
│   │   │   └── authApi.js          # API client for backend calls
│   │   ├── App.jsx                 # Main app component with routing
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles
│   ├── public/
│   │   └── favicon.svg              # App icon
│   ├── index.html                  # HTML entry point
│   ├── vite.config.js              # Vite configuration with proxy
│   └── package.json                # Frontend dependencies
│
├── 🔧 Backend (Spring Boot + MongoDB)
│   ├── src/main/java/com/smartbite/
│   │   ├── SmartBiteApplication.java    # Main Spring Boot app
│   │   ├── controller/
│   │   │   ├── AuthController.java      # /auth/register, /auth/login
│   │   │   └── MealController.java     # /api/meals/* (TheMealDB)
│   │   ├── service/
│   │   │   ├── AuthService.java        # Authentication logic
│   │   │   └── MealDbService.java      # TheMealDB API integration
│   │   ├── model/
│   │   │   └── User.java               # MongoDB User document
│   │   ├── repository/
│   │   │   └── UserRepository.java     # MongoDB repository
│   │   ├── dto/
│   │   │   ├── RegisterRequest.java    # Signup request DTO
│   │   │   ├── LoginRequest.java      # Login request DTO
│   │   │   └── AuthResponse.java      # JWT token response
│   │   ├── config/
│   │   │   ├── SecurityConfig.java     # Spring Security config
│   │   │   └── RestTemplateConfig.java # HTTP client config
│   │   ├── security/
│   │   │   └── JwtAuthenticationFilter.java # JWT filter
│   │   └── util/
│   │       └── JwtUtil.java           # JWT generation/validation
│   ├── src/main/resources/
│   │   └── application.yml            # Backend configuration
│   └── pom.xml                       # Maven dependencies
│
└── 📚 Documentation
    ├── README.md                      # This file
    └── SETUP.md                       # Detailed setup instructions
```

## ✨ Features

### Frontend
- ✅ Modern React UI with React Router
- ✅ JWT-based authentication flow
- ✅ Form validation (email, password strength)
- ✅ Protected routes (Dashboard requires login)
- ✅ Responsive design with dark theme
- ✅ SmartBite branding

### Backend
- ✅ RESTful API with Spring Boot
- ✅ JWT authentication (register/login)
- ✅ MongoDB database integration
- ✅ Password encryption (BCrypt)
- ✅ TheMealDB API integration
- ✅ CORS configured for React frontend
- ✅ Input validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Java 17+
- Maven 3.6+
- MongoDB (local or Atlas)

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
mvn clean install
```

### 2. Start MongoDB
```bash
# macOS
brew services start mongodb-community

# Or start MongoDB service on your system
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```
Backend runs on `http://localhost:8080`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  Returns: `{ "token": "jwt_token_here", "message": "Login successful", "user": {...} }`

### Meals (TheMealDB)
- `GET /api/meals/random` - Get random meal
- `GET /api/meals/search?name=chicken` - Search meals
- `GET /api/meals/{id}` - Get meal by ID
- `GET /api/meals/category/{category}` - Get meals by category
- `GET /api/meals/categories` - Get all categories
- `GET /api/meals/areas` - Get all areas

## 🔐 Authentication Flow

1. User enters email & password
2. Frontend validates input
3. Frontend calls `/auth/login` or `/auth/register`
4. Backend validates credentials in MongoDB
5. Backend generates JWT token
6. Frontend stores token in localStorage
7. Frontend redirects to Dashboard

## 🛠️ Technology Stack

**Frontend:**
- React 18
- React Router 6
- Vite
- CSS3 (Custom dark theme)

**Backend:**
- Spring Boot 3.2
- Spring Security
- Spring Data MongoDB
- JWT (jjwt 0.12.3)
- Lombok

**Database:**
- MongoDB

**External APIs:**
- TheMealDB API

## 📝 Configuration

### Backend (`backend/src/main/resources/application.yml`)
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/smartbite

server:
  port: 8080

jwt:
  secret: YourSecretKeyHere
  expiration: 86400000  # 24 hours
```

### Frontend (`vite.config.js`)
- Proxy configured: `/api` → `http://localhost:8080`
- CORS handled by backend

## 🧪 Testing

**Test Backend:**
```bash
curl http://localhost:8080/api/meals/random
```

**Test Frontend:**
1. Open `http://localhost:5173`
2. Click "Sign up" → Create account
3. Login → Should redirect to Dashboard

## 📖 Documentation

- See `SETUP.md` for detailed setup instructions
- See `backend/README.md` for backend-specific docs

## 🎯 Next Steps

- [ ] Add order management system
- [ ] Implement shopping cart
- [ ] Add payment integration
- [ ] User profile management
- [ ] Order history
- [ ] Email notifications
- [ ] Admin dashboard

## 📄 License

This project is part of HCL Project development.

---

**Built with ❤️ for SmartBite**

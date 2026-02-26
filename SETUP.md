# SmartBite - Full Stack Setup Guide

Complete setup instructions for running SmartBite frontend (React) and backend (Spring Boot).

## Prerequisites

### Frontend
- Node.js 18+ and npm
- VS Code (or any IDE)

### Backend
- Java 17 or higher
- Maven 3.6+
- MongoDB (local installation or MongoDB Atlas account)

## Quick Start

### 1. Install MongoDB (if not installed)

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 2. Start Backend (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

**Or run from VS Code:**
1. Open `backend/src/main/java/com/smartbite/SmartBiteApplication.java`
2. Click "Run" or press F5
3. Ensure Java extension pack is installed

### 3. Start Frontend (React)

Open a **new terminal** (keep backend running):

```bash
# From project root
npm install
npm run dev
```

Frontend will run on `http://localhost:5173` (or port shown in terminal)

## Project Structure

```
HCL-Project/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/smartbite/
│   │       │   ├── SmartBiteApplication.java
│   │       │   ├── controller/    # REST controllers
│   │       │   ├── service/       # Business logic
│   │       │   ├── model/         # MongoDB entities
│   │       │   ├── repository/    # Data access
│   │       │   ├── dto/           # Request/Response DTOs
│   │       │   ├── config/        # Security & config
│   │       │   ├── security/      # JWT filter
│   │       │   └── util/          # JWT utilities
│   │       └── resources/
│   │           └── application.yml
│   └── pom.xml
│
└── src/                     # React frontend
    ├── components/
    ├── pages/
    ├── context/
    ├── services/
    └── main.jsx
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user (returns JWT token)

### Meals (TheMealDB Integration)
- `GET /api/meals/random` - Get random meal
- `GET /api/meals/search?name=chicken` - Search meals
- `GET /api/meals/categories` - Get all categories

## Testing the Setup

1. **Test Backend:**
   ```bash
   curl http://localhost:8080/api/meals/random
   ```

2. **Test Frontend:**
   - Open `http://localhost:5173`
   - Click "Sign up" and create an account
   - Login with your credentials
   - You should be redirected to Dashboard

## Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongosh` or `mongo`
- Check Java version: `java -version` (should be 17+)
- Check port 8080 is available

### Frontend can't connect to backend
- Ensure backend is running on port 8080
- Check browser console for CORS errors
- Verify `vite.config.js` proxy settings

### MongoDB connection error
- Update `backend/src/main/resources/application.yml`:
  ```yaml
  spring:
    data:
      mongodb:
        uri: mongodb://localhost:27017/smartbite
  ```
- For MongoDB Atlas, use:
  ```yaml
  uri: mongodb+srv://username:password@cluster.mongodb.net/smartbite
  ```

## Development Tips

- Backend auto-reloads with Spring Boot DevTools
- Frontend hot-reloads automatically with Vite
- Use Postman or curl to test API endpoints
- Check browser DevTools Network tab for API calls
- Backend logs show in terminal where Spring Boot is running

## Next Steps

- Add more meal endpoints
- Implement order management
- Add user profile management
- Integrate payment gateway
- Deploy to production

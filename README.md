# 🍔 Food Retail Ordering Website (MVP)

A full-stack food ordering web application where users can browse meals, add items to cart, and place orders smoothly.

---

## 🚀 MVP Features

* User Authentication
* Browse Food Items (MealsDB API)
* Add / Update Cart
* Checkout & Order Placement
* Order Storage in MongoDB
* Inventory Update

---

## 🏗️ Tech Stack

* **Frontend:** React.js
* **Backend:** Java Spring Boot
* **Database:** MongoDB
* **External API:** MealsDB API to Fetch Meal Data

---

## 🔄 System Workflow

```
Start
  ↓
User opens website
  ↓
User Login / Register
  ↓
Authentication successful
  ↓
Fetch food items from MealsDB API
  ↓
Browse meals
  ↓
Select item
  ↓
Add to cart
  ↓
View / update cart
  ↓
Checkout
  ↓
Confirm order
  ↓
Spring Boot saves order in MongoDB
  ↓
Inventory updated
  ↓
Order success page
  ↓
End
```

---

## ⚙️ Setup

### Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🌐 API Used

MealsDB API → https://www.themealdb.com/

---

## 📜 Note

Hackathon MVP implementation of a Food Retail Ordering System using Spring Boot and external meal data API.

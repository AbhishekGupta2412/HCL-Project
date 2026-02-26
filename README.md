# HCL-Project

# 🛒 Retail Ordering Website (MVP)

A full-stack retail ordering web application that allows users to browse products, add items to cart, and place orders easily.  
This project was developed as a **Minimum Viable Product (MVP)** for a hackathon focusing on smooth ordering and automatic inventory updates.

---

## 🚀 MVP Features
- User Authentication (Login / Register)
- Product Browsing
- Add / Update Cart
- Checkout & Order Placement
- Order Storage in MongoDB
- Automatic Inventory Update

---

## 🏗️ Tech Stack
**Frontend:** React.js  
**Backend:** Jav Spring boot
**Database:** MongoDB  

---


---

## 🔄 Workflow

### 1. Authentication
- User registers or logs in
- Backend validates credentials

### 2. Product Browsing
- Products fetched from MongoDB
- Displayed to user with pricing

### 3. Cart Management
- User adds products to cart
- Quantity can be updated or removed

### 4. Checkout
- User reviews cart
- Total price calculated
- User confirms order

### 5. Order Processing
- Order stored in MongoDB
- Linked with user account

### 6. Inventory Update
- Product stock reduced automatically
- Prevents over-ordering

### 7. Order Confirmation
- Success message shown
- Cart cleared after order

---

## 🗂️ Database Collections
- Users
- Products
- Cart
- Orders

---


------FLOW CHART------


## 🔄 System Workflow

```
Start
  ↓
User opens website
  ↓
Is user registered?
   ├── No → Register
   └── Yes → Login
  ↓
Authentication successful
  ↓
Browse products
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
Payment successful?
   ├── No → Show error
   └── Yes → Save order in DB
                ↓
           Update inventory
                ↓
           Order success page
                ↓
               End
```

---



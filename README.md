<img width="1366" height="768" alt="Screenshot (16)" src="https://github.com/user-attachments/assets/15394238-5cee-4312-9caf-3ba4c2cf5c87" />
# 🛒 Mock E-Com Cart (Dark Mode)

A full-stack shopping cart application built for **Vibe Commerce** screening — featuring a responsive dark-mode UI, RESTful APIs, and mock checkout functionality.

---

## 🚀 Features

### 🖥️ Frontend (React)
- Responsive **dark-themed product grid**
- “Add to Cart” and “Remove” functionality  
- Cart view with item count, quantity update & total price  
- Mock checkout form (Name, Email) → shows receipt modal  
- Clean UI with smooth transitions  

### ⚙️ Backend (Node.js + Express)
- `GET /api/products` → Fetch product list  
- `POST /api/cart` → Add item to cart  
- `DELETE /api/cart/:id` → Remove item from cart  
- `GET /api/cart` → View cart + total  
- `POST /api/checkout` → Generate mock receipt with total & timestamp  
- Handles API integration between frontend and backend  

### 🧩 Database (SQLite - optional)
- Products and cart items persisted (mock for now)  
- Can easily switch to MongoDB for scaling  

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React, CSS (Dark Mode) |
| Backend | Node.js, Express |
| Database | SQLite / In-Memory |
| API | RESTful |
| Version Control | Git, GitHub |

---

## 🧪 Installation & Setup

```bash
git clone https://github.com/kaveri-star/mock-ecom-dark.git
cd mock-ecom-dark
cd backend
npm install
node server.js
cd frontend
npm install
npm start


video
https://www.loom.com/share/ce39d7cbd94d4578a037cb208be1aff3

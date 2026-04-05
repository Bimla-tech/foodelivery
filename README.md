# 🍔 Food Delivery Web Application

A full-stack Food Delivery Web Application that allows users to browse food items, add them to cart, and place orders. It also includes an Admin Panel to manage food items and orders efficiently.

---

## 🚀 Live Demo

Frontend: https://your-frontend-link.com  
Backend API: https://your-backend-link.com  
Admin Panel: https://your-admin-link.com  

---

## 📌 Features

### 👤 User Features
- User Authentication (Login & Sign Up)
- Browse food items
- Search and filter items
- Add to Cart / Remove from Cart
- Checkout and place orders
- View order history
- User profile management

---

### 🛠️ Admin Features
- Add new food items
- Update food details
- Delete food items
- View all orders
- Update order status (Pending / Preparing / Delivered)

---

## 🖼️ Screenshots

(Add your project images inside a folder named `screenshots`)

### Login Page
![Login](./screenshots/login.png)

### Home Page
![Home](./screenshots/home.png)

### Food Items
![Food](./screenshots/food.png)

### Cart Page
![Cart](./screenshots/cart.png)

### Checkout Page
![Checkout](./screenshots/checkout.png)

### Orders Page
![Orders](./screenshots/orders.png)

### Admin Dashboard
![Admin](./screenshots/admin.png)
## 🖼️ Application Preview

### 🔐 Login Page
<img src="screenshots/login.png" width="800"/>

### 🏠 Home Page
<img src="screenshots/home.png" width="800"/>

### 🍔 Food Items
<img src="screenshots/food.png" width="800"/>

### 🛒 Cart Page
<img src="screenshots/cart.png" width="800"/>

### 💳 Checkout Page
<img src="screenshots/checkout.png" width="800"/>

### 📦 Orders Page
<img src="screenshots/orders.png" width="800"/>

### 🛠️ Admin Dashboard
<img src="screenshots/admin.png" width="800"/>
---

## 🏗️ Tech Stack

Frontend:
- HTML
- CSS
- JavaScript
- React.js

Backend:
- Node.js
- Express.js

Database:
- Mysql

Authentication:
- JWT (JSON Web Token)

---

## 📂 Folder Structure

food-delivery-app/
│
├── frontend/
├── backend/
├── admin/
├── screenshots/
└── README.md

---

## ⚙️ Installation & Setup

### Clone Repository
git clone https://github.com/your-username/food-delivery-app.git  
cd food-delivery-app  

---

### Install Dependencies

Backend:
cd backend  
npm install  

Frontend:
cd frontend  
npm install  

Admin Panel:
cd admin  
npm install  

---

### Environment Variables

Create a `.env` file in backend:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

---

### Run Project

Start Backend:
cd backend  
npm start  

Start Frontend:
cd frontend  
npm start  

Start Admin Panel:
cd admin  
npm start  

---

## 🔐 Authentication Flow

- User registers with email & password
- Password is hashed securely
- JWT token is generated on login
- Protected routes require authentication
- Admin routes are restricted

---

## 📡 API Endpoints

Auth:
POST /api/auth/register  
POST /api/auth/login  

Food:
GET /api/food  
POST /api/food (Admin)  
PUT /api/food/:id (Admin)  
DELETE /api/food/:id (Admin)  

Cart:
POST /api/cart/add  
POST /api/cart/remove  

Orders:
POST /api/order  
GET /api/order/user  
GET /api/order/admin  

---

## 📊 Future Enhancements

- Online payment integration (Stripe / Razorpay)
- Live order tracking
- Ratings & reviews
- Push notifications
- Mobile responsive UI improvements

---

## 🤝 Contributing

1. Fork the repository  
2. Create a new branch  
3. Commit your changes  
4. Push to your branch  
5. Create a Pull Request  

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Your Name  
GitHub: https://github.com/your-username  
LinkedIn: https://linkedin.com/in/your-profile  

---

## ⭐ Support

If you like this project, give it a star ⭐

# 📝 Blogcom Backend API

This is the backend API for a blogging platform, built with **Node.js**, **Express.js**, and **MongoDB Atlas**. The application supports secure user authentication and full CRUD operations for blog posts.

## 🚀 Features

### ✅ Authentication

- User registration and login with **JWT** token-based authentication.
- Passwords securely encrypted using **bcryptjs**.
- All API routes (except signup/login) require a valid JWT token.

### ✅ Blog Management

- Users can:
  - Create, Read, Update, and Delete their own blogs.
  - View all blogs from all users (read-only).
- Blogs can be filtered by **category** and/or **author**.

---

## 🔐 Authentication Endpoints

| Method | Route          | Description                 |
| ------ | -------------- | --------------------------- |
| POST   | `/auth/signup` | Register a new user         |
| POST   | `/auth/login`  | Login and receive JWT token |

---

## 📘 Blog Endpoints

> ⚠️ All blog routes are protected — only logged-in users can access them.

| Method | Route                                             | Description                               |
| ------ | ------------------------------------------------- | ----------------------------------------- |
| GET    | `/blogs`                                          | Get all blogs                             |
| GET    | `/blogs/filter?category=:category&author=:author` | Filter blogs by category and/or author    |
| POST   | `/blogs`                                          | Create a new blog (user only)             |
| PUT    | `/blogs/:id`                                      | Update a blog (only by the blog’s author) |
| DELETE | `/blogs/:id`                                      | Delete a blog (only by the blog’s author) |

---

## 🛠️ Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB Atlas** – Cloud-hosted NoSQL database
- **Mongoose** – MongoDB object modeling
- **bcryptjs** – Password hashing
- **jsonwebtoken** – JWT-based authentication
- **dotenv** – Environment variable management
- **cors** – Cross-origin request support

---

## 🔧 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Rajganez/blogApp-BE
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create .env file**

   ```bash
   DB_PASS="your Password"
   DB_USER="your user name"
   DB_CLUSTER="your cluster"
   DB_NAME="your DB name"
   JWT_KEY=your_jwt_secret_key

   ```

4. **Start the Server**

   ```bash
   npm start
   ```

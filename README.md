# 🌉 BhramanSetu - Travel Companion Web App

[![Live Site](https://img.shields.io/badge/Live%20Demo-BhramanSetu-green?style=for-the-badge)](https://bhramansetu.onrender.com)

> 🚀 A full-stack travel platform designed to streamline travel bookings, display destination details, and manage user interactions securely.

---

## 📌 Overview

**BhramanSetu** is a MERN-based full-stack application that connects travel enthusiasts with curated destination experiences. It features user authentication, destination browsing, secure image uploads, and event showcasing — all backed by a modular MVC architecture.

---

## 🛠️ Technologies Used

### 💻 Frontend:
- HTML5
- CSS3
- JavaScript (Vanilla)

### ⚙️ Backend:
- **Node.js** – Server-side runtime
- **Express.js** – Backend framework (REST APIs, routing)
- **MongoDB Atlas** – Cloud-based database
- **Mongoose** – ODM for MongoDB

### 🔐 Authentication:
- **Passport.js** – User registration/login with sessions
- **Express-session**, **connect-flash**

### ☁️ Cloud Storage:
- **Cloudinary** – Image hosting for plots and events

### 🧱 Architecture:
- MVC (Model-View-Controller) architecture

---

## 🧰 Features

- ✅ **User Authentication** with session management
- 🗺️ **Browse Destinations** with image carousels and descriptions
- 📥 **Upload Event & Plot Images** using Cloudinary
- 🧭 **Well-structured MVC Design** for scalability
- 🧠 **MongoDB Atlas** cloud database integration



---

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/vivekkumar/bhramansetu.git
cd bhramansetu

# Install backend dependencies
npm install


# Add a `.env` file and configure the following:
MONGO_URI=your_mongodb_atlas_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret

# Run the server
npm start
```
---

##  Folder Structure (MVC)
![Home Page](assets/screenshots/foler_structure.png)


## 📸 Screenshots

### 🏠 Landing Page
![Home Page](assets/screenshots/home.png)

### 🔍 Destination Details
![Destination Details](assets/screenshots/details.png)

### 📝 Add New Destination
![Add Destination](assets/screenshots/add.png)

### 🔐 Register
![Login Page](assets/screenshots/register.png)

### 🔐Login/
![Login Page](assets/screenshots/login.png)
Developed By
Vivek Kumar

📝 License
This project is licensed under the MIT License.

🔗 Live Demo: https://bhramansetu.onrender.com
Built with ❤️ by Vivek Kumar
Feel free to fork, contribute, or use it as a reference for your own travel projects.

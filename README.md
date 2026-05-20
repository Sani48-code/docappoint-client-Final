# 🩺 DocAppoint – Doctor Appointment Booking API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge\&logo=render\&logoColor=black)

A modern backend API for booking doctor appointments with secure authentication, doctor management, and appointment handling.

</div>

---

# 🚀 Live API

```bash
https://your-render-live-url.onrender.com
```

---

# ✨ Features

✅ JWT Authentication

✅ Better Auth Integration

✅ Doctor Search & Sorting

✅ Book Appointment System

✅ Protected Booking Routes

✅ MongoDB Database

✅ REST API Architecture

✅ Error Handling

✅ Secure Middleware

✅ Render Deployment Ready

---

# 📁 Project Structure

```bash
DocAppoint-Server/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── doctor.controller.js
│   └── booking.controller.js
│
├── middleware/
│   ├── verifyToken.js
│   └── verifyOwner.js
│
├── models/
│   ├── Doctor.model.js
│   └── Booking.model.js
│
├── routes/
│   ├── doctor.routes.js
│   └── booking.routes.js
│
├── seed/
│   └── doctors.seed.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/docappoint-server.git
```

## 2️⃣ Move to Project Folder

```bash
cd docappoint-server
```

## 3️⃣ Install Dependencies

```bash
npm install
```

## 4️⃣ Create Environment File

Create a `.env` file in the root directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
BETTER_AUTH_SECRET=your_secret
```

## 5️⃣ Start Development Server

```bash
npm run dev
```

---

# 📦 Dependencies

```json
{
  "cors": "^latest",
  "cookie-parser": "^latest",
  "dotenv": "^latest",
  "express": "^latest",
  "jsonwebtoken": "^latest",
  "mongoose": "^latest",
  "better-auth": "^latest"
}
```

---

# 🔐 Authentication

This project uses:

* JWT Authentication
* Better Auth
* Protected Routes Middleware
* Owner Verification Middleware

---

# 🩺 API Endpoints

## 👨‍⚕️ Doctor Routes

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| GET    | `/api/doctors`               | Get all doctors        |
| GET    | `/api/doctors?top=true`      | Get top rated doctors  |
| GET    | `/api/doctors?search=name`   | Search doctors         |
| GET    | `/api/doctors?sort=fee_asc`  | Sort by fee ascending  |
| GET    | `/api/doctors?sort=fee_desc` | Sort by fee descending |
| GET    | `/api/doctors?sort=exp`      | Sort by experience     |
| GET    | `/api/doctors/:id`           | Get single doctor      |

---

## 📅 Booking Routes

| Method | Endpoint               | Access  |
| ------ | ---------------------- | ------- |
| POST   | `/api/bookings`        | Private |
| GET    | `/api/bookings?email=` | Private |
| PATCH  | `/api/bookings/:id`    | Private |
| DELETE | `/api/bookings/:id`    | Private |

---

# 🌱 Seed Database

Run the following command:

```bash
node seed/doctors.seed.js
```

This will:

* Remove old doctors
* Insert demo doctor data
* Prepare database instantly

---

# 🛡️ Middleware Overview

## verifyToken.js

Checks JWT token validity.

## verifyOwner.js

Ensures users can only access their own bookings.

---

# 🚀 Deployment

## Render Deployment Steps

### 1️⃣ Push Project to GitHub

### 2️⃣ Create New Web Service on Render

### 3️⃣ Add Environment Variables

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=https://your-client-site.vercel.app
BETTER_AUTH_SECRET=your_secret
```

### 4️⃣ Start Command

```bash
npm start
```

---

# 💻 Scripts

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

---

# 🧠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Better Auth
* Render

---

# 📌 Future Improvements

* Payment Gateway Integration
* Admin Dashboard
* Doctor Availability Management
* Email Notifications
* Appointment Reminders
* Role Based Authentication
* Review & Rating System

---

# 👨‍💻 Developer

### NextGen ITWare

Web & Automation Engineer

* SEO Automation
* MERN Stack Development
* n8n Workflow Automation

---

# ⭐ Support

If you like this project:

⭐ Star the repository

🍴 Fork the project

🛠️ Contribute improvements

---

<div align="center">

Made with ❤️ using Node.js & MongoDB

</div>

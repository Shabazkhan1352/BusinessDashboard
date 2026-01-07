🚀 AI-Powered Business Management Dashboard

A full-stack, role-based business dashboard built using Next.js, Tailwind CSS, PostgreSQL, Prisma, and Groq AI.
This project simulates a real company internal admin panel used to manage users, products, orders, and business analytics.

📌 Project Overview

This application allows different types of users (Admin, Manager, User) to securely log in and access features based on their role.

It also includes AI-generated business insights using Groq to help understand trends and performance.

🧠 Key Features
🔐 Authentication & Authorization

JWT-based login system

Secure role-based access control

Protected routes

👥 User Roles

Admin – Full access (users, products, orders, analytics)

Manager – Manage products & orders

User – View dashboard and assigned data

📊 Dashboard

Stats cards (Users, Orders, Revenue, Products)

Charts for business trends

Filter and search functionality

🛠️ CRUD Operations

Users management

Products / Services management

Orders / Records handling

🤖 AI Integration (Groq)

AI-generated business insights

Order trend summaries

Smart suggestions for business decisions

🧱 Tech Stack
Frontend

Next.js (App Router)

React

Tailwind CSS

Backend

Next.js API Routes

JWT Authentication

Database

PostgreSQL

Prisma ORM

AI

Groq API

📂 Project Structure
app/
│
├── (auth)/
│   └── login/
│
├── dashboard/
│   ├── page.jsx
│   ├── users/
│   ├── products/
│   └── orders/
│
├── api/
│   ├── auth/
│   ├── users/
│   ├── products/
│   ├── orders/
│   ├── dashboard/
│   └── ai/
│
├── components/
│   ├── Sidebar.jsx
│   ├── Navbar.jsx
│   ├── StatsCard.jsx
│   └── Chart.jsx
│
├── lib/
│   ├── prisma.js
│   ├── auth.js
│   └── groq.js
│
└── layout.jsx

🗄️ Database Models (Simplified)
User

id

name

email

password

role

Product

id

name

price

stock

Order

id

userId

totalAmount

status

createdAt

⚙️ Setup & Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env file in root:

DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key

4️⃣ Setup Prisma & Database
npx prisma migrate dev
npx prisma generate

5️⃣ Run the application
npm run dev


App will run on:

http://localhost:3000

🧪 Sample AI Feature

Click “Generate Insights” on dashboard:

“Orders increased by 18% this month. Electronics products are performing best.”

🎯 Why This Project Is Important

Uses industry-standard tools

Demonstrates real business logic

Shows AI integration in a meaningful way

Strong project for resume & interviews

📸 Screenshots

Add screenshots here (dashboard, login, charts)

👨‍💻 Author

Shabaz khan
Full Stack Developer
🚀 Passionate about building scalable and intelligent web applications

📄 License

This project is open-source and available for learning and personal use.

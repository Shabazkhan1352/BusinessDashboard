# 🚀 AI-Powered Business Management Dashboard

A full-stack, role-based business dashboard built using **Next.js**, **Tailwind CSS**, **PostgreSQL**, **Prisma**, and **Groq AI**. This project simulates a real company internal admin panel used to manage users, products, orders, and business analytics.

---

## 📌 Project Overview

This application allows different types of users (Admin, Manager, User) to securely log in and access features based on their role. It also includes **AI-generated business insights** using Groq to help understand trends and performance.

---

## 🧠 Key Features

### 🔐 Authentication & Authorization
- JWT-based login system
- Secure role-based access control
- Protected routes

### 👥 User Roles
- **Admin** – Full access (users, products, orders, analytics)
- **Manager** – Manage products & orders
- **User** – View dashboard and assigned data

### 📊 Dashboard
- Stats cards (Users, Orders, Revenue, Products)
- Charts for business trends
- Filter and search functionality

### 🛠️ CRUD Operations
- Users management
- Products / Services management
- Orders / Records handling

### 🤖 AI Integration (Groq)
- AI-generated business insights
- Order trend summaries
- Smart suggestions for business decisions

---

## 🧱 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 15 (App Router), React 19, Tailwind CSS |
| **Backend** | Next.js API Routes, JWT Authentication |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **AI** | Groq API (Llama 3.3 70B) |
| **Deployment** | Vercel (Frontend), Railway/Neon (Database) |

---

## 📂 Project Structure

```
business-dashboard/
│
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.jsx
│   │
│   ├── dashboard/
│   │   ├── page.jsx
│   │   ├── users/
│   │   │   └── page.jsx
│   │   ├── products/
│   │   │   └── page.jsx
│   │   └── orders/
│   │       └── page.jsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   └── register/route.js
│   │   ├── users/route.js
│   │   ├── products/route.js
│   │   ├── orders/route.js
│   │   ├── dashboard/route.js
│   │   └── ai/
│   │       └── insights/route.js
│   │
│   └── layout.jsx
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
├── prisma/
│   └── schema.prisma
│
├── .env
├── .env.local
├── package.json
└── README.md
```

---

## 🗄️ Database Models

### User
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      String   @default("USER") // ADMIN, MANAGER, USER
  createdAt DateTime @default(now())
  orders    Order[]
}
```

### Product
```prisma
model Product {
  id        Int      @id @default(autoincrement())
  name      String
  price     Float
  stock     Int
  category  String?
  createdAt DateTime @default(now())
}
```

### Order
```prisma
model Order {
  id          Int      @id @default(autoincrement())
  userId      Int
  user        User     @relation(fields: [userId], references: [id])
  totalAmount Float
  status      String   @default("PENDING") // PENDING, COMPLETED, CANCELLED
  createdAt   DateTime @default(now())
}
```

---

## ⚙️ Setup & Installation

### **1️⃣ Prerequisites**

Make sure you have installed:
- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **PostgreSQL** (local or cloud)

**Install pnpm globally** (if not already installed):
```bash
npm install -g pnpm
```

---

### **2️⃣ Clone the Repository**

```bash
git clone https://github.com/your-username/business-dashboard.git
cd business-dashboard
```

---

### **3️⃣ Install Dependencies**

```bash
pnpm install
```

---

### **4️⃣ Setup Environment Variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dashboard_db"

# JWT Secret (generate random string)
JWT_SECRET="your_super_secret_jwt_key_here"

# Groq AI API Key (get from https://console.groq.com)
GROQ_API_KEY="your_groq_api_key_here"
```

**Get PostgreSQL Database:**
- **Local:** Install PostgreSQL locally
- **Cloud (Recommended):** Use [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app)

**Get Groq API Key:**
- Sign up at [console.groq.com](https://console.groq.com)
- Create an API key

---

### **5️⃣ Setup Prisma & Database**

Initialize and migrate database:

```bash
pnpx prisma migrate dev --name init
pnpx prisma generate
```

Seed database (optional):

```bash
pnpx prisma db seed
```

---

### **6️⃣ Run Development Server**

```bash
pnpm dev
```

App will run on:
```
http://localhost:3000
```

---

## 🛠️ Key Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpx prisma studio` | Open Prisma Studio (database GUI) |
| `pnpx prisma migrate dev` | Create new migration |
| `pnpx prisma generate` | Generate Prisma Client |
| `pnpx prisma migrate reset` | Reset database |
| `pnpx prisma db seed` | Seed database with sample data |

---

## 🧪 Sample AI Feature

Click **"Generate Insights"** on dashboard:

**AI Response:**
> "Orders increased by 18% this month. Electronics products are performing best. Consider restocking popular items."

**How it works:**
1. Dashboard fetches order data from PostgreSQL via Prisma
2. Sends data to Groq AI API
3. AI analyzes trends and generates insights
4. Display results in dashboard

---

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - Get all users (Admin only)
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status

### AI Insights
- `POST /api/ai/insights` - Generate AI business insights

---

## 🚀 Deployment

### Deploy to Vercel

```bash
pnpm build
vercel --prod
```

Or use Vercel CLI with pnpm:
```bash
pnpm install -g vercel
vercel
```

### Database Options
- **Neon** (Recommended) - Free PostgreSQL
- **Supabase** - PostgreSQL + Auth
- **Railway** - Full stack hosting

---

## 🎯 Why This Project Matters

✅ Uses **industry-standard tools** (Next.js, PostgreSQL, Prisma)  
✅ Uses **pnpm** for faster, more efficient package management  
✅ Demonstrates **real business logic** and workflows  
✅ Shows **AI integration** in a meaningful way  
✅ Implements **authentication & authorization**  
✅ Strong project for **resume & portfolio**  
✅ Production-ready architecture

---

## 📸 Screenshots

*(Add your screenshots here)*

1. Login Page
2. Dashboard Overview
3. User Management
4. AI Insights Panel

---

## 👨‍💻 Author

**Shabaz**  
Full Stack Developer | Learning Agentic AI 🚀  
Passionate about building scalable and intelligent web applications

[GitHub](https://github.com/ShabazKhan1352) | [LinkedIn](https://linkedin.com/in/shabaz) | [Portfolio](https://shabaz.dev)

---

## 📄 License

This project is open-source and available for learning and personal use.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

If you have any questions or need help, feel free to reach out!

---

**⭐ If you found this project helpful, please give it a star!**

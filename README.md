# 🛠️ TaskMate

**TaskMate** is a service marketplace web application where users can discover service providers (partners) such as plumbers, electricians, and technicians, and book services directly. Partners can list services, manage bookings, and track their work through a dedicated dashboard.

This project is built to demonstrate real-world frontend architecture, authentication flows, role-based access, and scalable UI patterns.

---

## 🚀 Features

### 👤 Authentication & Roles
- User authentication (Sign up / Sign in)
- Role-based access:
  - **Clients** – browse services, book providers
  - **Partners** – list services, manage bookings
- Protected routes based on login and role

### 🔍 Service Discovery
- Browse available service providers
- View partner profiles and services
- Booking flow for clients

### 📊 Dashboards
- Client dashboard for managing bookings
- Partner dashboard for managing services and requests
- Shared profile management

### 🎨 UI & UX
- Responsive layout (mobile-friendly)
- Reusable components
- Clean, modern UI using Tailwind CSS

---

## 🧱 Tech Stack

- **Frontend:** React + Vite
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **State Management:** Context API
- **Authentication:** Mock auth (ready for backend integration)
- **Deployment:** Not deployed yet

---

## 🗂️ Project Structure

```
src/
├── components/        # Reusable UI components
├── features/          # Feature-based modules (auth, services, dashboards)
├── layouts/           # App & dashboard layouts
├── pages/             # Page-level components
├── routes/            # Application routing
├── context/           # Global state & auth context
├── utils/             # Helper functions
└── App.jsx


🔐 Route Protection (Example)

  * Public routes: Home, Sign In, Browse Services
  * Protected routes:
    * /clients – client dashboard
    * /partners – partner dashboard

Role-based access handled via Protected Route component

▶️ Getting Started
1. Clone the repository
    git clone https://github.com/mohammedirfan01/taskmate.git
    cd taskmate

2. Install dependencies
    npm install

3. Run the app
    npm run dev


App runs at:
  👉 http://localhost:5173

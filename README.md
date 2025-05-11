# 🛒 E-Commerce Application Documentation

## 📋 Overview

This is a modern e-commerce web application built with **React**, **TypeScript**, and **Tailwind CSS**. It provides a complete shopping experience with:

- Product browsing by category  
- Cart and wishlist functionality  
- User authentication (signup, login)  
- Payment method selection with validation  
- Mobile responsiveness and dynamic UI components

---

## 🛠️ Technology Stack

- **React** – v19.0.0  
- **TypeScript**  
- **Tailwind CSS** – Styling  
- **Vite** – Project bundler  
- **React Router DOM** – Routing  
- **TanStack Query** – API data fetching and caching  
- **Context API** – Global state management  
- **React Icons & Lucide React** – Icons  
- **Yup & React Hook Form** – Form validation

---

## ✅ Validation Procedures

### 1. Form Validation
- **Login Form**  
  - Checks for username presence  
  - Validates password length and format

### 2. Product Validation
- Ensures stock availability before adding to cart  
- Validates quantity during cart updates

### 3. API Response Validation
- Loading states handled during data fetching  
- Error states shown using fallback UIs and toast notifications  
- Type checking enforced using TypeScript interfaces

---

## 🧠 State Management

### 1. Global State (via Context API)
- **CartContext** – Manages cart items and persists to `localStorage`  
- **WishlistContext** – Manages wishlist items and persists to `localStorage`

### 2. Local State
- Managed using `useState` for component-specific needs  
- Used heavily in authentication and form components

---

## 📱 Mobile Responsiveness

- Built with Tailwind CSS breakpoints  
- Responsive product grid layouts  
- Touch-friendly elements and interactions

---

## ⚠️ Error Handling

- API errors caught using `try-catch` blocks  
- User feedback shown via notifications  
- Loading states and fallback UIs included for better UX

---

## 📦 Installation & Setup

### Prerequisites:
- Node.js and npm installed

### Steps:

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install required packages:
   ```bash
   npm install tailwindcss @tailwindcss/vite
   npm install react-router-dom
   npm install lucide-react
   npm install @tanstack/react-query
   npm install react-icons
   npm install @hookform/resolvers
   npm install yup @types/yup
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📌 Summary

### Technologies Used:
- **Frontend:** React, TypeScript, Tailwind CSS  
- **Routing:** React Router DOM  
- **API Management:** TanStack Query  
- **State Management:** Context API  
- **Validation:** React Hook Form, Yup  
- **Icons:** Lucide React, React Icons

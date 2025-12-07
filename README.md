# 🦸‍♂️ COMICFOLIO - The Hero's Portfolio

**Comicfolio** is a dynamic, comic-book themed developer portfolio built for those who want to showcase their work with style. It features a high-performance React frontend and a robust Hono/SQLite backend for full content management.

## 🚀 Features

### 🎨 Public Portfolio
-   **Heroic Design**: Custom "Bangers" and "Marker" fonts, vibrant colors, and comic-panel layouts.
-   **Interactive Sections**: 
    -   **Missions** (Projects)
    -   **History** (Experience Timeline)
    -   **Power Levels** (Skills Visualization)
    -   **Utility Belt** (Tech Stack/Gadgets)
-   **Responsive**: Fully optimized for Mobile, Tablet, and Desktop.
-   **SEO Optimized**: Meta tags and Open Graph support.

### 🕹️ Mission Control (Admin Dashboard)
-   **Secure Authentication**: Email/Password login powered by **Better Auth**.
-   **Dynamic Content Management**:
    -   Add/Edit/Delete **Projects** and **Experiences**.
    -   Manage **Skills** and **Gadgets** (Power Levels & Utility Belt).
-   **Signals (Messages)**: Read incoming messages from the contact form in real-time.

### ⚡ Performance & Architecture
-   **State Management**: Centralized `DataContext` using React Context API.
-   **Lazy Loading**: Admin Dashboard and Login pages are code-split to ensure the public site loads instantly.
-   **Backend**: Lightweight **Hono** server running on Node.js.
-   **Database**: **SQLite** (`better-sqlite3`) with WAL mode for fast, local persistence.

---

## 🛠️ Tech Stack

### Frontend
-   **Framework**: React 18 (Vite)
-   **Styling**: Tailwind CSS, Vanilla CSS
-   **Icons**: Lucide React, Text Emojis
-   **State**: Context API

### Backend (`/server`)
-   **Server**: Hono
-   **Auth**: Better Auth
-   **Database**: Better SQLite3
-   **Runtime**: Node.js (TSX)

---

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/YsrnDev/comicfolio.git
    cd comicfolio
    ```

2.  **Install Frontend Dependencies**:
    ```bash
    npm install
    ```

3.  **Install Backend Dependencies**:
    ```bash
    cd server
    npm install
    # or from root
    npm run server:install
    ```

4.  **Setup Environment**:
    -   Create a single `.env` file in the root directory `comicfolio/`.
    -   Add your secrets there:
        ```env
        BETTER_AUTH_SECRET=your_secret
        BETTER_AUTH_URL=http://localhost:4000
        GEMINI_API_KEY=your_key
        ```

---

## 🏃‍♂️ Running the App

You need two terminals running simultaneously.

**Terminal 1: Backend Server**
```bash
npm run server
```
*Runs on `http://localhost:4000`*

**Terminal 2: Frontend Client**
```bash
npm run dev
```
*Runs on `http://localhost:3000`*

---

## 📂 Project Structure

```
comicfolio/
├── components/          # React Components
│   ├── auth/            # Login Page
│   ├── dashboard/       # Admin Dashboard & Managers
│   ├── sections/        # Public Landing Page Sections
│   └── ui/              # Reusable UI (Buttons, Panels)
├── context/             # Global State (Data Context)
├── server/              # Backend Code
│   ├── index.ts         # Server Entry & API Routes
│   ├── db.ts            # Database Setup & Seeding
│   └── auth.ts          # Authentication Config
├── services/            # API Client (Frontend)
├── types.ts             # TypeScript Interfaces
├── App.tsx              # Main App Component (Lazy Loading)
└── index.html           # Entry HTML (SEO Meta Tags)
```

## 🔐 Default Login
To access **Mission Control**:
1. Click the hidden `[AUTH]` button in the top navigation bar.
2. Default (if seeded) or Sign Up using the form.

---
*Built with ❤️ by YsrnDev*

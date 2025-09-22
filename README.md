
# Store Rating App

A full-stack web application with role-based dashboards and authentication. The project provides different views and functionalities for normal users, store owners, and system administrators.

## Features

* User registration and login with validation
* Role-based dashboards:

  * **Normal User** – View stores
  * **Store Owner** – Manage store and view ratings
  * **System Administrator** – Admin dashboard
* Password management and profile updates
* Responsive and modern UI

## Folder Structure

* `frontend/` – React frontend
* `backend/` – Node.js/Express API
* `imgs/` – Screenshots of the application UI

## Screenshots

Make sure the `imgs/` folder is in the root directory.

| Screenshot                                                  | Description                |
| ----------------------------------------------------------- | -------------------------- |
| ![Login](imgs/login.png)                                    | Login page                 |
| ![Register](imgs/register.png)                              | Registration page          |
| ![Dashboard](imgs/dashboard_view.png)                       | General dashboard overview |
| ![Store Owner](imgs/store_owner.png)                        | Store Owner dashboard      |
| ![Admin Dashboard](imgs/system_administrator_dashboard.png) | Admin dashboard            |
| ![User View](imgs/user_view.png)                            | Normal User view           |

## Backend Environment Setup

Inside the `backend/` folder:

1. Create a `.env` file.
2. Add the following:

```env
# Server
PORT=5000
JWT_SECRET=supersecretkey

# Database
DB_NAME=store
DB_USER=root
DB_PASS=your_mysql_db_pass_here
DB_HOST=localhost

# Prisma database URL (encode special characters, e.g., # as %23)
DATABASE_URL="mysql://root:Python%23321@localhost:3306/store"
```

**Notes:**

* Make sure the database `store` exists in MySQL.
* Encode special characters in your password for the `DATABASE_URL` (e.g., `#` → `%23`).

## Frontend Environment Setup

Inside the `frontend/` folder, create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

This points your frontend to the backend API.

## Installation & Running

1. Clone the repository:

```bash
git clone https://github.com/Vikass19/store_rating_app.git
```

2. Start the backend:

```bash
cd backend
npm install
npm start
```

3. Start the frontend:

```bash
cd frontend
npm install
npm start
```

4. Open the application in the browser: `http://localhost:5173` (Vite default port)

## Notes

* Ensure the backend is running before using the frontend.
* All roles have separate dashboards.
* Keep `.env` files secure, especially the JWT secret.


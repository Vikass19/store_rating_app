Here’s a proper, polished README for your GitHub repo with step-by-step setup instructions:

---

# Store Rating App

A full-stack web application with role-based dashboards and authentication. Users, store owners, and system administrators have separate views to manage and interact with stores and ratings.

## Features

* User registration and login with validations
* Role-based dashboards:

  * **Normal User**: View stores
  * **Store Owner**: Manage store and view ratings
  * **System Administrator**: Admin dashboard
* Password management and profile updates
* Responsive and modern UI

## Folder Structure

* `frontend/` – React frontend
* `backend/` – Node.js/Express backend API
* `imgs/` – Screenshots of the UI

## Screenshots

* `login.png` – Login page
* `register.png` – Registration page
* `dashboard_view.png` – General dashboard overview
* `store_owner.png` – Store Owner dashboard
* `system_administrator_dashboard.png` – Admin dashboard
* `user_view.png` – Normal User view

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Vikass19/store_rating_app.git
   ```

2. Setup the backend:

   ```bash
   cd store_rating_app/backend
   npm install
   npm start
   ```

   * Backend runs on `http://localhost:5000` by default.
   * Ensure your `.env` file has the correct database connection details.

3. Setup the frontend:

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

   * Frontend runs on `http://localhost:5173` (Vite default).
   * Make sure `.env` has the API base URL:

     ```
     VITE_API_BASE_URL=http://localhost:5000/api/v1
     ```

4. Open the browser and navigate to the frontend URL to access the application.

## Notes

* Always start the backend before running the frontend.
* All environment variables (`.env`) must be properly configured for API and database connections.



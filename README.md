# 🏷️ BidXpress - API Service

Welcome to the backend infrastructure of **BidXpress**, a comprehensive online bidding and auction platform. This robust Node.js RESTful API acts as the core engine powering the application, handling everything from scheduled auction closures to secure payment processing.

## 🌟 Key Features & Systems

*   **Robust Database Architecture:** Scalable MongoDB schema mapped via Mongoose for storing complex relationships involving Users, Products, Auctions, and Bids.
*   **Secure Stateless Authentication:** JWT token generation and highly secure middleware guards for Admin & User routes using `jsonwebtoken` and `bcryptjs`.
*   **Automated Auction Engine:** Utilizes `node-schedule` to run time-based background cron jobs that automatically evaluate expired auctions, determine highest bidders, and declare winners.
*   **Integrated Media Management:** Seamless `multipart/form-data` parsing with `multer` paired directly with `cloudinary` for reliable cloud-based image storage and optimization.
*   **Robust Email Communications:** Integrated automated email dispatches via `nodemailer` for welcome messages, bid updates, and winning notifications.
*   **Secure Payment Processing:** Tightly integrated with the Stripe Node library for handling payments, ensuring secure and seamless financial transactions for won auctions.

## 🛠️ Technology Stack

*   **Runtime:** Node.js (v18+)
*   **Framework:** Express.js
*   **Database:** MongoDB via Mongoose ORM
*   **Payments:** Stripe Node library
*   **File Uploads:** Multer & Cloudinary
*   **Task Scheduling:** Node Schedule
*   **Email Services:** Nodemailer
*   **Security:** JSON Web Tokens (JWT), bcryptjs, and CORS configuration
*   **Utilities:** express-async-handler (for elegant error handling), slugify

## 🚀 Getting Started (Local Setup)

The API is ready to accept HTTP traffic after exactly following these steps.

### 1. Prerequisites
*   Node.js (v18+ recommended)
*   NPM or Yarn
*   A running MongoDB Atlas Cluster or Local Database
*   Cloudinary Account (for image uploads)
*   Stripe Account (for payments)

### 2. Installation
Navigate into the server directory and install dependencies:
```bash
cd server
npm install
```

### 3. Environment Variables Structure
Create an `.env` file in the root of the `server` directory and add the following keys:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster/
JWT_SECRET=your_strong_jwt_signing_secret

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_stripe_api_key

# Nodemailer SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 4. Running the Backend API
Start the development server using nodemon (which will automatically restart upon file changes):
```bash
npm run dev
```
The server will boot at `http://localhost:5000` (or your defined `PORT`) and confirm a successful MongoDB connection.

## 📦 Deployment Protocol
When deploying the `server` to production (e.g. Vercel, Render, Heroku):
1. Navigate to your hosting provider's Environment Variables tab.
2. Enter the production `MONGO_URI`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, and `Cloudinary`/`SMTP` details.
3. Ensure CORS is correctly configured to accept requests exclusively from your production frontend domain (e.g., `https://bidxpress.web.app`).
4. Build and deploy as required by the host (e.g., standard `npm start` command).

# BidXpress - Server

Welcome to the backend API of **BidXpress**, a comprehensive online bidding and auction platform. This robust Node.js server acts as the core engine powering the BidXpress application, handling everything from user authentication and product management to real-time auction logic and secure payment processing.

## 🚀 Technologies Used

The server is built with a powerful suite of backend technologies:

- **Core Runtime & Framework**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) for building a fast and scalable RESTful API.
- **Database**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) for flexible, schema-based data modeling.
- **Authentication & Security**: 
  - `jsonwebtoken` for secure stateless API authentication.
  - `bcryptjs` for safely hashing user passwords.
  - `cors` for Cross-Origin Resource Sharing.
- **Payments**: [Stripe](https://stripe.com/docs/api/node) for secure, enterprise-grade payment processing.
- **File & Media Handling**: 
  - `multer` for handling `multipart/form-data` uploads.
  - `cloudinary` for reliable cloud-based image storage and management.
- **Automation & Scheduling**: `node-schedule` for running time-based background tasks (e.g., closing expired auctions, determining winners).
- **Communication**: `nodemailer` for robust email notifications (welcome emails, bid updates, winning notifications).
- **Utilities**: `express-async-handler` for elegant error handling, `slugify` for generating URL-friendly strings.

## 📁 Project Structure

- `controllers/`: Contains the business logic and functions that handle specific API endpoints.
- `models/`: Mongoose schemas defining the structure of the database collections (Users, Products, Bids, etc.).
- `routes/`: Express route definitions that map URLs to corresponding controller functions.
- `middlewares/`: Custom Express middlewares for tasks like authentication verification and error handling.
- `utils/`: Helper functions and utility scripts.
- `uploads/`: Temporary local storage for file uploads before processing or moving to cloud storage.

## 🛠️ Getting Started

### Prerequisites
- Node.js installed on your machine.
- A running instance of MongoDB (local or cloud like MongoDB Atlas).

### Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Environment Variables**:
   Create a `.env` file in the root of the `server` directory and configure the required environment variables. Typical variables include:
   - `PORT`: The port the server should run on (e.g., 5000).
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secret key for signing JSON Web Tokens.
   - Cloudinary credentials (`CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).
   - Stripe credentials (`STRIPE_SECRET_KEY`).
   - SMTP details for Nodemailer.

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   This uses `nodemon` for automatic server restarts upon file changes. 

4. **Run the production server**:
   ```bash
   npm start
   ```

## 📝 License
This project is licensed under the ISC License.

# StudyNotion – Full Stack Learning Management System

StudyNotion is a fully functional, highly scalable ed-tech platform that empowers instructors to create and sell online courses while providing students with an immersive, interactive learning environment. Built on the MERN stack with modern web technologies, it features a complete course building system, progress tracking, user dashboard analytics, and secure payment processing via Razorpay.

---

## Features

### Student
- **Authentication**: Secure JWT-based signup/login.
- **OTP Verification**: Email-based verification during registration.
- **Forgot Password**: Password recovery via secure email links.
- **Purchase Course**: Browse the catalog and purchase courses securely.
- **Razorpay Payment**: Integrated, seamless checkout experience.
- **Watch Videos**: Immersive video player for enrolled courses.
- **Progress Tracking**: Real-time course progress tracking and check-offs.
- **Ratings & Reviews**: Students can rate and review courses they have taken.
- **User Profile**: Dashboard to track enrolled courses and edit profile details.

### Instructor
- **Create Courses**: Robust course creation interface.
- **Upload Videos & Thumbnails**: Cloudinary integration for secure media storage.
- **Course Builder**: Drag-and-drop or interactive section/subsection structuring.
- **Publish Course**: Draft and publish states.
- **Dashboard Analytics**: Comprehensive insights using robust MongoDB aggregation.
- **Revenue Tracking**: Monitor total income across all published courses.
- **Student Count**: Track the total number of enrolled students.

---

## Tech Stack

### Frontend
- React.js
- Redux Toolkit (State Management)
- Tailwind CSS (Styling)
- React Hook Form
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas & Mongoose (Database & ORM)
- JSON Web Token (JWT)
- Bcrypt (Password Hashing)

### Third-Party Integrations
- **Cloudinary**: Cloud media storage and delivery.
- **Razorpay**: Payment gateway integration.
- **Nodemailer / Gmail SMTP**: Transactional email dispatch (OTP, Password resets).
- **Vercel**: Frontend & Backend Deployment.

---

## Folder Structure

```
StudyNotion/
├── Server/                   # Backend Express App
│   ├── config/               # Database and Cloudinary configs
│   ├── controllers/          # API Route Controllers
│   ├── models/               # Mongoose Database Schemas
│   ├── routes/               # Express Route Definitions
│   ├── utils/                # Utility functions (Mail sender, etc.)
│   └── index.js              # Server Entry Point
├── src/                      # Frontend React App
│   ├── assets/               # Static Assets (Images, Logos)
│   ├── components/           # Reusable React Components (Common & Core)
│   ├── pages/                # High-level Page Components
│   ├── reducer/              # Redux Slices & Root Reducer
│   ├── services/             # Axios API Connectors & Operations
│   ├── App.js                # React Application Entry Point
│   └── index.js              # React DOM Entry
├── .env                      # Frontend Environment Variables
├── Server/.env               # Backend Environment Variables
└── package.json              # Project Dependencies
```

---

## Installation

### Prerequisites
- Node.js installed on your machine
- A MongoDB Atlas account and cluster
- Cloudinary Account
- Razorpay Account

### Frontend Setup

1. Navigate to the root directory and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory (see Environment Variables section).
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the `Server` directory and install dependencies:
   ```bash
   cd Server
   npm install
   ```
2. Create a `.env` file in the `Server` directory (see Environment Variables section).
3. Start the backend development server:
   ```bash
   npm run dev
   ```

---

## Environment Variables

### Frontend (`/.env`)
```
REACT_APP_BASE_URL=http://localhost:4000/api/v1
VITE_RAZORPAY_KEY=your_razorpay_key
```

### Backend (`/Server/.env`)
```
PORT=4000
MONGODB_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_gmail_address
MAIL_PASS=your_gmail_app_password
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=studynotion
```
*(Do not commit these files to version control!)*

---

## Screenshots

*(Placeholder for future screenshots)*
- **Home**
- **Catalog**
- **Course Details**
- **Student Dashboard**
- **Instructor Dashboard**
- **Course Builder**
- **Payment**
- **Video Player**

---

## API Overview

- **Authentication**: Signup, Login, Generate OTP, Reset Password.
- **Profile**: Get User Details, Update Profile, Update Display Picture, Instructor Dashboard Analytics.
- **Courses**: Create Course, Edit Course, Get All Categories, Get Course Details, Delete Course.
- **Payment**: Capture Payment, Verify Payment, Send Payment Success Email.
- **Rating**: Create Rating, Get Average Rating, Get All Reviews.
- **Progress**: Update Course Progress.

---

## Future Improvements

- **Certificates**: Automatically generate and award completion certificates to students.
- **Wishlist**: Allow users to save courses to a wishlist for future purchase.
- **Live Classes**: Integration with WebRTC/Zoom for real-time instructor sessions.
- **AI Course Recommendation**: Suggest courses based on a user's enrollment history.
- **Discussion Forum**: In-course Q&A sections for peer-to-peer learning.
- **Assignments & Quiz System**: Interactive tests for knowledge retention.

---

## Author

**Ayush Tiwari**

- LinkedIn: [Your LinkedIn Profile]
- GitHub: [https://github.com/ayush748]
- Email: [atayush87@gmail.com]

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

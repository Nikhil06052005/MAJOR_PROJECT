# My Project Name

This is a full-stack web application built with **Node.js**, **Express**, **MongoDB**, and **EJS templates**. The app performs basic CRUD operations and handles image uploads using **Cloudinary**.

---

## 🚀 Project Overview

This project is a web application where users can create, read, update, and delete listings.

### **Tech Stack**

* **Frontend:** HTML, CSS, Tailwind CSS, Bootstrap, EJS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Cloud Storage:** Cloudinary
* **Authentication:** Passport.js (Local Strategy)

### **Key Features**

* User signup and login with authentication
* Create, read, update, and delete listings
* Image upload and storage via Cloudinary
* Secure environment variables with `.env`
* Robust error handling with user-friendly messages
* Responsive UI for various devices

---

## ⚙️ Installation & Setup

1.  **Clone the Repository**

    ```bash
    git clone [https://github.com/username/project-name.git](https://github.com/username/project-name.git)
    cd project-name
    ```

2.  **Install Dependencies**

    This command will download all the necessary Node modules required to run the project.

    ```bash
    npm install
    ```

3.  **Setup Environment Variables**

    Create a `.env` file in the root directory and add the following sensitive information:

    ```env
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_KEY=your_api_key
    CLOUDINARY_SECRET=your_api_secret
    MONGO_URI=your_mongodb_connection_string
    SESSION_SECRET=some_secret_key
    ```

    * This file is essential for hiding sensitive information and connecting to Cloudinary and the MongoDB database.

4.  **Run the Application**

    ```bash
    npm start
    ```

    The application will be accessible at `http://localhost:3000`. Open this URL in your browser to test the app.

---

## ☁️ Cloudinary Integration

**Purpose:** To store images in the cloud instead of on the local server. This approach is more scalable, secure, and efficient.

* **Setup:** Create a **Cloudinary account** and save your API keys in the `.env` file.
* **Implementation:** The project uses the `cloudinary` npm package. When a user uploads an image, it is saved to the cloud, and the image URL is stored in the database.

    ```javascript
    const cloudinary = require('cloudinary').v2;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET
    });
    ```

---

## 📂 Folder Structure

   project-name/
│
├── controllers/       # Logic for handling requests (listings, reviews, users)
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── init/              # Initialization scripts (e.g., seeding data)
│   └── index.js
├── models/            # Mongoose schemas for data models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── node_modules/      # Installed npm packages
├── public/            # Static assets (CSS, JS, images)
│   ├── css/
│   └── js/
├── routes/            # Express routes for different resources
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── utils/             # Utility functions
│   ├── ExpressError.js # Custom error handling
│   └── wrapAsync.js    # Async error wrapper
├── views/             # EJS templates for rendering pages
│   ├── includes/      # Reusable partials
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── layouts/       # Main layout template
│   │   └── boilerplate.ejs
│   ├── listings/      # Listing-specific views
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   └── users/         # User-specific views
│       ├── login.ejs
│       └── signup.ejs
├── .env               # Environment variables
├── .gitignore         # Specifies intentionally untracked files to ignore
├── app.js             # Main Express application entry point
├── cloudConfig.js     # Cloudinary configuration
├── middleware.js      # Custom authentication & validation middleware
├── package-lock.json  # Records exact dependency versions
├── package.json       # Project dependencies and scripts
├── README.md          # This documentation file
├── schema.js          # Joi schemas for server-side validation
└── server.js          # Entry point for the server


---

## 📝 Usage

1.  **Sign up** as a new user.
2.  **Log in** to access the dashboard and create new listings.
3.  **Add images** to your listings using the Cloudinary integration.
4.  **Edit or delete** your existing listings.
5.  **View** all listings on the homepage.

---

## 📦 Dependencies

* `express`
* `mongoose`
* `ejs`
* `dotenv`
* `cloudinary`
* `multer`
* `passport`
* `express-session`
* `method-override`
* `connect-flash`
* *(Add any other dependencies visible in your package.json, like Joi for schema validation, etc.)*

---

## 📌 Notes

* Always run `npm install` before starting the project to ensure all dependencies are installed.
* The `.env` file is crucial; the application will fail to connect to the database and Cloudinary without it.
* The **free Cloudinary plan** is sufficient for most small-scale projects.

---

## 🧑‍💻 Author

Nikhil

* **GitHub:** (https://github.com/Nikhil06052005)

---

## 📜 License
This project is licensed under the **MIT License
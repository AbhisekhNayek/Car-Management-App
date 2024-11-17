# ✨ Car Management Application 🚗✨

## 🌟 Overview
The **Car Management Application** is a powerful platform for users to create, view, edit, and delete car entries. Each car can include up to 10 images, a title, a description, and various tags (e.g., car_type, company, dealer, etc.). With user authentication, users can manage only their own cars and utilize a robust global search feature.

### ⚙️ Key Features
- 🔐 **User Authentication**: Secure sign-up and log-in to manage cars.
- 📝 **Car Management**: Add, view, update, and delete car entries effortlessly.
- 📸 **Image Upload**: Upload up to 10 images per car entry.
- 🔎 **Search Functionality**: Search across all cars using keywords.
- 🔒 **User Access Control**: Users can only manage their own entries.
- 📄 **API Documentation**: Comprehensive documentation using Swagger.

## 🛠️ Tech Stack
- **Frontend**: React.js ⚛️
- **Backend**: Node.js with Express.js 🚀
- **Database**: MongoDB 📊
- **Authentication**: JSON Web Tokens (JWT) 🔐
- **Cloud Deployment**: Deployed on Vercel ☁️

## 🚀 Installation & Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/AbhisekhNayek/Car-Mangement-App.git
   cd Car-Mangement-App
   ```
2. **Install dependencies**:
   ```bash
   # For Backend
   cd Backend
   npm install

   # For Frontend
   cd ../Frontend
   npm install
   ```
3. **Environment Variables**:
   Ensure that you have a `.env` file in the Backend directory with the following:
   ```
   PORT = your_port_no
   MONGODB_URI = your_mongobd_uri 
   JWT_SECRET = your_secret_token
   CLOUDINARY_CLOUD_NAME = your_cloudinary_cloud_name
   CLOUDINARY_API_KEY = your_cloudinary_api_key
   CLOUDINARY_API_SECRET = your_cloudinary_secret_token
   ```
   Ensure that you have a `.env` file in the Frontend directory with the following:
   ```
   VITE_API_URL = your_api_url
   ```
4. **Run the development servers**:
   ```bash
   # Backend (Node.js)
   cd Backend
   nodemon index.js

   # Frontend (React)
   cd ../frontend
   npm run dev
   ```

## ✨ Functionalities Explained
### 🔑 Authentication
- **Sign Up / Login Page**: Users can register and log in with their credentials.

### 🚙 Car Management
- **Product List Page**: Displays all cars created by the logged-in user, featuring a search bar.
- **Product Creation Page**: Form for uploading images, setting a title, and adding a description for a new car.
- **Product Detail Page**: Detailed view of a car with options to edit or delete it.
- **Update Functionality**: Users can modify a car’s title, description, tags, or images.
- **Delete Functionality**: Users can remove a car entry from their collection.

### 🔍 Search
- **Global Search**: Users can search cars using keywords that match titles, descriptions, or tags.

## 📖 API Endpoints
| Endpoint        | Method | Description                          |
|-----------------|--------|--------------------------------------|
| `/`             | POST   | Create a new car entry               |
| `/`             | GET    | Get a list of all user car entries   |
| `/search`       | GET    | Search for cars by keyword           |
| `/:id`          | GET    | Get details of a specific car        |
| `/:id`          | PUT    | Update a car’s details               |
| `/:id`          | DELETE | Delete a specific car                |

## 🛡️ API Documentation
- Access full API documentation at `/api/docs`.
- Documentation generated using **Swagger** or **Postman**.

## 🌍 Deployment
- The application is deployed on **Vercel**. Check out the live app here: [Deployment Link](https://car-management-app-eight.vercel.app/)

## 🚧 Future Enhancements
- 🛠️ Add advanced search filters.
- 🔔 Implement user notifications.
- ✂️ Support image editing and resizing.

## 📸 Screenshots
<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/AbhisekhNayek/Car-Management-App/blob/main/Screenshot/Signin.png" alt="Sign In Page Screenshot" width="45%" />
  <img src="https://github.com/AbhisekhNayek/Car-Management-App/blob/main/Screenshot/Signup.png" alt="Sign Up Page Screenshot" width="45%" />
</div>

## 🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the project. 🌟

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---
Made with ❤️ by Abhi using **MERN Stack**! ✨

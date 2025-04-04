# User Management API

This is a RESTful API for user management with authentication.

## Features

- User registration
- User login
- CRUD operations for user accounts
- Image upload (up to 4 images per user)
- JWT authentication

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create an `.env` file in the root directory with the following content:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/user_management
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=30d
   ```
4. Create an `uploads` directory in the root folder:
   ```
   mkdir uploads
   ```
5. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication Routes

#### Register a User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data` (for image uploads)
- **Body**:
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "phoneNumber": "1234567890",
    "password": "password123",
    "gender": "male", // Options: male, female, other
    "city": "New York",
    "education": ["Bachelor's Degree", "Master's Degree"],
    "images": [file1, file2] // Optional, up to 4 images
  }
  ```
- **Response**: JWT token

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: JWT token

#### Get Current User
- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User data

### User Routes

#### Get All Users
- **URL**: `/api/users`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: List of users

#### Get User by ID
- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User data

#### Update User
- **URL**: `/api/users/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Content-Type**: `multipart/form-data` (for image uploads)
- **Body**: Any user data to update
- **Response**: Updated user data

#### Delete User
- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Success message 
# Library Management API

A RESTful API for managing books and borrowing operations in a digital library. Built with **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Dotenv

---

## Features

- Add, update, get, and delete books
- Borrow books with quantity and due date
- Real-time book availability check
- Automatic availability status update using instance method
- Borrow summary report using MongoDB Aggregation
- Filtering and sorting books
- Proper schema validation and error handling
- Follows clean project structure

---

## Project Structure

```

library-management-api/
│
├── src/
│   ├── controllers/       # Business logic
│   ├── interfaces/        # TypeScript interfaces
│   ├── middlewares/       # Error handling
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API route definitions
│   ├── app.ts             # Express app setup
│   └── server.ts          # MongoDB connection and server run
│
├── .env                   # Environment variables
├── tsconfig.json          # TypeScript config
├── package.json           # Dependencies
└── README.md              # Project documentation

```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mshipan/L2B5_Library_Management_API_Assignment_3.git
cd library_management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=mongodb+srv://your_user:your_password@cluster0.mongodb.net/libraryDB # Use your MongoDB URI
```

### 4. Run the Project

#### For Development:

```bash
npm run dev
```

#### For Production Build:

```bash
npm run build
npm start
```

---

## API Endpoints

### Create Book

`POST /api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

---

### Get All Books

`GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5`

---

### Get Book by ID

`GET /api/books/:bookId`

---

### Update Book

`PUT /api/books/:bookId`

```json
{ "copies": 10 }
```

---

### Delete Book

`DELETE /api/books/:bookId`

---

### Borrow Book

`POST /api/borrow`

```json
{
  "book": "bookObjectIdHere",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

### Borrow Summary (Aggregation)

`GET /api/borrow`

Returns total quantity borrowed per book with title and ISBN.

---

## Error Handling

### Validation Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
```

---

## Author

**Shipan Mallik**
Frontend Developer (React.js)
[mshipan657@gmail.com](mailto:mshipan657@gmail.com)
[LinkedIn](https://linkedin.com/in/shipanmallik) | [GitHub](https://github.com/mshipan)

---

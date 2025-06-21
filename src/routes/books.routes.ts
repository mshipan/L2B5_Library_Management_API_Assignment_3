import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/books.controller";

const bookRoutes = Router();

bookRoutes.post("/", createBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/:bookId", getBookById);
bookRoutes.put("/:bookId", updateBook);
bookRoutes.delete("/:bookId", deleteBook);

export default bookRoutes;

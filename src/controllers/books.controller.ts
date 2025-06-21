import { Request, Response } from "express";
import { Book } from "../models/books.model";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error,
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;
    const query: any = filter ? { genre: filter } : {};
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
      .limit(parseInt(limit as string));
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book = await Book.findById(req.params.bookId);
    res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Book not found", error });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updates = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    Object.assign(book, updates);

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Book update failed",
      error,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Delete failed", error });
  }
};

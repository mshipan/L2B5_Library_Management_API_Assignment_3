import { NextFunction, Request, Response } from "express";
import { Book } from "../models/books.model";
import { Borrow } from "../models/borrow.model";

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { book, quantity, dueDate } = req.body;

    const foundBook = await Book.findById(book);
    if (!foundBook || foundBook.copies < quantity) {
      res.status(400).json({
        success: false,
        message: "Not enough copies available",
        error: "Insufficient stock",
      });
      return;
    }

    foundBook.copies -= quantity;
    foundBook.updateAvailability(); // custom instance method
    await foundBook.save();

    const borrow = await Borrow.create({ book, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    next(error); // Forward to global error handler
  }
};

export const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Summary failed", error });
  }
};

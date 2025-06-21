import { Router, Request, Response } from "express";
import { borrowBook, getBorrowSummary } from "../controllers/borrow.controller";

const borrowRoutes = Router();

borrowRoutes.post("/", borrowBook);
borrowRoutes.get("/", getBorrowSummary);

export default borrowRoutes;

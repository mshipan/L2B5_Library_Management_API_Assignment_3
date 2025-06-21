import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./routes/books.routes";
import borrowRoutes from "./routes/borrow.routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());
app.use(globalErrorHandler);

// routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management App");
});

export default app;

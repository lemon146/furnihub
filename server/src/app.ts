import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler";
import categoryRouter from "./routes/category.routes";
import productRouter from "./routes/product.routes";
import userRouter from "./routes/user.routes";
import reviewRouter from "./routes/review.routes";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: "13kb" }));
app.use(express.urlencoded({ extended: true, limit: "13kb" }));
app.use(express.static(path.join(__dirname, "../public")));

// route declaration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use(errorHandler);

export { app };

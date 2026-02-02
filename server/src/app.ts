import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";

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

// routes import

import { errorHandler } from "./middlewares/errorHandler";
import userRouter from "./routes/user.routes";

// route declaration

app.use("/api/v1/users", userRouter);

app.use(errorHandler);

export { app };

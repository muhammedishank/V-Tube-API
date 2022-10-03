import express from "express";
import connectMongo from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/Auth.js";
import userRoutes from "./routes/Users.js";
import commentRoutes from "./routes/Comments.js";
import videoRoutes from "./routes/Videos.js";
import cookieParser from "cookie-parser";
// import cors from "cors"

dotenv.config();

connectMongo();
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/videos", videoRoutes);

// app.use(
//   cors())

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  console.log("Conncted to server!");
});

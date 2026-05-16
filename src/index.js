import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import adminProductRoute from "./routes/adminProductRoute.js";
import cartItemRoute from "./routes/cartItemRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import ratingRoute from "./routes/ratingRoute.js";
import adminOrderRoute from "./routes/adminOrderRoute.js";
import paymentRoute from "./routes/paymentRoute.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://e-comm-ekk2.vercel.app"],
    credentials: true,
  }),
);
// ✅ ADD THIS HERE
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to e-comm api",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRoute);
app.use("/api/admin/products", adminProductRoute);
app.use("/api/orders", orderRoute);
app.use("/api/admin/orders", adminOrderRoute);
app.use("/api/cart-items", cartItemRoute);
app.use("/api/cart", cartRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/ratings", ratingRoute);
app.use("/api/payments", paymentRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;

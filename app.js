
  import express from "express";
  import cors from "cors";
  import cookieParser from "cookie-parser";
  
  const app = express();
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
//   app.use(express.static("public"));
  app.use(cookieParser());
  
//   import authRoutes from "./routes/auth.routes.js";
//   import doctorRoutes from "./routes/doctor.routes.js";
  app.get("/", (req, res) => res.send("Express on Vercel"));
//   app.use("/api/v1/auth", authRoutes);
//   app.use("/api/v1/doctor", doctorRoutes);
  export { app };
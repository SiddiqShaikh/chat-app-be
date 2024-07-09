import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

// Create HTTP server and integrate with Express app
const httpServer = createServer(app);

// Initialize Socket.IO server
const io = new SocketIOServer(httpServer);

// Function to handle socket connections
const setupSocket = (socket) => {
  console.log("New client connected", socket.id);

  // Example event handler
  socket.on("message", (msg) => {
    console.log("Message received: ", msg);
    io.emit("message", msg); 
  });

  socket.on("disconnected", () => {
    console.log("Client disconnected", socket.id);
  });
};

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error connecting server", error);
      throw error;
    });

    // Start listening for socket connections
    io.on("connection", setupSocket);

    // Start HTTP server
    httpServer.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed", err);
  });

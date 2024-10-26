const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "https://tracking.ulspk.com/" })); // Replace with your local app's origin

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://tracking.ulspk.com/", // Replace with your local app's origin
    methods: ["GET", "POST"],
  },
});

let activeUsers = 0;

io.on("connection", (socket) => {
  activeUsers++;
  io.emit("userCount", activeUsers);

  socket.on("disconnect", () => {
    activeUsers--;
    io.emit("userCount", activeUsers);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});

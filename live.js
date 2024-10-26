const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let activeUsers = 0;

io.on("connection", (socket) => {
  activeUsers++;
  io.emit("userCount", activeUsers); // Send the updated user count to all clients

  socket.on("disconnect", () => {
    activeUsers--;
    io.emit("userCount", activeUsers); // Update all clients when a user disconnects
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});

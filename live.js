const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://tracking.ulspk.com", // Ensure no trailing slash
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Your socket.io connection logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Example to track active users
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

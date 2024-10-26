const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://tracking.ulspk.com",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const activeUsers = new Set();
app.get('/', (req, res) => {
  res.send('Welcome to the Socket.io server!');
});
io.on('connection', (socket) => {
  activeUsers.add(socket.id);
  io.emit('activeUsersCount', activeUsers.size); // Emit the count when a user connects

  console.log(`A user connected: ${socket.id}`);
  console.log(`Active users: ${activeUsers.size}`);

  socket.on('disconnect', () => {
    activeUsers.delete(socket.id);
    io.emit('activeUsersCount', activeUsers.size); // Emit the count when a user disconnects

    console.log(`User disconnected: ${socket.id}`);
    console.log(`Active users: ${activeUsers.size}`);
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

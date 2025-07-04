import { Server } from 'socket.io';
import http from 'http';

let io;
const userSocketMap = {}; // Move outside so it's shared

const createSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
      delete userSocketMap[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
  });
};

// ✅ Export both
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export { io, createSocketServer };

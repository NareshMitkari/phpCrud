const app = require("./app");
const PORT = 5000;
const db = require('./src/config/db');
const http = require("http"); 
const { Server } = require("socket.io");
const SocketServer = require("./socketServer"); // your class
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    method:["GET","POST"]
  },
});

const socketServer = new SocketServer(io);
socketServer.init();

server.listen(PORT, () => {
  console.log(`🚀 Aura-Text Server running on http://localhost:${PORT}`);
});
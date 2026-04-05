class SocketServer {
  constructor(io) {
    this.io = io;
    this.users = {}; 
  }

  init() {
    // 'socket' is defined ONLY inside this arrow function
    this.io.on("connection", (socket) => { 
      console.log("New connection:", socket.id);

      socket.on("identify", (userId) => {
       if (userId) {
		    this.users[String(userId)] = socket.id;
		    console.log("--------------------------");
		    console.log("NEW USER IDENTIFIED:", userId);
		    console.log("CURRENT ONLINE MAP:", this.users); // Does '2' appear here?
		    console.log("--------------------------");
		}
      });

      socket.on("send_private_message", (data) => {
        const receiverSocketId = this.users[String(data.to)];
        console.log("###############",receiverSocketId,data)
        if (receiverSocketId) {
          // We use 'this.io' to send to a specific ID
          this.io.to(receiverSocketId).emit("receive_private_message", data);
        }
      });

      socket.on("disconnect", () => {
        // Correct way to find and remove the user
        const userId = Object.keys(this.users).find(key => this.users[key] === socket.id);
        if (userId) {
          delete this.users[userId];
          console.log(`User ${userId} disconnected`);
        }
      });
    });
  }
}

module.exports = SocketServer;
const { Server } = require("socket.io");

const io = new Server({
  cors: true,
});

const emailToSocketMapping = new Map();
const socketToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log("newServer", socket.id);
  socket.on("room-join", (data) => {
    const { email, room } = data;
    emailToSocketMapping.set(email, socket.id);
    socketToEmailMap.set(socket.id, email);
    io.to(room).emit("user-joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room-join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incoming:call", { from: socket.id, offer });
  });
  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });
  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });
  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

io.listen(8000);

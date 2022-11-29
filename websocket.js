const { WebSocketServer } = require("ws");

const socket = new WebSocketServer({ port: 9000, host: "localhost" });

socket.on("listening", () => {
  console.log("listening for socket connection");
});

socket.on("connection", (socket) => {
  // console.log("Got new connection", socket);
  socket.send("welcome user");

  socket.on("open", () => {
    console.log("socket opened ");
  });

  socket.on("message", (msg) => {
    console.log("client sent message ", msg.toString("utf-8"));
    socket.emit("message", msg.toString("utf-8"));

    // socket.send("hello form server");
  });

  socket.on("newMessage", (msg) => {
    console.log("message received", msg.toString("utf-8"));

    socket.emit("newMessage", msg);
  });

  socket.on("close", (x) => {
    console.log("socket closed ", x);
  });
});

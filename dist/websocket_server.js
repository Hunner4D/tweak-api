const wsServer = require("http").createServer();
const io = require("socket.io")(wsServer, {
  transports: ["websocket", "polling"],
});

io.on("connection", (client) => {
  client.on("userConnect", (chatId) => {
    client.join("room-", chatId);
  });

  client.on("send", (messageInfo) => {
    console.log("sent:", messageInfo.message)
    io.sockets
      .in("room-", messageInfo.chatId)
      .emit("message", {
        text: messageInfo.message,
        date: new Date().toLocaleDateString(),
        user: messageInfo.username,
        image: messageInfo.profileImage
      });
  });

});

module.exports = wsServer;

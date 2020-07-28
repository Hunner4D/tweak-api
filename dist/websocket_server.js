const wsServer = require("http").createServer();
const io = require("socket.io")(wsServer, {
  transports: ["websocket", "polling"],
});

const rooms = {};

io.on("connection", (client) => {
  client.on("userConnect", (chatId) => {
    client.join("room-", chatId);
  });

  client.on("send", (messageInfo) => {
    io.sockets
      .in("room-", messageInfo.chatId)
      .emit("message", {
        text: messageInfo.message,
        date: new Date().toISOString(),
        user: messageInfo.username,
        image: messageInfo.profileImage
      });
  });

});

// wsServer.listen(7777, () => console.log("CHAT WEB SOCKETS ON 7777"));
module.exports = wsServer;

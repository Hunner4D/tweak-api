const wsServer = require("http").createServer();
const io = require("socket.io")(wsServer, {
  transports: ["websocket", "polling"],
});
// const redisAdapter = require('socket.io-redis');
// io.adapter(redisAdapter({ host: 'localhost', port: 7777 }));
// const redisIo = 


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
        date: new Date().toISOString(),
        user: messageInfo.username,
        image: messageInfo.profileImage
      });
  });

});

module.exports = wsServer;

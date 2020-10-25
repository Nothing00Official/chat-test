const express = require('express')
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const port = process.env.PORT || 3000;

var usernames = new Object();
var recipients = new Object();

io.on('connection', async (socket) => {
  socket.on('message', (msg) => {
    socket.to(usernames[recipients[msg["username"]]]).emit('message', msg["message"]);
  });
  socket.on('username', (msg) => {
    usernames[msg] = socket.id;
  });
  socket.on('recipient', (msg) => {
    let split = msg.split("#");
    recipients[split[0]] = split[1];
  });
});

io.on('new-message', (message) => {
  io.emit(message);
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
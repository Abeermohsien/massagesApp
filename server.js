const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Welcome!');
});
io.on('connection', (socket) => {
  console.log('Connected');
});
io.on('connection', (socket) => {
  console.log('Connected');

  socket.on('message', (data) => {
    console.log('Your Message: ', data);
    io.emit('message', data);
  });

});
http.listen(3000, () => {
  console.log('Server listening on port 3000');
});
io.on('connection', (socket) => {

  console.log('A user connected');

  socket.on('message', (data) => {
    console.log('Received message:', data);
  });

});
io.on('connection', (socket) => {
  console.log('A user connected');
  // Join a room
  socket.on('joinRoom', (room) => {

    console.log(`${socket.id} just joined room ${room}`);

    socket.join(room);

    io.to(room).emit('roomJoined', `${socket.id} just joined the room`);
  });

  // Leave a room
  socket.on('leaveRoom', (room) => {
    console.log(`${socket.id} has left room ${room}`);

    socket.leave(room);

    io.to(room).emit('roomLeft', `${socket.id} has left the room`);
  });


  // Post a message to a specific room
  socket.on('messageToRoom', (data) => {

    console.log(`${socket.id} posted a message to room ${data.room}: ${data.message}`);

    io.to(data.room).emit('message', {
      id: socket.id,
      message: data.message
    });

  });


  // Send a message to all connected clients
  socket.on('messageToAll', (data) => {
    console.log(`${socket.id} sent a message to all clients: ${data.message}`);

    io.emit('message', {
      id: socket.id,
      message: data.message
    });

  });
  // Disconnect event
  socket.on('disconnect', () => {

    console.log(`${socket.id} disconnected`);

  });

});
app.listen(5000, () => {
  console.log('Server is listening on port 3000');
});
const messageForm = document.querySelector('#message-form');
messageForm.addEventListener('submit', (event) => {

  event.preventDefault();
  const messageInput = document.querySelector('#message-input');

  const message = {
    text: messageInput.value
  };

  socket.emit('sendMessage', message);
  messageInput.value = '';

});
socket.on('newMessage', (message) => {

  const messagesList = document.querySelector('#messages-list');

  const messageItem = document.createElement('li');

  messageItem.textContent = `${message.userId}: ${message.text}`;

  messagesList.appendChild(messageItem);

});
socket.on('disconnect', () => {
  // Update UI to indicate that the user is disconnected
});

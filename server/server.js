const path=require('path');
const http=require('http');
const express=require('express');
const socketIO =require('socket.io');

const publicpath=path.join(__dirname , '../public');

const port=process.env.PORT || 3000;

 var app=express();
 var server=http.createServer(app);
var io=socketIO(server);
io.on('connection',(socket) => {
  console.log('New user connected');

socket.emit('newMessage',{
  from:'John',
  text:'See you then',
  createdAt:123123
});

socket.on('createMessage',(message) =>{
  console.log('createMessage',message);
});

  socket.on('disconnect', () => {
    console.log('user was disconnected');
});
});
 app.use(express.static(publicpath));
 server.listen(port, () => {
   console.log('server is on '+port);
 });

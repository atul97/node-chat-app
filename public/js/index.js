var socket =io();
socket.on('connect',() =>{
  console.log('connected to server');
  socket.emit('createMessage',{
    from:'Atul',
    text:'Yup that works'
  });
});
socket.on('disconnect',() =>{
  console.log('disconnected from server');
});
socket.on('newMessage',function(message){
  console.log('new email',message);
});

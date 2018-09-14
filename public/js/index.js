var socket =io();
socket.on('connect',() =>{
  console.log('connected to server');
});
socket.on('disconnect',() =>{
  console.log('disconnected from server');
});
socket.on('newMessage',function(message){
  var formattedTime =moment(message.createdAt).format('h:mm a');
  var template=jQuery('#message-template').html();
  var html=Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
});
 socket.on('newLocationMessage',function (message) {
  var formattedTime =moment(message.createdAt).format('h:mm a');
  var template=jQuery('#location-message-template').html();
  var html=Mustache.render(template,{
    url:message.url,
    from:message.from,
    createdAt:formattedTime
  });
   jQuery('#messages').append(html);
 });
jQuery('#message-form').on('submit',function (e)
{
  e.preventDefault();

  var messagetextbox=jQuery('[name=message]');
  socket.emit('createMessage',{
    from:'User',
    text:messagetextbox.val()
  },function () {
messagetextbox.val('');
  });
});

var locationbutton=jQuery('#send-location');
locationbutton.on('click',function() {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }
  locationbutton.attr('disabled', 'disabled').text('sending location..')
  navigator.geolocation.getCurrentPosition(function (position)
{
  locationbutton.removeAttr('disabled').text('Send location');
  socket.emit('createLocationMessage',{
  latitude:position.coords.latitude,
  longitude:position.coords.longitude
});
},function() {
  locationbutton.removeAttr('disabled').text('Send location');
  alert('Unable to fetch location');
});
});

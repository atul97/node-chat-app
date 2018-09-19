var socket =io();

function scrollToBottom () {
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    //  console.log("should scroll");
    }
}
socket.on('connect',() =>{
  var params = jQuery.deparam(window.location.search);
   socket.emit('join',params,function(err){
   if(err) {
     alert(err);
     window.location.href ='/';
   }else   {
     console.log('No error');
   }
 });
});
socket.on('disconnect',() =>{
  console.log('disconnected from server');
});

socket.on('updateUserList',function (users) {
  var ol=jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
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
  scrollToBottom();
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
  scrollToBottom();
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

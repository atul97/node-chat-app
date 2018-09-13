var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',() => {
  it('should generate a correct message object',() => {
var from='jen';
var text='mess';
var message=generateMessage(from,text);

expect(message.createdAt).toBeA('number');
expect(message).toInclude({from,text});
  });
});

describe('generateLocationMessage',() => {
  it('should generate a correct location object',() => {
var from='Gap';
var longitude=19;
var latitude=15;
var url='https://www.google.com/maps?q=15,19';
var message=generateLocationMessage(from,latitude,longitude);

expect(message.createdAt).toBeA('number');
expect(message).toInclude({from,url});
  });
});

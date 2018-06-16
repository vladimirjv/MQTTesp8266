const express = require('express');
const mqtt=require('mqtt')
const port =process.env.PORT || 3000;

var client = mqtt.connect('mqtt://VladJV9669:c4527f2d4531cb26@broker.shiftr.io', {
  clientId: 'ServerNode'
});

client.on('connect', function(){
    console.log('client has connected!');
  
    client.subscribe('/hello');
    // client.unsubscribe('/example');
  
    setInterval(function(){
      client.publish('/other', 'hi!');
    }, 5000);
  });

  client.on('message', function(topic, message) {
    console.log('new message:', topic, message.toString());
  });

var app = express();
var body={
    valor:'ok'
}

app.get('/hi',(req,res)=>{
    // var sendit=JSON.stringify(body)
    res.send(body)
    client.publish('/other', 'hello again to you!');
});
app.get('/turnoff',(req,res)=>{
    res.send('ok')
    client.publish('/other', 'on');
});
app.get('/turnon',(req,res)=>{
    res.send('ok')
    client.publish('/other', 'off');
});

app.listen(port, () => {
    console.log('Server is up on port '+port);
});
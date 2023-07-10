require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  cors:{
    origin:"*",
  }
}
)

io.on('connection', (socket) => {
    const name = socket.handshake.query.name;
    console.log('A client connected.',name,typeof name);

  socket.join(name)

  socket.on('sendMessage', (data) => {
    console.log(data,'reviece from sender');
    if(Array.isArray(data?.recievername)){
      data?.recievername.forEach((x) => {
        console.log(typeof x,x);
        socket.broadcast.to(x).emit('receiveMessage',{
          type:'incomming',
          sendername:data.sendername,
          text:data.text,
          recievername:x,
          fromMe:false,
          time:new Date()
        })
      });
    } 
   
  })
    socket.on('disconnect', () => {
      console.log('A client disconnected.');
    });
  });

  app.get('/hello', function(req, res){
    res.send("hello world")
    })
const port = process.env.PORT || 3000;

server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });

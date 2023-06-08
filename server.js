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
    const id = socket.handshake.query.id;
    console.log('A client connected.',id);

  socket.join(id)

//   socket.on('send-message', ({ recipients, text,senderid }) => {
//     console.log(recipients,senderid);
//     recipients.forEach(recipient => {
//       console.log('newRecipients',recipient);
//     socket.broadcast.to(recipient).emit('receive-message',{recieverId: recipient, sender: senderid, text,fromMe:false}
//     //   ()=>{
//     //         let obj = {
//     //             recieverId: recipient, sender: senderid, text,fromMe:false
//     //           }
//     //           console.log(obj,'message broadcast');
//     //           return  {
//             //     recieverId: recipient, sender: senderid, text,fromMe:false
//             //   };
//     //   }
//        )
//     })
//   })
socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
    //   const newRecipients = recipients.filter(r => r !== recipient)
    //   newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recieverId: recipient, senderid: id, text,fromMe:false
      })
    })
  })
    socket.on('disconnect', () => {
      console.log('A client disconnected.');
    });
  });

  app.get('/hello', function(req, res){
    res.send("hello world")
    })
const port = 3001;

server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });

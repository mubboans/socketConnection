const express = require('express');
const route = express.Router()
app.use(express.json()); 
function socketPost(io){
return route.post('/send/mssg',(req,res)=>{
    let reqbody = req.body;
    let obj ={
        time:new Date(),
        reqbody
    }
    // console.log(reqbody);
    // console.log(io);
    io.emit('message',obj)
    res.status(200).send({reqbody});
})
}

module.exports = socketPost; 
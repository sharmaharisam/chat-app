const express = require('express');
const ejs = require('ejs');
const socket = require('socket.io');

// app setup
const app = express();
app.use(express.urlencoded({
    extended: true
  }));
  app.set('view engine', 'ejs');
  app.use(express.static(__dirname+"/public"));
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
    console.log('server started at port 3000');
});

//socket setup
const io = socket(server);
io.on('connection' , (socket) =>{
    console.log("made socket connection");


    socket.on('chat' , (data)=>{
        io.sockets.emit('chat' , data);
    });
    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing' , data);
    });
});

// Get requets
app.get('/', function(req, res){
    res.render('index');
})

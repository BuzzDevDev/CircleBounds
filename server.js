const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const xss = require('xss');
var rooms = [];

var port = process.env.PORT || 8080;


app.use(express.urlencoded({
    extended: true
}));

// use webpage file index.html in /public/
app.use(express.static(__dirname + '/public/'));

// event listener listening for a user to connect to server
io.on('connection', socket => {
    var username = "";
    var theirRoom = "";
    socket.emit('Console', 'Connected to server.');
    console.log("User connected to world.");
    socket.on("disconnect", () => {
        console.log("User disconnected from world.");
        io.to(theirRoom).emit("botMessage", {msg: username, type: "left"});
        rooms.forEach(room => {
            if(theirRoom == room.id) {
                var index = room.sockets.indexOf(socket.id);
                room.sockets.splice(index, 1);
                if(room.sockets.length <= 0) {
                    var ind = rooms.indexOf({id: theirRoom});
                    rooms.splice(ind, 1);
                };
            };
        });
    });

    socket.on("joinRoom", (msg) => {
        socket.join(msg.room);
        rooms.forEach(room => {
            if(room.id == msg.room) {
                room.sockets.push(socket.id);
                return;
            };
        });
        theirRoom = msg.room;
        username = msg.user;
        io.to(msg.room).emit("botMessage", {msg: username, type: "joined"});
    });

    socket.on("createRoom", (msg) => {
        var obj = {
            id: msg,
            sockets: []
        };
        rooms.push(obj);
        socket.emit("redirect", msg);
        obj.sockets.push(socket.id);
        obj.sockets.splice(0, 1);
    });

    socket.on("message", (obj) => {
        obj.user = username;
        obj.user = xss(obj.user);
        obj.msg = xss(obj.msg);

        // check for empty message
        if(obj.msg.trim() === "") {
            
        }else{
            io.to(obj.room).emit("newMessage", obj);
        };
        
    });

    socket.on("getRooms", () => {
        socket.emit("rooms", rooms);
    });
});

// req a chat room

app.get("/:chat", (req, res) => {
    var chat = req.params.chat;
    var file = fs.readFileSync("./public/pages/chat.html", "utf-8");

    for (let i = 0; i < rooms.length; i++) {
        if(rooms[i].id == chat) {
            res.send(file);
            res.end();
            break;
        };
    };
    
    res.end();
});

server.listen(port);
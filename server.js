const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');

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
    });

    socket.on("joinRoom", (msg) => {
        socket.join(msg.room);
        theirRoom = msg.room;
        username = msg.user;
        io.to(msg.room).emit("botMessage", {msg: username, type: "joined"});
    });

    socket.on("message", (obj) => {
        obj.user = username;
        io.to(obj.room).emit("newMessage", obj);
    });
});

app.get("/:chat", (req, res) => {
    var chat = req.params.chat;
    var file = fs.readFileSync("./public/pages/chat.html", "utf-8");

    res.send(file);
    res.end();
});

server.listen(port);
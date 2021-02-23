const socket = io();

socket.on('Console', msg => {
    console.log(msg);
});

socket.on("redirect", msg => {
    location.href += msg;
});

function createRoom() {
    var x = Math.floor(Math.random() * ((ctx.canvas.width - 175) - 50 + 1) + 50);
    var y = Math.floor(Math.random() * ((ctx.canvas.height - 175) - 50 + 1) + 50);
    var room = `${x}-${y}`;
    socket.emit("createRoom", room);
};

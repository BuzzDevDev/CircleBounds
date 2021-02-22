const socket = io();

socket.on('Console', msg => {
    console.log(msg);
});

socket.on("redirect", msg => {
    location.href += msg;
});

function createRoom() {
    var room = window.prompt("What would you like to name your room?");
    socket.emit("createRoom", room);
};

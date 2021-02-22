const socket = io();
var chatHolder = document.getElementById("chatHolder");
var shownMessages = chatHolder.childElementCount;


socket.on('Console', msg => {
    console.log(msg);
});

socket.on("newMessage", msg => {
    message(msg);
});

function message(obj) {
    shownMessages++
    if(shownMessages > 7) {
        console.log("removed top message")
        chatHolder.firstElementChild.className = "chatMessageSlide";

        setTimeout(() => {
            chatHolder.removeChild(chatHolder.firstElementChild);
        }, 1200);
    };

    var elem = document.createElement("div");
    elem.className = "chatMessage";
    elem.id = "chatMessage";

    if(obj.hasOwnProperty("type")) {
        var myRoom = window.location.pathname;
        myRoom = myRoom.replace("/", "");
        elem.innerHTML = `${obj.msg} has ${obj.type} World ${myRoom}!`
        elem.style.color = "#505f78"
    }else{
        elem.innerHTML = `${obj.user}: ${obj.msg}`;
    };

    chatHolder.appendChild(elem);
    
};

function sendMessage() {
    var msg = document.getElementById("text-box");
    var obj = {
        msg: msg.value,
        room: window.location.pathname
    };
    obj.room = obj.room.replace("/", "")
    socket.emit("message", obj);
    msg.value = "";
    msg.focus();
};


document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage();
})

function joinRoom() {
    var username = window.prompt("What is your username?");
    var myRoom = window.location.pathname;
    myRoom = myRoom.replace("/", "");
    var obj = {
        room: myRoom,
        user: username
    };
    socket.emit("joinRoom", obj);
    console.log(`Joined room: ${myRoom}`);
};

socket.on("botMessage", (obj) => {
    message(obj);
});

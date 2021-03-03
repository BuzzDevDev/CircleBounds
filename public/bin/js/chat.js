const socket = io();
var theirMessages = [];
var chatHolder = document.getElementById("chatHolder");
var shownMessages = chatHolder.childElementCount;
var msg = document.getElementById("text-box");

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
    var obj = {
        msg: msg.value,
        room: window.location.pathname
    };
    obj.room = obj.room.replace("/", "")
    socket.emit("message", obj);
    msg.value = "";

    // cooldown
    msg.disabled = true;
    let num = 3;
    msg.placeholder = num;
    let int = setInterval(() => {
        num -= 1;
        msg.placeholder = num;
    }, 500);
    setTimeout(() => {
        clearInterval(int);
        msg.placeholder = "Click to chat";
        msg.disabled = false;
        msg.focus();
    }, 1500);
    
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
    msg.focus();
};

socket.on("botMessage", (obj) => {
    message(obj);
});


// set emojiIMG button to be at the same position as input msg
setInterval(() => {
    if($(msg).is(':focus')) {
        document.getElementById("emojiIMG").style.bottom = "9.5%"
        document.getElementById("gifIMG").style.bottom = "9.5%"
    };
    if(!$(msg).is(':focus')) {
        document.getElementById("emojiIMG").style.bottom = "4%"
        document.getElementById("gifIMG").style.bottom = "4%"
    };
    if($(msg).is(':hover') && !$(msg).is(":focus")) {
        document.getElementById("emojiIMG").style.bottom = "6%"
        document.getElementById("gifIMG").style.bottom = "6%"
    };

}, 100);
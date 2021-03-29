const socket = io();
var theirMessages = [];
var chatHolder = document.getElementById("chatHolder");
var shownMessages = chatHolder.childElementCount;
var msg = document.getElementById("text-box");
var oncooldown = false;

socket.on('Console', msg => {
    console.log(msg);
});

socket.on("newMessage", msg => {
    message(msg);
});

function message(obj) {
    shownMessages++
    if(shownMessages > 4) {
        console.log("removed top message")
        chatHolder.firstElementChild.className = "chatMessageSlide";

        setTimeout(() => {
            chatHolder.removeChild(chatHolder.firstElementChild);
        }, 1200);
    };

    var elem = document.createElement("div");
    elem.className = "chatMessage";
    elem.id = "chatMessage";
    // bot message
    if(obj.hasOwnProperty("type")) {
        // sounds * DOESN'T WORK FOR test.html *
        if(obj.type == "joined") {
            let audio = new Howl({
                src: ["./sounds/connect.wav"],
                autoplay: true
            });
        };
        if(obj.type == "left") {
            let audio = new Howl({
                src: ["./sounds/disconnect.wav"],
                autoplay: true
            });
        };
        var myRoom = window.location.pathname;
        myRoom = myRoom.replace("/", "");
        elem.innerHTML = `${obj.msg} has ${obj.type} World ${myRoom}!`
        elem.style.color = "#505f78"
    }else{
        elem.innerHTML = `${obj.user}: ${obj.msg}`;
        let audio = new Howl({
            src: ["./sounds/message.wav"],
            autoplay: true
        });
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
    oncooldown = true;
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
        oncooldown = false;
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
        document.getElementById("emojiIMG").style.bottom = "8%"
        document.getElementById("gifIMG").style.bottom = "8%"
    };
    if(!$(msg).is(':focus')) {
        document.getElementById("emojiIMG").style.bottom = "3%"
        document.getElementById("gifIMG").style.bottom = "3%"
    };
    if($(msg).is(':hover') && !$(msg).is(":focus")) {
        document.getElementById("emojiIMG").style.bottom = "5%"
        document.getElementById("gifIMG").style.bottom = "5%"
    };

}, 100);

io = undefined;
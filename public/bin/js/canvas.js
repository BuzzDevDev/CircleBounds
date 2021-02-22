var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var myPlayer;
var rooms = [];
var speed = 2.5;
ctx.canvas.width  = window.innerWidth - 10;
ctx.canvas.height = window.innerHeight - 10;

// classes

class component {

    /**
     * 
     * @param {String} x X position
     * @param {String} y Y position
     * @param {String} r Radius
     * @param {String} color Color
     * @description Creates a circle based on values.
     */

    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;

        this.draw = () => {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle = "white";
            ctx.stroke();

            if(controller.up_pressed && myPlayer.y >= 0 + myPlayer.r) {
                myPlayer.y -= speed
            };
            if(controller.down_pressed && myPlayer.y <= ctx.canvas.height - myPlayer.r) {
                myPlayer.y += speed
            };
            if(controller.left_pressed && myPlayer.x >= 0 + myPlayer.r) {
                myPlayer.x -= speed
            };
            if(controller.right_pressed && myPlayer.x <= ctx.canvas.width - myPlayer.r) {
                myPlayer.x += speed
            };
        };
    };
};

class room {

    /**
     * 
     * @param {String} id The room name
     * @description Creates a visual representation of a chat room.
     */

    constructor(id) {

    };
};

function init() {
    myPlayer = new component(ctx.canvas.width / 2 - 25, ctx.canvas.height / 2 - 25, 10, "blue");

    // get rooms

    socket.emit("getRooms");

    socket.on("rooms", msg => {
        rooms = msg;
        console.log(rooms);
    });

    requestAnimationFrame(loop);
};

init();

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.canvas.width  = window.innerWidth - 10;
    ctx.canvas.height = window.innerHeight - 10;

    myPlayer.draw();

    requestAnimationFrame(loop);
};
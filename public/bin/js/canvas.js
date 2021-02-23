var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var myPlayer;
var rooms = [];
var visualRooms = [];
var myLoop = null;
var speed = 1.75;
ctx.canvas.width  = window.innerWidth - 10;
ctx.canvas.height = window.innerHeight - 10;

// classes and functions

var crashWith = (circle, rect) => {
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
};

class component {

    /**
     * 
     * @param {String} x X position
     * @param {String} y Y position
     * @param {String} r Radius
     * @param {String} shape Shape default is circle
     * @description Creates a circle based on values.
     */

    constructor(x, y, r, shape, w, h) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.w = w || 15;
        this.h  = h || 15;
        this.shape = shape || "Circle";
        this.color = "#" + Math.floor(Math.random()*16777215).toString(16);

        this.draw = () => {
            if(this.shape == "Circle") {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.strokeStyle = "white";
                ctx.stroke();
            }else{
                // creates rect
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.w, this.h);
            };
            

            if(controller.up_pressed && myPlayer.y >= 0 + myPlayer.r) {
                myPlayer.y -= speed;
            };
            if(controller.down_pressed && myPlayer.y <= ctx.canvas.height - myPlayer.r) {
                myPlayer.y += speed;
            };
            if(controller.left_pressed && myPlayer.x >= 0 + myPlayer.r) {
                myPlayer.x -= speed;
            };
            if(controller.right_pressed && myPlayer.x <= ctx.canvas.width - myPlayer.r) {
                myPlayer.x += speed;
            };
        };

    };
};



function init() {
    myPlayer = new component(ctx.canvas.width / 2 - 25, ctx.canvas.height / 2 - 25, 10);

    // get rooms

    socket.emit("getRooms");

    socket.on("rooms", msg => {
        rooms = msg;
        console.log(rooms);

        // make rooms

        for (let i = 0; i < rooms.length; i++) {
            var result = rooms[i].id.split("-");

            var x = result[0];
            var y = result[1];
            visualRooms.push(new component(x, y, 0, rooms[i].id, 175, 145));
            console.log("pushed visual room");
            
        };
    });
    
    


    myLoop = requestAnimationFrame(loop);
};

init();

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.canvas.width  = window.innerWidth - 10;
    ctx.canvas.height = window.innerHeight - 10;
    
    myPlayer.draw();

    visualRooms.forEach(room => {
        room.draw();
    });
    
    visualRooms.forEach(room => {
        if(crashWith(myPlayer, room)) {
            location.href += room.shape;
            cancelAnimationFrame(myLoop);
            return;
        };
    });
    myLoop = requestAnimationFrame(loop);
};
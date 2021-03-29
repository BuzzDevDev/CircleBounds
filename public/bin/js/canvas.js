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

var positions = [];
var motionTrailLength = 35;


function storeLastPosition(xPos, yPos) {
    positions.push({
      x: xPos,
      y: yPos
    });
   
    
    if(positions.length > motionTrailLength) {
      positions.shift();
    };
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

    constructor(x, y, r, shape, w, h, count) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.w = w || 15;
        this.h  = h || 15;
        this.shape = shape || "Circle";
        this.count = count || null;
        this.color = "#" + Math.floor(Math.random()*16777215).toString(16);
        if(!isHexColor(this.color)) {
            this.color = "#" + Math.floor(Math.random()*16777215).toString(16);
        };

        this.draw = () => {
            // draw trail
            for (var i = 0; i < positions.length; i++) {
                var ratio = (i + 1) / positions.length;
                ctx.beginPath();
                ctx.arc(positions[i].x, positions[i].y, 7, 0, 2 * Math.PI, true);
                ctx.fillStyle = `rgba(${hexToRgb(this.color).r}, ${hexToRgb(this.color).g}, ${hexToRgb(this.color).b}, ${ratio / 2})`;
                ctx.fill();
            }

            if(this.shape == "Circle") {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.lineWidth = 6;
                ctx.strokeStyle = shadeColor(this.color, -60);
                ctx.stroke();
                storeLastPosition(this.x, this.y);
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
            var users = rooms[i].sockets.length;

            var x = result[0];
            var y = result[1];
            var width;
            var height;
            switch(users) {
                case 1:
                    width = 175;
                    height = 145;
                break;
                case 2:
                    width = 200;
                    height = 160;
                break;
                case 3:
                    width = 215;
                    height = 175;
                break;
                case 4:
                    width = 230;
                    height = 200;
                break;
                case 5:
                    width = 245;
                    height = 215;
                break;
                case 6:
                    width = 260;
                    height = 230;
                break;
                case 7:
                    width = 275;
                    height = 245;
                break;
                case 8:
                    width = 300;
                    height = 230;
                break;
                case 9:
                    width = 315;
                    height = 245;
                break;
                
                default:
                    width = 330;
                    height = 260;
                break;
            };
            visualRooms.push(new component(x, y, 0, rooms[i].id, width, height, users.toString()));
            console.log("pushed visual room");
            
        };
    });
    
    


    myLoop = requestAnimationFrame(loop);
};


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
            cancelAnimationFrame(myLoop);
            location.href += room.shape;
            return;
        };
    });
    myLoop = requestAnimationFrame(loop);
};

io = undefined;
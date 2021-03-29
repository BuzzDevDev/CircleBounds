function up() {
    myPlayer.y -= speed;
};

function down() {
    myPlayer.y += speed;
};

function left() {
    myPlayer.x -= speed;
};

function right() {
    myPlayer.x += speed;
};

document.getElementById("up").addEventListener("touchstart", (e) => {
    controller.up_pressed = true;
});

document.getElementById("up").addEventListener("touchend", (e) => {
    controller.up_pressed = false;
});

document.getElementById("down").addEventListener("touchstart", (e) => {
    controller.down_pressed = true;
});

document.getElementById("down").addEventListener("touchend", (e) => {
    controller.down_pressed = false;
});

document.getElementById("left").addEventListener("touchstart", (e) => {
    controller.left_pressed = true;
});

document.getElementById("left").addEventListener("touchend", (e) => {
    controller.left_pressed = false;
});

document.getElementById("right").addEventListener("touchstart", (e) => {
    controller.right_pressed = true;
});

document.getElementById("right").addEventListener("touchend", (e) => {
    controller.right_pressed = false;
});


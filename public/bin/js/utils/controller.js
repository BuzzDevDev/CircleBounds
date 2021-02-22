var controller = {
    up_pressed: false,
    down_pressed: false,
    left_pressed: false,
    right_pressed: false
};


document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 87 || 38:
            // up jump
            controller.up_pressed = true;
        break;

        case 83 || 40:
            // down
            controller.down_pressed = true;
        break;

        case 65 || 37:
            // left
            controller.left_pressed = true;
        break;

        case 68 || 39:
            // right
            controller.right_pressed = true;
        break;
        
    };
});


document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
        case 87 || 38:
            // up
            controller.up_pressed = false;
        break;

        case 83 || 40:
            // down
            controller.down_pressed = false;
        break;

        case 65 || 37:
            // left
            controller.left_pressed = false;
        break;

        case 68 || 39:
            // right
            controller.right_pressed = false;
        break;
        
    };
});
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



// detecting click events on rooms
/*

var elem = document.getElementById('myCanvas'),
    elemLeft = elem.offsetLeft + elem.clientLeft,
    elemTop = elem.offsetTop + elem.clientTop,
    context = elem.getContext('2d')

elem.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

    visualRooms.forEach((element) => {
        if (y > element.y && y < element.y + 100 && x > element.x && x < element.x + 100) {
            alert('clicked an element');
        };
    });

}, false);

*/
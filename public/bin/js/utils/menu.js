function showEmoji() {
    document.querySelector(".emojiMenu").classList.toggle("hidden")
};

function showGif() {
    document.querySelector(".gifMenu").classList.toggle("hidden")
};

function showGame() {
    document.querySelector(".gameMenu").classList.toggle("hidden")
};

function emojiSelect(e, emoji) {
    if (!e) var e = window.event;                // Get the window event
    e.cancelBubble = true;                       // IE Stop propagation
    if (e.stopPropagation) e.stopPropagation();  // Other Broswers
    if(oncooldown == false) {
        msg.value += emoji;
        console.log(`Emoji Selected: ${emoji}`);
    };
    
};

function gifSelect(e, gif) {
    if (!e) var e = window.event;                // Get the window event
    e.cancelBubble = true;                       // IE Stop propagation
    if (e.stopPropagation) e.stopPropagation();  // Other Broswers
    if(oncooldown == false) {
        msg.value += gif;
        console.log(`Gif Selected: ${gif}`);
    };
    
};

function gameSelect(e, game) {
    if (!e) var e = window.event;                // Get the window event
    e.cancelBubble = true;                       // IE Stop propagation
    if (e.stopPropagation) e.stopPropagation();  // Other Broswers
    if(oncooldown == false) {
        msg.value += game;
        console.log(`Gif Selected: ${game}`);
    };
};
function showEmoji() {
    document.querySelector(".emojiMenu").classList.toggle("hidden")
};

function showGif() {
    document.querySelector(".gifMenu").classList.toggle("hidden")
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
    // get gif img element
    var title = $(gif).attr("title");
    // add a whitespace at end of title
    title += "";

    if (!e) var e = window.event;                // Get the window event
    e.cancelBubble = true;                       // IE Stop propagation
    if (e.stopPropagation) e.stopPropagation();  // Other Broswers
    if(oncooldown == false) {
        msg.value += `:${title}:`;
    };
    
};
import { globals } from "../main.js";
function getIndex(char) {
    // Check if the character is a letter
    if (char >= 'a' && char <= 'z') {
        // Calculate index for 'a' to 'z' (1-based), which is 1 to 26
        return (char.charCodeAt(0) - 'a'.charCodeAt(0)) + 1;
    }
    // Check if the character is a digit
    else if (char >= '0' && char <= '9') {
        // Calculate index for '0' to '9' (0-based), which is 27 to 36
        return (char.charCodeAt(0) - '0'.charCodeAt(0)) + 27;
    }
    // Return null or an error if the character is neither
    else {
        return null; // or throw an error, depending on your needs
    }
}
export function drawText(text, x, y, size, color) {
    let ctx = globals.ctx;
    const font = new Image();
    if (color === 1) {
        font.src = "../Assets/WhiteFont.png";
    }
    for (let t = 0; t < text.length; t++) {
        let newText = text[t].toLowerCase();
        let char = newText;
        let charX = 0;
        if (getIndex(char) !== null) {
            charX = getIndex(char) // Calculate index for 'a' to 'z'
        }
        let charY = 0
        //Tint the color
        ctx.drawImage(font,((charX*5)-5)-0.1,((charY*5)),5,5,x+(t*size),y+3,size,size);
    }
}
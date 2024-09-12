import { globals } from "../main.js";
export class Text {
    constructor(text,x,y,size,typing_speed,AmFlickering) {
        this.speed = typing_speed;
        this.distance = -0.1;
        this.text = text
        this.x = x
        this.y = y
        this.size = size
        this.AmFlickering = AmFlickering

        this.flicking = 0;
    }
    startTyping() {
        this.distance += this.speed/100
    }
    draw() {
        let ctx = globals.ctx;
        const font = new Image();
        font.src = "./WhiteFont.png";
            for (let t = 0; t < this.text.length; t++) {
                if(t > this.distance) {
                    break;
                }
                let newText = this.text[t].toLowerCase();
                let char = newText;
                let charX = 0;
                if (getIndex(char) !== null) {
                    charX = getIndex(char) // Calculate index for 'a' to 'z'
                }
                let charY = 0
                if (this.AmFlickering) {
                    this.flicking += 0.1
                    if (this.flicking > 10) {
                        ctx.drawImage(font,((charX*5)-5)-0.1,((charY*5)),5,5,this.x+(t*this.size),this.y+3,this.size,this.size)
                        setTimeout(()=>{
                            this.flicking = 0;
                        },1000)
                    } 
                } else {
                    ctx.drawImage(font,((charX*5)-5)-0.1,((charY*5)),5,5,this.x+(t*this.size),this.y+3,this.size,this.size);
                }
        }
    }

}
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
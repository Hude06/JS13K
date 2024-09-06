import { globals } from "../main.js";
import { drawText } from "./font.js";

export function alert_box(m) {
    let ctx = globals.ctx;
    ctx.fillStyle = "gray";
    let mLength = m.length;
    let w = mLength * 20; // Width of the alert box
    let h = 30; // Height of the alert box
    
    // Calculate position for centering the alert box
    let x = (globals.canvas.clientWidth - w) / 5;
    let y = (globals.canvas.clientHeight - h) / 5;
    
    // Draw the alert box
    ctx.fillRect(x, y, w, h);
    
    // Draw the text centered within the alert box
    drawText(m, x, y, 20);
}

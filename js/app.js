let count = 2;
let frequency = 150;
let height = 80;
let width = 200;

// let width = 450;
// let height = 106;

let table = new Array(width * height).fill("-"); // Ascii memory
let frame = ""; // Rendered ascii

// random vals
let rotation = 0;
let rotation_rate = 3 * (Math.PI / 180);
let radius = -50;

function run_animation() {
    // Rotating animation
    clear_table();
    let x = Math.round(radius * Math.cos(rotation));
    let y = Math.round(radius * Math.sin(rotation));
    rotation = (rotation - rotation_rate) % (2 * Math.PI);
    draw_line_bresenham(height/2, width/2, x + height/2, y + width/2);

    // render_table();
    render_table_mxn(3, 2);
    document.getElementById("frame").innerText = frame;
    // console.log(`HEYO [${table[index_table(46, 51)]}]`)
}

const interval = setInterval(function() {
    run_animation();
}, frequency);

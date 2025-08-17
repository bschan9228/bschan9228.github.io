let count = 2;
let frequency = 100;
let height = 80;
let width = 100;

let table = new Array(width * height).fill("-"); // Ascii memory
let frame = ""; // Rendered ascii

function run_animation() {
    clear_table();
    animate_proc();

    render_table_mxn(4, 2);
    document.getElementById("frame").innerText = frame;
}

const interval = setInterval(function() {
    run_animation();
}, frequency);

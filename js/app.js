let frequency = 200;
// let height = 80;
// let width = 100;
let height = 200;
let width = 300;

let table = new Array(width * height).fill("-"); // Ascii memory
let frame = ""; // Rendered ascii

function run_animation() {
    clear_table();
    // animate_proc();
    // update_chain();
    update_fish();

    render_table_mxn(4, 2);
    // render_table();
    document.getElementById("frame").innerText = frame;
}

// useful for debugging: clearInterval(interval)
// run_animation();
const interval = setInterval(function() {
    run_animation();
}, frequency);

function run(n) {
    if (n == undefined) n = 0;
    for (var i = 0; i < n; i++) {
        run_animation();
    }
}
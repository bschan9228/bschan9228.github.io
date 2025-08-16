let count = 2;
let frequency = 25;
// let width = 250;
// let height = 60;
let width = 150;
let height = 35;
let rotation = 0;
let radius = -7;

// https://stackoverflow.com/questions/51185/are-javascript-strings-immutable-do-i-need-a-string-builder-in-javascript
// string concat faster than array?
let grid = ("-".repeat(width) + "\n").repeat(height);

function run_animation() {
        clear_grid();
        // Rotating animation
        let x = Math.round(radius * Math.cos(rotation));
        let y = Math.round(radius * Math.sin(rotation));
        rotation = (rotation - Math.PI / 180) % (2 * Math.PI);
        draw_line_bresenham(15, 75, x + 15, y + 75);

        document.getElementById("anim").innerText = grid;
}

const interval = setInterval(function() {
  run_animation();
}, frequency);

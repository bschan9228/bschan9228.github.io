function clear_grid() {
    grid = ("-".repeat(width) + "\n").repeat(height);
}
function index_grid(x, y) {
    // x row, y column
    return y + (x * width) + x;
}

function set_char(x, y, char) {
    index = index_grid(x, y);
    if (index > grid.length - 1 || index < 0 || grid.charAt(index) == "\n") return;
    grid = grid.substring(0, index) + char + grid.substring(index + 1);
}

function draw_pixel_char(x, y, char) {
    set_char(x, y, char);
}

function draw_pixel(x, y) {
    draw_pixel_char(x, y, "*");
}

// https://en.wikipedia.org/wiki/Line_drawing_algorithm
// Drawing algos are kinda cool
function draw_line_h(x0, y0, x1, y1) {
    if (x0 > x1) {
        [x0, x1] = [x1, x0];
        [y0, y1] = [y1, y0];
    }
    let dy = y1 - y0;
    let dx = x1 - x0;

    let dir = (dy < 0) ? -1 : 1;
    dy *= dir;

    if (dx !== 0) {
        y = y0;
        p = 2 * dy - dx;
        for (i = 0; i < dx + 1; i++) {
            draw_pixel(x0 + i, y);
            if (p >= 0) {
                y += dir;
                p = p - 2 * dx;
            }
            p = p + 2 * dy;
        }
    }
}

function draw_line_v(x0, y0, x1, y1) {
    if (y0 > y1) {
        [x0, x1] = [x1, x0];
        [y0, y1] = [y1, y0];
    }
    let dy = y1 - y0;
    let dx = x1 - x0;

    let dir = (dx < 0) ? -1 : 1;
    dx *= dir;

    if (dy !== 0) {
        x = x0;
        p = 2 * dx - dy;
        for (i = 0; i < dy + 1; i++) {
            draw_pixel(x, y0 + i);
            if (p >= 0) {
                x += dir;
                p = p - 2 * dy;
            }
            p = p + 2 * dx;
        }
    }
}

function draw_line_bresenham(x0, y0, x1, y1) {
    if (Math.abs(x1 - x0) > Math.abs(y1 - y0)) {
       draw_line_h(x0, y0, x1, y1);
    }
    else {
        draw_line_v(x0, y0, x1, y1);
    }
}
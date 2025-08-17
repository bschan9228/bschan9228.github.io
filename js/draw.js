function clear_table() {
    table = new Array(width * height).fill("-");
}

function index_table(x, y) {
    // x row, y column
    return y + (x * width) + 1;
    
}

function set_char(x, y, char) {
    if (y >= width || y < 0) return;
    index = index_table(x, y);
    if (index in table) {
        table[index] = char;
    }
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
        for (var i = 0; i < dx + 1; i++) {
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
        for (var i = 0; i < dy + 1; i++) {
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
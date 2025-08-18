// (-1, 0) => north, (1, 0) => south
// (0, -1) => west, (0, 1) => east
const direction = ["north", "east", "south", "west"]

function coordinates(x, y) {
    this.x = x;
    this.y = y;
    this.wrap = 1;

    // javascript modulo doesn't work with negatives
    this.shift_west = function() {
        this.y = this.wrap ? (this.y - 1 + width) % width : this.y - 1;
    }
    this.shift_east = function() {
        this.y = this.wrap ? (this.y + 1 + width) % width : this.y + 1;
    }
    this.shift_north = function() {
        this.x = this.wrap ? (this.x - 1 + height) % height : this.x - 1;
    }
    this.shift_south = function() {
        this.x = this.wrap ? (this.x + 1 + height) % height : this.x + 1;
    }
    // normalize
    this.normalize = function(s) {
        // let s = 1;
        let norm_x = this.scale(this.x, s);
        let norm_y = this.scale(this.y, s);
        return new coordinates(norm_x, norm_y);
    }
    // scale
    this.scale = function(n, s) {
        if (n > 0) return s;
        else if (n == 0) return 0;
        else return -s;
    }
}

// arithmetic operations
function coordinates_add(coord0, coord1) {
    let dx = coord1.x + coord0.x;
    let dy = coord1.y + coord0.y;
    return new coordinates(dx, dy);
}

function coordinates_sub(coord0, coord1) {
    let dx = coord1.x - coord0.x;
    let dy = coord1.y - coord0.y;
    return new coordinates(dx, dy);
}

function coordinates_dist(coord0, coord1) {
    sq_diff_x = (coord1.x - coord0.x) * (coord1.x - coord0.x);
    sq_diff_y = (coord1.y - coord0.y) * (coord1.y - coord0.y);
    return Math.sqrt(sq_diff_x + sq_diff_y);
}
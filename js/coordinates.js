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

    // normalize will return send 
    this.normalize = function(distance) {
    // var magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    let mag = Math.sqrt(this.x * this.x + this.y * this.y);
    var norm_x = this.x / mag;
    var norm_y = this.y / mag;
    // normal round does not converge
    // return new coordinates(Math.round(norm_x * distance), Math.round(norm_y * distance));
    // inverted round actually gives a good approximation b/c it will converge like a control loop
    return new coordinates(inverted_round(norm_x * distance), inverted_round(norm_y * distance));
    }
}

// arithmetic operations
function coordinates_add(coord0, coord1) {
    var dx = coord1.x + coord0.x;
    var dy = coord1.y + coord0.y;
    return new coordinates(dx, dy);
}

function coordinates_sub(coord0, coord1) {
    // let dx = coord1.x - coord0.x;
    // let dy = coord1.y - coord0.y;
    var dx = coord0.x - coord1.x;
    var dy = coord0.y - coord1.y;
    return new coordinates(dx, dy);
}

function coordinates_dist(coord0, coord1) {
    var sq_diff_x = (coord1.x - coord0.x) * (coord1.x - coord0.x);
    var sq_diff_y = (coord1.y - coord0.y) * (coord1.y - coord0.y);
    return Math.sqrt(sq_diff_x + sq_diff_y);
}

function coordinates_angle(coord0, coord1) {
    var coord_diff = coordinates_sub(coord0, coord1);

    return (Math.atan(coord_diff.x, coord_diff.y));
}

function inverted_round(n) {
    decimal = n % 1;
    if (decimal >= 0.5) return Math.floor(n);
    return Math.ceil(n);
}
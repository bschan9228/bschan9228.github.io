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
    // returns the highest absolute value number between the two.
    this.max = function() {
        var abs_x = Math.abs(this.x);
        var abs_y = Math.abs(this.y);
        if (abs_x > abs_y) return abs_x;
        return abs_y;
    }
    this.min = function() {
        if (this.x > this.y) return this.y;
        return this.x;
    }

    // normalize will return send 
    this.normalize = function(distance) {
    // var magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    let mag = Math.sqrt(this.x * this.x + this.y * this.y);
    var norm_x = this.x / mag;
    var norm_y = this.y / mag;
    
    return new coordinates(Math.ceil(norm_x * distance), Math.ceil(norm_y * distance));
    // return new coordinates(inverted_round(norm_x * distance), inverted_round(norm_y * distance));
    }

    // Function will return a coordinate transformed/rotated 90 degree away 
    // from this -> anchor vector
    this.left = function(anchor) {
        var offset = coordinates_sub(this, anchor);
        var new_x = this.x + Math.round(offset.y);
        var new_y = this.y - Math.round(offset.x); 
        return new coordinates(new_x, new_y);
    }

    // same thing for right side
    this.right = function(anchor) { 
        var offset = coordinates_sub(this, anchor);
        var new_x = this.x - Math.round(offset.y);
        var new_y = this.y + Math.round(offset.x); 
        return new coordinates(new_x, new_y);
    }

    // only translates rotation, not dist
    // coordinate semantics ain't it for this one
    this.rotate = function(anchor, radians) {
        var offset = coordinates_sub(anchor, this);
        var dist = Math.sqrt(offset.x * offset.x + offset.y * offset.y);
        var anchor_angle = Math.atan2(offset.x, -offset.y);
        var x_rotated = Math.round(dist * Math.cos(anchor_angle - radians));
        var y_rotated = Math.round(dist * Math.sin(anchor_angle - radians));
        return new coordinates(this.x + x_rotated, this.y + y_rotated);
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

function coordinates_angle(coord0, coord1) {
    var coord_diff = coordinates_sub(coord0, coord1);

    return (Math.atan(coord_diff.x, coord_diff.y));
}

function inverted_round(n) {
    decimal = n % 1;
    if (decimal > 0.5) return Math.floor(n);
    return Math.ceil(n);
}

// pretty cool, there is several kinds of geometries
// there's actually theory on distance / metric space
// Chebyshev, Euclidean, Manhattan 
// turns out i needed chebyshev distance
function coordinates_cheb(coord0, coord1) {
    var coord_diff = coordinates_sub(coord0, coord1);
    return coord_diff.max();
}
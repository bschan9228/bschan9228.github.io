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

    // pretty cool, there is several kinds of geometries
    // there's actually theory on distance / metric space
    // Chebyshev, Euclidean, Manhattan 
    // turns out i needed chebyshev distance
    // this.cheb()

    this.norm = function(anchor, distance) {
        // var diff_x = (anchor.x - this.x);
        // var diff_y = (anchor.y - this.y);

        // var x_norm = this.x >= 0 ? 1 : -1;
        // var y_norm = this.y >= 0 ? 1 : -1;

        // console.log(`${this.y}, ${anchor.y}`)
        // console.log(`anchor: ${anchor.x}, ${anchor.y} | point: ${this.x}, ${this.y} | diff: ${diff_x}, ${diff_y}`)
        // if (Math.abs(diff_x) > Math.abs(diff_y)) return (new coordinates(this.x + x_norm, this.y));
        // return (new coordinates(this.x, this.y - y_norm));
        // return new coordinates(x_norm, y_norm);

        // if (diff_x > diff_y) return new coordinates(x_norm, 0);
        // return new coordinates(0, y_norm);

        let mag = Math.sqrt(this.x * this.x + this.y * this.y);
        var norm_x = this.x / mag;
        var norm_y = this.y / mag;

        angle = coordinates_angle(anchor, this);
        // if (norm_x )
    }

    // normalize will return send 
    this.normalize = function(distance) {
    // var magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    let mag = Math.sqrt(this.x * this.x + this.y * this.y);
    var norm_x = this.x / mag;
    var norm_y = this.y / mag;
    
    // --------------


    // --------------

    // if ((Math.abs(norm_x) == 1) || (Math.abs(norm_y) == 1)) {
    //     // console.log("here")
    //     // console.log(`${norm_x}, ${norm_y}`)
    //     // kinda doesnt works & scuffed
    //     return new coordinates(Math.ceil(norm_x * distance) - 1, Math.ceil(norm_y * distance) - 1);
    // }

    // for (int i = 0; i < 10; i++) {
    // console.log(norm_x, norm_y);
    //     draw_pixel(Math.round(norm_x), Math.round(norm_y));
    // }
    // this rounding is not a good idea because diagonals will always round down...
    // if (norm_x == norm_y)
        // return new coordinates(Math.ceil(norm_x * distance), Math.ceil(norm_y * distance));

    // normal round does not converge
    // return new coordinates(Math.floor(norm_x * distance), Math.floor(norm_y * distance));
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
    // Using Pythagorean's will not work well & cause rounding 
    // issues because the graph only handles integers

    // var sq_diff_x = (coord1.x - coord0.x) * (coord1.x - coord0.x);
    // var sq_diff_y = (coord1.y - coord0.y) * (coord1.y - coord0.y);
    // return Math.sqrt(sq_diff_x + sq_diff_y);
    
    // The alternative is using a nxn square around the anchor
    // diff = coordinates_sub(coord0, coord1);
    // var diff_x = Math.abs(coord1.x - coord0.x);
    // var diff_y = Math.abs(coord1.y - coord0.y);
    // // console.log(`dist: ${diff_x}, ${diff_y}`)
    // return (diff_x + diff_y);

    // Need to do a range. Diagonal distance should count as 1.


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

function coordinates_cheb(coord0, coord1) {
    var coord_diff = coordinates_sub(coord0, coord1);
    return coord_diff.max();
}
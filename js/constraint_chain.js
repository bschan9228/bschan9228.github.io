function chain() {
    this.segments = [
        new coordinates(6, 0),
        new coordinates(5, 0),
        new coordinates(4, 0),
        new coordinates(3, 0),
        new coordinates(2, 0),
        new coordinates(1, 0)
    ],

    // @point: segment that will follow the anchor
    // @anchor: leading segment
    // @distance: distance to keep between point and anchor
    this.constrain = function(point, anchor, distance) {
        if (Math.abs(coordinates_dist(point, anchor)) > distance)
            return (coordinates_sub((coordinates_sub(point, anchor)).normalize(distance), anchor));
        return point;
    }

    // constrain segment[i] to segment[i - 1] for i > 0
    // TODO: chaining does not work well with wrapping 
    this.chain = function() {
        distance = 5;
        for (var i = 1; i < this.segments.length; i++) {
            this.segments[i] = this.constrain(
                this.segments[i], this.segments[i - 1], distance
            );
        }
    },
    this.head = function() {
        return this.segments[0];
    },
    this.tail = function() {
        return this.segments[this.segments.length - 1];
    },

    // movement
    this.move_north = function() {
        this.head().shift_north();
    },
    this.move_south = function() {
        this.head().shift_south();
    },

    // write current chain onto the table
    this.write = function() {
        for (var i = 0; i < this.segments.length; i++) {
            draw_pixel(this.segments[i]);
        }
    }
}

c = new chain();
function set_chain() {
    c.move_south();
    c.chain();

    // straight line for ref
    // draw_line_bresenham(0, 1, 20, 1);
    c.write();
}
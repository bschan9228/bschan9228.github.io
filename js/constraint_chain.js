function chain() {
    // this.segments = [
    //     new coordinates(6, 0),
    //     new coordinates(5, 0),
    //     new coordinates(4, 0),
    //     new coordinates(3, 0),
    //     new coordinates(2, 0),
    //     new coordinates(1, 0)
    // ],
    this.segments = [
        new coordinates(0, 6),
        new coordinates(0, 5),
        new coordinates(0, 4),
        new coordinates(0, 3),
        new coordinates(0, 2),
        new coordinates(0, 1)
        // new coordinates(0, 30),
        // new coordinates(0, 35)
    ],

    // Constrain is a little confusing to implement. 
    // 
    // @point: segment that will follow the anchor
    // @anchor: leading segment
    // @distance: distance to keep between point and anchor
    this.constrain = function(point, anchor, distance) {
        if (Math.abs(coordinates_dist(point, anchor)) > distance)
            return (coordinates_add((coordinates_sub(point, anchor)).normalize(distance), anchor));
            // return 
        return point;
    }

    // constrain segment[i] to segment[i - 1] for i > 0
    // TODO: chaining does not work well with wrapping 
    this.chain = function(distance) {
        // constrain distance
        for (var i = 1; i < this.segments.length; i++) {
            // might be interesting to also constrain/move tail based on head movement later on
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
    this.move_east = function() {
        this.head().shift_east();
    },
    this.move_south = function() {
        this.head().shift_south();
    },
    this.move_west = function() {
        this.head().shift_west();
    },

    // draw line between segments
    this.connect = function() {
        for (var i = 1; i < this.segments.length; i++) {
            draw_line_bresenham(this.segments[i], this.segments[i - 1]);
        }
    },

    // write current chain onto the table
    this.write = function() {
        for (var i = 0; i < this.segments.length; i++) {
            draw_pixel(this.segments[i]);
        }
    }
}

c = new chain();
let chain_counter = 0;
function set_chain() {
    // c.move_east();
    // c.move_south();
    c.chain(10);
    console.log(coordinates_angle(c.segments[0], c.segments[1]));

    if (chain_counter < 15) {
        // c.segments[0].y += 1;
        // c.segments[0].x += 1;
        c.move_east();
        if (chain_counter % 2) c.move_south();
    }
    else if (chain_counter < 50) {
        // c.segments[0].y -= 1;
        // c.segments[0].x += 1;
        c.move_east();
        // c.move_south();
    }
    else if (chain_counter < 75) {
        // c.move_east();
        // c.move_south();
        c.move_south();
    }
    else c.move_west();


    // straight line for ref
    // draw_line_bresenham(0, 1, 20, 1);
    c.connect();
    c.write();

    chain_counter += 1;
    chain_counter = chain_counter % 90;
}
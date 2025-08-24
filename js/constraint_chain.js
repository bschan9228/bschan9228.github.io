function chain(length) {
    this.segments = [];

    for (var i = 0; i < length; i++) {
        this.segments.push(new coordinates(15, length - 1));
    }

    // @point: segment that will follow the anchor
    // @anchor: leading segment
    // @distance: distance to keep between point and anchor
    this.constrain = function(point, anchor, distance) {
        if (coordinates_cheb(point, anchor) > distance){
            // return coordinates_add(point.norm(anchor, distance), point);
            // return (coordinates_add((coordinates_sub(point, anchor)).norm(anchor), anchor));
            return (coordinates_add((coordinates_sub(point, anchor)).normalize(distance), anchor));
        }
        return point;
    },

    // constrain segment[i] to segment[i - 1] for i > 0
    // TODO: chaining does not work well with wrapping 
    this.chain = function(distance) {
        // constrain distance
        for (var i = 1; i < this.segments.length; i++) {
            // might be interesting to also constrain/move tail based on head movement later on
            // console.log(`constraining seg ${i} to ${i+1}`)
            this.segments[i] = this.constrain(
                this.segments[i], this.segments[i - 1], distance
            );
        }
    },

    // returns array [[left coordinates], [right coordinates]] of the body 
    // `distance` away, starting from head to tail
    this.body = function(dist) {
        // var arr
        var left_arr = [this.segments[0]];
        var right_arr = [this.segments[0]];
        var dist = 5;
        for (var i = 1; i < this.segments.length; i++) {
            l = this.segments[i].left(this.segments[i - 1]);
            constrained_l = this.constrain(l, this.segments[i], dist);
            // draw_pixel(constrained_l);
            left_arr.push(constrained_l);

            r = this.segments[i].right(this.segments[i - 1]);
            constrained_r = this.constrain(r, this.segments[i], dist);
            // draw_pixel(constrained_r);
            right_arr.push(constrained_r);
        }
        return [left_arr, right_arr];
    }

    // get head and tail
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

    // draw line between array of coordinates
    this.connect = function(coordinates) {
        for (var i = 1; i < coordinates.length; i++) {
            draw_line_bresenham(coordinates[i], coordinates[i - 1]);
        }
    },

    // write array of coordinates onto table
    this.write = function(coordinates) {
        for (var i = 0; i < coordinates.length; i++) {
            draw_pixel(coordinates[i]);
        }
    }
}

// c = new chain(5);
let chain_counter = 0;
function update_chain() {
    // c.move_east();
    // c.move_south();
    // console.log(coordinates_angle(c.segments[0], c.segments[1]));


    // for(var i = 0; i < Math.random() % 10; i++) {
    //     c.move_east();
    // }
    // for(var i = 0; i < Math.random() % 10; i++) {
    //     c.move_south();
    // }
    
    if (chain_counter < 35) 
        // c.segments[0].y += 1;
        // c.segments[0].x += 1;
        c.move_east();
    else c.move_south();

    c.chain(15);
    // c.connect();

    // c.write(c.body()[0]);
    c.connect(c.body()[0]);
    c.connect(c.body()[1]);
    // c.write(c.segments);

    chain_counter += 1;
    chain_counter = chain_counter % 100;
    console.log(`interval ${chain_counter}`)
}
// Procedural animation

let rotation = 0;
let rotation_rate = 1 * (Math.PI / 180);
let radius = -50;
function rotate_sample() {
    let x = Math.round(radius * Math.cos(rotation));
    let y = Math.round(radius * Math.sin(rotation));
    rotation = (rotation - rotation_rate) % (2 * Math.PI);
    draw_line_bresenham(height/2, width/2, x + height/2, y + width/2);
}

function coordinates(x, y) {
    this.x = x;
    this.y = y;
    this.wrap = 1;

    // javascript modulo doesn't work with negatives
    this.shift_left = function () {
        this.y = this.wrap ? (this.y - 1 + width) % width : this.y - 1;
    }
    this.shift_right = function () {
        this.y = this.wrap ? (this.y + 1 + width) % width : this.y + 1;
    }
    this.shift_up = function () {
        this.x = this.wrap ? (this.x - 1 + height) % height : this.x - 1;
    }
    this.shift_down = function () {
        this.x = this.wrap ? (this.x + 1 + height) % height : this.x + 1;
    }
}

const snake = {
    // segments: [
    //     new coordinates(36, 0), 
    //     new coordinates(37, 0), 
    //     new coordinates(38, 0), 
    //     new coordinates(39, 0), 
    //     new coordinates(40, 0)
    // ],
    segments: [
        new coordinates(40, width/2 - 2), 
        new coordinates(40, width/2 - 1), 
        new coordinates(40, width/2 + 0), 
        new coordinates(40, width/2 + 1), 
        new coordinates(40, width/2 + 2)
    ],
    head: function() {
        return this.segments[0];
    },
    tail: function() {
        return this.segments[this.segments.length - 1];
    },
    // @prev is the old head
    follow: function(prev) {
        snake.segments.pop();
        snake.segments.splice(1, 0, prev);
        // snake.segments[1] = prev;
        // for (var i = 1; i < snake.length; i++) {
        //     snake.segments[i] = prev;
        // }
    },
    write: function () {
        for (var i = 0; i < this.segments.length; i++) {
            draw_pixel(this.segments[i]);
        }
    }
}

let dir = 0;
let counter = 0;
function animate_proc() {
    // rotate_sample();
    // draw_line_bresenham(coordinates, coordinates2);
    // for (var i = 0; i < snake.segments.length; i++) {
    //     draw_pixel(snake.segments[i]);
    //     // snake.segments[i].shift_left();
    //     // snake.segments[i].shift_left();
    // }

    const prev = {...snake.head()};
    if (dir) {
        snake.head().shift_up();
    }
    else {
        snake.head().shift_right();
    }
    
    snake.follow(prev);
    snake.write();

    counter += 1;
    if (counter == 5) {
        dir = (dir + 1) % 2;
        counter = 0;
    }
}
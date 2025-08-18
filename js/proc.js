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

// slither
const snake = {
    segments: [
        new coordinates(width/4 + 2, width/2), 
        new coordinates(width/4 + 1, width/2), 
        new coordinates(width/4 + 0, width/2), 
        new coordinates(width/4 - 1, width/2), 
        new coordinates(width/4 - 2, width/2)
    ],
    head: function() {
        return this.segments[0];
    },
    tail: function() {
        return this.segments[this.segments.length - 1];
    },
    // @prev is the old head
    follow: function(prev) {
        this.segments.pop();
        this.segments.splice(1, 0, prev);
    },
    // absolute movement
    move_north: function() {
        const prev = {...snake.head()};
        this.head().shift_north();
        this.follow(prev);
    },
    move_south: function() {
        const prev = {...snake.head()};
        this.head().shift_south();
        this.follow(prev);
    },
    move_west: function() {
        const prev = {...snake.head()};
        this.head().shift_west();
        this.follow(prev);
    },
    move_east: function() {
        const prev = {...snake.head()};
        this.head().shift_east();
        this.follow(prev);
    },
    // relative movement
    dir: 2,

    move_straight: function() {
        this["move_" + direction[this.dir]]();
        this.dir = (this.dir);
    },
    move_right: function() {
        this["move_" + direction[this.dir]]();
        this.dir = (this.dir + 1) % 4;
    },
    move_left: function() {
        this["move_" + direction[this.dir]]();
        this.dir = (this.dir + 3) % 4;
    },

    write: function () {
        for (var i = 0; i < this.segments.length; i++) {
            draw_pixel(this.segments[i]);
        }
    }
}

// let dir = 0;
let counter = 0;
function animate_proc() {

    snake.move_straight();
    snake.write();

    counter += 1;
    if (counter == 10) {
        counter = 0;
        snake.move_right();
    }
}
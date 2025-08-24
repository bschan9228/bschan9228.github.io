class fish extends chain {
    constructor(length) {
        super(length);
    }

    // returns array [[left coordinates], [right coordinates]] of the body 
    // `distance` away, starting from head to tail
    body = function(dist_arr) {
        // var arr
        var left_arr = [this.segments[0]];
        var right_arr = [this.segments[0]];
        var dist = 5;
        for (var i = 1; i < this.segments.length; i++) {
            // var l = this.segments[i].left(this.segments[i - 1]);
            var l = this.segments[i].rotate(this.segments[i - 1], Math.PI / 4);
            var constrained_l = this.constrain(l, this.segments[i], dist_arr[i]);
            // draw_pixel(l);
            left_arr.push(l);

            var r = this.segments[i].right(this.segments[i - 1]);
            var constrained_r = this.constrain(r, this.segments[i], dist_arr[i]);
            // draw_pixel(constrained_r);
            // right_arr.push(r);
        }
        return [left_arr, right_arr];
    }
}


var f = new fish(6);
var body_constraint = [5, 4, 3, 2, 2, 1, 3, 4, 7, 5];
// var body_constraint = [10, 10, 10, 10, 10, 10, 10]
counter = 0;
function update_fish() {
    if (counter < 30) f.move_east();
    else if (counter < 60) f.move_south();
    else f.move_east();

    f.chain(10);
    var body_arr = f.body(body_constraint);
    f.write(body_arr[0]);
    // f.connect(body_arr[1]);

    f.write(f.segments);

    // f.write([new coordinates(0, 1)]);

    counter += 1;
}
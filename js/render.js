// Function will convert nxn table to the final frame ascii
function render_table() {
    let str = table.join("");
    for (var i = 0; i < height; i += 1) {
        let index = i * width; 
        str = str.substring(0, index) + "\n" + str.substring (index + 1);
    }
    frame = str;
}

// Braille converter
// https://en.wikipedia.org/wiki/Braille_Patterns
// Format is top down, left right
let unicode_base = 0x2800; // 3x2 all bits low
// let unicode_high_3x2 = 0x283F; // 3x2 all bits high
// let unicode_high_4x2 = 0x28FF; // 4x2 all bits high
let braille_lut_4x2 = [0x1, 0x2, 0x4, 0x40, 0x8, 0x10, 0x20, 0x80];

function convert_to_braille(pixels) {
    let unicode = unicode_base;
    let set = 0;
    for (var i = 0; i < pixels.length; i++) {
        if (pixels[i] == "*") {
            // unicode += (1 << i); // 3x2
            unicode += braille_lut_4x2[i];
            set = 1;
        }
    }
    // console.log(`read pixels ${pixels}; ${unicode}`)
    if (!set) return String.fromCharCode(unicode_base);
    return String.fromCharCode(unicode);
}

// get mxn pixels from top to bottom, left to right b/c braille
// r & c: amount of rows and columns
// x_offset & y_offset: x and y offset from origin 0, 0
function get_pixels_mxn(r, c, x_offset, y_offset) {
    let subarr = "";
    for (var j = 0; j < c; j++) {
        for (var i = 0; i < r; i++) {
            subarr += table[index_table(i + y_offset, j + x_offset)];
        }
    }
    return subarr;
}

// r = amount of rows in unicode
// c = amount of cols in unicode
function render_table_mxn(r, c) {
    let str = "";
    for (var i = 0; i < (height - r); i += r) {
        for (var j = 0; j < (width - c); j += c) {
            pixels = get_pixels_mxn(r, c, j, i);
            braille = convert_to_braille(pixels);
            str += braille;
        }
        str += "\n";
    }
    frame = str;
}
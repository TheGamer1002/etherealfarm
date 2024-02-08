/*
Ethereal Farm
Copyright (C) 2020-2024  Lode Vandevenne

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

var use_blossom_spring = true;
var leaves_spring_header;
var leaves_summer_header;

if(use_blossom_spring) {
  leaves_spring_header = 'q:#d8a g:#dac G:#ecd Q:#fde'; // blossom leaves version
  leaves_summer_header = 'q:#151 g:#292 G:#4c4 Q:#5f4';
} else {
  leaves_spring_header = 'q:#484 g:#6a6 G:#8f8 Q:#afa'; // spring green leaves version
  leaves_summer_header = 'q:#040 g:#080 G:#0b0 Q:#0f0'; // pretty dark green version to distinguish from spring
}

var leaves_autumn_header = 'q:#f30 g:#f70 G:#fa0 Q:#fe0';
var leaves_winter_header = 'q:#77f g:#99f G:#bbf Q:#eef';
var leaves_ethereal_header = 'q:#bb8 g:#dda G:#ffa Q:#ffe';
var leaves_infernal_header = 'q:#b00 g:#d00 G:#f00 Q:#f55';
var leaves_infinity_header = 'q:#666 g:#888 G:#aaa Q:#fff';

var stem_metal_header0 = 'ho:#999'; // zinc
var stem_metal_header1 = 'ho:#f80'; // bronze
var stem_metal_header2 = 'ho:#fff'; // silver
var stem_metal_header3 = 'ho:#bf6'; // electrum
var stem_metal_header4 = 'ho:#ff0'; // gold
var stem_metal_header5 = 'X:#eee O:#ddd o:#ccc x:#bbb'; // platinum
var stem_metal_header6 = 'X:#fee O:#ecc o:#dbb x:#caa'; // rhodium
var stem_metal_header7 = 'ho:#a5f'; // amethyst
var stem_metal_header8 = 'ho:#00f'; // sapphire
var stem_metal_header9 = 'ho:#0c0'; // emerald
var stem_metal_header10 = 'ho:#c00'; // ruby
var stem_metal_header11 = 'X:#fff O:#eee o:#ddd x:#ccc'; // diamond


// the images have season dependent palette, for colors qgGQ. Use them as green, but they'll become season dependent. Only those 4 colors.
function createTreeImages(name, top, bottom, opt_stem_header, opt_no_lights) {
  var s = (opt_stem_header ? (' ' + opt_stem_header) : '') + '\n';
  var a0 = generateImageCanvas(leaves_spring_header + s + top.trim());
  var a1 = generateImageCanvas(leaves_summer_header + s + top.trim());
  var a2 = generateImageCanvas(leaves_autumn_header + s + top.trim());
  var a3 = generateImageCanvas(leaves_winter_header + s + top.trim());
  var use_lights = false;
  var a4 = generateImageCanvas(leaves_ethereal_header + s + top.trim());
  // holiday code commented out
  /*if(!opt_no_lights) {
    a4 = generateImageCanvas(leaves_ethereal_header + s + top.trim());
  } else {
    a4 = createCanvasImageFor(blendImages(generateImage(leaves_ethereal_header + s + top.trim()), generateImage(image_tree_lights)));
  }*/
  var a5 = generateImageCanvas(leaves_infernal_header + s + top.trim());
  var a6 = generateImageCanvas(leaves_infinity_header + s + top.trim());
  var b0 = generateImageCanvas(leaves_spring_header + s + bottom.trim());
  var b1 = generateImageCanvas(leaves_summer_header + s + bottom.trim());
  var b2 = generateImageCanvas(leaves_autumn_header + s + bottom.trim());
  var b3 = generateImageCanvas(leaves_winter_header + s + bottom.trim());
  var b4 = generateImageCanvas(leaves_ethereal_header + s + bottom.trim());
  var b5 = generateImageCanvas(leaves_infernal_header + s + bottom.trim());
  var b6 = generateImageCanvas(leaves_infinity_header + s + bottom.trim());
  return [name, [a0, a1, a2, a3, a4, a5, a6], [b0, b1, b2, b3, b4, b5, b6]];
}

var image_tree_lights = `
................
................
................
................
....P+..........
....++..........
...3...-E.......
.K*..3.EE.......
.**...3......A/.
......3...K*.//.
....A/.3..**.3..
....//..33..3-E.
......P+..33.EE.
......++........
................
................
`;


var image_metal_tree_top = `
................
.....Q...QQG....
....QGG..QGGg...
....QGgq.GGggq..
..Q..gq..Xgqq...
.QGG.OOoXOoqo...
.GGgg.XOoQg..o..
QGgqg.Oo.gq.o...
.GGgq.Oo.oo.QG..
.XqqqOoo.Oo.GGg.
.XO..OoQGOoGggq.
.QOo.QoGqOoQGggq
QGGoQGGGgOo.qqx.
QgqoGGggqOogox..
.gXOQGgqooQgg...
...XOqqOooggq...
`;

var image_metal_tree_stem = `
....XXOOoox.....
..... XOox......
......XOox......
......XOox......
......XOox......
......XOox......
......XOox......
......XOox......
.....XXOoxx.....
....XXOOoxxx....
................
................
................
................
................
................
`;


// includes name for each stage
// the function treeLevelIndex in data.js determines which image gets used for which level
var tree_images = [
// tree level 0
createTreeImages('weathered tree', /*`
................
................
................
................
................
................
............x...
....x.o..x..x...
....x.ox.x0x....
.o...x.x..x..0..
.o..o.x..x0.0...
..o.o.x.x.0.0...
...o..x.x.00....
....o.x.x00.....
....oooxx0......
.....ooxx0......
`,`
.....ooxx0......
.....o0xx0......
.....0o0x0......
.....o0xx0......
.....ooxx0......
....oooxx0......
....oooxx00.....
...ooxooxx00....
..ooxxxooxx00...
................
................
................
................
................
................
................
`*/

`
................
................
................
................
................
................
..........o...0.
O..o..O.o..o.0..
.Oo....o.0..o0..
.Oo...xo..0.0...
..Oo..x...0.0...
...Ooo.x..00....
...Oo...x.0.....
...Ooo..o00.....
....Oox.o0......
....Oooxx0......
`,`
....Oooxx0......
....Oo0xxx0.....
....O0o0x0......
....Oo0xx0......
....Oooxx0......
....Oooxx0......
....Oooxx0......
...Ooooxx0......
...Ooooxx00.....
..Oooxooxx00....
.Oooxxxooxx00...
................
................
................
................
................
`
, undefined, true),
// tree level 1
createTreeImages('young sprout', `
................
................
................
................
................
................
................
................
................
....Q...Qg......
...Qg...gq.Qg...
....q...o..Qq...
.....o.oo..xx...
......oo..xx....
......ooxx......
.......ox.......
`,`
.......ox.......
.......ox.......
.......ox.......
.......xo.......
.......ox.......
.......ox.......
.......oo.......
.......ox.......
......ooxx......
................
................
................
................
................
................
................
`, undefined, true),
// tree level 2
createTreeImages('young sprout', `
................
................
................
................
................
................
................
................
....Q...Qg......
...Qgg..Qq.Qg...
...Qqg..gq.Qgq..
....q...o..Qq...
.....o.oo..xx...
......oo..xx....
......ooxx......
.......ox.......
`,`
.......ox.......
.......ox.......
.......ox.......
.......xo.......
.......ox.......
.......ox.......
.......oo.......
.......ox.......
......ooxx......
................
................
................
................
................
................
................
`),
// tree level 3
createTreeImages('young sprout', `
................
................
................
................
................
................
................
................
...QQ..QGg......
..QGgq.QGq.QQg..
..QGgq..qq.Qgq..
....q...o..Qqq..
.....o.oo..xx...
......oo..xx....
......ooxx......
.......ox.......
`,`
.......ox.......
.......ox.......
.......ox.......
.......xo.......
.......ox.......
.......ox.......
.......oo.......
.......ox.......
......ooxx......
................
................
................
................
................
................
................
`),//tussen deze 2 kan nog een nieuwe
// tree level 4
createTreeImages('young sprout', `
................
................
................
................
................
................
........Qg......
...QQ..QGg..Qg..
..QQgq.QGq.QGgq.
..QGgq.QGq.QGgq.
..QGgq..qq.Qgq..
....q...o..Qqq..
.....o.oo..xx...
......oo..xx....
......ooxx......
.......ox.......
`,`
.......ox.......
.......ox.......
.......ox.......
.......xo.......
.......ox.......
.......ox.......
.......oo.......
.......ox.......
......ooxx......
................
................
................
................
................
................
................
`),
// tree level 5
createTreeImages('young tree', `
................
................
................
................
................
...QG...........
..QGg..QGg..QG..
..Ggg..QGg..QG..
...go.QGgg.QGGg.
..QGg.QGgq.GGgq.
..Ggq..gq..Ggq..
....o..o...Gqq..
....o..o...xx...
.....ooo..xx....
......ooxx......
......oox.......
`,`
.......ox.......
.......ox.......
.......ox.......
.......xo.......
.......ox.......
.......ox.......
.......oo.......
.......ox.......
......ooxx......
................
................
................
................
................
................
................
`),
// tree level 6
createTreeImages('young tree', `
................
................
................
................
................
...QG....G..Q...
..QGgg.QGg..QG..
..Gggg.QGg.QQGg.
...go.QGgg.QGGg.
..QGg.QGgq.GGgq.
..Ggq..gq..Ggqq.
....o..o...Gqq..
....o..o...xx...
.....ooo..xx....
......ooxx......
......oox.......
`,`
......oox.......
......oox.......
......oox.......
......oxo.......
......oox.......
......oox.......
......ooo.......
......ooo.......
......oox.......
.....oooxx......
................
................
................
................
................
................
`),
// tree level 7
createTreeImages('young tree', `
................
................
................
................
...QG...G.......
..QGGg.QGg..QG..
.QGGgg.QGGgQGGG.
..GgGg.GGggQGGG.
..Qgg.QGgg.QGqG.
..QGgqQGgqQGggq.
..Ggq..gq.QGgq..
....o..o...Gqq..
....o..o...xx...
.....ooo..xx....
......ooxx......
......oox.......
`,`
......oox.......
......oox.......
......oox.......
......oxo.......
......oox.......
......oox.......
......ooo.......
......ooo.......
......oox.......
.....oooxx......
................
................
................
................
................
................
`),
// tree level 8
createTreeImages('young tree', `
................
................
................
...QGg..........
..QGGGg.QG......
..GGGggQggG.GG..
..QGGgQQGGgQGGg.
.QGGgqQgGgqQGGg.
..QGgqQGgqqQGgq.
..Ggq..gqqGGgq..
...oo..oo..Gqq..
....oo.oo..xx...
.....oooo.xx....
......ooxxx.....
......ooxx......
......oox.......
`,`
......oox.......
......oox.......
......oox.......
......oxo.......
......oox.......
......oox.......
......ooo.......
......ooo.......
......oox.......
.....oooxx......
................
................
................
................
................
................
`),
// tree level 9
createTreeImages('young tree', `
................
................
................
...QGG...GGG....
..QGGGg.QgGGG...
..GgGggQGGgQGG..
.QGGGgQGgGgQGGg.
.QGGgqQGGgqQGGq.
..QGgqQGgqqQGgq.
..Ggq..gqqGGgq..
...oo..oo.GGqq..
....oo.oo..xx...
.....oooo.xx....
......ooxxx.....
......ooxx......
......oox.......
`,`
......oox.......
......oox.......
......oox.......
......oxo.......
......oox.......
......oox.......
......ooo.......
......ooo.......
......oox.......
.....oooxx......
................
................
................
................
................
................
`),
// tree level 10
createTreeImages('adult tree', `
................
................
....QGQQQGQ.....
...GGQgGQQGG....
..QGQGgQGGGGG...
.QGQGgQGQGgQGq..
.QGGQgQQGGQGGqq.
.GQGgQGgGgqQgGq.
.QGQggQQgqqGqgq.
..GQqqQgqqQGgq..
...QgGgogGgqqq..
....qo.oo.Ggx...
.....oooo.xx....
.....oooxxx.....
......ooxx......
......ooxx......
`,`
......ooxx......
......ooxx......
......ooox......
......ooox......
......ooox......
......ooxx......
......ooxx......
......ooox......
.....ooooxx.....
....oooooxxx....
................
................
................
................
................
................
`),
// tree level 15
createTreeImages('adult tree', `
................
........Q.......
....QGQQGQQQ....
...QGQGGGGGgq...
..QGQQGQQgqgqq..
..QGgQQgGqgqqq..
.GQQGgGGgGqqGQG.
.GQGGqQGggqQGGq.
.QQGgqQqGqqGGqg.
.QGQgqqGqqQgqgq.
..Ggqq.gqQGqgq..
..ooo..oxqQgqq..
...ooo.ox..xxx..
....oooox.xxx...
.....oooxxxx....
......ooxxx.....
`,`
......ooxx......
......ooxx......
......ooox......
......ooox......
......ooox......
......ooxx......
......ooxx......
......ooox......
.....ooooxx.....
....oooooxxx....
................
................
................
................
................
................
`),
// tree level 20
createTreeImages('adult tree', `
................
........G.......
..QGQQQggQgQ....
.QGQGgQGgGGgggq.
QQQgQQGGQggggqg.
GgQGQgQgGqQqGQG.
QGGQgGGGgGqQGGgq
QQgGGqgGggQGgGqq
GGQGGgggGqqGGggq
QggQggqGqqQGgqqq
.GQQggqgqQGgqgqq
.Qggq..oxqQGgqq.
.Qqqqo.ox..xxq..
....oooox.xxx...
.....oooxxxx....
......ooxxx.....
`,`
......ooxx......
......ooxx......
......ooox......
......ooox......
......ooox......
......ooxx......
......ooxx......
......ooox......
.....ooooxx.....
....oooooxxx....
................
................
................
................
................
................
`),
// tree level 25
createTreeImages('adult tree', `
................
...GQ...G...Qg..
..QQQQQggQgQggq.
.QGgGQGGgGGgggq.
QGQgQGGGQgggqqg.
GQQGggQgGqQqQQG.
QGGggQGGgGqQGGqq
QQgQGqgGggQGgqgq
QGQGQgggGqqQGgqq
QQgGggqGqqQGqqgq
.GGgggqgqQGqGgqq
.Qggq..oxqQGqqq.
.Qqqqo.ox..xxq..
....oooQg.xxx...
.....oogqxxx....
......ooxxx.....
`,`
......ooxxx.....
......ooxxx.....
......ooxxx.....
......xooxx.....
......oxoxx.....
......xooxx.....
......ooxxx.....
.....oooxxx.....
....ooxooxxx....
...ooxxxoxxxx...
................
................
................
................
................
................
`),
// tree level 30
createTreeImages('large tree', `
................
......QQQGG.....
...QQQgGgQgQ.g..
.QGQGQGGgGGQQgq.
QQQGQGGGQggggqg.
GgQGggQgGqQqQQq.
QGGggQGGgGqQGggq
GQgQGqgGggQGgGqq
QGQGQgggGqqGGggq
QQgGggqGqqQGqgqq
.GGgggqgqQGgGqqq
.Qggq.ox.qQGqqq.
.Qqqq.ox.ox.xq..
..oox.oQgqx.xx..
...ooxQGgqxxx...
....oooqqxxx....
`,`
.....oooxxx.....
.....oooxxx.....
.....oooxxx.....
.....oxooxx.....
.....xoxoxx.....
.....oxooxx.....
.....oooxxx.....
....ooooxxx.....
...oooxooxxx....
..oooxxxoxxxx...
................
................
................
................
................
................
`),
// tree level 35
createTreeImages('large tree', `
................
...QG.QQQGG.Q...
.QGGQQgGgQgGGgq.
.QQQGgGGgGGgGgq.
QQgQQGGGQggqgqg.
GgQGggQgGqQqQQG.
QQGggQGGgGqQGGqq
QGgGGqgGggQGgGgq
GQGGQgggGqQGGgqq
QggGggqGqqQGqqgq
.QGgggqgqQGGGgqq
.Qggq.ox.qQqqqq.
.Qqqq.ox.ox.xqG.
.Qoox.oQgqx.xGg.
.GGooxQGgqxxxggq
....oooqqxxx..q.
`,`
.....oooxxx.....
.....oooxxx.....
.....oooxxx.....
.....oxooxx.....
.....xoxoxx.....
.....oxooxx.....
.....oooxxx.....
....ooooxxx.....
...oooxooxxx....
..oooxxxoxxxx...
................
................
................
................
................
................
`),
// tree level 40
createTreeImages('grand tree', `
................
..QQQ..QQGGQQ...
.QgQgQgGgQgQGG..
.GqgQgGGgGGQGGq.
QGQqqGGGQggggqq.
GqQGggQgGqQqQQG.
QQGggQGGgGqQGGqq
QGgGGqgGggQGgGgq
QQQGGQggGqqGGgqq
QggGggqGqqQGgqqq
.GGgggqgqQGGqgqq
..ggq.ox.qQGgqq.
..Qqq.ox.ox.QQ..
.QGgx.oQgqxQQGq.
..GgqxQGgqxxGGq.
...qqooqqxxxgq..
`,`
..Q..oooxxx.....
.QGg.oooxxx.....
.Ggqooooxxx.....
..q.ooxooxx.....
.....xoxoxx.....
.....oxooxx.....
.....oooxxx.....
....ooooxxx.....
...oooxooxxx....
..oooxxxoxxxx...
................
................
................
................
................
................
`),
// tree level 45
createTreeImages('grand tree', `
................
..QgQ.QQQGGQQ...
.QgQQqgGgQgQGG..
.QQgqgGGgGGQGGq.
.QgQqGGGQggggqq.
GqqGggQgGqQqQQG.
QQGggQGGgGqQGGgq
QQQGGqgGggQGgGgq
QGGGQgggGqqGGgqq
QQgGggqGqqQGgqgq
.GGgggqgqQGGGqqq
.Qggq.ox.qQqqqq.
.QQqq.ox.ox.QGQ.
.QGgx.oQgqxGQGG.
..GgqxQGgqxxGGq.
..qqqooqqxxxg...
`,`
.Q...oooxxx.....
QGg..oooxxx.....
Ggqoooooxxx.....
.q..ooxooxx.....
.....xoxoxx.....
.....oxooxx.....
.....oooxxx.....
....ooooxxx.....
...oooxooxxx....
..oooxxxoxxxx...
................
................
................
................
................
................
`),
// tree level 50
createTreeImages('curly tree', `
................
..QgQ.QQQGGQQ...
.QgQgqgGgQgQGG..
.QQgQQGGgGGQGGq.
.QgQqGGGQggggqq.
GqQGggQgGqQqQQG.
QQGggQGGgGqQGGqq
QGQGGqgGggQGgGgq
QQGGQgggGqqGGqqq
QggGggqGqqQGgqgq
.QGgggqgqQGGqgqq
.Qggq.ox.qQGqqq.
.QQqq.ox.ox.QQQ.
.QGgx.oQgqxQGgG.
..GgqxQGgqxxgqq.
..qqqooqqxxxq...
`,`
.Q...xoooxxx....
QGg...xoooxx....
Ggqooxoooxx.....
.q..ooooxx......
.....xoooxx.....
......xoooxx....
.....xoooxxx....
....ooooxxx.....
...oooxooxxx....
..oooxxxoxxxx...
................
................
................
................
................
................
`),
// tree level 60
createTreeImages('curly tree', `
................
..QgQ.QQQGGQQ...
.QgQgqgGgQgQGG..
.QQQQgGGgGGQGGq.
.GgGqGGGQggggqq.
GqQGggQgGqQqQQG.
QQGQgQGGgGqQGGqq
QQgGGqgGggQGgGqq
QGGGQgggGqqGGggq
QQgGggqGqqQGgqqq
.GGgggqgqQGGqgqq
.Qggq.ox.qQGqqq.
.QQqq.ox.ox.QQG.
.QGgx.oQgqxQgGg.
..GgqxQGgqxxGgq.
..qqqooqqxxxq...
`,`
.Q...xoooxxx....
QGg...xoooxx..Q.
Ggqooxoooxx..Qgq
.q..ooooxx...gq.
.....xoooxx.xx..
......xoooxxx...
.....xoooxxx....
....ooooxxx.....
...oooxooxxx....
..oooxxxoxxxx...
................
................
................
................
................
................
`),
// tree level 70
createTreeImages('hollow tree', `
................
..QgQ.QQQGGQQ...
.QgQQqgGgQgQGG..
.QQgqgGGgGGQGGq.
.GgGqGGGQggggqq.
GQQGggQgGqQqQQG.
QGGggQGGgGqQGGgq
QQgGGqgGggQGgGqq
QQGGQgggGqqGGggq
QggGggqGqqQGgqqq
.GGgggqgqQGGGgqq
.Qggq.ox.qQGqqq.
.QQqq.ox.ox.QQQ.
.QGgx.oQgqxQGGg.
..GgqxQGgqxxGgq.
..qqqooqqxxxq...
`,`
.Q...oooxxxx....
QGg.oooxxxxxx...
Ggqooox..oxxx...
.q..ox....oxx...
...oox....oxx...
...ooxx..oxx....
....ooxooxx.....
....ooooxxx.....
...oooxooxxx....
..oooxxxoxxxx...
................
................
................
................
................
................
`),
// tree level 80
createTreeImages('hollow tree', `
................
..QQg.QQQGGQQ...
.QgGQqgGgQgQGG..
.QqQqgGGgGGQGGq.
.GgGqGGGQggggqq.
GqQGggQgGqQqQQG.
QQGggQGGgGqQGGgq
QGgGGqgGggQGgGqq
QQGGQgggGqqGGgqq
QggGggqGqqQGgqgq
.GGgggqgqQGGGgqq
.Qggq.ox.qQqqqq.
.QQqq.ox.ox.QQQ.
.QGgx.oQgqxQQGq.
..GgqxQGgqxxGqg.
..qqqooqqxxxg...
`,`
.Q...oooxxxx....
QGg..ooxxxox.Q..
.Gg.oooxx.oxQGg.
..ooooxx..ox.xg.
...oooxx.oxxx...
....ooxxxox.....
....oooxxxx.....
....oooooxx.....
...oooxooxxx....
..oooxxxoxxxx...
................
................
................
................
................
................
`),
// tree level 90
createTreeImages('massive tree', `
................
..QQg.QQQGGQQ...
.QgGQqgGgQgQGG..
.QQgqgGGgGGQGGq.
.GQQqGGGQggggqq.
GqQGggQgGqQqQQG.
QQGggQGGgGqQGGgq
QGgGGqgGggQGgGqq
QGGGQgggGqqGGggq
QggGggqGqqQGgqgq
.GGgggqgqQGGGqqq
.Qggq.ox.qQqgqq.
.QQqq.ox.ox.QQQ.
.QGgx.oQgqxQQGq.
..GgqxQGgqxxGqg.
..qqqooqqxxxq...
`,`
....Oooooxxx....
.....Ooooxxx....
.....Oooxxxx....
.....Ooooxxx....
....Ooooxoxx....
....OOoxxoxx0...
....Oooooxx00...
...Oooooxxxx0...
..Ooooxooxx000..
.Ooooxxxoxxx000.
................
................
................
................
................
................
`),
// metal trees
createTreeImages('zinc tree', image_metal_tree_top, image_metal_tree_stem, stem_metal_header0),
createTreeImages('bronze tree', image_metal_tree_top, image_metal_tree_stem, stem_metal_header1),
createTreeImages('silver tree', image_metal_tree_top, image_metal_tree_stem, stem_metal_header2),
createTreeImages('electrum tree', image_metal_tree_top, image_metal_tree_stem, stem_metal_header3),
createTreeImages('gold tree', image_metal_tree_top, image_metal_tree_stem, stem_metal_header4),
createTreeImages('platinum tree', image_metal_tree_top, image_metal_tree_stem, stem_metal_header5),
createTreeImages('rhodium tree', image_metal_tree_top, image_metal_tree_stem, stem_metal_header6),
createTreeImages('amethyst tree', image_metal_tree_top, image_metal_tree_stem, stem_metal_header7),
createTreeImages('sapphire tree', image_metal_tree_top, image_metal_tree_stem, stem_metal_header8),
createTreeImages('emerald tree', image_metal_tree_top, image_metal_tree_stem, stem_metal_header9),
createTreeImages('ruby tree', image_metal_tree_top, image_metal_tree_stem, stem_metal_header10),
createTreeImages('diamond tree', image_metal_tree_top, image_metal_tree_stem, stem_metal_header11),
createTreeImages('magnificent tree', `
................
......QQQGG.....
...GQQgGgQgQ.g..
.QQgGgGGgGGQQgq.
QGgQQGGGQggggqg.
QQQGggQgGqQqQQG.
QQGggQGGgGqQGGqq
QGgGGqgGggQGgGgq
QQGGQgggGqqGGqqq
QggGggqGqqQGgggq
.GGgggqgqQGGqqqq
.Qggq.ox.qQqgqq.
.Qqqq.ox.ox.xq..
..oox.oQgqx.xx..
...ooxQGgqxxx...
....oooqqxxx....
`,`
.Q...oooxxx.....
QGg..oooxxx.....
Ggqoooooxxx.....
.q..ooxooxx.....
.....xoxoxx.....
.....oxooxx.....
.....oooxxx.....
....ooooxxx.....
...oooxooxxx....
..oooxxxoxxxx...
................
................
................
................
................
................
`),
];



var image_pond = generateImageCanvas(`
........000.....
.......0aaa00...
..00000aAaAaa...
.0aaaaaAaAaaaa..
0aaaaaaaaaaaaA..
0aAaAaaaaaaaAa..
0AaAaaaAaAaaaa..
0aaaaaAaAaAaa...
.aaaaaaAaAaaa0..
.aaaaaaaaaaaaA..
0aaAaAaaaaaaAa0.
0aAaAaaaAaAaaaa.
.aaaaaaAaAaaaa..
.....aaaa.......
.....0aa........
................
`);

var image_pond_on_field = createCanvasImageFor(blendImages(field_infinity[0][4], image_pond[4]));

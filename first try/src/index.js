
MAP_WIDTH = 30;
MAP_HEIGHT = 10;
MAP_TILE_FLOOR = "#";


function GenerateMap (width, height) {
    let map = [];
    for (let y = 0; y < height; y++) {
        map.push([]);
        for (let x = 0; x < width; x++) {
            map[y].push([]);
            map[y][x] = MAP_TILE_FLOOR;
        }
    }
    return map;
}

function DrawMap (map) {
    let canvas ="";
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            canvas = canvas + `${map[x][y]}`;
        }
        canvas = canvas + `<br>`;
    }
    return canvas;
}

var canvas = document.getElementById("canvas");
var map = GenerateMap(MAP_WIDTH, MAP_HEIGHT);
canvas.innerHTML = DrawMap(map);

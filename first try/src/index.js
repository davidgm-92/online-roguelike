canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
tileSize = 64;
mapSize = 8;
canvas.width = mapSize*tileSize;
canvas.height = mapSize*tileSize;

function Tile(type, sprite, x, y, passable) {
    this.type = type;
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.passable = passable;
    this.draw = function () {
        drawSprite(this.sprite, this.x, this.y);
    }
}

function Char(type, sprite, x, y) {
    this.type = type;
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.draw = function () {
        drawSprite(this.sprite, this.x, this.y);
    }
}

function drawSprite(sprite, x, y) {
    ctx.drawImage(
        spritesheet,
        sprite*16,
        0,
        16,
        16,
        x*tileSize,
        y*tileSize,
        tileSize,
        tileSize
    );
}

function createMap() {
    let map = [];
    for (let x=0; x<mapSize; x++) {
        map.push([]);
        for (let y=0; y<mapSize; y++) {
            if (Math.random() > 0.3) {
                map[x][y] = new Tile("floor", 2, x, y, true);
            }else{
                map[x][y] = new Tile("wall", 3, x, y, false);
            }
        }
    }
    return map;
}

function drawAll(map, charList) {
    for (let x=0; x<mapSize; x++) {
        for (let y=0; y<mapSize; y++) {
                map[x][y].draw();
            }
        }
    for (let char=0; char<charList.length; char++) {
        charList[char].draw();
    }
}

spritesheet = new Image();
spritesheet.src = "spritesheet.png";

ctx.clearRect(0,0,canvas.width,canvas.height);
let map = createMap();

let player = new Char("player", 0, 0, 0);
let charList = [];
charList.push(player);

document.querySelector("html").onkeypress = function(e){
    if (e.key=="w") player.y--;
    if (e.key=="s") player.y++;
    if (e.key=="a") player.x--;
    if (e.key=="d") player.x++;
};

setInterval(drawAll, 10, map, charList);
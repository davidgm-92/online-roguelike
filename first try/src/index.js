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

function Char(type, sprite) {
    this.type = type;
    this.sprite = sprite;
    this.x = undefined;
    this.y = undefined;
    this.draw = function () {
        drawSprite(this.sprite, this.x, this.y);
    }
    this.spawn = function() {
        let spawnValid = false;
        let conflict = false;
        do {
            let spawnX = Math.floor(Math.random()*(mapSize));
            let spawnY = Math.floor(Math.random()*(mapSize));
            if (map[spawnX][spawnY].passable == true) {
                for (i in charList) {
                    if (charList[i].x == spawnX && charList[i].y == spawnY) conflict = true;
                }
                if (!conflict) {
                    this.x = spawnX;
                    this.y = spawnY;
                    spawnValid = true;
                }
            }
        } while (spawnValid == false);
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

function spawnAll(charList) {
    let player = new Char("player", 0);
    charList.push(player);
    numEnemies = Math.floor(1+Math.random()*5);
    for (i=0; i<numEnemies; i++) {
        let orc = new Char("orc", 4);
        charList.push(orc);
    }
    for (i in charList) {
        charList[i].spawn();
    }
}

spritesheet = new Image();
spritesheet.src = "spritesheet.png";

ctx.clearRect(0,0,canvas.width,canvas.height);
let map = createMap();
let charList = [];

spawnAll(charList);

document.querySelector("html").onkeypress = function(e){
    if (e.key=="w" && charList[0].y-1 >=0 && (map[charList[0].x][charList[0].y-1].passable)) charList[0].y--;
    if (e.key=="s" && charList[0].y+1 <=(mapSize-1) && (map[charList[0].x][charList[0].y+1].passable)) charList[0].y++;
    if (e.key=="a" && charList[0].x-1 >=0 && (map[charList[0].x-1][charList[0].y].passable)) charList[0].x--;
    if (e.key=="d" && charList[0].x+1 <=(mapSize-1) && (map[charList[0].x+1][charList[0].y].passable)) charList[0].x++;
};

setInterval(drawAll, 10, map, charList);
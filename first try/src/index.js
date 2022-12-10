canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.width = 600;
ctx.height = 300;
tileSize = 64;

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

spritesheet = new Image();
spritesheet.src = "spritesheet.png";

ctx.clearRect(0,0,canvas.width,canvas.height);
drawSprite(0,0,0);
ctx.fillRect(100,0,10,10);
let board;
let boardWidth =500;
let boardHeight =500;

// player
let playerWidth = 80;
let playerHeight =10;
let playerVelocityX = 10

let player = {
    x : boardWidth/2 - playerWidth/2,
    y: boardHeight - playerHeight - 5,
    width : playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX
}

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used for drawing on the board

    requestAnimationFrame(update); // draw the frame more smoothly
    document.addEventListener("keydown", movePlayer); // the keydown are on the keyboard (a,w,s,d)
}

function update(){
    requestAnimationFrame(update); // Đệ quy ?
    context.clearRect(0, 0, board.width, board.height);

    //player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height) 
}

function movePlayer(e){
    if(e.code == "ArrowLeft"){
        player.x -= player.velocityX;
    }
    else if (e.code == "ArrowRight"){
        player.x += player.velocityX;
    }
}


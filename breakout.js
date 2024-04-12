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

//ball
let ballWight = 10;
let ballHeight = 10;
let ballVelocityX = 3;
let ballVelocityY = 2 

let ball ={
    x : boardWidth/2,
    y: boardHeight/2,
    width : ballWight,
    height : ballHeight,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY
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

    //ball
    context.fillStyle ="white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height)

    //bounce ball off walls
    if(ball.y <= 0){
        // if ball touches top of canvas
        ball.velocityY *= -1; 
    }
    else if(ball.x <= 0 || (ball.x + ball.width) >= boardWidth ){
        ball.velocityX *= -1; 
    }
    else if (ball.y + ball.height >= boardHeight){
        // if ball touches
        // game over
    }

    //bounce the ball off player paddle
    if(topCollision(ball,player) || bottomCollision(ball, player)){
        ball.velocityY *= -1; // flip y direction up or down
    }
    else if (leftCollision(ball, player) || rightCollision(ball, player)){
        ball.velocityX *= -1; // flip x direction up or down
    }
}

function outOfBounds(xPosition){
    return(xPosition < 0 || xPosition + playerWidth > boardWidth);
}

function movePlayer(e){
    if(e.code == "ArrowLeft"){
        // player.x -= player.velocityX;
        let nextPlayerX = player.x - player.velocityX;
        if (!outOfBounds(nextPlayerX)){
            player.x =nextPlayerX
        }
    }
    else if (e.code == "ArrowRight"){
        // player.x += player.velocityX;
        let nextPlayerX = player.x + player.velocityX;
        if (!outOfBounds(nextPlayerX)){
            player.x = nextPlayerX
        }
    }
}

function delectCollision(a,b){
    return a.x < b.x + b.width && // a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x && //a's top right corner passes n's top left corner
           a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left 
           a.y + a.height > b.y;   //a's bottom left corner pass b's top left corner
}

function topCollision(ball, block){ // a is above b (ball is above block)
    return delectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block){ // a is below b (ball is bellow block)
    return delectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function leftCollision(ball, block){ // a is left of b (ball is left of block)
    return delectCollision(ball,block) && (ball.x +  ball.width) >= block.x;
}

function rightCollision(ball, block) { // a is right of b (ball is right of block)
    return delectCollision(ball,block) && (block.x + block.width) >= ball.x;
}

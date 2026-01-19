const obstacle=document.querySelector(".obstacle");
let obstaclex=-10;
function moveObstacle(){
    obstaclex+=5;
    obstacle.style.right=obstaclex + "px";

    if(obstaclex> window.innerWidth){
        obstaclex=-10;
    }
    requestAnimationFrame(moveObstacle);
}
moveObstacle();
//ball jumping
const ball=document.querySelector(".ball");
let isjumping=false;

document.addEventListener("keydown",e =>{
    if( e.code === "Space" && !isjumping){
        jump();
    }
});
function jump(){
    isjumping=true;
    let up=0;
    
    const jumpUp=setInterval(() =>{
        if(up>=100){
            clearInterval(jumpUp);
            const falldown = setInterval (() =>{
                if(up<=0){
                    clearInterval(falldown);
                    isjumping=false;
                }
                up-=5;
                ball.style.bottom = up + "px";
            },20);
        }
        up+=5;
        ball.style.bottom = up + "px";

    },20);
}
//collision checker
function checkCollision(){
    const ballRect = ball.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();

if (
    ballRect.right > obsRect.left &&
    ballRect.left < obsRect.right &&
    ballRect.bottom > obsRect.top
  ) {
    gameOver = true;
    obstacle.style.animation = "none";
    alert("Game Over");
  }
}
checkCollision();
//score system
let score =0;
const scoreEl = document.querySelector(".score");

setInterval(() =>{
    score++;
    scoreEl.textContent = "Score:" + score;
},100);

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
  // Reset state
  gameOver = false;
  score = 0;

  // Reset obstacle
  obstacle.style.animation = "obstacleMove 2s linear infinite";
  obstacle.style.left = "100%";

  // Reset ball
  ball.style.bottom = "0px";

  // Restart loop
  requestAnimationFrame(gameLoop);
});
function gameLoop() {
  if (gameOver) return;

  detectCollision();
  requestAnimationFrame(gameLoop);
}

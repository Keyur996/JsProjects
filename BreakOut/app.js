//get Elements
const showBtn = document.getElementById('show-rules');
const closeBtn = document.getElementById('close-rules');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const rowCount = 9;
const colCount = 5;
let score = 0;
// Draw Ball In Canvas
// 1. Ball Properties
const ball = {
   x: canvas.width / 2,
   y: canvas.height / 2,
   size: 10,
   speed: 4,
   dx: 4,
   dy: -4
}
// 2.drawBall function
function drawBall(){
   ctx.beginPath();
   ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
   ctx.fillStyle = '#0095dd'
   ctx.fill();
   ctx.closePath();
}
//Draw Paddle In Canvas 
// 1. Paddle Properties
const paddle = {
   x: canvas.width / 2 - 40,
   y: canvas.height - 20,
   w: 80, 
   h: 10,
   speed: 8,
   dx: 0
}
//2 .draw Paddle function
function drawPaddle() {
   ctx.beginPath();
   ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
   ctx.fillStyle = '#0095dd';
   ctx.fill();
   ctx.closePath();
}
//for Bricks
//1.Bricks Info
const brickInfo = {
   w: 70, 
   h: 20,
   offsetX: 45,
   offsetY: 60,
   padding: 10, 
   visible: true
}
// For multiple bricks
const bricks = [];
for (let i = 0; i < rowCount; i++){
   bricks[i] = [];
   for (let j = 0; j < colCount; j++){
      const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
      const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
      bricks[i][j] = { x, y, ...brickInfo}
   }
}
//for draw Bricks in canvas
function drawBricks() {
   bricks.forEach((column) => {
      column.forEach((brick) => {
         ctx.beginPath();
         ctx.rect(brick.x, brick.y, brick.w, brick.h);
         ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
         ctx.fill();
         ctx.closePath();
      });
   });
}
// Draw Score
//No need Properties in score
function drawScore() {
   ctx.font = '20px Arial';
   ctx.fillText(`Score : ${score}`, canvas.width - 100, 30);
}
//Main Draw function
function draw() {
   //clear canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   drawBall();
   drawPaddle();
   drawScore();
   drawBricks();
}
//move ball on canvas
function moveBall() {
   ball.x += ball.dx;
   ball.y += ball.dy;
   // wall detection (left and Right)
   if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
      ball.dx *= -1;
   } else if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
      ball.dy *= -1;
   }
   // Paddle collision
   if (
      ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.w + paddle.x && 
      ball.y + ball.size > paddle.y) {
      ball.dy = -ball.speed;
   }
   // Brick collision
   bricks.forEach((column) => {
      column.forEach((brick) => {
         if (brick.visible) {
            if (ball.x - ball.size > brick.x &&
               ball.x + ball.size < brick.x + brick.w &&
               ball.y + ball.size > brick.y &&
               ball.y - ball.size < brick.y + brick.h
            ) {
               ball.dy *= -1;
               brick.visible = false;
               //Increase Ball
               IncreaseScore();
            }
         }
      })
   })
   // //show All Bricks when Lose
   if (ball.y + ball.size > canvas.height) {
      showAllBricks();
      score = 0;
   }
}
function IncreaseScore() {
   score++;
   if (score % (rowCount * colCount) === 0) {
      showAllBricks();
   }
}
// Show All Bricks 
function showAllBricks() {
   bricks.forEach((column) => {
      column.forEach((brick) => brick.visible = true);
   });
}
//Move Paddle function
function movePaddle() {
   paddle.x += paddle.dx;
   
   if (paddle.x + paddle.w > canvas.width) {
      paddle.x = canvas.width - paddle.w;
   } else if (paddle.x < 0) {
      paddle.x = 0; 
   }
}

function update() {
   movePaddle();
   moveBall();
   // Draw canvas
   draw();

   requestAnimationFrame(update);
}

update();
//Key Down function
function keyDown(e) {
   if (e.key === 'Right' || e.key === 'ArrowRight') {
      paddle.dx = paddle.speed;
   }
   if (e.key === 'Left' || e.key === 'ArrowLeft') {
      paddle.dx = -paddle.speed;
   }
}
// Key Up function
function keyUp(e) {
   if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
      paddle.dx = 0;
   }
}
//KeyBoard Events
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
//Event Handlers
showBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));

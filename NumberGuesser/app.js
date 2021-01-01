//Variables
let min = 1,
   max = 10,
   guessesLeft = 3,
   answer = getRandomNum(min, max);
// UI Elements
const game = document.querySelector('#game');
   minNum = document.querySelector('.min-num'),
   maxNum = document.querySelector('.max-num'),
   guessInput = document.querySelector('#guess-input'),
   guessBtn = document.querySelector('#guess-btn'),
   message = document.querySelector('.message');
// Assign Min And Max Value
minNum.textContent = min;
maxNum.textContent = max;
// Play Again Event
game.addEventListener('mousedown', function (e) {
   if (e.target.classList.contains('play-again')) {
      window.location.reload();
   }
});
//Add Event on Click
guessBtn.addEventListener('click', function () {
   //validate
   let guess = parseInt(guessInput.value);
   if (isNaN(guess) || guess < min || guess > max) {
      //set Message
      setMessage(`Please Enter Number Between ${min} and ${max}`, 'red');
   }else if (guess === answer) {
      gameOver(true,`${answer} is correct, YOU WIN!`);
   } else {
      //minus Trial
      guessesLeft -= 1;
      //set Message
      if (guessesLeft === 0) {
         gameOver(false,`Game Over, Better Luck Next Time!. Correct Answer is ${answer}`);
      } else {
         setMessage(`Your guess ${guess} is incorrect. You have ${guessesLeft} trial left.!`, 'red');
         //Remove Value
         guessInput.value = '';
      }
   }
});
// set Message function
function setMessage(msg, color) {
   //set Input border red
   guessInput.style.borderColor = color;
   //Set message
   message.textContent = msg;
   //set Text color
   message.style.color = color;
}
//GameOver Fun
function gameOver(win, msg) {
   let color;
   win === true ? color = 'green' : color = 'red';
   //set guessInput
   guessInput.disabled = true;
   setMessage(msg, color);
   // change submit to Play Again
   guessBtn.value = 'Play Again';
   // Add Class Name
   guessBtn.className += 'play-again';
}
//get Random Answer 
function getRandomNum(min, max) {
   const randomNum = Math.floor((Math.random() * (max - min + 1) + min));
   //for Cheating
   // console.log(randomNum);
   return randomNum;
}
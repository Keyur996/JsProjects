// Elements
const form = document.querySelector('#form');
const username = document.getElementById('username');
const password = document.getElementById('pass');
const email = document.querySelector('#email');
const rePassword = document.querySelector('#pass2');
//Add Event Listener 
form.addEventListener('submit', validate);
//function Validation
function validate(e) {
   //Check Nulls
   checkRequired([username, password, email, rePassword]);
   //Check Length
   checkLength(username, 3, 15);
   checkLength(password, 6, 15);
   //check pass and Re-pass
   checkPass();
   //check email format
   checkEmail(email);
   e.preventDefault();
}
// check Required 
function checkRequired(inputs) {
   inputs.forEach(function (input) {
      if (input.value.trim() === "" || input.value.trim() === null) {
         showError(input, `${getFieldName(input)} is required`);
      } else {
         showSuccess(input);
      }
   });
}
function getFieldName(input) {
   return input.id.toUpperCase().charAt(0) + input.id.slice(1);   
}
//Shows Error
function showError(input, message) {
   // get small Tag of Current Form Control 
   const small = input.parentElement.querySelector('small');
   //change class Name
   input.parentElement.className = 'form-control error';
   //change innerText
   small.innerText = message;
}
//Show success Outline
function showSuccess(input) {
   input.parentElement.className = 'form-control success';
}
//Check Length
function checkLength(input, min, max) {
   const formControl = input.parentElement;
   if (input.value.length < min || input.value.length > max) {
      formControl.className = 'form-control error';
      showError(input, `${getFieldName(input)} must have ${min} characters and Less than ${max} characters`)
   } else {
      showSuccess(input);
   }
}
//check Passwords
function checkPass() {
   if (password.value !== rePassword.value) {
      showError(rePassword, `Re-Password is not same as Password`);
   }
}
//check Email
function checkEmail(input) {
   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (re.test(input.value.trim())) {
      showSuccess(input)
   } else {
      showError(input, 'Email is Not Valid');
   }
}
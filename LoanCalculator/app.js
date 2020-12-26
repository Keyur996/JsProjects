// Add Event Listeners
document.getElementById('loanCal').addEventListener('submit', function (e) {
   //Show Loader
   document.getElementById('loading').style.display = 'block';
   setTimeout(calculate, 2000);
   e.preventDefault();
});

function calculate() {
   //get forms Element
   const form = document.getElementById('loanCal');
   const amount = document.getElementById('amount');
   const interest = document.getElementById('interest');
   const years = document.getElementById('years');
   const monthlyPayment = document.getElementById('monthlyPayment');
   const totalPayment = document.getElementById('totalPayment');
   const totalInterest = document.getElementById('totalInterest');

   //calculation on Monthly Payment
   const principal = parseFloat(amount.value);
   const calculatedInterest = parseFloat(interest.value)/100/12;
   const months = parseFloat(years.value)*12;
   const x = Math.pow(1+calculatedInterest, months);
   // Monthly payments
   const monthly = (principal * x * calculatedInterest) / (x - 1);
   
   if (isFinite(monthly)) {
      //show result and Hide Loading
      document.getElementById('result').style.display = 'block';
      document.getElementById('loading').style.display = 'none';
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * months).toFixed(2);
      totalInterest.value = ((monthly * months) - principal).toFixed(2);
   } else {
      showError('Enter Valid Data');
   }
}
// Show Error Message
function showError(message) {
   //Hide Both
   document.getElementById('result').style.display = 'none';
   document.getElementById('loading').style.display = 'none';
   // Create Div For Alert
   const alertDiv = document.createElement('div');
   alertDiv.className = 'alert alert-danger';
   alertDiv.appendChild(document.createTextNode(message));
   // set Position Of Div 
   document.querySelector('.card').insertBefore(alertDiv, document.getElementById('heading'));
   //Set TimeOut
   setTimeout(clearError, 3000);
}
// Clear Error
function clearError() {
   document.querySelector('.alert').remove();
}
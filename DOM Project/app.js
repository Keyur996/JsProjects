//Default UI
const form = document.querySelector('#form');
const task = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('#clear'); 
//Load All Event Listener
loadAllEventListener();
//Define function
function loadAllEventListener() {
   // add DOM content Loaded Event
   document.addEventListener('DOMContentLoaded', getTasksFromLS);
   //add form Event Listener
   form.addEventListener('submit', addTask);
   //taskList event
   taskList.addEventListener('click', removeTask);
   //Clear Tasks
   clearBtn.addEventListener('click', clearTasks);
   //Filter Task
   filter.addEventListener('keyup', filterTask);
}
function getTasksFromLS() {
   //get Tasks
   let tasks = getTasks();

   tasks.forEach(function (task) {
      liToUl(task);
   });
}
function addTask(e) {
   // Join li to Ul
   liToUl(task.value);
   //Store in Local Storage
   storeInLS(task.value);
   //clear task list
   task.value = '';
   e.preventDefault();
}
function liToUl(val) {
   //Create li and join to ui
   const li = document.createElement('li');
   li.className = 'list-group-item'
   // Create text node
   li.appendChild(document.createTextNode(val));
   // Create a tag for remove
   const aTag = document.createElement('a');
   aTag.className = 'delete-item float-right';
   // icon 
   aTag.innerHTML = '<i class="fas fa-minus-circle"></i>'
   li.appendChild(aTag);
   taskList.appendChild(li);
}
//Store In Local Storage
function storeInLS(task) {
   //get Data means tasks
   let tasks = getTasks();
   //set in LS
   tasks.push(task);
   localStorage.setItem('tasks', JSON.stringify(tasks));
}
// get All Tasks from LS
function getTasks() {
   let tasks;
   if (localStorage.getItem('tasks') === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   return tasks;
}
// remove Task
function removeTask(e) {
   if (e.target.parentElement.classList.contains('delete-item')) {
      if (confirm('Are you sure ?')) {
         e.target.parentElement.parentElement.remove();  
         //Remove from Local Storage
         removeFromLS(e.target.parentElement.parentElement);
      }
   }
}
// Remove From LS
function removeFromLS(taskItem) {
   //getTasks first
   let tasks = getTasks();
   //Searched in Tasks and Remove
   tasks.forEach(function (task, index) {
      if (taskItem.textContent === task) {
         tasks.splice(index, 1);
      }
   });
   // Set In Local Storage
   localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Clear Tasks
function clearTasks() {
   // taskList.innerHTML = '';
   while (taskList.firstChild) {
      taskList.firstChild.remove();
   }
   // clear Task from LS
   localStorage.clear();
}
//filter Task
function filterTask(e) {
   const searched = e.target.value.toLowerCase();
   document.querySelectorAll('.list-group-item').forEach(function (item) {
      const text = item.firstChild.textContent;
      if (text.toLowerCase().indexOf(searched) != -1) {
         item.style.display = 'block';
      } else {
         item.style.display = 'none';
      }
   });
}

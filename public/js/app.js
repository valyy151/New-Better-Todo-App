// const checkButtons = document.getElementsByClassName('check');
// const removeButtons = document.getElementsByClassName('remove');

// const ongoingTasks = document.getElementById('ongoingTasks');
// const doneTasks = document.getElementById('doneTasks');

// function addClickToCheckButtons() {
//   for (check of checkButtons) {
//     check.addEventListener('click', function (event) {
//       const checked = event.target.parentElement;
//       checked.className = 'finished';
//       doneTasks.prepend(checked);
//       countChildren();
//     });
//   }
// }
// function addClickToRemoveButtons() {
//   for (remove of removeButtons) {
//     remove.addEventListener('click', function (event) {
//       const checked = event.target.parentElement;
//       checked.remove();
//       countChildren();
//     });
//   }
// }
// addClickToCheckButtons();
// addClickToRemoveButtons();

// const addButton = document.getElementById('aButton');
// const textInput = document.querySelector('input');

// function createTask() {
//   const returnedValue = textInput.value;
//   const newRemoveButton = document.createElement('a');
//   newRemoveButton.innerHTML = '&times;';
//   newRemoveButton.classList.add('remove');

//   const newText = document.createElement('p');
//   newText.innerText = returnedValue;

//   const newCheckButton = document.createElement('a');
//   newCheckButton.innerHTML = '&#10003;';
//   newCheckButton.classList.add('check');

//   const newTask = document.createElement('li');
//   newTask.classList.add('ongoing');

//   newTask.prepend(newCheckButton, newText, newRemoveButton);
//   ongoingTasks.prepend(newTask);
//   console.dir(newTask.childNodes[1].innerText);

//   textInput.value = '';
//   addClickToCheckButtons();
//   addClickToRemoveButtons();
// }

// addButton.addEventListener('click', () => {
//   textInput.style.display = 'flex';
//   if (textInput.style.display == 'flex' && textInput.value !== '') {
//     createTask();
//     countChildren();
//   }
// });

// textInput.addEventListener('keydown', (event) => {
//   if (event.key === 'Enter' && textInput.value !== '') {
//     createTask();
//     countChildren();
//   }
// });

// const clear = document.getElementById('clear');

// clear.addEventListener('click', () => {
//   while (doneTasks.firstChild) {
//     doneTasks.removeChild(doneTasks.lastChild);
//     countChildren();
//   }
// });

// function countChildren() {
//   if (doneTasks.childElementCount > 0) {
//     clear.style.display = 'flex';
//   } else clear.style.display = 'none';
// }

// countChildren();

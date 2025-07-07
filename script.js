const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Add new task
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
    taskInput.focus();
  }
});

// Allow enter key to add task
taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

function addTask(text) {
  // Create list item
  const li = document.createElement('li');

  // Task text span
  const taskSpan = document.createElement('span');
  taskSpan.className = 'task-text';
  taskSpan.textContent = text;

  // Buttons container
  const btnDiv = document.createElement('div');
  btnDiv.className = 'task-buttons';

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'edit';
  editBtn.innerHTML = '✏️';

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete';
  deleteBtn.innerHTML = '🗑️';

  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(deleteBtn);

  li.appendChild(taskSpan);
  li.appendChild(btnDiv);
  taskList.appendChild(li);

  // Edit functionality
  editBtn.addEventListener('click', () => {
    if (editBtn.textContent === '✏️') {
      // Change to input for editing
      const input = document.createElement('input');
      input.type = 'text';
      input.value = taskSpan.textContent;
      input.className = 'edit-input';
      li.replaceChild(input, taskSpan);
      input.focus();
      editBtn.textContent = '💾'; // Save icon

      // Save on Enter or blur
      input.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          saveEdit();
        }
      });
      input.addEventListener('blur', saveEdit);

      function saveEdit() {
        if (input.value.trim() !== '') {
          taskSpan.textContent = input.value.trim();
        }
        li.replaceChild(taskSpan, input);
        editBtn.textContent = '✏️';
      }
    }
  });

  // Delete functionality
  deleteBtn.addEventListener('click', () => { 
    taskList.removeChild(li);
  });
}

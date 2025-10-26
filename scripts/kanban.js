// Imports
import { hideDateControls } from './calendar.js';
import { createTaskCard } from './create-card.js';
import { findTaskById, getTasks, saveTasksToStorage, updateTask } from './states/task-state.js';
import { createInputElement, renderCreateTaskModal } from './task-modal-setup.js';
import { createElement, formatTasksToKanban } from './utils.js';

// Default column titles
const titlesTranslations = {
  todo: "A fazer",
  progress: "Em progresso",
  completed: "Concluído"
};

// MAIN ENTRY
export function renderKanban(tasks = []) {
  hideDateControls();
  tasks = formatTasksToKanban(tasks);

  const mainContainer = document.querySelector('.view-content');
  mainContainer.innerHTML = '';

  const kanbanBoard = createElement('div', 'kanban-board');

  Object.keys(tasks).forEach(status => {
    const column = createKanbanColumn(status, tasks[status]);
    kanbanBoard.appendChild(column);
  });

  const createColumnButton = createElement('button', 'create-column-button', 'Criar coluna');
  createColumnButton.addEventListener('click', handleCreateColumnButtonClick);
  kanbanBoard.appendChild(createColumnButton);

  mainContainer.appendChild(kanbanBoard);
}

// COLUMN CREATION
function createKanbanColumn(status, taskList) {
  const column = createElement('ul', 'kanban-column', '');
  column.classList.add('task-list');

  const titleContainer = createColumnHeader(status, taskList.length);
  column.appendChild(titleContainer);

  // Drag/drop events
  column.addEventListener('dragover', handleDragOver);
  column.addEventListener('drop', e => handleDrop(e, status, column));

  // Add tasks
  taskList.forEach(task => {
    const taskCard = setupTaskCard(createTaskCard(task, task.date, true), task.id);
    column.appendChild(taskCard);
  });

  return column;
}

// Creates the header (title + buttons)
function createColumnHeader(status, taskCount) {
  const titleContainer = createElement('div', 'kanban-column-title-container');
  const titleText = titlesTranslations[status] ?? status;
  const title = createElement('span', 'kanban-column-title', `${titleText}: ${taskCount}`);

  const addTaskBtn = createElement('button', 'add-task-button', '+');
  addTaskBtn.addEventListener('click', renderCreateTaskModal);

  titleContainer.appendChild(title);
  titleContainer.appendChild(addTaskBtn);

  // Allow deleting only custom columns
  if (!titlesTranslations[status]) {
    const deleteBtn = createElement('button', 'delete-column-button');
    const deleteIcon = createElement('img', 'delete-column-image');
    deleteIcon.src = './assets/icons/bin.svg';
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.addEventListener('click', () => handleDeleteColumn(titleContainer.parentElement));
    titleContainer.appendChild(deleteBtn);
  }

  return titleContainer;
}

// TASK CARD BEHAVIOR
function setupTaskCard(card, id) {
  card.id = id;
  card.setAttribute('draggable', 'true');
  card.addEventListener('dragstart', handleDragStart);
  card.addEventListener('dragend', e => e.dataTransfer.clearData());
  return card;
}

// DRAG & DROP HANDLERS
function handleDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e, newStatus, column) {
  e.preventDefault();

  const taskId = e.dataTransfer.getData('text/plain');
  const task = findTaskById(taskId);

  task.status = newStatus;
  updateTask(taskId, task);
  saveTasksToStorage();

  document.getElementById(taskId)?.remove();

  const taskCard = setupTaskCard(createTaskCard(task, task.date, true), task.id);
  column.appendChild(taskCard);

  updateColumnTitles();
  e.dataTransfer.clearData();
}

// COLUMN MANAGEMENT
function handleDeleteColumn(column) {
  const hasTasks = column.childElementCount > 1;
  if (hasTasks) {
    alert('Mova as tarefas antes de apagar a coluna.');
    return;
  }

  const allColumns = JSON.parse(localStorage.getItem('kanban-columns')) || [];
  const columnName = extractColumnName(column);
  const updated = allColumns.filter(c => c.title !== columnName);

  localStorage.setItem('kanban-columns', JSON.stringify(updated));
  column.remove();
}

function extractColumnName(column) {
  const text = column.querySelector('.kanban-column-title').innerText.split(':')[0];
  return Object.keys(titlesTranslations).find(k => titlesTranslations[k] === text) ?? text;
}

function updateColumnTitles() {
  document.querySelectorAll('.task-list').forEach(list => {
    const title = list.querySelector('.kanban-column-title');
    const baseText = title.textContent.split(':')[0];
    const count = list.querySelectorAll('.task-card').length;
    title.textContent = `${baseText}: ${count}`;
  });
}

// CREATE NEW COLUMN
function handleCreateColumnButtonClick(e) {
  e.target.classList.add('hidden');

  const form = createElement('form', 'create-column-container');
  form.onsubmit = handleCreateColumn;

  const input = createInputElement('text', 'column-name', 'Nome da coluna');
  input.required = true;
  input.minLength = 3;

  const saveBtn = createElement('button', 'save-column-button', 'Criar coluna');
  const closeBtn = createElement('button', 'close-create-column-container', 'X');

  closeBtn.addEventListener('click', () => {
    e.target.classList.remove('hidden');
    form.remove();
  });

  const actions = createElement('div', 'action-buttons-container');
  actions.append(saveBtn, closeBtn);
  form.append(input, actions);

  document.querySelector('.kanban-board').appendChild(form);
}

function handleCreateColumn(e) {
  e.preventDefault();
  const newName = e.target.querySelector('input').value;
  const saved = JSON.parse(localStorage.getItem('kanban-columns')) || [];
  const position = document.querySelectorAll('.kanban-column').length;

  saved.push({ title: newName, position });
  localStorage.setItem('kanban-columns', JSON.stringify(saved));

  renderKanban(getTasks());
}

// INITIALIZER
export function initializeKanbanColunsInLocalStoage() {
  if (!localStorage.getItem('kanban-columns')) {
    const defaults = [
      { title: 'todo', position: 0 },
      { title: 'progress', position: 1 },
      { title: 'completed', position: 2 }
    ];
    localStorage.setItem('kanban-columns', JSON.stringify(defaults));
  }
}

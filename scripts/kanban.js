import { findTaskById, saveTasksToStorage, updateTask } from './states/task-state.js';
import { renderCreateTaskModal } from './task-modal-setup.js';
import {createElement, formatTasksToKanban} from './utils.js'

/**
 * Renderiza um quadro Kanban com base nas tarefas fornecidas.
 * @param {Object} tasks - Um objeto contendo arrays de tarefas agrupadas por alguma chave.
 * Cada tarefa deve ter a seguinte estrutura:
 *   {
 *     title: string,   // O título da tarefa
 *     status: string   // Status da tarefa: "todo", "progress" ou "completed"
 *   }
 */
export function renderKanban(tasks) {
    // Formata as tarefas para o layout Kanban
    tasks = formatTasksToKanban(tasks);

    let todoTasks = tasks['todo'] || [];
    let inProgressTasks = tasks['progress'] || [];
    let completedTasks = tasks['completed'] || [];

    // Seleciona o container principal onde o Kanban será renderizado
    const mainContainer = document.querySelector('.main__container');

    // Limpa o conteúdo existente para renderizar o Kanban
    mainContainer.innerHTML = '';
    
    // Cria o container principal do Kanban
    const kanbanBoard = createElement('div', 'kanban-board');
  
    // Cria as colunas do Kanban
    const todoColumn = createElement('div', 'kanban-column');
    const inProgressColumn = createElement('div', 'kanban-column');
    const completedColumn = createElement('div', 'kanban-column');

    // Cria o container do titulo do Kanban
    const todoTitleContainer = createElement('div', 'kanban-column-title-container');
    const inProgressTitleContainer = createElement('div', 'kanban-column-title-container');
    const completedTitleContainer = createElement('div', 'kanban-column-title-container');

    // Cria os títulos das colunas
    const todoTitle = createElement('span', 'kanban-column-title', 'A Fazer: ' + todoTasks.length);
    const inProgressTitle = createElement('span', 'kanban-column-title', 'Em Progresso: ' + inProgressTasks.length);
    const completedTitle = createElement('span', 'kanban-column-title', 'Concluído: ' + completedTasks.length);

    // Adiciona os títulos aos containers
    todoTitleContainer.appendChild(todoTitle);
    inProgressTitleContainer.appendChild(inProgressTitle);
    completedTitleContainer.appendChild(completedTitle);

    // Cria os botões para adicionar novas tarefas
    const addTodoTaskButton = createElement('button', 'add-task-button', '+');
    addTodoTaskButton.addEventListener('click', () => {
        renderCreateTaskModal();
    });

    // Cria os botões para adicionar novas tarefas
    const addInProggressTaskButton = createElement('button', 'add-task-button', '+');
    addInProggressTaskButton.addEventListener('click', () => {
        renderCreateTaskModal();
    });

    // Cria os botões para adicionar novas tarefas
    const addCompletedTaskButton = createElement('button', 'add-task-button', '+');
    addCompletedTaskButton.addEventListener('click', () => {
        renderCreateTaskModal();
    });

    // Adiciona os botões de criar tarefas aos containers de título
    todoTitleContainer.appendChild(addTodoTaskButton);
    inProgressTitleContainer.appendChild(addInProggressTaskButton);
    completedTitleContainer.appendChild(addCompletedTaskButton);

    // Adiciona os containers de título às colunas
    todoColumn.appendChild(todoTitleContainer);
    inProgressColumn.appendChild(inProgressTitleContainer);
    completedColumn.appendChild(completedTitleContainer);

    todoColumn.addEventListener('dragover', handleDragOver);
    inProgressColumn.addEventListener('dragover', handleDragOver);
    completedColumn.addEventListener('dragover', handleDragOver);

    todoColumn.addEventListener('drop', (e) => {
        handleDrop(e, 'todo');
    });

    inProgressColumn.addEventListener('drop', (e) => {
        handleDrop(e, 'progress');
    });

    completedColumn.addEventListener('drop', (e) => {
        handleDrop(e, 'completed');
    });

    todoTasks.forEach(task => {
        const taskCard = createElement('div', 'kanban-card', task.title);
        taskCard.id = task.id;
        taskCard.setAttribute('draggable', 'true');
        taskCard.addEventListener('dragstart', handleDragStart);
        taskCard.addEventListener('dragend', (e) => {
            e.dataTransfer.clearData();
        });
        todoColumn.appendChild(taskCard);
    });

    inProgressTasks.forEach(task => {
        const taskCard = createElement('div', 'kanban-card', task.title);
        taskCard.id = task.id;
        taskCard.setAttribute('draggable', 'true');
        taskCard.addEventListener('dragstart', handleDragStart);
        taskCard.addEventListener('dragend', (e) => {
            e.dataTransfer.clearData();
        });
        inProgressColumn.appendChild(taskCard);
    });
    
    completedTasks.forEach(task => {
        const taskCard = createElement('div', 'kanban-card', task.title);
        taskCard.id = task.id;
        taskCard.setAttribute('draggable', 'true');
        taskCard.addEventListener('dragstart', handleDragStart);
        taskCard.addEventListener('dragend', (e) => {
            e.dataTransfer.clearData();
        });
        completedColumn.appendChild(taskCard);
    }); 

    // Adiciona as colunas ao quadro Kanban
    kanbanBoard.appendChild(todoColumn);
    kanbanBoard.appendChild(inProgressColumn);
    kanbanBoard.appendChild(completedColumn);

    // Renderiza o Kanban no container principal
    mainContainer.appendChild(kanbanBoard);

    function handleDragOver(event){
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
}  

    function handleDrop(event, column){
        event.preventDefault();
        const taskId = event.dataTransfer.getData('text/plain');
        let task = findTaskById(taskId);
        task.status = column;
        changeTaskStatus(taskId, column);
        
        document.getElementById(taskId).remove();
        
        const taskCard = createElement('div', 'kanban-card', task.title);
        taskCard.id = task.id;
        taskCard.setAttribute('draggable', 'true');
        taskCard.addEventListener('dragstart', handleDragStart);
        taskCard.addEventListener('dragend', (e) => {
            e.dataTransfer.clearData();
        });

        let targetColumn;

        if(column === 'todo') targetColumn = todoColumn;
        if(column === 'completed') targetColumn = completedColumn;
        if(column === 'progress') targetColumn = inProgressColumn;

        
        targetColumn.appendChild(taskCard);
        
        updateColumnTitles();
        event.dataTransfer.clearData();
    }

    function handleDragStart(event){
        event.dataTransfer.setData('text/plain', event.target.id);
        event.dataTransfer.effectAllowed = 'move';
    }

    function changeTaskStatus(id, status){
        let task = findTaskById(id);
        task.status = status;
        updateTask(id, task);
        saveTasksToStorage();
    }

    function updateColumnTitles(){
        todoTitle.textContent = 'A Fazer: '.concat(todoColumn.childElementCount - 1);
        inProgressTitle.textContent = 'Em Progresso: '.concat(inProgressColumn.childElementCount - 1);
        completedTitle.textContent = 'Concluído: '.concat(completedColumn.childElementCount - 1);
    }
}


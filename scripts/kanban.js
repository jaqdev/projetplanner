import { hideDateControls } from './calendar.js';
import { createTaskCard } from './create-card.js';
import { findTaskById, getTasks, saveTasksToStorage, updateTask } from './states/task-state.js';
import { createInputElement, renderCreateTaskModal } from './task-modal-setup.js';
import {createElement, formatTasksToKanban} from './utils.js'

const titles =  {"todo": "A fazer", "progress": "Em progresso", "completed": "Concluído"};

/**
 * Renderiza um quadro Kanban com base nas tarefas fornecidas.
 * @param {Object} tasks - Um objeto contendo arrays de tarefas agrupadas por alguma chave.
 * Cada tarefa deve ter a seguinte estrutura:
 *   {
 *     title: string,   // O título da tarefa
 *     status: string   // Status da tarefa: "todo", "progress" ou "completed"
 *   }
 */
export function renderKanban(tasks = []) {

    hideDateControls();

    // Formata as tarefas para o layout Kanban
    tasks = formatTasksToKanban(tasks);

    // Busca as colunas salvas
    let columns = JSON.parse(localStorage.getItem("kanban-columns"));

    // Adiciona um array vazio a coluna caso nao tenha nenhuma tarefa
    columns.forEach(column => {
        if(!tasks[column]){
            tasks[column] = [];
        }
    });

    // Seleciona o container principal onde o Kanban será renderizado
    const mainContainer = document.querySelector('.view-content');

    // Limpa o conteúdo existente para renderizar o Kanban
    mainContainer.innerHTML = '';
    
    // Cria o container principal do Kanban
    const kanbanBoard = createElement('div', 'kanban-board');
  
    Object.keys(tasks).forEach((status) => {
        // Cria as colunas do Kanban
        const column = createElement('ul', 'kanban-column');

        // Adiciona classes específicas para estilização das listas de tarefas
        column.classList.add('task-list');

        // Cria o container do titulo do Kanban
        const titleContainer = createElement('div', 'kanban-column-title-container');

        // Cria os títulos das colunas
        const title = createElement('span', 'kanban-column-title', titles[status] ?? status + ": " + tasks[status].length);

        // Adiciona os títulos aos containers
        titleContainer.appendChild(title);

        // Cria os botões para adicionar novas tarefas
        const addTaskButton = createElement('button', 'add-task-button', '+');
        addTaskButton.addEventListener('click', () => {
            renderCreateTaskModal();
        });

        // Adiciona os botões de criar tarefas aos containers de título
        titleContainer.appendChild(addTaskButton);

        // Adiciona os containers de título às colunas
        column.appendChild(titleContainer);

        column.addEventListener('dragover', handleDragOver);

        column.addEventListener('drop', (e) => {
            handleDrop(e, status, column);
        });

        tasks[status].forEach((task) => {
            let kanbanTaskCard = createTaskCard(task, task.date, true);
            kanbanTaskCard = addKanbanCardDefaultBehavior(kanbanTaskCard, task.id);
            column.appendChild(kanbanTaskCard);
        });

        kanbanBoard.appendChild(column);
    });

    let createColumnbutton = createElement("button", "create-column-button", "Criar coluna");
    createColumnbutton.addEventListener("click", (e) => handleCreateColumnButtonClick(e));

    kanbanBoard.appendChild(createColumnbutton);

    // Renderiza o Kanban no container principal
    mainContainer.appendChild(kanbanBoard);

    function addKanbanCardDefaultBehavior(taskCard, taskId){
        taskCard.id = taskId;
        taskCard.setAttribute('draggable', 'true');
        taskCard.addEventListener('dragstart', handleDragStart);
        taskCard.addEventListener('dragend', (e) => {
            e.dataTransfer.clearData();
        });
        return taskCard;
    }

    function handleDragOver(event){
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }  

    function handleDrop(event, status, column){
        event.preventDefault();
        const taskId = event.dataTransfer.getData('text/plain');
        let task = findTaskById(taskId);
        console.log(task);
        
        task.status = status;
        changeTaskStatus(taskId, status);
        
        document.getElementById(taskId).remove();
        
        let taskCard = createTaskCard(task, task.date, true);
        taskCard = addKanbanCardDefaultBehavior(taskCard, task.id);

        column.appendChild(taskCard);
        
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
        document.querySelectorAll(".task-list").forEach(taskList => {
            let taskCount = taskList.childElementCount - 1;
            taskList.firstChild.firstChild.textContent = taskList.firstChild.firstChild.textContent.split(":")[0] + ": " + taskCount;
        });
    }
}

function handleCreateColumnButtonClick(event){

    event.target.classList.add("hidden");

    let columnNameInput = createInputElement("text", "column-name", "Nome da coluna");
    columnNameInput.required = true;
    columnNameInput.minLength = 3;


    let saveButton = createElement("button", "save-column-button", "Criar coluna");
    let closeButton = createElement("button", "close-craete-column-container", "X")

    let actionButtonsContainer = createElement("div", "action-buttons-container");
    actionButtonsContainer.append(
        saveButton,
        closeButton
    );

    let formContainer = createElement("form", "create-column-container");
    formContainer.onsubmit = handleCreateColumn;

    formContainer.append(
        columnNameInput,
        actionButtonsContainer,
    );

    let kanbanBoard = document.querySelector(".kanban-board");
    kanbanBoard.appendChild(formContainer);
}

function handleCreateColumn(event){
    event.preventDefault();
    let newColumnName = event.srcElement.firstChild.value;
    let savedColumns = JSON.parse(localStorage.getItem("kanban-columns"));
    savedColumns.push(newColumnName);
    localStorage.setItem("kanban-columns", JSON.stringify(savedColumns));
    renderKanban(getTasks());
}

export function initializeKanbanColunsInLocalStoage(){
    if(localStorage.getItem("kanban-columns") === null){
        localStorage.setItem("kanban-columns", JSON.stringify(["todo", "progress", "completed"]));
    }
}
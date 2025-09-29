import { months } from "./calendar.js";
import { createTaskCard } from "./create-card.js";

// Renderiza o modal de lista de tarefas
export function renderTaskListModal(calendarFormatedTasks = {}, calendarDateFormated = new Date().toISOString().split('T')[0]) {

    // Seleciona o body para adicionar o modal
    let body = document.querySelector('body');

    // Overlay do modal
    let modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    // Container do modal
    let modalContainer = document.createElement('div');
    modalContainer.classList.add('task-list-modal-container');

    // Título do modal
    let modalTitle = document.createElement('h2');
    const [year, month, day] = calendarDateFormated.split('-').map(Number);
    const dateFormated = new Date(year, month - 1, day);
    modalTitle.textContent = `Tarefas ${dateFormated.getDate()} de ${months[dateFormated.getMonth()]}`;

    // Botão de fechar
    let closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';

    // Fecha o modal ao clicar no botão de fechar
    closeButton.onclick = () => {
        body.removeChild(modalOverlay);
    };

    // Lista de tarefas
    let taskList = document.createElement('ul');
    taskList.classList.add('task-list');
    
    // Filtra as tarefas para a data selecionada
    let tasksForDate = calendarFormatedTasks[calendarDateFormated] || [];
    
    // Se não houver tarefas, exibe uma mensagem
    if (tasksForDate.length === 0) {
        let noTasksItem = document.createElement('li');
        noTasksItem.textContent = 'Nenhuma tarefa para este dia.';
        taskList.appendChild(noTasksItem);
    } else {
        // Cria um item na lista para cada tarefa
        tasksForDate.forEach((task) => {
            let taskCard = createTaskCard(task, calendarDateFormated);
            taskList.appendChild(taskCard);
        });
    }

    // Adiciona os elementos ao modal
    modalContainer.appendChild(modalTitle);
    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(taskList);
    modalOverlay.appendChild(modalContainer);
    body.appendChild(modalOverlay);

    // Fecha o modal ao clicar fora dele
    modalOverlay.onclick = (e) => {
        if(!modalContainer.contains(e.target)){
            body.removeChild(modalOverlay);
        }
    };

}
import { renderTaskDetailsModal } from "./task-details-modal.js";

const priorities = {"low": "Baixa", "medium": "Média", "high": "Alta"};
const statuses = {"todo": "A Fazer", "progress": "Em Progresso", "completed": "Concluída"};

// Cria o card de cada tarefa
export function createTaskCard(task, date, isForKanban = false){
        let taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        // Cria título da tarefa
        let title = document.createElement('span');
        title.classList.add('task-title');
        title.textContent = task.title;

        // Cria o prazo da tarefa
        let deadline = document.createElement('span');
        deadline.classList.add('task-deadline');
        deadline.textContent = `Prazo: ${new Date(date.split('-').map(Number)).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;

        // Cria o container de prioridade e status
        let priorityStatusContainer = document.createElement('div');
        priorityStatusContainer.classList.add('task-priority-status-container');
        isForKanban && priorityStatusContainer.classList.add('column');

        // Cria a prioridade da tarefa
        let priority = document.createElement('span');
        priority.classList.add('task-priority',  "priority-" + task.priority.toLowerCase());
        priority.textContent = `Prioridade: ${priorities[task.priority.toLowerCase()]}`;

        // Cria o container de status
        let statusContainer = document.createElement('div');
        statusContainer.classList.add('task-status-container');

        // Cria o icone de status
        let statusIcon = document.createElement('img');
        statusIcon.src = `./assets/icons/clock.svg`;
        statusIcon.classList.add('task-priority-icon');

        // Adiciona o status da tarefa
        let status = document.createElement('span');
        status.classList.add('task-status');
        status.textContent = `Status: ${statuses[task.status.toLowerCase()] ?? task.status.toLowerCase()}`;

        // Adiciona os elementos ao container de status
        statusContainer.appendChild(statusIcon);
        statusContainer.appendChild(status);

        // Adiciona os elementos ao container de prioridade e status
        priorityStatusContainer.appendChild(statusContainer);
        priorityStatusContainer.appendChild(priority);

        // Adiciona os elementos ao item da lista
        taskItem.appendChild(title);
        taskItem.appendChild(deadline);
        taskItem.appendChild(priorityStatusContainer);

        taskItem.addEventListener('click', () => handleCardClick(task));
        
        return taskItem;
}

function handleCardClick(task){
    console.log('Card clicked with ID:', task);

    renderTaskDetailsModal(task);
}
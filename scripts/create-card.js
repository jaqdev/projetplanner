import { renderTaskDetailsModal } from "./task-details-modal.js";

const statuses = {"todo": "A Fazer", "progress": "Em Progresso", "completed": "Concluída"};

// Cria o card de cada tarefa
export function createTaskCard(task, isForKanban = false){   
        let taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        // Cria título da tarefa
        let title = document.createElement('span');
        title.classList.add('task-title');
        title.textContent = task.titulo;

        // Cria o prazo da tarefa
        let deadline = document.createElement('span');
        deadline.classList.add('task-deadline');
        deadline.textContent = `Prazo: ${new Date(task.data_limite.split("T")[0].split('-')).toLocaleDateString()}`;

        // Cria o container de prioridade e status
        let priorityStatusContainer = document.createElement('div');
        priorityStatusContainer.classList.add('task-priority-status-container');
        isForKanban && priorityStatusContainer.classList.add('column');

        // Cria a prioridade da tarefa
        let priority = document.createElement('span');
        priority.classList.add('task-priority',  "priority-" + task.prioridade.toLowerCase());
        priority.textContent = `Prioridade: ${task.prioridade}`;

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
    renderTaskDetailsModal(task);
}
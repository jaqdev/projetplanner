import { months } from "./calendar.js";
const priorities = {"low": "Baixa", "medium": "Média", "high": "Alta"};
const statuses = {"todo": "A Fazer", "progress": "Em Progresso", "completed": "Concluída"};

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
        status.textContent = `Status: ${statuses[task.status.toLowerCase()]}`;

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

        console.log(taskItem);
        
        return taskItem;
}
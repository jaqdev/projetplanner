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
    const mainContainer = document.querySelector('.main__container');

    // Limpa o conteúdo existente para renderizar o Kanban
    mainContainer.innerHTML = '';
    
    // Cria o container principal do Kanban
    const kanbanBoard = createElement('div', 'kanban-board');
  
    // Cria as colunas do Kanban
    const todoColumn = createElement('div', 'kanban-column');
    const inProgressColumn = createElement('div', 'kanban-column');
    const completedColumn = createElement('div', 'kanban-column');

    // Cria os títulos das colunas
    const todoTitle = createElement('div', 'kanban-column-title', 'A Fazer');
    const inProgressTitle = createElement('div', 'kanban-column-title', 'Em Progresso');
    const completedTitle = createElement('div', 'kanban-column-title', 'Concluído');

    // Adiciona os títulos às colunas
    todoColumn.appendChild(todoTitle);
    inProgressColumn.appendChild(inProgressTitle);
    completedColumn.appendChild(completedTitle);

    // Formata as tarefas para o layout Kanban
    tasks = formatTasksToKanban(tasks);

    let todoTasks = tasks['todo'] || [];
    let inProgressTasks = tasks['progress'] || [];
    let completedTasks = tasks['completed'] || [];

    todoTasks.forEach(task => {
        const taskCard = createElement('div', 'kanban-card', task.title);
        todoColumn.appendChild(taskCard);
    });

    inProgressTasks.forEach(task => {
        const taskCard = createElement('div', 'kanban-card', task.title);
        inProgressColumn.appendChild(taskCard);
    });
    
    completedTasks.forEach(task => {
        const taskCard = createElement('div', 'kanban-card', task.title);
        completedColumn.appendChild(taskCard);
    }); 

    // Adiciona as colunas ao quadro Kanban
    kanbanBoard.appendChild(todoColumn);
    kanbanBoard.appendChild(inProgressColumn);
    kanbanBoard.appendChild(completedColumn);

    // Renderiza o Kanban no container principal
    mainContainer.appendChild(kanbanBoard);
}

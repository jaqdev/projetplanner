import { apiFetch } from './api.js';
import { renderCalendar } from './calendar.js';
import { setupDatePicker } from './date.picker.js';
import { renderKanban } from './kanban.js';
import { setupMenu } from './menu-setup.js';
import { getAccessToken } from './states/access-token.js';
import { getMonthToRenderTasks, getYearToRenderTasks, initializeCalendarDateLocalStorage } from './states/date-state.js';
import { getTasks, loadTasksFromStorage, saveTasksToStorage, setTasks } from './states/task-state.js';
import { getCurrentView, loadCurrentViewFromLocalStorage } from './states/view-state.js';
import { setupCreateTaskButton } from './task-modal-setup.js';
import { loadSavedTheme, setupTheme} from './theme.js'

let logged = localStorage.getItem("logged_user");

if (!logged) {
    window.location.href = 'login.html';
}

console.log('User is logged in as: ', logged);
    
loadSavedTheme();
initializeCalendarDateLocalStorage();
loadTasksFromStorage();

document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    setupDatePicker();
    setupCreateTaskButton();
    setupMenu();
    loadCurrentViewFromLocalStorage();
    let view = getCurrentView();

    apiFetch("/columns", {
    method: "GET",
    headers: {
        Authorization: "Bearer " + getAccessToken()
    }
    }).then(({ colunas }) => {
        let tasks = colunas.map(c => c.tarefas);
        
        setTasks(tasks.flat());
        saveTasksToStorage();
        let columns = colunas.map(column => ({id:column.id, title: column.titulo, position: column.posicao}));
        localStorage.setItem("kanban-columns", JSON.stringify(columns));

        if (view === 'calendar') {
            renderCalendar(getTasks(), getYearToRenderTasks(), getMonthToRenderTasks());
        }

        if (view === 'kanban') {
            renderKanban(getTasks());
        }
    });


    if(view === 'calendar') {
        renderCalendar(getTasks(), getYearToRenderTasks(), getMonthToRenderTasks());
    }

    if(view === 'kanban'){
        renderKanban(getTasks());
    }
});



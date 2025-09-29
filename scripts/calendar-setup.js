import { renderCalendar } from './calendar.js';
import { getTasks, loadTasksFromStorage, setTasks } from './states/task-state.js';
import { formatTasksToCalendar } from './utils.js';

// Month and year to render tasks, default to current month and year
export let monthToRenderTasks = localStorage.getItem('monthToRenderTasks') || (new Date().getMonth());
export let yearToRenderTasks = localStorage.getItem('yearToRenderTasks') || new Date().getFullYear();

export function setupCalendar() {

    loadTasks().then(formattedTasks => {
        renderCalendar(getTasks(), yearToRenderTasks, monthToRenderTasks);
    });

    // Initial render of calendar
    renderCalendar(getTasks(), yearToRenderTasks, monthToRenderTasks);
}

async function loadTasks(){
    await new Promise(resolve => setTimeout(resolve, 300));
    loadTasksFromStorage();
}
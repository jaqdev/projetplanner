import { renderCalendar } from './calendar.js';
import { setupDatePicker } from './date.picker.js';
import { renderKanban } from './kanban.js';
import { setupMenu } from './menu-setup.js';
import { getMonthToRenderTasks, getYearToRenderTasks, initializeLocalStorage } from './states/date-state.js';
import { getTasks, initializeTasksLocalStorage, loadTasksFromStorage } from './states/task-state.js';
import { getCurrentView, loadCurrentViewFromLocalStorage } from './states/view-state.js';
import { setupCreateTaskButton } from './task-modal-setup.js';
import { loadSavedTheme, setupTheme} from './theme.js'

loadSavedTheme();
setupTheme();

loadCurrentViewFromLocalStorage();
let view = getCurrentView();

initializeTasksLocalStorage();
initializeLocalStorage();
loadTasksFromStorage();

if(view === 'calendar') {
    // Initial render of calendar
    renderCalendar(getTasks(), getYearToRenderTasks(), getMonthToRenderTasks());
}

if(view === 'kanban'){
    renderKanban(getTasks());
}

setupMenu();

document.addEventListener('DOMContentLoaded', () => {
    setupDatePicker();
    setupCreateTaskButton();
});



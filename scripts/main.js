import { renderCalendar } from './calendar.js';
import { setupDatePicker } from './date.picker.js';
import { initializeKanbanColunsInLocalStoage, renderKanban } from './kanban.js';
import { setupMenu } from './menu-setup.js';
import { getMonthToRenderTasks, getYearToRenderTasks, initializeCalendarDateLocalStorage } from './states/date-state.js';
import { getTasks, initializeTasksLocalStorage, loadTasksFromStorage } from './states/task-state.js';
import { getCurrentView, loadCurrentViewFromLocalStorage } from './states/view-state.js';
import { setupCreateTaskButton } from './task-modal-setup.js';
import { loadSavedTheme, setupTheme} from './theme.js'

initializeKanbanColunsInLocalStoage();
loadSavedTheme();
initializeTasksLocalStorage();
initializeCalendarDateLocalStorage();
loadTasksFromStorage();

document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    setupDatePicker();
    setupCreateTaskButton();
    setupMenu();

    loadCurrentViewFromLocalStorage();
    let view = getCurrentView();

    if(view === 'calendar') {
        // Initial render of calendar
        renderCalendar(getTasks(), getYearToRenderTasks(), getMonthToRenderTasks());
    }

    if(view === 'kanban'){
        renderKanban(getTasks());
    }
});



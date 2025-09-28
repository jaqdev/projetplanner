import { setupCalendar } from './calendar-setup.js';
import { setupDatePicker } from './date.picker.js';
import { setupMenu } from './menu-setup.js';
import { initializeLocalStorage } from './states/task-state.js';
import { setupCreateTaskButton } from './task-modal-setup.js';
import './theme.js'

initializeLocalStorage();

setupCalendar();

setupMenu();

document.addEventListener('DOMContentLoaded', () => {
    setupDatePicker();
    setupCreateTaskButton();
});



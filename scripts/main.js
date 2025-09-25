import { setupCalendar } from './calendar-setup.js';
import { setupDatePicker } from './date.picker.js';
import { setupMenu } from './menu-setup.js';
import './theme.js'

setupCalendar();

setupMenu();

document.addEventListener('DOMContentLoaded', () => {
    setupDatePicker();
});



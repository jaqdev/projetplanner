import { renderCalendar } from './calendar.js';

export let tasks = {};

// Month and year to render tasks, default to current month and year
export let monthToRenderTasks = localStorage.getItem('monthToRenderTasks') || (new Date().getMonth());
export let yearToRenderTasks = localStorage.getItem('yearToRenderTasks') || new Date().getFullYear();

export function setupCalendar() {

    // Load tasks from JSON file and render calendar
    fetch('tasks.json')
    .then(response => response.json())
    .then(data => {
        tasks = data;
        renderCalendar(tasks, yearToRenderTasks, monthToRenderTasks);
    })
    .catch(error => console.error('Error loading tasks:', error));

    // Initial render of calendar
    renderCalendar(tasks, yearToRenderTasks, monthToRenderTasks);
}
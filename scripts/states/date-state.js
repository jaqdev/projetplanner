let monthToRenderTasks = localStorage.getItem('monthToRenderTasks') || (new Date().getMonth());
let yearToRenderTasks = localStorage.getItem('yearToRenderTasks') || new Date().getFullYear();

export function getMonthToRenderTasks() {
    return parseInt(monthToRenderTasks);
}

export function getYearToRenderTasks() {
    return parseInt(yearToRenderTasks);
}

export function setMonthToRenderTasks(month) {
    monthToRenderTasks = month;
    localStorage.setItem('monthToRenderTasks', month);
}

export function setYearToRenderTasks(year) {
    yearToRenderTasks = year;
    localStorage.setItem('yearToRenderTasks', year);
}

export function initializeCalendarDateLocalStorage() {
    if (!localStorage.getItem('monthToRenderTasks')) {
        localStorage.setItem('monthToRenderTasks', new Date().getMonth());
    }
    if (!localStorage.getItem('yearToRenderTasks')) {
        localStorage.setItem('yearToRenderTasks', new Date().getFullYear());
    }
}
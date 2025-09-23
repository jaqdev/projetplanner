import {months, renderCalendar, selectMonth, selectYear} from './calendar.js'
import {renderKanban} from './kanban.js'
import './theme.js'

let cachedTasks = JSON.parse(localStorage.getItem('tasks'));
let tasks = cachedTasks || {};

let monthToRenderTasks = parseInt(localStorage.getItem('monthToRenderTasks')) || new Date().getMonth();
let yearToRenderTasks = parseInt(localStorage.getItem('yearToRenderTasks')) || new Date().getFullYear();

renderCalendar(tasks, yearToRenderTasks, monthToRenderTasks);

fetch('tasks.json')
  .then(response => response.json())
  .then(data => {
    tasks = data;
    localStorage.setItem('tasks', JSON.stringify(data));
    renderCalendar(tasks, yearToRenderTasks, monthToRenderTasks);
  })
  .catch(error => console.error('Error loading tasks:', error));

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  setupDatePicker();
});

function setupDatePicker(){
  const dateButton = document.querySelector('.title-bar__month');
  const datePickerContainer = document.querySelector('.title-bar__date-picker');
  let selectedYearTitle = document.getElementById('title_bar__selected-year');

  dateButton.textContent = months[monthToRenderTasks] + '/' + yearToRenderTasks;
  selectedYearTitle.textContent = yearToRenderTasks;

  dateButton.addEventListener('click', () => {
    datePickerContainer.classList.toggle('visible');
  });

  selectYear((newYear) => {
    localStorage.setItem('yearToRenderTasks', newYear);
    selectedYearTitle.textContent = newYear;
    dateButton.textContent = months[monthToRenderTasks] + '/' + yearToRenderTasks;
    yearToRenderTasks = newYear;
  });

  selectMonth((newMonth) => {
    monthToRenderTasks = newMonth;
    dateButton.textContent = months[newMonth] + '/' + yearToRenderTasks;
    localStorage.setItem('monthToRenderTasks', newMonth);

    //TODO: Buscar novas tarefas na API
    renderCalendar(tasks, yearToRenderTasks, monthToRenderTasks);
    datePickerContainer.classList.remove('visible');
  });
}

function setupMenu(){
  let menu_buttons = document.querySelectorAll('.menu__button');

  menu_buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      let option = e.currentTarget.dataset.option;
      if (option === 'calendar') {
        renderCalendar(tasks, yearToRenderTasks, monthToRenderTasks);
      } 
      else if (option === 'kanban') {
          renderKanban(tasks);
      }
      });
  });
}
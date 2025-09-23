import {renderCalendar} from './calendar.js'
import {renderKanban} from './kanban.js'
import './theme.js'

let tasks = {};

fetch('./tasks.json')
  .then(response => response.json())
  .then(data => {
    tasks = data;
    renderCalendar(tasks);
  })
  .catch(error => console.error('Error loading tasks:', error));

renderCalendar(tasks);

let buttons = document.querySelectorAll('.menu__button');

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let option = e.currentTarget.dataset.option;
    if (option === 'calendar') {
      renderCalendar(tasks);
    } 
    else if (option === 'kanban') {
        renderKanban(tasks);
    }
    });
});
    
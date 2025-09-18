import {renderCalendar} from './calendar.js'
import {renderKanban} from './kanban.js'
import './theme.js'

let response = await fetch("../tasks.json");
let tasks = await response.json();

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
    
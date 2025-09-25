import { monthToRenderTasks, tasks, yearToRenderTasks } from "./calendar-setup.js";
import { renderCalendar } from "./calendar.js";
import { renderKanban } from "./kanban.js";

export function setupMenu(){
  let buttons = document.querySelectorAll('.menu__button');
  
  // Add event listeners to menu buttons to switch views
  buttons.forEach(button => {
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
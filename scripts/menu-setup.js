import { monthToRenderTasks, setupCalendar, yearToRenderTasks } from "./calendar-setup.js";
import { renderCalendar } from "./calendar.js";
import { renderKanban } from "./kanban.js";
import { getTasks } from "./states/task-state.js";
import { setCurrentView } from "./states/view-state.js";

export function setupMenu(){
  let buttons = document.querySelectorAll('.menu__button');
  
  // Add event listeners to menu buttons to switch views
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      let option = e.currentTarget.dataset.option;
      if (option === 'calendar') {
        setCurrentView('calendar');
        renderCalendar(getTasks(), yearToRenderTasks, monthToRenderTasks);
      } 
      else if (option === 'kanban') {
          setCurrentView('kanban');
          renderKanban(getTasks());
      }
    });
  });
}
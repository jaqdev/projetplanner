import { renderCalendar } from "./calendar.js";
import { renderKanban } from "./kanban.js";
import { getMonthToRenderTasks, getYearToRenderTasks } from "./states/date-state.js";
import { getTasks } from "./states/task-state.js";
import { setCurrentView } from "./states/view-state.js";

export function setupMenu(){
  toggleMenuSize();

  let buttons = document.querySelectorAll('.menu__button');
  
  // Add event listeners to menu buttons to switch views
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      let option = e.currentTarget.dataset.option;
      if (option === 'calendar') {
        setCurrentView('calendar');
        renderCalendar(getTasks(), getYearToRenderTasks(), getMonthToRenderTasks());
      } 
      else if (option === 'kanban') {
          setCurrentView('kanban');
          renderKanban(getTasks());
      }
    });
  });
}

export function toggleMenuSize(){
  let burgerButton = document.querySelector('.burger-menu');
  
  burgerButton.addEventListener("click", () => {

    const menuSidebar = document.querySelector(".menu__sidebar");
    menuSidebar.classList.toggle("minimized");
  });
  
}
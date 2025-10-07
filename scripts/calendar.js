import { renderTaskListModal } from './task-list-modal.js';
import { createElement, formatTasksToCalendar } from './utils.js';

export const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];


/**
 * Gera um array representando os dias de um calendário mensal.
 * Cada elemento contém a data e se pertence ao mês atual.
 * Inclui dias do mês anterior e seguinte para completar as semanas.
 *
 * @returns {Array} Array de objetos com { date: Date, currentMonth: boolean }
 */
export function generateCalander(year, month) {
    const CURRENT_DATE = new Date(year, month);
    const CURRENT_MONTH = CURRENT_DATE.getMonth();
    const CURRENT_YEAR = CURRENT_DATE.getFullYear();

    let firstDateOfCorrentMonth = new Date(CURRENT_YEAR, CURRENT_MONTH, 1);
    let lastDateOfCurrentMonth = new Date(CURRENT_YEAR, CURRENT_MONTH + 1, 0);
    let lastDateOfPreviousMonth = new Date(CURRENT_YEAR, CURRENT_MONTH, 0);

    let daysToFillBefore = firstDateOfCorrentMonth.getDay() -1 < 0 ? 6 : firstDateOfCorrentMonth.getDay() -1;
    let daysToFillAfter = Math.abs(lastDateOfCurrentMonth.getDay() - 7) <= 6 ? Math.abs(lastDateOfCurrentMonth.getDay() - 7) : 0;
    let calendar = [];

    for (let i = daysToFillBefore; i > 0; i--) {
        calendar.push({date: new Date(CURRENT_YEAR, CURRENT_MONTH - 1, lastDateOfPreviousMonth.getDate() - i + 1), currentMonth: false});
    }

    for (let i = 1; i <= lastDateOfCurrentMonth.getDate(); i++) {
        calendar.push({date: new Date(CURRENT_YEAR, CURRENT_MONTH, i), currentMonth: true});
    }
    
    for (let i = 1; i <= daysToFillAfter; i++) {
        calendar.push({date: new Date(CURRENT_YEAR, CURRENT_MONTH + 1, i), currentMonth: false});
    }
    
    return calendar;
}

/**
 * Renderiza o calendário na tela.
 * Busca os dias do mês, divide em semanas e exibe cada dia com a quantidade de tarefas.
 * Remove semanas antigas antes de adicionar as novas.
 * 
 */
export async function renderCalendar(tasks = [], year = new Date().getFullYear(), month = new Date().getMonth()) {

  console.log("Renderizando calendário para:", month, "/", year);

  displaytDateControls();
  
  tasks = formatTasksToCalendar(tasks);

  let calendar = generateCalander(year, month);

  // Datas do calendário para manda a api
  let firstDate = calendar[0].date;
  let lastDate = calendar[calendar.length - 1].date;

  console.log("Renderizando calendário para:", firstDate.toLocaleDateString('en-CA'), "até", lastDate.toLocaleDateString('en-CA'));

  const viewContent = document.querySelector('.view-content');
  const calendarContainer = document.createElement('div');
  calendarContainer.classList.add('calendar-container');

  viewContent.innerHTML = "";

  renderCalendarTopBar();

    calendar.forEach(day => {
      let dayCell = document.createElement('div');
      dayCell.classList.add('calendar__day');
      let dateFormatted = day.date.toLocaleDateString('en-CA');
      let calendarDate =  createElement('span', 'calendar__date', day.date.getDate());
      let calendarTask = createElement('span', 'calendar__task', tasks[dateFormatted]?.length || "0");

      let current = new Date();
      if (
            day.date.getDate() === current.getDate() &&
            day.date.getMonth() === current.getMonth() &&
            day.date.getFullYear() === current.getFullYear()
          ) {
            calendarDate.classList.add('today');
          }

      day.currentMonth == false && calendarDate.classList.add('inactive');
      day.currentMonth == false && calendarTask.classList.add('inactive');
      
      dayCell.addEventListener('click', () => {
        renderTaskListModal(tasks, dateFormatted);
      });
      
      dayCell.appendChild(calendarDate);
      dayCell.appendChild(calendarTask);
      calendarContainer.appendChild(dayCell);
    });

    viewContent.appendChild(calendarContainer);

  console.log("Calendário renderizado com sucesso.");
}

export function displaytDateControls(){
  document.querySelector(".date-controls").classList.add('visible');
}

export function hideDateControls(){
  document.querySelector(".date-controls").classList.remove('visible');
}

/**
 * Renderiza a barra superior do calendário mostrando os dias da semana.
 */
function renderCalendarTopBar() {
  let weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  let viewContent = document.querySelector('.view-content');

  let topBar = createElement('section', 'calendar__top-bar');

  weekDays.forEach(day => {
    let dayElement = createElement('span', 'top-bar__days', day);
    topBar.appendChild(dayElement);
  });

  viewContent.appendChild(topBar);
}

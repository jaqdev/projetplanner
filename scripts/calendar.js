import { chunk, createElement } from './utils.js';

export const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

/**
 * Gera um array representando os dias de um calendário mensal.
 * Cada elemento contém a data e se pertence ao mês atual.
 * Inclui dias do mês anterior e seguinte para completar as semanas.
 *
 * @returns {Array} Array de objetos com { date: Date, currentMonth: boolean }
 */
export function generateCalander(year, month) {
    const DATE_TO_RENDER = new Date(year, month);
    const MONTH_TO_RENDER = DATE_TO_RENDER.getMonth();
    const YEAR_TO_RENDER = DATE_TO_RENDER.getFullYear();

    let firstDateOfSelectedMonth = new Date(YEAR_TO_RENDER, MONTH_TO_RENDER, 1);
    let lastDateOfSelectedMonth = new Date(YEAR_TO_RENDER, MONTH_TO_RENDER + 1, 0);
    let lastDateOfPreviousSelectedMonth = new Date(YEAR_TO_RENDER, MONTH_TO_RENDER, 0);

    let daysToFillBefore = firstDateOfSelectedMonth.getDay() -1 <0 ? 6 : firstDateOfSelectedMonth.getDay() -1;
    let daysToFillAfter = Math.abs(lastDateOfSelectedMonth.getDay() - 7);
    let calendar = [];

    for (let i = daysToFillBefore; i > 0; i--) {
        calendar.push({date: new Date(YEAR_TO_RENDER, MONTH_TO_RENDER - 1, lastDateOfPreviousSelectedMonth.getDate() - i + 1), currentMonth: false});
    }

    for (let i = 1; i <= lastDateOfSelectedMonth.getDate(); i++) {
        calendar.push({date: new Date(YEAR_TO_RENDER, MONTH_TO_RENDER, i), currentMonth: true});
    }
    
    for (let i = 1; i <= daysToFillAfter; i++) {
        calendar.push({date: new Date(YEAR_TO_RENDER, MONTH_TO_RENDER + 1, i), currentMonth: false});
    }
    
    return calendar;
}

/**
 * Renderiza o calendário na tela.
 * Busca os dias do mês, divide em semanas e exibe cada dia com a quantidade de tarefas.
 * Remove semanas antigas antes de adicionar as novas.
 * 
 * Utiliza os dados de tarefas do arquivo 'tasks.json'.
 */
export async function renderCalendar(tasks, year = new Date().getFullYear(), month = new Date().getMonth()) {

  let calendar = generateCalander(year, month);

  // Datas do calendário para manda a api
  let firstDate = calendar[0].date;
  let lastDate = calendar[calendar.length - 1].date;

  console.log("Renderizando calendário para:", firstDate.toLocaleDateString('en-CA'), "até", lastDate.toLocaleDateString('en-CA'));

  const weeks = chunk(calendar);

  const mainContainer = document.querySelector('.main__container');

  mainContainer.innerHTML = "";

  renderCalendarTopBar();

  weeks.forEach(week => {
    let weekRow = document.createElement('div');
    weekRow.classList.add('calendar__week');
    week.forEach(day => {
        
      let dayCell = document.createElement('div');
      dayCell.classList.add('calendar__day');
      day.currentMonth == false && dayCell.classList.add('inactive');
      dayCell.innerHTML = `<span class="calendar__date">${day.date.getDate()}</span><span class="calendar__task">${tasks[day.date.toLocaleDateString('en-CA')]?.length || 0}</span>`;
      weekRow.appendChild(dayCell);
    });
    document.querySelector('.main__container').appendChild(weekRow);
  });

  console.log("Calendário renderizado com sucesso.");
}


/**
 * Renderiza a barra superior do calendário mostrando os dias da semana.
 */
function renderCalendarTopBar() {
  let weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  let mainContainer = document.querySelector('.main__container');

  let topBar = createElement('section', 'calendar__top-bar');

  weekDays.forEach(day => {
    let dayElement = createElement('span', 'top-bar__days', day);
    topBar.appendChild(dayElement);
  });

  mainContainer.appendChild(topBar);
}

/**
 * Configura a seleção de ano na barra superior do calendário.
 * 
 * @param {function(number): void} onYearChange - Função de callback que é chamada
 *        quando o usuário clica para mudar o ano. Recebe o novo ano como parâmetro.
 *
 */
export function selectYear(onYearChange) {
  const prevYearButton = document.querySelector('.title_bar__prev-year');
  const nextYearButton = document.querySelector('.title_bar__next-year');

  prevYearButton.addEventListener('click', () => onYearChange(parseInt(document.getElementById('title_bar__selected-year').textContent) - 1));
  nextYearButton.addEventListener('click', () => onYearChange(parseInt(document.getElementById('title_bar__selected-year').textContent) + 1));
}

/**
 * Configura a seleção de mês na barra superior do calendário.
 * 
 * @param {function(number): void} onMonthChange - Função de callback chamada
 *        quando o usuário clica em um mês. Recebe o índice do mês (0-11) como parâmetro.
 *
 */
export function selectMonth(onMonthChange) {
    let monthsButtosns = document.querySelectorAll('.title-bar__month-option');

    monthsButtosns.forEach(btn => {
      btn.addEventListener('click', (e) => {
      let selectedMonth = parseInt(e.currentTarget.dataset.month);
        if (onMonthChange) onMonthChange(selectedMonth); // chama callback
      });

    });
}
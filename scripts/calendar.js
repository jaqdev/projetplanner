import { chunk } from './utils.js';

/**
 * Gera um array representando os dias de um calendário mensal.
 * Cada elemento contém a data e se pertence ao mês atual.
 * Inclui dias do mês anterior e seguinte para completar as semanas.
 *
 * @returns {Array} Array de objetos com { date: Date, currentMonth: boolean }
 */
export function generateCalander(){
    const CURRENT_DATE = new Date();
    const CURRENT_MONTH = CURRENT_DATE.getMonth();
    const CURRENT_YEAR = CURRENT_DATE.getFullYear();

    let firstDateOfCorrentMonth = new Date(CURRENT_YEAR, CURRENT_MONTH, 1);
    let lastDateOfCurrentMonth = new Date(CURRENT_YEAR, CURRENT_MONTH + 1, 0);
    let lastDateOfPreviousMonth = new Date(CURRENT_YEAR, CURRENT_MONTH, 0);

    let daysToFillBefore = firstDateOfCorrentMonth.getDay() -1 <0 ? 6 : firstDateOfCorrentMonth.getDay() -1;
    let daysToFillAfter = Math.abs(lastDateOfCurrentMonth.getDay() - 7);
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
 * Utiliza os dados de tarefas do arquivo 'tasks.json'.
 */
export async function renderCalendar(){

  let calendar = generateCalander();

  const weeks = chunk(calendar);

  const calendarDays = document.querySelector('.calendar__days');

  let request = await fetch('tasks.json');
  let tasks = await request.json();

  // Remove só os elementos de semana, não a top-bar
  calendarDays.querySelectorAll('.calendar__week').forEach(week => week.remove());

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
    document.querySelector('.calendar__days').appendChild(weekRow);
  });

  console.log("Calendário renderizado com sucesso.");
}
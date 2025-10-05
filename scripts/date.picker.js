import { months, renderCalendar, } from "./calendar.js";
import { getMonthToRenderTasks, getYearToRenderTasks, setMonthToRenderTasks, setYearToRenderTasks } from "./states/date-state.js";
import { getTasks } from "./states/task-state.js";

export function setupDatePicker() {
        const dateButton = document.querySelector('.title-bar__month');
        const datePickerContainer = document.querySelector('.title-bar__date-picker');
        const selectedYearTitle = document.getElementById('title_bar__selected-year');

        dateButton.textContent = months[getMonthToRenderTasks()] + '/' + getYearToRenderTasks();
        selectedYearTitle.textContent = getYearToRenderTasks();

        // Toggle date picker visibility
        dateButton.addEventListener('click', () => {
            datePickerContainer.classList.toggle('visible');
        });

        // Buttons to change year
        const prevYearButton = document.querySelector('.title_bar__prev-year');
        const nextYearButton = document.querySelector('.title_bar__next-year');

        // Event listeners to change year 
        prevYearButton.addEventListener('click', () => {
            setYearToRenderTasks(getYearToRenderTasks() - 1);
            updateYear();
        });

        nextYearButton.addEventListener('click', () => {
            setYearToRenderTasks(getYearToRenderTasks() + 1);
            updateYear();
        });

        let monthsButtosns = document.querySelectorAll('.title-bar__month-option');

        // Add event listeners to change month
        monthsButtosns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                setMonthToRenderTasks(parseInt(e.currentTarget.dataset.month));
                updateMonth();                
            });
        });

        function updateYear(){
            localStorage.setItem('yearToRenderTasks', getYearToRenderTasks());
            selectedYearTitle.textContent = getYearToRenderTasks();
            dateButton.textContent = months[getMonthToRenderTasks()] + '/' + getYearToRenderTasks();
        }

        function updateMonth(){
            dateButton.textContent = months[getMonthToRenderTasks()] + '/' + getYearToRenderTasks();
            renderCalendar(getTasks(), getYearToRenderTasks(), getMonthToRenderTasks());
            datePickerContainer.classList.remove('visible');
        }
}


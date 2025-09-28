import { months, renderCalendar, } from "./calendar.js";
import { getTasks } from "./states/task-state.js";

export function setupDatePicker() {
        const dateButton = document.querySelector('.title-bar__month');
        const datePickerContainer = document.querySelector('.title-bar__date-picker');
        const selectedYearTitle = document.getElementById('title_bar__selected-year');

        let monthToRenderTasks = localStorage.getItem('monthToRenderTasks') || (new Date().getMonth());
        let yearToRenderTasks = localStorage.getItem('yearToRenderTasks') || new Date().getFullYear();

        dateButton.textContent = months[monthToRenderTasks] + '/' + yearToRenderTasks;
        selectedYearTitle.textContent = yearToRenderTasks;

        // Toggle date picker visibility
        dateButton.addEventListener('click', () => {
            datePickerContainer.classList.toggle('visible');
        });

        // Buttons to change year
        const prevYearButton = document.querySelector('.title_bar__prev-year');
        const nextYearButton = document.querySelector('.title_bar__next-year');

        // Event listeners to change year 
        prevYearButton.addEventListener('click', () => {
            yearToRenderTasks -= 1;
            updateYear();
        });

        nextYearButton.addEventListener('click', () => {
            yearToRenderTasks += 1;
            updateYear();
        });

        let monthsButtosns = document.querySelectorAll('.title-bar__month-option');

        // Add event listeners to change month
        monthsButtosns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                monthToRenderTasks = e.currentTarget.dataset.month;
                updateMonth();                
            });
        });

        function updateYear(){
            localStorage.setItem('yearToRenderTasks', yearToRenderTasks);
            selectedYearTitle.textContent = yearToRenderTasks;
            dateButton.textContent = months[monthToRenderTasks] + '/' + yearToRenderTasks;
        }

        function updateMonth(){
            dateButton.textContent = months[monthToRenderTasks] + '/' + yearToRenderTasks;
            localStorage.setItem('monthToRenderTasks', monthToRenderTasks);
            renderCalendar(getTasks(), yearToRenderTasks, monthToRenderTasks);
            datePickerContainer.classList.remove('visible');
        }
}


import { renderCalendar } from "./calendar.js";
import { monthToRenderTasks, yearToRenderTasks} from "./calendar-setup.js";
import { formatTasksToCalendar } from "./utils.js";
import { addTask, getTasks, loadTasksFromStorage, saveTasksToStorage } from "./states.js";

export function handleFormSubmit(event){
    event.preventDefault();
    const form = event.target;
    
    const formData = new FormData(form);
    const formJson = {};
    formJson["id"]  = crypto.randomUUID();
    formJson["status"] = "todo";
    for (const [key, value] of formData) {
        formJson[key] = value;
    }

    let validTitle = validateTitle(formJson["title"]);

    if (!validTitle){
        alert("Title can only contain letters and numbers");
        return;
    }

    addTask(formJson);
    saveTasksToStorage();
    form.reset();
    document.querySelector('.modal-overlay').remove();
    renderCalendar(formatTasksToCalendar(getTasks()), yearToRenderTasks, monthToRenderTasks);
}

export function handleCheckEntireDay(){
    const timeInput = document.getElementById("task-time-input");
    timeInput.classList.toggle("invisible");
    timeInput.value = null;
}

function validateTitle(title){
   return new RegExp('^[A-Za-z0-9\\s]+$').test(title); 
}

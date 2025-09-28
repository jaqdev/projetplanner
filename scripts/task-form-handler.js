import { renderCalendar } from "./calendar.js";
import { monthToRenderTasks, yearToRenderTasks} from "./calendar-setup.js";
import { addTask, getTasks, saveTasksToStorage } from "./states/task-state.js";
import { getCurrentView } from "./states/view-state.js";
import { renderKanban } from "./kanban.js";

export function handleFormSubmit(event){
    event.preventDefault();
    const form = event.target;
    
    const formData = new FormData(form);
    const formJson = {};
    formJson["id"]  = crypto.randomUUID();
    formJson["status"] = "todo";
    for (const [key, value] of formData) {
        if(key === "entire-day"){
            formJson["entireDay"] = value === "on" ? true : false;
            continue;
        }
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
    if(getCurrentView() === 'calendar'){
        renderCalendar(getTasks(), yearToRenderTasks, monthToRenderTasks);
        return;
    }
    if(getCurrentView() === 'kanban'){
        renderKanban(getTasks());
        return;
    }
}

export function handleCheckEntireDay(){
    const timeInput = document.getElementById("task-time-input");
    timeInput.classList.toggle("invisible");
    timeInput.value = null;
}

function validateTitle(title){
   return new RegExp('^[A-Za-z0-9\\s]+$').test(title); 
}

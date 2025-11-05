import { renderCalendar } from "./calendar.js";
import { addTask, getTasks, saveTasksToStorage } from "./states/task-state.js";
import { getCurrentView } from "./states/view-state.js";
import { renderKanban } from "./kanban.js";
import { getMonthToRenderTasks, getYearToRenderTasks } from "./states/date-state.js";
import { getAccessToken} from "./states/access-token.js";
import { apiFetch } from "./api.js";

export async function handleFormSubmit(event){
    event.preventDefault();
    const form = event.target;
    
    const formData = new FormData(form);

    let title = formData.get('title')
    let description = formData.get('description')
    let date = formData.get('date')
    let time = formData.get('time')
    let entireDay = formData.get('entire-day')
    let priority = formData.get('priority')

    let data = {
        title,
        description,
        date,
        time,
        entireDay,
        priority
    };

    let validTitle = validateTitle(title);

    if (!validTitle){
        alert("Title can only contain letters and numbers");
        return;
    }

    let res = await apiFetch('/tasks', {
        method: "POST",
        body: JSON.stringify({
            titulo: title,
            descricao: description,
            prioridade: "BAIXA",
            data_limite: new Date(date)
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + getAccessToken()
        },
    });

    if(res.status === 201){
        addTask(res.tarefa);
        saveTasksToStorage();
    }

    form.reset();

    document.querySelector('.modal-overlay').remove();
    if(getCurrentView() === 'calendar'){
        renderCalendar(getTasks(), getYearToRenderTasks(), getMonthToRenderTasks());
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

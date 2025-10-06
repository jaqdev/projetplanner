import { renderCalendar } from "./calendar.js";
import { renderKanban } from "./kanban.js";
import { getMonthToRenderTasks, getYearToRenderTasks } from "./states/date-state.js";
import { deleteTask, getTasks, saveTasksToStorage, updateTask } from "./states/task-state.js";
import { getCurrentView } from "./states/view-state.js";
import { handleCheckEntireDay } from "./task-form-handler.js";
import { renderTaskListModal } from "./task-list-modal.js";
import { createInputElement, createLabel, createTextAreaElement } from "./task-modal-setup.js";
import { createElement, formatTasksToCalendar } from "./utils.js";

export function renderTaskDetailsModal(task) {

    console.log(task.date);
    

    const body = document.querySelector('body');

    // Cria o container do modal
    const modalContainer = document.createElement('form');
    modalContainer.classList.add('task-details__modal-container');
    modalContainer.addEventListener("submit", handleFormSubmit);

    // Cria o overlay do modal
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('task-detail__modal-overlay');
    modalOverlay.addEventListener("click", (e) => {
        // Fecha apenas se o clique foi fora do form
        if (!modalContainer.contains(e.target)) {
            modalOverlay.remove();
        }
    });

    // Cria o titulo do modal
    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('task-details__modal-title');
    modalTitle.textContent = 'Detalhes da Tarefa';

    // --- Campo: Título ---
    const taskTitleLabel = createLabel("Título", "task-title-input");
    const taskTitleInput = createInputElement("text", "title", "Ex: Fazer a lista de Cálculo");
    taskTitleInput.id = "task-title-input"; // Associa o input ao label
    taskTitleInput.required = true;
    taskTitleInput.value = task.title || "";
    taskTitleInput.disabled = true;

    // --- Campo: Data ---
    const dateContainer = createElement("div", "date-container");
    const taskDateLabel = createLabel("Data", "task-date-input");
    const taskDateInput = createInputElement("date", "date");
    const taskTimeInput = createInputElement("time", "time");
    taskDateInput.id = "task-date-input";
    taskTimeInput.id = "task-time-input";
    taskDateInput.value = task.date || "";
    taskTimeInput.value = task.time || "";
    taskDateInput.required = true;
    taskTimeInput.required = !task.entireDay;
    taskDateInput.disabled = true;
    taskTimeInput.disabled = true;
    if(task.entireDay){
        taskTimeInput.classList.add("invisible");
    }
    dateContainer.appendChild(taskDateInput);
    dateContainer.appendChild(taskTimeInput);

    // --- Campo: Dia inteiro ---
    const entireDayContainer = createElement("div", "entire-day-container");
    const entireDayLabel = createLabel("Dia inteiro", "entire-day-input");
    const entireDayInput = createInputElement("checkbox", "entire-day");
    entireDayInput.id = "entire-day-input";
    entireDayInput.checked = task.entireDay || false;
    entireDayInput.disabled = true;
    entireDayContainer.appendChild(entireDayInput);
    entireDayContainer.appendChild(entireDayLabel);
    entireDayInput.addEventListener("change", handleCheckEntireDay);
    
    // --- Campo: Descrição ---
    const taskDescriptionLabel = createLabel("Descrição", "task-description-input");
    const taskDescriptionInput = createTextAreaElement("description", "Detalhes da tarefa...");
    taskDescriptionInput.id = "task-description-input";
    taskDescriptionInput.value = task.description || "";
    taskDescriptionInput.disabled = true;

    // --- Campo: Prioridade (Radio Buttons) ---
    const priorityLabel = createLabel("Prioridade"); // Label geral para o grupo
    const priorityContainer = createElement("div", "priority-container");

    // Opções de prioridade
    const priorities = [
        { value: "low", label: "Baixa" },
        { value: "medium", label: "Média" },
        { value: "high", label: "Alta" }
    ];

    priorities.forEach(priority => {
        const radioWrapper = createElement("div", "radio-wrapper");

        const radioInput = createInputElement("radio", "priority", "");
        radioInput.value = priority.value;
        radioInput.disabled = true;
        radioInput.id = `priority-${priority.value}`;
        radioInput.checked = priority.value === task.priority;

        const radioLabel = createLabel(priority.label, `priority-${priority.value}`);
        
        radioWrapper.append(radioInput, radioLabel);
        priorityContainer.append(radioWrapper);
    });

    const buttonsContainer = createElement("div", "buttons-container");

    const editTaskButton = createElement("button", "edit-task-button", "Editar");
    editTaskButton.addEventListener("click", handleEditButton);

    const deleteTaskButton = createElement("button", "delete-task-button", "Excluir");
    deleteTaskButton.addEventListener("click", handleDeleteTask);

    buttonsContainer.append(editTaskButton, deleteTaskButton);

    modalContainer.append(
        modalTitle,
        taskTitleLabel,
        taskTitleInput,
        taskDateLabel,
        dateContainer,
        entireDayContainer,
        taskDescriptionLabel,
        taskDescriptionInput,
        priorityLabel,
        priorityContainer,
        buttonsContainer
    );

    modalOverlay.appendChild(modalContainer);
    body.appendChild(modalOverlay);

    function handleEditButton(event){
        event.preventDefault();
        event.stopPropagation();
    
        event.target.remove();
    
        const saveButton = createElement("button", "save-task-button", "Salvar");
        saveButton.type = "submit";

        buttonsContainer.prepend(saveButton);

        taskTitleInput.disabled = false;
        taskDescriptionInput.disabled = false;
        taskDateInput.disabled = false;
        taskTimeInput.disabled = false;
        entireDayInput.disabled = false;
        taskDateInput.disabled = false;
        priorityContainer.childNodes.forEach(radioWrapper => {
            radioWrapper.firstChild.disabled = false;
        });
        
    }

    function handleFormSubmit(event){
         event.preventDefault();
    
        const formData = new FormData(modalContainer);
        const formJson = {};
        formJson["id"]  = task.id;
        formJson["status"] = task.status;
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

        updateTask(task.id, formJson);
        saveTasksToStorage();
        modalOverlay.remove();
       if(getCurrentView() === 'calendar'){
            document.querySelector(".modal-overlay").remove();
            renderCalendar(getTasks(), getYearToRenderTasks(), getMonthToRenderTasks());
            renderTaskListModal(formatTasksToCalendar(getTasks()), task.date);
            return;
        }
        if(getCurrentView() === 'kanban'){
            renderKanban(getTasks());
            return;
        }
    }

    function handleDeleteTask(event){
        event.preventDefault();
        event.stopPropagation();

        deleteTask(task.id);
        saveTasksToStorage();
        modalOverlay.remove();
        if(getCurrentView() === 'calendar'){
            document.querySelector(".modal-overlay").remove();
            renderCalendar(getTasks(), getYearToRenderTasks(), getMonthToRenderTasks());
            renderTaskListModal(formatTasksToCalendar(getTasks()), task.date);
            return;
        }
        if(getCurrentView() === 'kanban'){
            renderKanban(getTasks());
            return;
        }
    }

    function validateTitle(title){
        return new RegExp('^[A-Za-z0-9\\s]+$').test(title); 
    }

}

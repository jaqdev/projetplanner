import { handleCheckEntireDay, handleFormSubmit } from "./task-form-handler.js";
import { createElement } from "./utils.js";

export function setupCreateTaskButton(){

    let createTaskButton = document.getElementById("create-task-button");

    createTaskButton.addEventListener("click", () => {
        renderCreateTaskModal();
    });

}

function renderCreateTaskModal() {

    const body = document.getElementsByTagName("body")[0];

    if(body.querySelector("form") !== null){
        return;
    }

    // Cria o container principal do formulário
    const formElement = createElement("form", "create-task-modal");
    formElement.onsubmit = handleFormSubmit;

    // --- Overlay que cobre a tela ---
    const overlay = createElement("div", "modal-overlay");
    overlay.addEventListener("click", (e) => {
        // Fecha apenas se o clique foi fora do form
        if (!formElement.contains(e.target)) {
            overlay.remove();
        }
    });

    // --- Campo: Título ---
    const taskTitleLabel = createLabel("Título", "task-title-input");
    const taskTitleInput = createInputElement("text", "task-title", "Ex: Fazer a lista de Cálculo");
    taskTitleInput.id = "task-title-input"; // Associa o input ao label
    taskTitleInput.required = true; // Torna o campo obrigatório

    // --- Campo: Data ---
    const dateContainer = createElement("div", "date-container");
    const taskDateLabel = createLabel("Data", "task-date-input");
    const taskDateInput = createInputElement("date", "task-date");
    const taskTimeInput = createInputElement("time", "task-time");
    taskDateInput.id = "task-date-input";
    taskTimeInput.id = "task-time-input";
    taskDateInput.required = true;
    dateContainer.appendChild(taskDateInput);
    dateContainer.appendChild(taskTimeInput);

    // --- Campo: Dia inteiro ---
    const entireDayContainer = createElement("div", "entire-day-container");
    const entireDayLabel = createLabel("Dia inteiro", "entire-day-input");
    const entireDayInput = createInputElement("checkbox", "entire-day");
    entireDayInput.id = "entire-day-input";
    entireDayInput.checked = false;
    entireDayContainer.appendChild(entireDayInput);
    entireDayContainer.appendChild(entireDayLabel);
    entireDayInput.addEventListener("change", handleCheckEntireDay);
    
    // --- Campo: Descrição ---
    const taskDescriptionLabel = createLabel("Descrição", "task-description-input");
    const taskDescriptionInput = createTextAreaElement("task-description", "Detalhes da tarefa...");
    taskDescriptionInput.id = "task-description-input";

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

        const radioInput = createInputElement("radio", "priority-input", "");
        radioInput.value = priority.value;
        radioInput.id = `priority-${priority.value}`;
        radioInput.checked = priority.value === "low";

        const radioLabel = createLabel(priority.label, `priority-${priority.value}`);
        
        radioWrapper.append(radioInput, radioLabel);
        priorityContainer.append(radioWrapper);
    });

    // --- Botão de Envio ---
    const submitButton = createElement("button", "submit-button", "Salvar");

    // --- Adiciona todos os elementos ao formulário ---
    formElement.append(
        taskTitleLabel,
        taskTitleInput,
        taskDateLabel,
        dateContainer,
        entireDayContainer,
        taskDescriptionLabel,
        taskDescriptionInput,
        priorityLabel,
        priorityContainer,
        submitButton,
    );

    overlay.append(formElement);

    body.append(overlay);

}

/**
 * Cria um elemento <label>.
 * @param {string} text - O texto do label.
 * @param {string} [forId] - O ID do input que este label descreve.
 * @returns {HTMLLabelElement} O elemento label criado.
 */
function createLabel(text, forId) {
    const element = document.createElement("label");
    element.innerHTML = text;
    if (forId) {
        element.htmlFor = forId;
    }
    return element;
}

/**
 * Cria um elemento <input>.
 * @param {string} type - O tipo do input (ex: 'text', 'date', 'radio').
 * @param {string} name - O atributo 'name' do input.
 * @param {string} [placeholder] - O texto de placeholder.
 * @returns {HTMLInputElement} O elemento input criado.
 */
function createInputElement(type, name, placeholder) {
    const element = document.createElement("input");
    element.type = type;
    element.name = name;
    if (placeholder) {
        element.placeholder = placeholder;
    }
    return element;
}

/**
 * Cria um elemento <textarea>.
 * @param {string} name - O atributo 'name' do textarea.
 * @param {string} [placeholder] - O texto de placeholder.
 * @returns {HTMLTextAreaElement} O elemento textarea criado.
 */
function createTextAreaElement(name, placeholder) {
    const element = document.createElement("textarea");
    element.name = name;
    if (placeholder) {
        element.placeholder = placeholder;
    }
    return element;
}
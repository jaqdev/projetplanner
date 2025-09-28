/**
 * Divide um array em subarrays de tamanho 7.
 * Útil para separar os dias do calendário em semanas.
 *
 * @param {Array} arr - Array a ser dividido.
 * @returns {Array[]} Array de subarrays com até 7 elementos cada.
 */
export function chunk(arr) {
    const size = 7;
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

/**
 * Cria um elemento HTML com tag, classe e texto opcional.
 * @param {string} tag - A tag do elemento HTML (ex: 'div', 'button', 'span').
 * @param {string} className - Classe CSS que será adicionada ao elemento.
 * @param {string} [text] - Texto opcional que será inserido dentro do elemento.
 * @returns {HTMLElement} O elemento HTML criado.
 */
export function createElement(tag, className, text) {
    const element = document.createElement(tag);
    element.classList.add(className);
    if (text) {
        element.innerText = text;
    }

    return element;
}

export function formatTasksToCalendar(tasks = []) {
    if (tasks.length === 0) return {};

    return tasks.reduce((acc, task) => {
        let {date, title, time, priority, description, status} = task;
        let entireDay = task['entire-day'] === "on" ? true : false;
        const formattedTask = { title, description, date, time, priority, status, entireDay };

        if (!acc[date]) {
            acc[date] = [formattedTask];
            return acc;
        }
        acc[date].push(formattedTask);
        return acc;
    }, {});
}

export function formatTasksToKanban(tasks = []) {
    if (tasks.length === 0) return {};

    return tasks.reduce((acc, task) => {
        let {date, title, time, priority, description, status} = task;
        let entireDay = task['entire-day'] === "on" ? true : false;

        const formattedTask = { title, description, date, time, priority, status, entireDay };

        if (!acc[status]) {
            acc[status] = [formattedTask];
            return acc;
        }
        acc[status].push(formattedTask);
        return acc;
    }, {});
}
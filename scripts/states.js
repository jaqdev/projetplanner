// Global array to hold tasks
let tasks = []

export function setTasks(newTasks){
    tasks = newTasks;
}

export function getTasks(){
    return tasks;
}

export function addTask(task){
    tasks.push(task);
}

export function saveTasksToStorage() {
  localStorage.setItem('tasks', JSON.stringify(getTasks()));
}

export function loadTasksFromStorage() {
  const stored = JSON.parse(localStorage.getItem('tasks')) || [];
  setTasks(stored);
}

// Simular api com tarefas vazias
export function initializeLocalStorage() {
    if (localStorage.getItem('tasks') === null) {
        localStorage.setItem('tasks', JSON.stringify([]));
    }
}
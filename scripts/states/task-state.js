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

export function deleteTask(id){
    tasks = tasks.filter(task => task.id !== id); 
}

export function findTaskById(id){
    return tasks.find(task => task.id === id);
}

export function updateTask(id, updatedTask){
    tasks = tasks.map(task => task.id === id ? {...task, ...updatedTask} : task);
}

export function saveTasksToStorage() {
  localStorage.setItem('tasks', JSON.stringify(getTasks()));
}

export function loadTasksFromStorage() {
  const stored = JSON.parse(localStorage.getItem('tasks')) || [];
  setTasks(stored);
}

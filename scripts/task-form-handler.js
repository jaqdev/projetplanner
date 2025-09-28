
export function handleFormSubmit(event){
    event.preventDefault();
    const form = event.target;
    
    const formData = new FormData(form);
    const formJson = {};
    for (const [key, value] of formData) {
        formJson[key] = value;
    }
    console.log(formJson);
}

export function handleCheckEntireDay(){
    const timeInput = document.getElementById("task-time-input");
    timeInput.classList.toggle("invisible");
    timeInput.value = null;
}
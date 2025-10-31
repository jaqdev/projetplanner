export function handleLogin(event){
    event.preventDefault();
    
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('senha');

    const errorMessage = document.querySelector('.error-message');

    if(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) === false){
        errorMessage.textContent = 'Por favor, insira um email válido.';
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if(user){
        errorMessage.textContent = '';
        document.cookie = `loggedInUser=${user.id}; path=/`;
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Email ou senha incorretos.';
    }

}
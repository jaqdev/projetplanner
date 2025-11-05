import {apiFetch} from '../api.js'
import { setAccessToken , getAccessToken} from '../states/access-token.js'

export async function handleLogin(event){
    event.preventDefault();
    
    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('senha');

    const errorMessage = document.querySelector('.error-message');

    if(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) === false){
        errorMessage.textContent = 'Por favor, insira um email válido.';
        return;
    }

    let res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, senha: password })
    });
    
    if(res.status === 200){
        localStorage.setItem("logged_user", JSON.stringify({email}));
        setAccessToken(res.token);
        window.location.href = "../index.html"
        return;
    }

    errorMessage.textContent = res.mensagem;

}
import { apiFetch } from "../api.js";
import { setAccessToken } from "../states/access-token.js"

export async function handleSignin(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const formData = new FormData(event.target);

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('senha');

    const errorMessage = document.querySelector('.error-message');


    if(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.])[A-Za-z\d@$!%*?&\.]{4,}$/).test(password) === false){
        errorMessage.textContent = 'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial.';
        return;
    }

    if(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) === false){
        errorMessage.textContent = 'Por favor, insira um email válido.';
        return;
    }

   console.log("Enviando dados para o servidor...");
    let res = await apiFetch("/auth/signin", {
        method: "POST",
        body: JSON.stringify({nome: name, email, senha: password}),
        errorMessage
    });

    if(res.status === 201){
        localStorage.setItem("logged_user", JSON.stringify({email}));
        window.location.href = './index.html';
        setAccessToken(res.token);
        return;
    }

    errorMessage.textContent = res.mensagem;
}
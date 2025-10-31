export function handleSignin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('senha');
    const confirmPassword = formData.get('confirmacao-senha');

    const errorMessage = document.querySelector('.error-message');


    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
        errorMessage.textContent = 'As senhas não coincidem.';
        return;
    }

    if(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.])[A-Za-z\d@$!%*?&\.]{4,}$/).test(password) === false){
        errorMessage.textContent = 'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial.';
        return;
    }

    if(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) === false){
        errorMessage.textContent = 'Por favor, insira um email válido.';
        return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados ao servidor
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Senha:', password);

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o email já está cadastrado
    if (users.some(user => user.email === email)) {
        errorMessage.textContent = 'Este email já está cadastrado.';
        return;
    }

    errorMessage.textContent = '';

    // Adiciona o novo usuário ao array
    users.push({ name, email, password, id: Math.random().toString(36).substring(2) });

    // Salva o array atualizado no localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Redireciona para a página de login ou outra página apropriada
    window.location.href = 'login.html';
}
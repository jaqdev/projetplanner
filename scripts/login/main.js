import { setupPasswordInputIconChange } from "./input-handler.js";
import { handleLogin } from "./handle-login.js";

document.addEventListener('DOMContentLoaded', () => {
    setupPasswordInputIconChange();

    const loginForm = document.querySelector('form');
    loginForm.addEventListener('submit', handleLogin);
});

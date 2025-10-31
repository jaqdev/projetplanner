import { setupPasswordInputIconChange } from "./input-handler.js";
import { loadSavedTheme } from "../theme.js";
import { handleLogin } from "./handle-login.js";

document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    setupPasswordInputIconChange();

    const loginForm = document.querySelector('form');
    loginForm.addEventListener('submit', handleLogin);
});

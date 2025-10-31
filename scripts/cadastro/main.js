import { setupPasswordInputIconChange } from "../login/input-handler.js";
import { loadSavedTheme } from "../theme.js";
import { handleSignin } from "./handle-signin.js";

document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    setupPasswordInputIconChange();

    const signinForm = document.querySelector("form");

    signinForm.addEventListener('submit', handleSignin);
}); 
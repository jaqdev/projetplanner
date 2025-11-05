import { setupPasswordInputIconChange } from "../login/input-handler.js";
import { handleSignin } from "./handle-signin.js";

document.addEventListener('DOMContentLoaded', () => {
    setupPasswordInputIconChange();

    const signinForm = document.querySelector("form");

    signinForm.addEventListener('submit', handleSignin);
}); 
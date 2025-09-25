export function setupPasswordInputIconChange() {
  const passwordInput = document.getElementById("senha");
  const passwordIcon = document.getElementById("visibility-icon");

  if (!passwordInput || !passwordIcon) {
    console.error("Password input or icon not found in the DOM.");
    return;
  }

  passwordIcon.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    passwordIcon.src = isPassword
      ? "./assets/icons/eye-invisible.svg"
      : "./assets/icons/eye-visible.svg";
  });
}

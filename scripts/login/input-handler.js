export function setupPasswordInputIconChange() {
  const passwordInputs = document.querySelectorAll("input[type='password']");
  const passwordIcons = document.querySelectorAll(".visibility-icon");

  console.log(passwordInputs, passwordIcons);
  

  if (!passwordInputs || !passwordIcons) {
    console.error("Password input or icon not found in the DOM.");
    return;
  }

  passwordIcons.forEach(icon => icon.addEventListener("click", () => {
    let container = icon.parentElement;

    let input = container.querySelector("input");

    const isPassword = input.type === "password";

    input.type = isPassword ? "text" : "password";

    icon.src = isPassword
      ? "./assets/icons/eye-invisible.svg"
      : "./assets/icons/eye-visible.svg";
  }));
}
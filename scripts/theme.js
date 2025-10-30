import { createElement } from "./utils.js";
import { themes } from "./themes.js";

export function loadSavedTheme(){
  let savedThemeKey = localStorage.getItem("themeKey");

  if(!savedThemeKey) {
    changeTheme(themes["light"]);
    localStorage.setItem("themeKey", "light");
    return;
  }

  let theme = themes[savedThemeKey];

  if(!theme){
    changeTheme(themes["light"]);
    return;
  }
  
  changeTheme(theme);
}

export function setupTheme(){
  let btnTheme = document.getElementsByClassName("btn-theme-container")[0];
  
  btnTheme.addEventListener("click", () => {

  if(document.getElementsByClassName("theme-overlay")[0] !== undefined){
    return;
  }

  let body = document.getElementsByTagName("body")[0];
  let themeOverlay = createElement("div", 'theme-overlay');
  themeOverlay.addEventListener("click", handleOverlayClick);

  let themeContainer = createElement("div", "theme-modal");

  let title = createElement("h2", "title", "Selecione seu tema");

  let closebtn = createElement("button", "close-btn", "X");
  closebtn.addEventListener("click", handleCloseModal);

  let optionsContainer = createElement("div", "options-container");

  Object.keys(themes).forEach(themeKey => {
    let themeOption = createElement("div", "theme-option");
    optionsContainer.appendChild(themeOption);
    themeOption.style.backgroundColor = themes[themeKey].previewColor;
    themeOption.addEventListener("click", () =>  handleOptionSelection(themeKey));
  });

  themeContainer.append(
    title,
    closebtn,
    optionsContainer
  );

  themeOverlay.appendChild(themeContainer);

  body.appendChild(themeOverlay);
  });
}

function handleOverlayClick(e){
    let modalOverlay = document.getElementsByClassName("theme-overlay")[0];
    if(e.target.contains(modalOverlay)){
      modalOverlay.remove();      
    }
}

function handleCloseModal(){
  let modalOverlay = document.getElementsByClassName("theme-overlay")[0];
  modalOverlay.remove();
}

function handleOptionSelection(themeKey){
  let theme = themes[themeKey];
  changeTheme(theme);
  localStorage.setItem("themeKey", themeKey);
  document.getElementsByClassName("theme-overlay")[0].remove();
 
}

function changeTheme(theme){
  changeCssVarValue("--font-color", theme.fontColor);
  changeCssVarValue("--background-color", theme.backgroundColor);
  changeCssVarValue("--modal-background-color", theme.modalBackgroundColor);
  changeCssVarValue("--border-color", theme.primaryColor);
  changeCssVarValue("--box-shadow", theme.boxShadow);
  changeCssVarValue("--task-count-color", theme.taskCountColor);
  changeCssVarValue("--highlight", theme.highlight);
  changeCssVarValue("--primary-color", theme.primaryColor);
}

function changeCssVarValue(varName, varValue){
  document.documentElement.style.setProperty(varName, varValue);
}
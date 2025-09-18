document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("toggle-theme");

    if (!btn) {
      console.warn("Botão #toggle-theme não encontrado.");
      return;
    }

    // Carregar tema salvo (se houver)
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      btn.textContent = "☀️";
    } else {
      btn.textContent = "🌙";
    }

    // Alternar tema ao clicar
    btn.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      let calendarIcon = document.getElementById("calendar-icon");
      let kanbanIcon = document.getElementById("kanban-icon");

      if (document.body.classList.contains("dark-mode")) {
        btn.textContent = "☀️"; // sol
        localStorage.setItem("theme", "dark");
        if (calendarIcon) calendarIcon.src = "./assets/icons/calendar-light.png";
        if (kanbanIcon) kanbanIcon.src = "./assets/icons/kanban-light.png";
      } else {
        btn.textContent = "🌙"; // lua
        localStorage.setItem("theme", "light");
        if (calendarIcon) calendarIcon.src = "./assets/icons/calendar-dark.png";
        if (kanbanIcon) kanbanIcon.src = "./assets/icons/kanban-dark.png";
      }
    });

  });
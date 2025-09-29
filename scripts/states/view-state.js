let currentView;

export function setCurrentView(view) {
    currentView = view;
    saveCurrentViewToLocalStorage();
}

export function getCurrentView() {
    return currentView;
}

export function loadCurrentViewFromLocalStorage() {
    const savedView = localStorage.getItem('currentView');
    if (savedView) {
        setCurrentView(savedView);
        return;
    }
    setCurrentView("calendar");
    saveCurrentViewToLocalStorage();
}

export function saveCurrentViewToLocalStorage() {
    localStorage.setItem('currentView', currentView);
}
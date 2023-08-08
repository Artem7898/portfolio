document.addEventListener("DOMContentLoaded", () => {
    const toggleDarkModeButton = document.getElementById("toggleDarkMode");
    const body = document.body;

    toggleDarkModeButton.addEventListener("click", () => {
        body.classList.toggle("Dark-mode");
    });
});

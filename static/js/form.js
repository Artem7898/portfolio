document.addEventListener("DOMContentLoaded", () => {
    const emailForm = document.getElementById("emailForm");
    const responseMessage = document.getElementById("responseMessage");

    emailForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(emailForm);
        const email = formData.get("email");

        try {
            const response = await fetch("/submit_email/", {
                method: "POST",
                body: new URLSearchParams({ email }),
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });
            const data = await response.json();
            responseMessage.textContent = data.message;
        } catch (error) {
            responseMessage.textContent = "An error occurred. Please try again later.";
        }
    });
});

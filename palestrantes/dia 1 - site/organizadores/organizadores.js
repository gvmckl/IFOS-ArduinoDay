let buttons = document.querySelectorAll(".read_button");
buttons.forEach((button) => {
    button.addEventListener("click", function () {
        let card = button.parentElement;
        card.classList.toggle("active");
        if (card.classList.contains("active")) {
            // Change button text if has class active
            return (button.textContent = "Ler menos");
        }
        button.textContent = "Ler mais";
    });
});
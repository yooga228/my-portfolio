document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio Loaded!");

    // Smooth Scrolling Effect
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            let target = document.querySelector(this.getAttribute("href"));
            target.scrollIntoView({ behavior: "smooth" });
        });
    });
});


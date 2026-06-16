// =========================
// Page Load Animation
// =========================

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// =========================
// Mouse Glow Effect
// =========================

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    if(glow){
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    }

});

// =========================
// 3D Cards Effect
// =========================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY =
        (x - rect.width / 2) / 20;

        const rotateX =
        -(y - rect.height / 2) / 20;

        card.style.transform =
        `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        scale(1.02)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)
        scale(1)
        `;

    });

});

// =========================
// Scroll Reveal Animation
// =========================

const revealElements = document.querySelectorAll(
".card, .stat, .about, .contact, h2"
);

const observer = new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},
{
    threshold:0.15
}

);

revealElements.forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);

});

// =========================
// Active Navbar Links
// =========================

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
        section.offsetTop;

        if(window.scrollY >= sectionTop - 200){

            current =
            section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            === "#" + current
        ){

            link.classList.add("active");

        }

    });

});

// =========================
// EmailJS Contact Form
// =========================

const contactForm =
document.getElementById("contact-form");

if(contactForm){

    contactForm.addEventListener(
    "submit",

    function(e){

        e.preventDefault();

        emailjs.sendForm(
            "service_3xdjwpf",
            "template_y17nn2o",
            this
        )

        .then(() => {

            alert(
            "Message sent successfully!"
            );

            contactForm.reset();

        })

        .catch((error) => {

            console.error(error);

            alert(
            "Failed to send message. Please try again."
            );

        });

    });

}
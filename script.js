// Navbar Active

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach((link) => {
    link.addEventListener("click", function () {
        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        this.classList.add("active");
    });
});


// Mobile hamburger

const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");
const menuIconElement = menuIcon.querySelector("i");

menuIcon.addEventListener("click", function () {

    navbar.classList.toggle("active");

    if (navbar.classList.contains("active")) {
        menuIconElement.classList.replace("fa-bars", "fa-xmark");
    } else {
        menuIconElement.classList.replace("fa-xmark", "fa-bars");
    }

});

// Menu link click hone par menu close hoga

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("active");

        menuIconElement.classList.replace("fa-xmark", "fa-bars");

    });

});


// Scroll functionality

const nav = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("body section");

const observer = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                let currentId = entry.target.id;

                nav.forEach(function (link) {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === "#" + currentId) {
                        link.classList.add("active");
                    }

                });

            }

        });

    },

    {
        threshold: 0.5,
    }

);

sections.forEach(function (sec) {
    observer.observe(sec);
});




// Responsive Slider


const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");

const projectCards = document.querySelectorAll(".project-card");
const projectContainer = document.querySelector(".projects-container");

let currIdx = 0;


// Screen ke according visible cards count

function getVisibleCards() {

    if (window.innerWidth < 700) {
        return 1;
    }

    if (window.innerWidth < 1024) {
        return 2;
    }

    return 3;
}


// Slider update 

function updateSlider() {

    if (!projectCards.length || !projectContainer) {
        return;
    }

    // Actual card width
    const cardWidth = projectCards[0].getBoundingClientRect().width;



    // Actual gap between cards
    const gap = parseFloat(
        getComputedStyle(projectContainer).gap
    ) || 0;



    // Total movement
    const move = cardWidth + gap;

    
    const maxIndex = Math.max(
        0,
        projectCards.length - getVisibleCards()
    );

    
    currIdx = Math.min(currIdx, maxIndex);

    
    projectContainer.style.transform =
        `translateX(-${currIdx * move}px)`;

    prevBtn.disabled = currIdx === 0;

    nextBtn.disabled = currIdx >= maxIndex;

}


// Next button

nextBtn.addEventListener("click", function () {

    const maxIndex = Math.max(
        0,
        projectCards.length - getVisibleCards()
    );

    if (currIdx < maxIndex) {

        currIdx++;

        updateSlider();

    }

});


// Previous button

prevBtn.addEventListener("click", function () {

    if (currIdx > 0) {

        currIdx--;

        updateSlider();

    }

});


// Window resize handling

window.addEventListener("resize", function () {

    updateSlider();

});


updateSlider();




// Contact Form

const contactForm = document.querySelector("#contact-form");
const successPop = document.querySelector("#success-popup");
const closePop = document.querySelector("#close-popup");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const formData = new FormData(contactForm);

    fetch("https://formspree.io/f/xgvzoeqa", {

        method: "POST",

        body: formData,

        headers: {
            Accept: "application/json",
        },

    })

    .then((response) => {

        if (response.ok) {

            successPop.style.display = "flex";

            contactForm.reset();

        } else {

            alert("Message could not be sent. Please try again.");

        }

    })

    .catch((error) => {

        console.error("Form submission error:", error);

        alert("Network error. Please try again.");

    });

});



closePop.addEventListener("click", function () {

    successPop.style.display = "none";

});

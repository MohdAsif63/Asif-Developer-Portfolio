// 1. NAVBAR ACTIVE LINK

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach((link) => {
    link.addEventListener("click", function () {
        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        this.classList.add("active");
    });
});


// 2. MOBILE HAMBURGER MENU

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


// 3. SCROLL SPY

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


// 4. PROJECT SLIDER


// =================================
// RESPONSIVE PROJECT SLIDER
// =================================

const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");

const projectCards = document.querySelectorAll(".project-card");
const projectContainer = document.querySelector(".projects-container");

let currIdx = 0;


// 1. Screen ke according visible cards count

function getVisibleCards() {

    if (window.innerWidth < 700) {
        return 1;
    }

    if (window.innerWidth < 1024) {
        return 2;
    }

    return 3;
}


// 2. Slider update function

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

    // Maximum allowed index
    const maxIndex = Math.max(
        0,
        projectCards.length - getVisibleCards()
    );

    // Index ko valid range mein rakhna
    currIdx = Math.min(currIdx, maxIndex);

    // Move slider
    projectContainer.style.transform =
        `translateX(-${currIdx * move}px)`;

    // Button states
    prevBtn.disabled = currIdx === 0;

    nextBtn.disabled = currIdx >= maxIndex;

}


// 3. Next button

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


// 4. Previous button

prevBtn.addEventListener("click", function () {

    if (currIdx > 0) {

        currIdx--;

        updateSlider();

    }

});


// 5. Window resize handling

window.addEventListener("resize", function () {

    updateSlider();

});


// 6. Initial slider setup

updateSlider();




// 5. CONTACT FORM

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


// Close Success Popup

closePop.addEventListener("click", function () {

    successPop.style.display = "none";

});

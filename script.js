document.addEventListener("DOMContentLoaded", function () {
    // Sticky Navbar Effect
    window.addEventListener("scroll", function () {
        let navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Fade-in effect on scroll
    const faders = document.querySelectorAll(".fade-in");
    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px",
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach((fader) => {
        appearOnScroll.observe(fader);
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");
    const navLinks = document.querySelectorAll(".nav-link");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        menuToggle.classList.toggle("active");
        menuToggle.innerHTML = menuToggle.classList.contains("active") ? "×" : "☰";
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("show");
            menuToggle.classList.remove("active");
            menuToggle.innerHTML = "☰";
        });
    });
});

let currentSlide = 0;
const slides = document.querySelectorAll('.bio-card');
const track = document.querySelector('.carousel-track');
const totalSlides = slides.length;

function updateCarousel() {
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    
    const offset = currentSlide * -25; // Since each card is 25% wide
    track.style.transform = `translateX(${offset}%)`;
}

function moveSlide(direction) {
    currentSlide += direction;
    updateCarousel();
}

// Touch handling variables
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;
let startTransform = 0;

track.addEventListener('touchstart', (e) => {
    isDragging = true;
    touchStartX = e.touches[0].clientX;
    startTransform = currentSlide * -25;
    track.style.transition = 'none';
});

track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    touchEndX = e.touches[0].clientX;
    const diff = touchEndX - touchStartX;
    const percentMove = (diff / track.offsetWidth) * 100;
    
    // Limit drag to one slide worth of movement
    const newTransform = Math.max(Math.min(startTransform + percentMove, 0), -((totalSlides - 1) * 25));
    track.style.transform = `translateX(${newTransform}%)`;
});

track.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    
    track.style.transition = 'transform 0.5s ease';
    
    const swipeDistance = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance > 0) {
            moveSlide(1);
        } else {
            moveSlide(-1);
        }
    } else {
        updateCarousel();
    }
});

// Initialize the carousel
updateCarousel();

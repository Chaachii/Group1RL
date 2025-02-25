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

    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

let slideIndex = 1;
let slideInterval;
let isPlaying = true;

// Initialize the carousel
function initCarousel() {
    showSlides(slideIndex);
    startSlideshow();
    
    // Add touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.querySelector('.carousel-container').addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.querySelector('.carousel-container').addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                moveSlide(1); // Swipe left
            } else {
                moveSlide(-1); // Swipe right
            }
        }
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') moveSlide(-1);
        if (e.key === 'ArrowRight') moveSlide(1);
    });
}

function moveSlide(n) {
    showSlides(slideIndex += n);
    resetSlideshow();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetSlideshow();
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    
    // Remove active class from all slides and dots
    Array.from(slides).forEach(slide => {
        slide.style.display = "none";
        slide.classList.remove('active');
    });
    
    Array.from(dots).forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and dot
    slides[slideIndex-1].style.display = "block";
    slides[slideIndex-1].classList.add('active');
    dots[slideIndex-1].classList.add('active');
    
    // Update progress bar
    updateProgressBar();
}

function startSlideshow() {
    slideInterval = setInterval(() => {
        moveSlide(1);
    }, 5000);
}

function resetSlideshow() {
    clearInterval(slideInterval);
    if (isPlaying) startSlideshow();
}

function toggleSlideshow() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        startSlideshow();
    } else {
        clearInterval(slideInterval);
    }
    updatePlayPauseButton();
}

function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = '0';
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 50);
    }
}

function updatePlayPauseButton() {
    const button = document.querySelector('.play-pause');
    if (button) {
        button.innerHTML = isPlaying ? '❚❚' : '▶';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCarousel); 
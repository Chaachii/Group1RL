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
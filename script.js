// --- Navigasi antar halaman ---
function showSection(sectionId, element) {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('nav a');
    sections.forEach(sec => sec.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    element.classList.add('active');
    resetSlides();
}

// --- Slider Gambar ---
let slideIndex = 0;
let slideTimer;

function showSlides() {
    const allSlides = document.querySelectorAll('.slides');
    allSlides.forEach(slideGroup => {
        const images = slideGroup.querySelectorAll('img');
        images.forEach(img => img.classList.remove('active'));
        images[slideIndex % images.length].classList.add('active');
    });
}

function changeSlide(n) {
    const firstSlider = document.querySelector('.slides');
    if (!firstSlider) return;
    const totalImages = firstSlider.querySelectorAll('img').length;
    slideIndex = (slideIndex + n + totalImages) % totalImages;
    showSlides();
    resetTimer();
}

function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
        slideIndex++;
        showSlides();
    }, 3000);
}

function resetSlides() {
    slideIndex = 0;
    showSlides();
}

// --- Jalankan otomatis ---
window.onload = function() {
    showSlides();
    resetTimer();
};

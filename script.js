// Ganti tampilan halaman dengan animasi halus
function showSection(id) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(section => {
    if (section.id === id) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
}

// Slider otomatis
let currentSlide = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slides img").length;

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
}

function updateSlide() {
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-slide tiap 3 detik
setInterval(nextSlide, 3000);

// ========================================
// Navigation & Page Management
// ========================================

/**
 * Show specific page and hide others
 * @param {string} pageId - ID of the page to show
 */
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update active nav link
    updateActiveNavLink(pageId);

    // Close mobile menu if open
    closeMobileMenu();

    // Scroll to top smoothly
    scrollToTop();

    // Save current page to localStorage (optional for page persistence)
    saveCurrentPage(pageId);
}

/**
 * Update active state of navigation links
 * @param {string} pageId - ID of the active page
 */
function updateActiveNavLink(pageId) {
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

/**
 * Toggle mobile menu visibility
 */
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========================================
// Form Handling
// ========================================

/**
 * Handle contact form submission
 * @param {Event} event - Form submit event
 */
function submitForm(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Validate form (basic validation)
    if (!validateForm(name, email, phone, message)) {
        return;
    }
    
    // Show success message
    showSuccessMessage(name, email, phone);
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Optional: Send data to server
    // sendToServer({ name, email, phone, message });
}

/**
 * Validate form inputs
 * @param {string} name - Name input
 * @param {string} email - Email input
 * @param {string} phone - Phone input
 * @param {string} message - Message input
 * @returns {boolean} - Validation result
 */
function validateForm(name, email, phone, message) {
    // Check if all fields are filled
    if (!name || !email || !phone || !message) {
        alert('⚠️ Mohon lengkapi semua field!');
        return false;
    }
    
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('⚠️ Format email tidak valid!');
        return false;
    }
    
    // Validate phone number (Indonesian format)
    const phonePattern = /^(08|62)\d{8,11}$/;
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!phonePattern.test(cleanPhone)) {
        alert('⚠️ Format nomor telepon tidak valid! Gunakan format: 08xx-xxxx-xxxx');
        return false;
    }
    
    return true;
}

/**
 * Show success message after form submission
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} phone - User phone
 */
function showSuccessMessage(name, email, phone) {
    const message = `
        ✅ Terima kasih ${name}!
        
        Pesan Anda telah berhasil dikirim.
        Kami akan menghubungi Anda segera melalui:
        
        📧 Email: ${email}
        📱 Telepon: ${phone}
        
        Tim kami akan merespon dalam 1x24 jam.
    `;
    
    alert(message);
    
    // Optional: Show a custom modal instead of alert
    // showCustomModal(message);
}

// ========================================
// Local Storage Management
// ========================================

/**
 * Save current page to localStorage
 * @param {string} pageId - ID of the current page
 */
function saveCurrentPage(pageId) {
    try {
        // Note: localStorage is not available in Claude artifacts
        // This is just for reference if used in a real environment
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('currentPage', pageId);
        }
    } catch (e) {
        console.log('localStorage not available');
    }
}

/**
 * Load last visited page from localStorage
 * @returns {string} - Last visited page ID or 'home'
 */
function loadLastPage() {
    try {
        if (typeof(Storage) !== "undefined") {
            return localStorage.getItem('currentPage') || 'home';
        }
    } catch (e) {
        console.log('localStorage not available');
    }
    return 'home';
}

// ========================================
// Scroll Effects
// ========================================

/**
 * Add scroll effects to header
 */
function handleScroll() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    }
}

// ========================================
// Animation on Scroll
// ========================================

/**
 * Observe elements and add animation when they enter viewport
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const animatedElements = document.querySelectorAll(
        '.value-card, .store-card, .text-card, .location-item, .contact-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ========================================
// Store Card Interactions
// ========================================

/**
 * Add ripple effect to store cards
 * @param {Event} event - Click event
 */
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Track store link clicks (for analytics)
 * @param {string} storeName - Name of the store
 */
function trackStoreClick(storeName) {
    console.log(`User clicked on: ${storeName}`);
    // Here you can add analytics tracking
    // Example: gtag('event', 'store_click', { store_name: storeName });
}

// ========================================
// Utility Functions
// ========================================

/**
 * Format phone number to readable format
 * @param {string} phone - Raw phone number
 * @returns {string} - Formatted phone number
 */
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})$/);
    if (match) {
        return match[1] + '-' + match[2] + '-' + match[3];
    }
    return phone;
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} - True if in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// Loading Animation
// ========================================

/**
 * Show loading state
 */
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        ">
            <div style="
                text-align: center;
                color: #2d5016;
            ">
                <div style="
                    font-size: 4rem;
                    animation: spin 2s linear infinite;
                ">🌾</div>
                <p style="margin-top: 1rem; font-size: 1.2rem; font-weight: 600;">
                    Memuat...
                </p>
            </div>
        </div>
    `;
    document.body.appendChild(loader);
}

/**
 * Hide loading state
 */
function hideLoading() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.remove();
    }
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================

/**
 * Initialize smooth scroll for all anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// Form Input Enhancements
// ========================================

/**
 * Add floating label effect to form inputs
 */
function initFloatingLabels() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus class
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus class if empty
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if already has value on load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
}

/**
 * Auto-format phone number as user types
 */
function initPhoneFormatter() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 12) {
                value = value.substr(0, 12);
            }
            
            // Format: 0812-3456-7890
            if (value.length > 8) {
                value = value.substr(0, 4) + '-' + value.substr(4, 4) + '-' + value.substr(8);
            } else if (value.length > 4) {
                value = value.substr(0, 4) + '-' + value.substr(4);
            }
            
            e.target.value = value;
        });
    }
}

// ========================================
// Keyboard Navigation
// ========================================

/**
 * Enable keyboard shortcuts for navigation
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Alt + H = Home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            showPage('home');
        }
        // Alt + A = About
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            showPage('about');
        }
        // Alt + S = Store
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            showPage('store');
        }
        // Alt + L = Location
        if (e.altKey && e.key === 'l') {
            e.preventDefault();
            showPage('location');
        }
        // Alt + C = Contact
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            showPage('contact');
        }
        // Escape = Close mobile menu
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

// ========================================
// Print Functionality
// ========================================

/**
 * Add print styles and functionality
 */
function printPage() {
    window.print();
}

// ========================================
// Click Outside to Close Menu
// ========================================

/**
 * Close mobile menu when clicking outside
 */
function initClickOutside() {
    document.addEventListener('click', function(event) {
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        
        if (navLinks.classList.contains('active')) {
            if (!nav.contains(event.target)) {
                closeMobileMenu();
            }
        }
    });
}

// ========================================
// Dynamic Year in Footer
// ========================================

/**
 * Update footer year automatically
 */
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-copyright');
    if (copyrightText) {
        copyrightText.innerHTML = `&copy; ${currentYear} Toko Tani Makmur. Semua Hak Dilindungi.`;
    }
}

// ========================================
// Store Link Tracking
// ========================================

/**
 * Add click tracking to store links
 */
function initStoreLinkTracking() {
    const storeCards = document.querySelectorAll('.store-card');
    storeCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const storeName = this.querySelector('h2').textContent;
            trackStoreClick(storeName);
        });
    });
}

// ========================================
// Accessibility Improvements
// ========================================

/**
 * Add ARIA labels and improve accessibility
 */
function improveAccessibility() {
    // Add aria-label to navigation links
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        const text = link.textContent.trim();
        link.setAttribute('aria-label', `Navigasi ke ${text}`);
    });
    
    // Add aria-label to form inputs
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            const labelText = label.textContent.trim();
            input.setAttribute('aria-label', labelText);
        }
    });
}

// ========================================
// Performance Monitoring
// ========================================

/**
 * Log page load performance
 */
function logPerformance() {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    });
}

// ========================================
// Event Listeners
// ========================================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // Scroll event (debounced)
    window.addEventListener('scroll', debounce(handleScroll, 100));
    
    // Resize event (debounced)
    window.addEventListener('resize', debounce(() => {
        closeMobileMenu();
    }, 250));
    
    // Close menu when clicking nav items on mobile
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
}

// ========================================
// Initialization
// ========================================

/**
 * Initialize all functions when DOM is ready
 */
function init() {
    // Set home as active page on load
    showPage('home');
    
    // Initialize all features
    initScrollAnimations();
    initSmoothScroll();
    initFloatingLabels();
    initPhoneFormatter();
    initKeyboardShortcuts();
    initClickOutside();
    initStoreLinkTracking();
    improveAccessibility();
    updateFooterYear();
    initEventListeners();
    logPerformance();
    
    console.log('🌾 Website Toko Tani Makmur loaded successfully!');
    console.log('💡 Keyboard shortcuts:');
    console.log('   Alt + H = Home');
    console.log('   Alt + A = Tentang Kami');
    console.log('   Alt + S = Online Store');
    console.log('   Alt + L = Lokasi');
    console.log('   Alt + C = Kontak');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// Export functions for external use
// ========================================

// Make functions available globally if needed
window.showPage = showPage;
window.toggleMenu = toggleMenu;
window.submitForm = submitForm;
// ========================================
// Smooth Scroll & Navigation
// ========================================

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
 * Smooth scroll to section with offset for fixed header
 */
function smoothScrollToSection(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerOffset = 130;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// ========================================
// Scroll Effects & Active Navigation
// ========================================

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-item');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset + 200;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Add scroll effects to header
 */
function handleHeaderScroll() {
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
        '.value-card, .store-card, .text-card, .location-item, .contact-item, .feature-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ========================================
// Navigation Click Handlers
// ========================================

/**
 * Initialize navigation link click handlers
 */
function initNavigationLinks() {
    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            // Close mobile menu
            closeMobileMenu();
            
            // Smooth scroll to section
            smoothScrollToSection(target);
        });
    });
    
    // Also handle button clicks
    const heroButtons = document.querySelectorAll('.btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollToSection(href);
            }
        });
    });
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
// Store Link Tracking
// ========================================

/**
 * Track store link clicks (for analytics)
 */
function trackStoreClick(storeName) {
    console.log(`User clicked on: ${storeName}`);
    // Here you can add analytics tracking
    // Example: gtag('event', 'store_click', { store_name: storeName });
}

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
// Utility Functions
// ========================================

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
            smoothScrollToSection('#home');
        }
        // Alt + A = About
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            smoothScrollToSection('#about');
        }
        // Alt + S = Store
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            smoothScrollToSection('#store');
        }
        // Alt + L = Location
        if (e.altKey && e.key === 'l') {
            e.preventDefault();
            smoothScrollToSection('#location');
        }
        // Alt + C = Contact
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            smoothScrollToSection('#contact');
        }
        // Escape = Close mobile menu
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

// ========================================
// Scroll to Top Button (Optional)
// ========================================

/**
 * Create and show scroll to top button
 */
function initScrollToTopButton() {
    // Create button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4a7c2c, #629940);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    }, 100));
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
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
    const copyrightText = document.querySelector('footer p:last-child');
    if (copyrightText) {
        copyrightText.innerHTML = `© ${currentYear} Alan Group. Semua Hak Dilindungi.`;
    }
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
    
    // Add role to sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.setAttribute('role', 'region');
        const title = section.querySelector('.page-title');
        if (title) {
            section.setAttribute('aria-label', title.textContent);
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
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        }
    });
}

// ========================================
// Parallax Effect for Hero Section (Optional)
// ========================================

/**
 * Add subtle parallax effect to hero section
 */
function initParallaxEffect() {
    const hero = document.querySelector('.hero-home');
    if (hero) {
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }, 10));
    }
}

// ========================================
// Event Listeners
// ========================================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // Scroll events
    window.addEventListener('scroll', debounce(() => {
        updateActiveNavOnScroll();
        handleHeaderScroll();
    }, 100));
    
    // Resize event
    window.addEventListener('resize', debounce(() => {
        closeMobileMenu();
    }, 250));
    
    // Close menu when clicking nav items on mobile
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                setTimeout(closeMobileMenu, 300);
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
    // Initialize all features
    initNavigationLinks();
    initScrollAnimations();
    initKeyboardShortcuts();
    initClickOutside();
    initStoreLinkTracking();
    improveAccessibility();
    updateFooterYear();
    initEventListeners();
    initScrollToTopButton();
    logPerformance();
    
    // Set home as active on load
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    console.log('🌾 Website Alan Group loaded successfully!');
    console.log('💡 Keyboard shortcuts:');
    console.log('   Alt + H = Home');
    console.log('   Alt + A = Tentang Kami');
    console.log('   Alt + S = Online Store');
    console.log('   Alt + L = Lokasi');
    console.log('   Alt + C = Kontak');
    console.log('   ESC = Close menu');
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
window.toggleMenu = toggleMenu;
window.closeMobileMenu = closeMobileMenu;
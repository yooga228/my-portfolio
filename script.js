// DOM Elements
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillProgress = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const offsetTop = document.querySelector(href).offsetTop - 70;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (nav.classList.contains('nav-active')) {
            toggleNav();
        }
    });
});

// Navigation bar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150;
    
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section.offsetTop <= scrollPosition && 
            section.offsetTop + section.offsetHeight > scrollPosition) {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

// Mobile navigation toggle
burger.addEventListener('click', toggleNav);

function toggleNav() {
    // Toggle navigation
    nav.classList.toggle('nav-active');
    
    // Animate links
    navItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
}

// Project filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Set active button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animate skill bars on scroll
function animateSkills() {
    skillProgress.forEach(progress => {
        // Reset animation to allow for re-animation
        progress.style.animation = 'none';
        progress.offsetHeight; // Trigger reflow
        progress.style.animation = 'fillBar 1.5s ease forwards';
    });
}

// Animate elements on scroll
const animateOnScroll = () => {
    const skills = document.querySelector('.skills');
    if (skills) {
        const skillsPosition = skills.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (skillsPosition < screenPosition) {
            animateSkills();
        }
    }
};

window.addEventListener('scroll', animateOnScroll);

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to your server
        // For demo purposes, we'll just console log it
        console.log({ name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Preloader
window.addEventListener('load', () => {
    // Initialize animations on page load
    animateSkills();
    
    // Set first nav item as active initially
    navLinks[0].classList.add('active');
    
    // Initialize AOS (if you want to add more animations)
    // AOS.init();
});

// Project image hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.project-img img').style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.project-img img').style.transform = 'scale(1)';
    });
});

// Add some interactive typing effect to the hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroP = document.querySelector('.hero-text p');
    const text = heroP.textContent;
    heroP.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroP.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect when page loads
    setTimeout(typeWriter, 1000);
});

// Create a folder structure for project images if it doesn't exist
// Note: This is just a note for the user, as JavaScript in the browser cannot create folders
/* 
Recommended folder structure:
- index.html
- style.css
- script.js
- images/
  - ai-annotation.jpg (for Western Digital project)
  - brain-tumor.jpg (for Brain Tumor Detection project)
  - scada.jpg (for SCADA System project)
  - fall-detection.jpg (for Fall Detection project)
  - profile.jpg (your profile photo)
*/

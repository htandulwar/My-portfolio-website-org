 // DOM Elements
        const themeToggle = document.querySelector('.theme-toggle');
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const scrollProgress = document.querySelector('.scroll-progress');
        const scrollTop = document.querySelector('.scroll-top');
        const contactForm = document.getElementById('contactForm');
        const typingText = document.querySelector('.typing-text');
        const particlesContainer = document.getElementById('particles');

        // Theme Toggle
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('light-mode')) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });

        // Mobile Menu Toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Scroll Progress Indicator
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = `${scrolled}%`;

            // Show/hide scroll to top button
            if (window.scrollY > 500) {
                scrollTop.classList.add('active');
            } else {
                scrollTop.classList.remove('active');
            }
        });

        // Typing Effect
        const texts = ['Data Analyst', 'DevOps Enthusiast', 'Problem Solver'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }

        // Start typing effect
        setTimeout(typeEffect, 1000);

        // Create Particles
        function createParticles() {
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random size
                const size = Math.random() * 10 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random animation delay
                particle.style.animationDelay = `${Math.random() * 15}s`;
                
                particlesContainer.appendChild(particle);
            }
        }

        createParticles();

        // Form Submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault(); // page reload hone se rokta hai

  fetch("https://script.google.com/macros/s/AKfycbz_NFgOGLscUofdhdjqpxRKFWI6D30DG8aKDQg5m8QW6_lVs7la8goIyM5mBkjTBO0r/exec", {
    method: "POST",
    body: JSON.stringify({
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    })
  })
  .then(res => res.text())
  .then(data => {
    alert("Message Sent Successfully!");
    e.target.reset(); // form clear karega
  })
  .catch(err => {
    alert("Something went wrong!");
    console.error(err);
  });
});

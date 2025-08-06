document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Contact Form Validation and Submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff6b00';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Validate email format
            const emailField = document.getElementById('email');
            if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
                emailField.style.borderColor = '#ff6b00';
                isValid = false;
            }
            
            if (!isValid) {
                // Scroll to first error
                const firstError = this.querySelector('[style*="border-color: rgb(255, 107, 0)"]');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            
            // Disable submit button during processing
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (in a real app, this would send to your backend)
            setTimeout(() => {
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }, 1500);
        });
    }

    // Input field focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = '#ff6b00';
            this.style.borderColor = '#ff6b00';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.querySelector('label').style.color = '';
            this.style.borderColor = '#ddd';
        });
    });

    // Textarea character counter
    const messageTextarea = document.getElementById('message');
    
    if (messageTextarea) {
        // Create character counter element
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.textContent = '0/500';
        messageTextarea.parentElement.appendChild(charCounter);
        
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 500;
            charCounter.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength) {
                charCounter.style.color = '#ff6b00';
            } else {
                charCounter.style.color = '#666';
            }
        });
    }

    // Social media links hover effect
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.color = '#ff6b00';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.color = '';
        });
    });

    // Map interaction
    const mapIframe = document.querySelector('.map-section iframe');
    
    if (mapIframe) {
        // Add loading indicator for map
        const mapContainer = document.querySelector('.map-section');
        const mapLoader = document.createElement('div');
        mapLoader.className = 'map-loader';
        mapLoader.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading map...';
        mapContainer.appendChild(mapLoader);
        
        mapIframe.addEventListener('load', function() {
            mapLoader.style.display = 'none';
        });
    }
});
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
    
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Payment Method Selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide payment forms based on selection
            if (this.querySelector('.fab.fa-paypal')) {
                document.querySelector('.credit-card-form').style.display = 'none';
                // Would show PayPal form here if implemented
            } else {
                document.querySelector('.credit-card-form').style.display = 'block';
            }
        });
    });

    // Card Number Formatting
    const cardNumberInput = document.getElementById('card-number');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add space after every 4 digits
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            
            // Limit to 16 digits (19 characters with spaces)
            if (value.length > 19) {
                value = value.substring(0, 19);
            }
            
            this.value = value;
            
            // Detect card type and highlight relevant icon
            const cardIcons = document.querySelectorAll('.card-icons i');
            cardIcons.forEach(icon => icon.style.opacity = '0.3');
            
            // Visa (starts with 4)
            if (/^4/.test(value)) {
                document.querySelector('.fa-cc-visa').style.opacity = '1';
            } 
            // Mastercard (starts with 5)
            else if (/^5/.test(value)) {
                document.querySelector('.fa-cc-mastercard').style.opacity = '1';
            } 
            // Amex (starts with 3)
            else if (/^3/.test(value)) {
                document.querySelector('.fa-cc-amex').style.opacity = '1';
            }
        });
    }

    // Expiry Date Formatting
    const expiryDateInput = document.getElementById('expiry-date');
    
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add slash after 2 digits
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            
            // Limit to 5 characters (MM/YY)
            if (value.length > 5) {
                value = value.substring(0, 5);
            }
            
            this.value = value;
        });
    }

    // CVV Formatting
    const cvvInput = document.getElementById('cvv');
    
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            // Remove all non-digit characters
            this.value = this.value.replace(/\D/g, '');
            
            // Limit to 3 or 4 digits (3 for most cards, 4 for Amex)
            const cardNumber = document.getElementById('card-number').value;
            const maxLength = /^3/.test(cardNumber) ? 4 : 3;
            
            if (this.value.length > maxLength) {
                this.value = this.value.substring(0, maxLength);
            }
        });
    }

    // Form Validation and Submission
    const paymentForm = document.getElementById('payment-form');
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
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
            
            // Validate card number (basic check for 16 digits)
            const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            if (cardNumber.length !== 16) {
                document.getElementById('card-number').style.borderColor = '#ff6b00';
                isValid = false;
            }
            
            // Validate expiry date
            const expiryDate = document.getElementById('expiry-date').value;
            if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
                document.getElementById('expiry-date').style.borderColor = '#ff6b00';
                isValid = false;
            }
            
            // Validate CVV
            const cvv = document.getElementById('cvv').value;
            const cvvLength = /^3/.test(cardNumber) ? 4 : 3;
            if (cvv.length !== cvvLength) {
                document.getElementById('cvv').style.borderColor = '#ff6b00';
                isValid = false;
            }
            
            // Validate terms checkbox
            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox.checked) {
                termsCheckbox.nextElementSibling.style.color = '#ff6b00';
                isValid = false;
            } else {
                termsCheckbox.nextElementSibling.style.color = '';
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
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Simulate payment processing (in a real app, this would call your payment API)
            setTimeout(() => {
                // Show success message
                alert('Payment successful! Thank you for joining Elite Fitness.');
                
                // In a real application, you would redirect to a confirmation page
                // window.location.href = 'confirmation.html';
                
                // Reset form (for demo purposes)
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-lock"></i> Complete Payment';
            }, 2000);
        });
    }

    // Input field focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = '#ff6b00';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.querySelector('label').style.color = '';
        });
    });

    // Tooltip for CVV
    const cvvTooltip = document.querySelector('.fa-question-circle');
    
    if (cvvTooltip) {
        cvvTooltip.addEventListener('mouseover', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.title;
            this.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.classList.add('show');
            }, 10);
        });
        
        cvvTooltip.addEventListener('mouseout', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    }
});


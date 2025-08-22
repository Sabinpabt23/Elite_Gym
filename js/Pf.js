// Portfolio Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all portfolio links
    const portfolioLinks = document.querySelectorAll('.view-portfolio');
    
    // Add click event to each portfolio link
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const member = this.getAttribute('data-member');
            const modal = document.getElementById(`${member}-portfolio`);
            
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Add click event to each close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.portfolio-modal');
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Enable scrolling
        });
    });
    
    // Close modal when clicking outside of content
    const modals = document.querySelectorAll('.portfolio-modal');
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = ''; // Enable scrolling
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = ''; // Enable scrolling
                }
            });
        }
    });
});
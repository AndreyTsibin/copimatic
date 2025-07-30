// Main JavaScript functionality for printer repair service landing page
// Compatible with Tilda CMS integration

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation smooth scroll functionality
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
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
    
    // Sticky header behavior - header always stays fixed
    function initStickyHeader() {
        const header = document.querySelector('header');
        if (!header) return;
        
        // Ensure header is always visible and fixed
        header.style.transform = 'translateY(0)';
        header.style.transition = 'none';
    }
    
    // Service tabs switching functionality
    function switchTab(tabName) {
        // Hide all tab contents
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all tabs
        const tabs = document.querySelectorAll('.tab-button');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected tab content
        const selectedContent = document.getElementById('tab-' + tabName);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
        
        // Add active class to selected tab button
        const selectedTab = document.querySelector(`button[onclick*="${tabName}"]`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
    }
    
    // Countdown timer functionality
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
        
        // Set countdown to 24 hours from now
        const now = new Date().getTime();
        const countdownTime = now + (24 * 60 * 60 * 1000);
        
        const timer = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownTime - now;
            
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (distance < 0) {
                clearInterval(timer);
                countdownElement.innerHTML = "Акция завершена";
            }
        }, 1000);
    }
    
    // Initialize all functionality
    initSmoothScroll();
    initStickyHeader();
    startCountdown();
    
    // Mobile services toggle functionality
    function toggleServices(tabName) {
        const tabContent = document.getElementById('tab-' + tabName);
        if (!tabContent) return;
        
        const hiddenServices = tabContent.querySelectorAll('.service-item.hidden-mobile');
        const showMoreBtn = tabContent.querySelector('.show-more-btn');
        const showMoreText = showMoreBtn.querySelector('.show-more-text');
        
        // Check if services are currently hidden
        const isHidden = hiddenServices[0] && hiddenServices[0].style.display === 'none' || 
                        hiddenServices[0] && !hiddenServices[0].style.display;
        
        if (isHidden) {
            // Show hidden services
            hiddenServices.forEach(service => {
                service.style.display = 'flex';
            });
            showMoreText.textContent = 'Скрыть';
        } else {
            // Hide services
            hiddenServices.forEach(service => {
                service.style.display = 'none';
            });
            showMoreText.textContent = 'Показать еще';
        }
    }
    
    // Make functions globally available
    window.switchTab = switchTab;
    window.toggleServices = toggleServices;
    
    // Mobile menu toggle functionality
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    };
    
    // CTA button handlers for Tilda modal integration
    const ctaButtons = document.querySelectorAll('a[href="#forma"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Let the default behavior handle the modal opening
            // This is for Tilda's built-in modal system
        });
    });
    
});
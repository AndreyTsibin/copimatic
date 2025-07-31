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
    
    // Service tabs switching functionality with animations
    let isTabSwitching = false;
    
    function switchTab(tabName) {
        // Prevent spam clicks during animation
        if (isTabSwitching) return;
        
        const selectedContent = document.getElementById('tab-' + tabName);
        const selectedTab = document.querySelector(`button[onclick*="${tabName}"]`);
        
        // If already active, do nothing
        if (selectedContent && selectedContent.classList.contains('active')) return;
        
        isTabSwitching = true;
        
        // Get current active content
        const currentActive = document.querySelector('.tab-content.active');
        
        if (currentActive) {
            // Add fade-out class to current content
            currentActive.classList.add('fade-out');
            
            // After animation, switch content
            setTimeout(() => {
                // Hide all tab contents
                const tabContents = document.querySelectorAll('.tab-content');
                tabContents.forEach(content => {
                    content.classList.remove('active', 'fade-out');
                });
                
                // Show selected tab content
                if (selectedContent) {
                    selectedContent.classList.add('active');
                }
                
                isTabSwitching = false;
            }, 200);
        } else {
            // First load - no animation needed
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            if (selectedContent) {
                selectedContent.classList.add('active');
            }
            
            isTabSwitching = false;
        }
        
        // Update tab buttons immediately
        const tabs = document.querySelectorAll('.tab-button');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
    }
    
    // Countdown timer functionality - 1 hour from page load (resets on refresh)
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
        
        // Start countdown from current time + 1 hour (resets on every page load)
        const startTime = new Date().getTime();
        const countdownTime = startTime + (1 * 60 * 60 * 1000); // 1 hour in milliseconds
        
        const timer = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownTime - now;
            
            if (distance <= 0) {
                clearInterval(timer);
                countdownElement.innerHTML = "00:00:00";
                return;
            }
            
            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    // Initialize all functionality
    initSmoothScroll();
    initStickyHeader();
    startCountdown();
    
    // Initialize issues display - ensure first 4 are visible, rest are hidden
    const allIssueCards = document.querySelectorAll('.issue-card');
    allIssueCards.forEach((card, index) => {
        if (index >= 4) {
            card.classList.add('hidden-issues');
        } else {
            card.classList.remove('hidden-issues');
        }
    });
    
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
    
    // Issues toggle functionality
    function toggleIssues() {
        const hiddenIssues = document.querySelectorAll('.issue-card.hidden-issues');
        const showButton = document.getElementById('show-issues-btn');
        const buttonText = showButton.querySelector('i').nextSibling;
        const buttonIcon = showButton.querySelector('i');
        
        // Check if issues are currently hidden
        const isHidden = hiddenIssues.length > 0;
        
        if (isHidden) {
            // Show hidden issues - remove hidden-issues class
            hiddenIssues.forEach(issue => {
                issue.classList.remove('hidden-issues');
            });
            buttonText.textContent = ' Скрыть неисправности';
            buttonIcon.className = 'ri-arrow-up-line mr-2';
        } else {
            // Hide issues - find all issue cards and hide the ones that should be hidden
            const allIssueCards = document.querySelectorAll('.issue-card');
            // Keep first 4 cards visible, hide the rest
            allIssueCards.forEach((issue, index) => {
                if (index >= 4) {
                    issue.classList.add('hidden-issues');
                }
            });
            buttonText.textContent = ' Показать все неисправности';
            buttonIcon.className = 'ri-arrow-down-line mr-2';
        }
    }
    
    // Make functions globally available
    window.switchTab = switchTab;
    window.toggleServices = toggleServices;
    window.toggleIssues = toggleIssues;
    
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
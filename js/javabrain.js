// Java Brain Review JavaScript
// Performance optimized for better user experience

// Configuration
const CONFIG = {
    targetRating: 4.8,
    animationDuration: 2000,
    scrollOffset: 100,
    lazyLoadOffset: 200
};

// DOM Elements
let elements = {};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeAnimations();
    initializeLazyLoading();
    initializeConversionTracking();
    initializeRelatedReviews();
    initializeExitIntent();
    initializeScrollEffects();
});

// Initialize DOM elements
function initializeElements() {
    elements = {
        rating: document.querySelector('.rating .stars'),
        ratingNumber: document.querySelector('.rating-number'),
        ratingText: document.querySelector('.rating-text'),
        progressBars: document.querySelectorAll('.progress'),
        conversionBtns: document.querySelectorAll('.conversion-btn'),
        relatedContainer: document.getElementById('related-reviews-container'),
        video: document.querySelector('.video-wrapper iframe'),
        productImages: document.querySelectorAll('.product-photo, .product-photo-large')
    };
}

// Initialize animations
function initializeAnimations() {
    // Animate rating on load
    animateRating();
    
    // Animate progress bars when in view
    animateProgressBars();
    
    // Animate conversion buttons
    animateConversionButtons();
}

// Animate rating stars
function animateRating() {
    if (!elements.rating) return;
    
    const stars = elements.rating.querySelectorAll('i');
    const targetRating = CONFIG.targetRating;
    const fullStars = Math.floor(targetRating);
    const hasHalfStar = targetRating % 1 >= 0.5;
    
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.opacity = '0';
            star.style.transform = 'scale(0.5)';
            star.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                if (index < fullStars || (index === fullStars && hasHalfStar)) {
                    star.style.opacity = '1';
                    star.style.transform = 'scale(1)';
                    star.style.color = '#fbbf24';
                } else {
                    star.style.opacity = '0.3';
                    star.style.transform = 'scale(0.8)';
                    star.style.color = '#e2e8f0';
                }
            }, 100);
        }, index * 150);
    });
}

// Animate progress bars
function animateProgressBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                    progressBar.style.transition = 'width 1.5s ease';
                }, 200);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    elements.progressBars.forEach(bar => observer.observe(bar));
}

// Animate conversion buttons
function animateConversionButtons() {
    elements.conversionBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize lazy loading
function initializeLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    elements.productImages.forEach(img => imageObserver.observe(img));
}

// Initialize conversion tracking
function initializeConversionTracking() {
    elements.conversionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Track conversion click
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion_click', {
                    'product_name': 'Java Brain',
                    'event_category': 'engagement',
                    'event_label': 'conversion_button'
                });
            }
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Initialize related reviews
function initializeRelatedReviews() {
    if (!elements.relatedContainer) return;
    
    const relatedReviews = [
        {
            title: 'Cognicare Pro Review',
            description: 'Natural brain health support for cognitive function and memory enhancement.',
            rating: '4.8/5',
            icon: 'fas fa-brain',
            url: './cognicarepro.html'
        },
        {
            title: 'Neuro Prime Review',
            description: 'Advanced cognitive support for mental clarity and focus.',
            rating: '4.7/5',
            icon: 'fas fa-lightbulb',
            url: './neuroprime.html'
        },
        {
            title: 'ZenCortex Review',
            description: 'Natural hearing support with cognitive benefits.',
            rating: '4.8/5',
            icon: 'fas fa-ear-listen',
            url: './zencortex.html'
        }
    ];
    
    elements.relatedContainer.innerHTML = relatedReviews.map(review => `
        <a href="${review.url}" class="related-review-card">
            <div class="card-image">
                <i class="${review.icon}"></i>
            </div>
            <div class="card-content">
                <h3>${review.title}</h3>
                <p>${review.description}</p>
                <div class="card-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span>${review.rating}</span>
                </div>
            </div>
        </a>
    `).join('');
}

// Initialize exit intent modal
function initializeExitIntent() {
    let exitIntentShown = false;
    
    const showExitIntent = () => {
        if (exitIntentShown) return;
        
        const modal = document.createElement('div');
        modal.className = 'exit-modal';
        modal.innerHTML = `
            <div class="exit-modal-content">
                <button class="exit-modal-close">&times;</button>
                <h2>Wait! Don't Miss Out!</h2>
                <p>Get <strong>Java Brain</strong> with our <strong>money-back guarantee</strong></p>
                <div class="exit-offer">
                    <span class="exit-price">$39</span>
                    <span class="exit-guarantee">Risk-Free + Selected FREE Shipping</span>
                </div>
                <a href="https://hop.clickbank.net/?vendor=javabrain&affiliate=raniere57&lid=235060" target="_blank" class="exit-cta">Claim Your Discount Now</a>
            </div>
        `;
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .exit-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            .exit-modal-content {
                background: white;
                padding: 2rem;
                border-radius: 12px;
                text-align: center;
                max-width: 400px;
                width: 90%;
                position: relative;
                animation: slideUp 0.3s ease;
            }
            .exit-modal-close {
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
            }
            .exit-modal h2 {
                color: #1a202c;
                margin-bottom: 1rem;
                font-size: 1.5rem;
            }
            .exit-modal p {
                color: #64748b;
                margin-bottom: 1.5rem;
                line-height: 1.5;
            }
            .exit-offer {
                background: #f8fafc;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1.5rem;
            }
            .exit-price {
                font-size: 2rem;
                font-weight: 700;
                color: #8b5cf6;
                display: block;
                margin-bottom: 0.5rem;
            }
            .exit-guarantee {
                color: #059669;
                font-weight: 600;
                font-size: 0.9rem;
            }
            .exit-cta {
                display: inline-block;
                background: linear-gradient(135deg, #8b5cf6, #7c3aed);
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                transition: transform 0.2s ease;
            }
            .exit-cta:hover {
                transform: translateY(-2px);
                text-decoration: none;
                color: white;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        exitIntentShown = true;
        
        // Close modal handlers
        const closeBtn = modal.querySelector('.exit-modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Auto close after 10 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);
    };
    
    // Track mouse movement for exit intent
    let mouseY = 0;
    document.addEventListener('mouseout', function(e) {
        if (e.clientY <= 0) {
            setTimeout(() => {
                showExitIntent();
            }, 1000);
        }
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});

// Video fallback logic
(function enhanceVideoErrorHandling(){
    const onReady = () => {
        const videoIframe = document.getElementById('youtube-video');
        const videoFallback = document.getElementById('video-fallback');
        const youtubeUrl = "https://www.youtube.com/watch?v=3BDy1FxKibU";

        if (videoIframe) {
            let loadTimeout = setTimeout(() => {
                if (!videoIframe.contentWindow || videoIframe.contentWindow.length === 0) {
                    videoFallback.style.display = 'flex';
                    videoIframe.style.display = 'none';
                }
            }, 3000); // 3 seconds timeout

            videoIframe.onload = () => {
                clearTimeout(loadTimeout);
                // Additional check for content if needed, though onload usually means it's fine
            };

            videoIframe.onerror = () => {
                clearTimeout(loadTimeout);
                videoFallback.style.display = 'flex';
                videoIframe.style.display = 'none';
            };
        }
    };
    if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', onReady);} else { onReady(); }
})();

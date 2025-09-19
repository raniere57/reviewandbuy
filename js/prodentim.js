// ProDentim Review JavaScript
// Performance optimized for better user experience

// Configuration
const CONFIG = {
    targetRating: 4.9,
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
    
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.opacity = '0';
            star.style.transform = 'scale(0.5)';
            
            setTimeout(() => {
                if (index < Math.floor(targetRating)) {
                    star.style.color = '#fbbf24';
                } else if (index < targetRating) {
                    star.style.color = '#fbbf24';
                    star.style.opacity = '0.5';
                } else {
                    star.style.color = '#e5e7eb';
                }
                
                star.style.opacity = '1';
                star.style.transform = 'scale(1)';
                star.style.transition = 'all 0.3s ease';
            }, 100);
        }, index * 200);
    });
    
    // Animate rating number
    if (elements.ratingNumber) {
        animateNumber(elements.ratingNumber, 0, targetRating, 1500);
    }
}

// Animate number counting
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const isDecimal = end % 1 !== 0;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutCubic(progress);
        element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Easing function
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Animate progress bars
function animateProgressBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                progressBar.style.width = '0%';
                progressBar.style.transition = 'width 1.5s ease-out';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    elements.progressBars.forEach(bar => observer.observe(bar));
}

// Animate conversion buttons
function animateConversionButtons() {
    elements.conversionBtns.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            btn.style.transition = 'all 0.6s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
}

// Initialize lazy loading
function initializeLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Skip lazy loading for product images to prevent disappearing
                if (img.classList.contains('product-photo-large')) {
                    imageObserver.unobserve(img);
                    return;
                }
                
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: `${CONFIG.lazyLoadOffset}px` });
    
    elements.productImages.forEach(img => {
        // Only apply lazy loading to non-product images
        if (!img.classList.contains('product-photo-large') && !img.classList.contains('product-photo')) {
            imageObserver.observe(img);
        }
    });
}

// Initialize conversion tracking
function initializeConversionTracking() {
    elements.conversionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            trackAffiliateClick('ProDentim', this.href);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Track affiliate clicks
function trackAffiliateClick(productName, url) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'affiliate_click', {
            'product_name': productName,
            'affiliate_url': url,
            'event_category': 'conversion',
            'event_label': 'prodentim_review'
        });
    }
    
    // Console log for debugging
    console.log(`Affiliate click tracked: ${productName} - ${url}`);
    
    // Store in localStorage for analytics
    const clickData = {
        product: productName,
        url: url,
        timestamp: new Date().toISOString(),
        page: 'prodentim_review'
    };
    
    const existingClicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    existingClicks.push(clickData);
    localStorage.setItem('affiliate_clicks', JSON.stringify(existingClicks));
}

// Initialize related reviews
function initializeRelatedReviews() {
    if (!elements.relatedContainer) return;
    
    const relatedReviews = [
        {
            id: 'puremoringa',
            name: 'Pure Moringa',
            description: 'Natural superfood supplement with 90+ nutrients for overall health and wellness.',
            rating: 4.7,
            url: '../reviews/puremoringa.html',
            icon: 'fas fa-leaf',
            category: 'Health & Supplements'
        },
        {
            id: 'mitolyn',
            name: 'Mitolyn',
            description: 'Advanced weight loss supplement with natural ingredients for healthy fat burning.',
            rating: 4.6,
            url: '../reviews/mitolyn.html',
            icon: 'fas fa-fire',
            category: 'Health & Supplements'
        },
        {
            id: 'prostavive',
            name: 'Prostavive',
            description: 'Prostate health supplement with natural ingredients for men\'s wellness.',
            rating: 4.7,
            url: '../reviews/prostavive.html',
            icon: 'fas fa-shield-alt',
            category: 'Health & Supplements'
        },
        {
            id: 'sleeplean',
            name: 'Sleep Lean',
            description: 'Natural weight loss sleep supplement that targets blue light exposure for better sleep.',
            rating: 4.8,
            url: '../reviews/sleeplean.html',
            icon: 'fas fa-moon',
            category: 'Health & Supplements'
        }
    ];
    
    // Filter out current product
    const filteredReviews = relatedReviews.filter(review => review.id !== 'prodentim');
    
    // Display related reviews
    displayRelatedReviews(filteredReviews.slice(0, 3));
}

// Display related reviews
function displayRelatedReviews(reviews) {
    if (!elements.relatedContainer) return;
    
    const reviewsHTML = reviews.map(review => `
        <a href="${review.url}" class="related-review-card" data-product="${review.id}">
            <div class="related-review-header">
                <div class="related-review-icon">
                    <i class="${review.icon}"></i>
                </div>
                <h3 class="related-review-title">${review.name}</h3>
            </div>
            <div class="related-review-rating">
                <div class="related-review-stars">
                    ${generateStars(review.rating)}
                </div>
                <span>${review.rating}/5</span>
            </div>
            <p class="related-review-description">${review.description}</p>
            <div class="related-review-cta">
                Read Review <i class="fas fa-arrow-right"></i>
            </div>
        </a>
    `).join('');
    
    elements.relatedContainer.innerHTML = reviewsHTML;
    
    // Add click tracking for related reviews
    elements.relatedContainer.querySelectorAll('.related-review-card').forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.dataset.product;
            trackAffiliateClick(`Related Review: ${productId}`, this.href);
        });
    });
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Initialize exit intent
function initializeExitIntent() {
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            showExitIntentOffer();
            exitIntentShown = true;
        }
    });
}

// Show exit intent offer
function showExitIntentOffer() {
    // Create exit intent modal
    const modal = document.createElement('div');
    modal.className = 'exit-intent-modal';
    modal.innerHTML = `
        <div class="exit-intent-content">
            <div class="exit-intent-header">
                <h3>🦷 Wait! Don't Miss Out on Better Oral Health</h3>
                <button class="exit-intent-close">&times;</button>
            </div>
            <div class="exit-intent-body">
                <p>Get <strong>ProDentim</strong> at the best price with our exclusive offer:</p>
                <div class="exit-intent-offer">
                    <div class="offer-price">
                        <span class="original-price">$99</span>
                        <span class="current-price">$49</span>
                        <span class="discount">50% OFF</span>
                    </div>
                    <div class="offer-benefits">
                        <div class="benefit">✓ 3.5 Billion Probiotics</div>
                        <div class="benefit">✓ 60-Day Money Back</div>
                        <div class="benefit">✓ FREE Shipping</div>
                    </div>
                </div>
                <a href="https://479ddpdkvz087wch5mq8spmf99.hop.clickbank.net" target="_blank" rel="nofollow noopener" class="exit-intent-btn">
                    Get ProDentim Now - Limited Time
                </a>
                <p class="exit-intent-guarantee">60-Day Money-Back Guarantee</p>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .exit-intent-modal {
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
        
        .exit-intent-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            animation: slideUp 0.3s ease;
        }
        
        .exit-intent-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .exit-intent-header h3 {
            color: #1e293b;
            margin: 0;
            font-size: 1.3rem;
        }
        
        .exit-intent-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #64748b;
        }
        
        .exit-intent-offer {
            margin: 1.5rem 0;
        }
        
        .offer-price {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .original-price {
            text-decoration: line-through;
            color: #64748b;
            font-size: 1.2rem;
        }
        
        .current-price {
            font-size: 2.5rem;
            font-weight: 700;
            color: #059669;
        }
        
        .discount {
            background: #ef4444;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: 600;
        }
        
        .offer-benefits {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }
        
        .benefit {
            color: #059669;
            font-weight: 600;
        }
        
        .exit-intent-btn {
            display: inline-block;
            background: linear-gradient(135deg, #059669, #047857);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: 1rem;
            transition: transform 0.3s ease;
        }
        
        .exit-intent-btn:hover {
            transform: translateY(-2px);
        }
        
        .exit-intent-guarantee {
            color: #64748b;
            font-size: 0.9rem;
            margin: 0;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @media (max-width: 480px) {
            .exit-intent-content {
                padding: 1.5rem;
            }
            
            .current-price {
                font-size: 2rem;
            }
            
            .offer-price {
                flex-direction: column;
                gap: 0.5rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.exit-intent-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Track exit intent
    trackAffiliateClick('ProDentim Exit Intent', 'https://479ddpdkvz087wch5mq8spmf99.hop.clickbank.net');
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Scroll effects removed to prevent section separation
    // Only keeping the function for future use if needed
}

// Utility functions
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

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

// Initialize performance monitoring
measurePerformance();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

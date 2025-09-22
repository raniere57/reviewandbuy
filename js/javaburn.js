// JavaBurn Review Page JavaScript
// Performance optimized for coffee weight loss supplement review

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeRatingAnimation();
    initializeAffiliateTracking();
    initializeLazyLoading();
    initializeExitIntentOffer();
    initializeScrollEffects();
    loadRelatedReviews();
    initializeMobileMenu();
    initializeBackToTop();
    initializeProgressBars();
    initializeVideoOptimization();
    initializeImageModal();
});

// Rating Animation
function initializeRatingAnimation() {
    const targetRating = 4.5;
    const stars = document.querySelectorAll('.rating .stars i');
    const ratingNumber = document.querySelector('.rating-number');
    
    if (!stars.length || !ratingNumber) return;
    
    // Animate stars filling
    stars.forEach((star, index) => {
        setTimeout(() => {
            if (index < Math.floor(targetRating)) {
                star.style.color = '#fbbf24';
                star.style.transform = 'scale(1.2)';
                setTimeout(() => star.style.transform = 'scale(1)', 200);
            } else if (index === Math.floor(targetRating) && targetRating % 1 !== 0) {
                star.style.color = '#fbbf24';
                star.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)';
            }
        }, index * 200);
    });
    
    // Animate rating number
    setTimeout(() => {
        let currentRating = 0;
        const increment = targetRating / 20;
        const timer = setInterval(() => {
            currentRating += increment;
            if (currentRating >= targetRating) {
                currentRating = targetRating;
                clearInterval(timer);
            }
            ratingNumber.textContent = currentRating.toFixed(1) + '/5';
        }, 50);
    }, 1000);
}

// Affiliate Link Tracking
function initializeAffiliateTracking() {
    const affiliateLinks = document.querySelectorAll('a[href*="hop.clickbank.net"]');
    
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track affiliate click
            trackAffiliateClick('JavaBurn');
            
            // Add loading state
            this.style.opacity = '0.7';
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
            
            // Small delay for tracking
            setTimeout(() => {
                this.style.opacity = '1';
                this.innerHTML = this.innerHTML.replace('<i class="fas fa-spinner fa-spin"></i> Redirecting...', 'Get JavaBurn Now');
            }, 1000);
        });
    });
}

// Track affiliate clicks
function trackAffiliateClick(productName) {
    // Simple tracking - in production, integrate with analytics
    console.log(`Affiliate click tracked for: ${productName}`);
    
    // You can integrate with Google Analytics, Facebook Pixel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', 'affiliate_click', {
            'product_name': productName,
            'product_category': 'Coffee Weight Loss',
            'event_category': 'E-commerce',
            'event_label': 'JavaBurn Review'
        });
    }
}

// Lazy Loading for Images and Videos
function initializeLazyLoading() {
    const lazyElements = document.querySelectorAll('[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Skip lazy loading for specific product images to prevent disappearing
                    if (element.classList.contains('product-photo-large') || 
                        element.classList.contains('product-photo')) {
                        observer.unobserve(element);
                        return;
                    }
                    
                    if (element.tagName === 'IMG') {
                        element.src = element.dataset.src || element.src;
                        element.classList.add('loaded');
                    } else if (element.tagName === 'IFRAME') {
                        element.src = element.dataset.src || element.src;
                        element.classList.add('loaded');
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyElements.forEach(element => {
            imageObserver.observe(element);
        });
    }
}

// Exit Intent Offer
function initializeExitIntentOffer() {
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            showExitIntentOffer();
            exitIntentShown = true;
        }
    });
}

function showExitIntentOffer() {
    // Create exit intent modal
    const modal = document.createElement('div');
    modal.className = 'exit-intent-modal';
    modal.innerHTML = `
        <div class="exit-intent-overlay">
            <div class="exit-intent-content">
                <button class="exit-intent-close">&times;</button>
                <div class="exit-intent-header">
                    <h3>Wait! Don't Miss Out on Coffee Weight Loss</h3>
                </div>
                <div class="exit-intent-body">
                    <p>Get <strong>JavaBurn</strong> at the best price with our exclusive offer:</p>
                    <div class="exit-intent-offer">
                        <div class="offer-price">
                            <span class="original-price">$99</span>
                            <span class="current-price">$49</span>
                            <span class="discount">50% OFF</span>
                        </div>
                        <div class="offer-benefits">
                            <div class="benefit">✓ Natural Coffee Weight Loss</div>
                            <div class="benefit">✓ 60-Day Money Back</div>
                            <div class="benefit">✓ FREE Shipping</div>
                        </div>
                    </div>
                    <a href="https://hop.clickbank.net/?vendor=javaburn&affiliate=raniere57&lid=6100" target="_blank" rel="nofollow noopener" class="exit-intent-btn">
                        Get JavaBurn Now - $49
                    </a>
                    <p class="exit-intent-disclaimer">Limited time offer. 60-day guarantee.</p>
                </div>
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
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .exit-intent-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .exit-intent-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 100%;
            position: relative;
            animation: slideUp 0.3s ease;
        }
        
        .exit-intent-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #64748b;
        }
        
        .exit-intent-header h3 {
            color: #1e293b;
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .exit-intent-offer {
            text-align: center;
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
        }
        
        .current-price {
            font-size: 2rem;
            font-weight: bold;
            color: #8B4513;
        }
        
        .discount {
            background: #D2691E;
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 15px;
            font-size: 0.9rem;
        }
        
        .offer-benefits {
            margin: 1rem 0;
        }
        
        .benefit {
            margin: 0.5rem 0;
            color: #8B4513;
            font-weight: 600;
        }
        
        .exit-intent-btn {
            display: block;
            background: linear-gradient(135deg, #8B4513, #A0522D);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            text-align: center;
            margin: 1rem 0;
            transition: transform 0.3s ease;
        }
        
        .exit-intent-btn:hover {
            transform: translateY(-2px);
        }
        
        .exit-intent-disclaimer {
            font-size: 0.8rem;
            color: #64748b;
            text-align: center;
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
        
        @media (max-width: 768px) {
            .exit-intent-content {
                margin: 1rem;
                padding: 1.5rem;
            }
            
            .current-price {
                font-size: 1.5rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.exit-intent-close').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });
    
    modal.querySelector('.exit-intent-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.exit-intent-overlay')) {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }
    });
    
    // Track exit intent
    trackAffiliateClick('JavaBurn - Exit Intent');
}

// Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.result-card, .timeline-item, .nutrient-category');
    animateElements.forEach(el => observer.observe(el));
}

// Load Related Reviews
function loadRelatedReviews() {
    const container = document.getElementById('related-reviews-container');
    if (!container) return;
    
    const allReviews = [
        {
            id: 'gluco6',
            name: 'Gluco6',
            description: 'Natural blood sugar support supplement with plant-based ingredients for healthy glucose levels and diabetes management.',
            rating: 4.6,
            url: './gluco6.html',
            icon: 'fas fa-heartbeat'
        },
        {
            id: 'pinealguardian',
            name: 'Pineal Guardian',
            description: 'Natural pineal gland support supplement with plant-based ingredients for better sleep and melatonin production.',
            rating: 4.7,
            url: './pinealguardian.html',
            icon: 'fas fa-moon'
        },
        {
            id: 'hepatoburn',
            name: 'HepatoBurn',
            description: 'Liver purification and fat-burning supplement with proprietary complexes for weight loss.',
            rating: 4.6,
            url: './hepatoburn.html',
            icon: 'fas fa-fire'
        },
        {
            id: 'quietumplus',
            name: 'Quietum Plus',
            description: 'Natural tinnitus relief supplement with plant-based ingredients for ear health and hearing support.',
            rating: 4.8,
            url: './quietumplus.html',
            icon: 'fas fa-volume-mute'
        },
        {
            id: 'audifort',
            name: 'Audifort',
            description: 'Andrew Ross hearing health supplement with 20+ natural ingredients for ear wellness.',
            rating: 4.7,
            url: './audifort.html',
            icon: 'fas fa-ear-listen'
        },
        {
            id: 'jointgenesis',
            name: 'Joint Genesis',
            description: 'Dr. Weis joint health supplement with Mobilee® and hyaluronan for flexible joints.',
            rating: 4.8,
            url: './jointgenesis.html',
            icon: 'fas fa-bone'
        },
        {
            id: 'prodentim',
            name: 'ProDentim',
            description: 'Dr. Drew Sutton oral probiotic with 3.5B CFU for healthy teeth and gums.',
            rating: 4.9,
            url: './prodentim.html',
            icon: 'fas fa-tooth'
        },
        {
            id: 'prostavive',
            name: 'ProstaVive',
            description: 'Prostate health supplement with saw palmetto and beta-sitosterol.',
            rating: 4.7,
            url: './prostavive.html',
            icon: 'fas fa-male'
        },
        {
            id: 'mitolyn',
            name: 'Mitolyne',
            description: 'Mitochondrial support supplement for cellular energy and vitality.',
            rating: 4.5,
            url: './mitolyn.html',
            icon: 'fas fa-bolt'
        },
        {
            id: 'puremoringa',
            name: 'Pure Moringa',
            description: 'Natural superfood powder with 90+ nutrients for overall wellness.',
            rating: 4.4,
            url: './puremoringa.html',
            icon: 'fas fa-leaf'
        }
    ];
    
    // Filter out current review and get random 3
    const otherReviews = allReviews.filter(review => review.id !== 'javaburn');
    const shuffled = otherReviews.sort(() => 0.5 - Math.random());
    const selectedReviews = shuffled.slice(0, 3);
    
    container.innerHTML = selectedReviews.map(review => `
        <a href="${review.url}" class="related-review-card">
            <div class="related-review-header">
                <div class="related-review-icon">
                    <i class="${review.icon}"></i>
                </div>
                <h3 class="related-review-title">${review.name}</h3>
            </div>
            <div class="related-review-rating">
                <div class="related-review-stars">
                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(review.rating))}
                </div>
                <span>${review.rating}/5</span>
            </div>
            <p class="related-review-description">${review.description}</p>
            <div class="related-review-cta">
                Read Review <i class="fas fa-arrow-right"></i>
            </div>
        </a>
    `).join('');
}

// Mobile Menu
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        // Remove any existing event listeners to prevent conflicts
        const newNavToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newNavToggle, navToggle);
        
        newNavToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.classList.toggle('active');
            newNavToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                newNavToggle.classList.remove('active');
            });
        });
    }
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--product-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Progress Bars Animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 500);
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Video Optimization
function initializeVideoOptimization() {
    const videos = document.querySelectorAll('iframe[src*="youtube.com"]');
    
    videos.forEach(video => {
        // Add loading optimization
        video.addEventListener('load', () => {
            video.classList.add('loaded');
        });
        
        // Pause video when not in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // Note: Cannot directly pause YouTube iframe, but we can track visibility
                    console.log('Video out of viewport');
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(video);
    });
}

// Image Modal
function initializeImageModal() {
    const images = document.querySelectorAll('.product-photo, .product-photo-large');
    
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            showImageModal(img.src, img.alt);
        });
    });
}

function showImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-overlay">
            <div class="image-modal-content">
                <button class="image-modal-close">&times;</button>
                <img src="${src}" alt="${alt}" class="image-modal-img">
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .image-modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .image-modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
        
        .image-modal-img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 8px;
        }
        
        @media (max-width: 768px) {
            .image-modal-close {
                top: -30px;
                font-size: 1.5rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    modal.querySelector('.image-modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });
    
    modal.querySelector('.image-modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.image-modal-overlay')) {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }
    });
}

// Performance monitoring
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
            }, 0);
        });
    }
}

// Initialize performance monitoring
logPerformanceMetrics();

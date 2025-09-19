// Mitolyn Review Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initVideoSection();
    initConversionTracking();
    initVerdictSection();
    initLightbox();
    initHeaderButton();
    initExitIntent();
    
    console.log('Mitolyn review page loaded successfully');
});

// Scroll-based animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate progress bars
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
                
                // Animate timeline items
                const timelineItems = entry.target.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    // Observe all major sections
    const sections = document.querySelectorAll('.content-section, .quick-summary, .video-product-section, .conversion-section, .verdict-section, .related-reviews');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // Initialize timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    });
}

// Video section functionality
function initVideoSection() {
    const videoSection = document.querySelector('.video-product-section');
    const videoWrapper = document.querySelector('.video-wrapper');
    const productImageLarge = document.querySelector('.product-image-large');

    if (videoSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (videoWrapper) {
                        videoWrapper.style.transform = 'scale(1)';
                        videoWrapper.style.opacity = '1';
                    }
                    if (productImageLarge) {
                        productImageLarge.style.transform = 'translateY(0)';
                        productImageLarge.style.opacity = '1';
                    }
                }
            });
        }, { threshold: 0.3 });

        observer.observe(videoSection);
    }

    // Initialize video wrapper
    if (videoWrapper) {
        videoWrapper.style.transform = 'scale(0.95)';
        videoWrapper.style.opacity = '0';
        videoWrapper.style.transition = 'all 0.6s ease-out';
        
        // Track video interactions
        videoWrapper.addEventListener('click', () => {
            trackAffiliateClick('video_click', 'Mitolyn');
        });
    }

    // Initialize product image
    if (productImageLarge) {
        productImageLarge.style.transform = 'translateY(30px)';
        productImageLarge.style.opacity = '0';
        productImageLarge.style.transition = 'all 0.6s ease-out';
    }
}

// Conversion tracking and animations
function initConversionTracking() {
    const conversionButtons = document.querySelectorAll('.conversion-btn');
    
    conversionButtons.forEach((button, index) => {
        // Entrance animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.5 });

        button.style.opacity = '0';
        button.style.transform = 'translateY(20px) scale(0.95)';
        button.style.transition = 'all 0.5s ease-out';
        observer.observe(button);

        // Click tracking
        button.addEventListener('click', function(e) {
            const buttonType = this.classList.contains('primary') ? 'primary_conversion' : 
                             this.classList.contains('secondary') ? 'secondary_conversion' : 'final_conversion';
            
            trackAffiliateClick(buttonType, 'Mitolyn');
            
            // Button click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });

        // Hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Verdict section with rating animation
function initVerdictSection() {
    const verdictSection = document.querySelector('.verdict-section');
    const ratingScore = document.querySelector('.rating-score');

    if (verdictSection && ratingScore) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateRating();
                    animateStars();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(verdictSection);
    }

    function animateRating() {
        if (ratingScore) {
            let currentRating = 0;
            const targetRating = 4.8;
            const increment = targetRating / 30;
            
            const ratingAnimation = setInterval(() => {
                currentRating += increment;
                ratingScore.textContent = currentRating.toFixed(1);
                
                if (currentRating >= targetRating) {
                    ratingScore.textContent = targetRating;
                    clearInterval(ratingAnimation);
                }
            }, 50);
        }
    }

    function animateStars() {
        const stars = document.querySelectorAll('.verdict-rating .stars i');
        stars.forEach((star, index) => {
            setTimeout(() => {
                star.style.transform = 'scale(1.3)';
                star.style.color = '#fbbf24';
                setTimeout(() => {
                    star.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }
}

// Lightbox functionality for product images
function initLightbox() {
    const productPhoto = document.querySelector('.product-photo');
    const productPhotoLarge = document.querySelector('.product-photo-large');

    function createLightbox(imageSrc, imageAlt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${imageSrc}" alt="${imageAlt}" class="lightbox-image">
                <div class="lightbox-caption">${imageAlt}</div>
            </div>
        `;

        // Styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            text-align: center;
        `;

        const image = lightbox.querySelector('.lightbox-image');
        image.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        `;

        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const caption = lightbox.querySelector('.lightbox-caption');
        caption.style.cssText = `
            color: white;
            margin-top: 1rem;
            font-size: 1.1rem;
        `;

        document.body.appendChild(lightbox);
        
        // Animate in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);

        // Close functionality
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        }

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        document.addEventListener('keydown', function escapeClose(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escapeClose);
            }
        });
    }

    if (productPhoto) {
        productPhoto.addEventListener('click', () => {
            createLightbox(productPhoto.src, productPhoto.alt);
            trackAffiliateClick('image_view', 'Mitolyn');
        });
        productPhoto.style.cursor = 'pointer';
    }

    if (productPhotoLarge) {
        productPhotoLarge.addEventListener('click', () => {
            createLightbox(productPhotoLarge.src, productPhotoLarge.alt);
            trackAffiliateClick('image_view_large', 'Mitolyn');
        });
        productPhotoLarge.style.cursor = 'pointer';
    }
}

// Header button functionality
function initHeaderButton() {
    const headerBtn = document.querySelector('.header-official-btn');
    
    if (headerBtn) {
        headerBtn.addEventListener('click', function(e) {
            trackAffiliateClick('header_button', 'Mitolyn');
        });

        // Hover animation
        headerBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        headerBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Entrance animation
        setTimeout(() => {
            headerBtn.style.opacity = '1';
            headerBtn.style.transform = 'translateY(0)';
        }, 1000);

        headerBtn.style.opacity = '0';
        headerBtn.style.transform = 'translateY(10px)';
        headerBtn.style.transition = 'all 0.3s ease';
    }
}

// Exit intent functionality
function initExitIntent() {
    let exitIntentShown = false;
    
    function showExitIntentOffer() {
        if (exitIntentShown) return;
        exitIntentShown = true;

        const exitModal = document.createElement('div');
        exitModal.className = 'exit-intent-modal';
        exitModal.innerHTML = `
            <div class="exit-modal-backdrop">
                <div class="exit-modal-content">
                    <button class="exit-modal-close">&times;</button>
                    <h2>🔥 Wait! Don't Miss This Limited Offer!</h2>
                    <p>Get Mitolyn with our <strong>90-day money-back guarantee</strong></p>
                    <div class="exit-offer">
                        <span class="exit-price">$49</span>
                        <span class="exit-guarantee">Risk-Free Trial + FREE Shipping</span>
                    </div>
                    <a href="https://2dab8nhar3328teaompca96z5i.hop.clickbank.net" target="_blank" class="exit-cta">
                        🚀 Claim Your Discount Now
                    </a>
                    <p class="exit-timer">⏰ This offer expires in <span id="exit-countdown">10:00</span></p>
                </div>
            </div>
        `;

        // Styles
        const styles = `
            .exit-intent-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .exit-modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            .exit-modal-content {
                position: relative;
                background: linear-gradient(135deg, #ff6b35, #f7931e);
                color: white;
                padding: 3rem 2rem;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                margin: 2rem;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                animation: exitModalSlide 0.5s ease-out;
            }
            .exit-modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                width: 40px;
                height: 40px;
            }
            .exit-modal-content h2 {
                font-size: 1.8rem;
                margin-bottom: 1rem;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            .exit-offer {
                margin: 2rem 0;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 15px;
                backdrop-filter: blur(10px);
            }
            .exit-price {
                font-size: 3rem;
                font-weight: 900;
                display: block;
                margin-bottom: 0.5rem;
                text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
            }
            .exit-guarantee {
                font-size: 1.1rem;
                font-weight: 600;
            }
            .exit-cta {
                display: inline-block;
                background: white;
                color: #ff6b35;
                padding: 1rem 2rem;
                border-radius: 50px;
                text-decoration: none;
                font-weight: 800;
                font-size: 1.2rem;
                margin: 1rem 0;
                transition: all 0.3s ease;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            }
            .exit-cta:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
            }
            .exit-timer {
                font-size: 0.9rem;
                opacity: 0.9;
                margin-top: 1rem;
            }
            @keyframes exitModalSlide {
                from {
                    transform: translateY(-50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);

        document.body.appendChild(exitModal);

        // Countdown timer
        let timeLeft = 600; // 10 minutes
        const countdown = document.getElementById('exit-countdown');
        const timer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdown.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            timeLeft--;
            
            if (timeLeft < 0) {
                clearInterval(timer);
                countdown.textContent = '0:00';
            }
        }, 1000);

        // Close functionality
        function closeModal() {
            exitModal.style.opacity = '0';
            exitModal.style.transform = 'scale(0.9)';
            setTimeout(() => {
                document.body.removeChild(exitModal);
                document.head.removeChild(styleSheet);
                clearInterval(timer);
            }, 300);
        }

        exitModal.querySelector('.exit-modal-close').addEventListener('click', closeModal);
        exitModal.querySelector('.exit-modal-backdrop').addEventListener('click', closeModal);
        
        // Track exit intent
        trackAffiliateClick('exit_intent', 'Mitolyn');
        
        // Track CTA click
        exitModal.querySelector('.exit-cta').addEventListener('click', () => {
            trackAffiliateClick('exit_intent_conversion', 'Mitolyn');
        });
    }

    // Exit intent detection
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0) {
            showExitIntentOffer();
        }
    });

    // Mobile exit intent (scroll to top)
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop < lastScrollTop && scrollTop < 100) {
            showExitIntentOffer();
        }
        lastScrollTop = scrollTop;
    });
}

// Affiliate click tracking
function trackAffiliateClick(buttonType, productName = 'Mitolyn') {
    // Console logging for debugging
    console.log(`Affiliate click tracked: ${buttonType} for ${productName}`);
    
    // Google Analytics 4 tracking (uncomment when GA4 is setup)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'click', {
    //         event_category: 'affiliate_link',
    //         event_label: `${productName}_${buttonType}`,
    //         value: 1
    //     });
    // }
    
    // Facebook Pixel tracking (uncomment when pixel is setup)
    // if (typeof fbq !== 'undefined') {
    //     fbq('track', 'Lead', {
    //         content_name: 'Mitolyn Review',
    //         content_category: 'Weight Loss Supplement',
    //         value: 49.00,
    //         currency: 'USD'
    //     });
    // }
    
    // Custom tracking endpoint (implement as needed)
    // fetch('/track-affiliate-click', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         product: productName,
    //         button_type: buttonType,
    //         timestamp: new Date().toISOString(),
    //         page_url: window.location.href,
    //         user_agent: navigator.userAgent
    //     })
    // }).catch(console.error);
}

// Urgency and scarcity effects
setTimeout(() => {
    const discountBadges = document.querySelectorAll('.discount-badge');
    discountBadges.forEach(badge => {
        if (badge.textContent.includes('83% OFF')) {
            badge.textContent = '83% OFF - Limited Time!';
            badge.style.animation = 'pulse 1s infinite';
        }
    });
}, 30000); // After 30 seconds

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    // Load Related Reviews
    loadRelatedReviews('mitolyn');
});

// Function to load related reviews dynamically
function loadRelatedReviews(currentReviewId) {
    // Database of all reviews
    const allReviews = [
        {
            id: 'puremoringa',
            name: 'Pure Moringa Supplement',
            rating: 4.9,
            description: 'Organic moringa leaf supplement for energy and wellness with 27 vitamins and minerals',
            url: 'puremoringa.html',
            icon: 'fas fa-leaf'
        },
        {
            id: 'mitolyn',
            name: 'Mitolyn Weight Loss',
            rating: 4.8,
            description: 'Revolutionary mitochondrial support supplement for natural weight loss and energy boost',
            url: 'mitolyn.html',
            icon: 'fas fa-fire'
        },
        {
            id: 'prostavive',
            name: 'Prostavive Prostate Support',
            rating: 4.7,
            description: 'Natural prostate support supplement with clinically-studied ingredients for urinary health',
            url: 'prostavive.html',
            icon: 'fas fa-shield-alt'
        },
        {
            id: 'sleeplean',
            name: 'Sleep Lean Weight Loss',
            rating: 4.8,
            description: 'Natural weight loss sleep supplement that targets blue light exposure and improves sleep quality',
            url: 'sleeplean.html',
            icon: 'fas fa-moon'
        }
    ];
    
    // Filter out current review and get up to 3 others
    const relatedReviews = allReviews
        .filter(review => review.id !== currentReviewId)
        .slice(0, 3);
    
    // Generate HTML for related reviews
    const container = document.getElementById('related-reviews-container');
    if (container && relatedReviews.length > 0) {
        container.innerHTML = relatedReviews.map(review => {
            return `
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
                            ${review.rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                        </div>
                        <span>${review.rating}/5</span>
                    </div>
                    <p class="related-review-description">${review.description}</p>
                    <div class="related-review-cta">
                        Read Full Review <i class="fas fa-arrow-right"></i>
                    </div>
                </a>
            `;
        }).join('');
    }
}

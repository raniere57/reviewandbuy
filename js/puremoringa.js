// Pure Moringa Review Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize review-specific features
    initProgressBars();
    initTimelineAnimations();
    initRatingAnimations();
    initScrollIndicator();
    initVideoSection();
    initConversionTracking();
    initHeaderButton();
    
    console.log('Pure Moringa review page initialized!');
});

// Animate progress bars when they come into view
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                
                // Reset width and animate
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 2s ease-out';
                    progressBar.style.width = targetWidth;
                }, 200);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Animate timeline items as they come into view
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Initially hide timeline items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease-out';
        timelineObserver.observe(item);
    });
}

// Enhanced rating star animations
function initRatingAnimations() {
    const ratingElements = document.querySelectorAll('.rating');
    
    ratingElements.forEach(rating => {
        const stars = rating.querySelectorAll('.stars i');
        
        rating.addEventListener('mouseenter', function() {
            stars.forEach((star, index) => {
                setTimeout(() => {
                    star.style.transform = 'scale(1.2) rotate(5deg)';
                    setTimeout(() => {
                        star.style.transform = 'scale(1) rotate(0deg)';
                    }, 150);
                }, index * 50);
            });
        });
    });
}

// Reading progress indicator
function initScrollIndicator() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    // Add CSS for progress bar
    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(255, 255, 255, 0.2);
            z-index: 9999;
            backdrop-filter: blur(10px);
        }
        
        .reading-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #10b981, #059669);
            width: 0%;
            transition: width 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    // Update progress on scroll
    const progressBarInner = document.querySelector('.reading-progress-bar');
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBarInner.style.width = scrolled + '%';
    });
}

// Enhanced result card interactions
document.querySelectorAll('.result-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.result-icon');
        const progress = this.querySelector('.progress');
        
        // Animate icon
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        
        // Pulse progress bar
        progress.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.5)';
        
        setTimeout(() => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            progress.style.boxShadow = 'none';
        }, 300);
    });
});

// Safety card interactions
document.querySelectorAll('.safety-card').forEach(card => {
    card.addEventListener('click', function() {
        const isExpanded = this.classList.contains('expanded');
        
        // Close all other cards
        document.querySelectorAll('.safety-card').forEach(c => {
            c.classList.remove('expanded');
            c.style.maxHeight = null;
        });
        
        if (!isExpanded) {
            this.classList.add('expanded');
            this.style.maxHeight = this.scrollHeight + 'px';
        }
    });
});

// Pros and cons list animations
function animateListItems() {
    const prosItems = document.querySelectorAll('.pros li');
    const consItems = document.querySelectorAll('.cons li');
    
    const listObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');
                
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                });
                
                listObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Observe pros and cons sections
    const prosSection = document.querySelector('.pros');
    const consSection = document.querySelector('.cons');
    
    if (prosSection && consSection) {
        // Initially hide list items
        [...prosItems, ...consItems].forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.4s ease-out';
        });
        
        listObserver.observe(prosSection);
        listObserver.observe(consSection);
    }
}

// Initialize list animations after DOM is loaded
setTimeout(animateListItems, 100);

// Related reviews hover effects
document.querySelectorAll('.related-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const image = this.querySelector('.related-image');
        image.style.transform = 'scale(1.1) rotate(-5deg)';
        
        setTimeout(() => {
            image.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });
});

// Verdict section entrance animation
const verdictObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const ratingScore = entry.target.querySelector('.rating-score');
            const stars = entry.target.querySelectorAll('.verdict-rating .stars i');
            
            // Animate rating number
            if (ratingScore) {
                let currentRating = 0;
                const targetRating = 4.9;
                const increment = targetRating / 30;
                
                const ratingAnimation = setInterval(() => {
                    currentRating += increment;
                    ratingScore.textContent = currentRating.toFixed(1);
                    
                    if (currentRating >= targetRating) {
                        ratingScore.textContent = targetRating;
                        clearInterval(ratingAnimation);
                        
                        // Animate stars after rating
                        stars.forEach((star, index) => {
                            setTimeout(() => {
                                star.style.transform = 'scale(1.3)';
                                setTimeout(() => {
                                    star.style.transform = 'scale(1)';
                                }, 200);
                            }, index * 100);
                        });
                    }
                }, 50);
            }
            
            verdictObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const verdictSection = document.querySelector('.verdict-section');
if (verdictSection) {
    verdictObserver.observe(verdictSection);
}

// Enhanced breadcrumb navigation
const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
breadcrumbLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Copy link functionality (for sharing)
function copyReviewLink() {
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Review link copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Review link copied to clipboard!');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Make copy function available globally
window.copyReviewLink = copyReviewLink;

// Analytics tracking for review interactions
function trackReviewInteraction(action, element) {
    // This would integrate with your analytics service
    console.log(`Review interaction: ${action} on ${element}`);
    
    // Example Google Analytics event
    // gtag('event', 'review_interaction', {
    //     'action': action,
    //     'element': element,
    //     'review_name': 'Pure Moringa'
    // });
}

// Track section views
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionName = entry.target.querySelector('h2')?.textContent || 'Unknown Section';
            trackReviewInteraction('section_view', sectionName);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all content sections
document.querySelectorAll('.content-section, .pros-cons-section, .verdict-section, .video-product-section').forEach(section => {
    sectionObserver.observe(section);
});

// Video Section Functionality
function initVideoSection() {
    const videoSection = document.querySelector('.video-product-section');
    const videoWrapper = document.querySelector('.video-wrapper');
    const productImageLarge = document.querySelector('.product-image-large');
    
    if (!videoSection) return;
    
    // Animate video section entrance
    const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate video wrapper
                setTimeout(() => {
                    videoWrapper.style.transform = 'scale(1)';
                    videoWrapper.style.opacity = '1';
                }, 200);
                
                // Animate product image
                setTimeout(() => {
                    productImageLarge.style.transform = 'translateY(0)';
                    productImageLarge.style.opacity = '1';
                }, 400);
                
                videoObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Initially hide elements for animation
    if (videoWrapper) {
        videoWrapper.style.transform = 'scale(0.95)';
        videoWrapper.style.opacity = '0';
        videoWrapper.style.transition = 'all 0.6s ease-out';
    }
    
    if (productImageLarge) {
        productImageLarge.style.transform = 'translateY(30px)';
        productImageLarge.style.opacity = '0';
        productImageLarge.style.transition = 'all 0.6s ease-out';
    }
    
    videoObserver.observe(videoSection);
    
    // Track video interactions
    const iframe = document.querySelector('.video-wrapper iframe');
    if (iframe) {
        // Track when video section is viewed
        trackReviewInteraction('video_section_viewed', 'YouTube Video');
        
        // Add click tracking to video wrapper
        videoWrapper.addEventListener('click', function() {
            trackReviewInteraction('video_clicked', 'Pure Moringa Review Video');
        });
    }
    
}

// Enhanced product image interactions
const productPhoto = document.querySelector('.product-photo');
const productPhotoLarge = document.querySelector('.product-photo-large');

if (productPhoto) {
    productPhoto.addEventListener('click', function() {
        // Create lightbox effect
        createImageLightbox(this.src, this.alt);
        trackReviewInteraction('product_image_clicked', 'Pure Moringa Product Photo Header');
    });
}

if (productPhotoLarge) {
    productPhotoLarge.addEventListener('click', function() {
        // Create lightbox effect
        createImageLightbox(this.src, this.alt);
        trackReviewInteraction('product_image_clicked', 'Pure Moringa Product Photo Large');
    });
}

// Image lightbox functionality
function createImageLightbox(imageSrc, imageAlt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-backdrop">
            <div class="lightbox-container">
                <button class="lightbox-close">&times;</button>
                <img src="${imageSrc}" alt="${imageAlt}" class="lightbox-image">
                <div class="lightbox-caption">
                    <h3>${imageAlt}</h3>
                    <p>Click outside to close</p>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .lightbox-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            animation: fadeIn 0.3s ease-out;
        }
        
        .lightbox-container {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: scaleIn 0.3s ease-out;
        }
        
        .lightbox-image {
            width: 100%;
            height: auto;
            max-height: 70vh;
            object-fit: contain;
            display: block;
        }
        
        .lightbox-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1;
            transition: background 0.3s ease;
        }
        
        .lightbox-close:hover {
            background: rgba(0, 0, 0, 0.8);
        }
        
        .lightbox-caption {
            padding: 1.5rem;
            text-align: center;
        }
        
        .lightbox-caption h3 {
            margin: 0 0 0.5rem 0;
            color: #1e293b;
        }
        
        .lightbox-caption p {
            margin: 0;
            color: #64748b;
            font-size: 0.9rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(lightbox);
    
    // Close lightbox events
    const closeLightbox = () => {
        document.body.removeChild(lightbox);
        document.head.removeChild(style);
    };
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-backdrop').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Close with Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Conversion Tracking for Affiliate Links
function initConversionTracking() {
    const conversionButtons = document.querySelectorAll('.conversion-btn');
    
    conversionButtons.forEach((button, index) => {
        // Add entrance animation
        const conversionCard = button.closest('.conversion-card');
        if (conversionCard) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3
            });
            
            // Initially hide for animation
            conversionCard.style.opacity = '0';
            conversionCard.style.transform = 'translateY(30px) scale(0.95)';
            conversionCard.style.transition = 'all 0.6s ease-out';
            
            observer.observe(conversionCard);
        }
        
        // Track clicks
        button.addEventListener('click', function(e) {
            const buttonType = this.classList.contains('primary') ? 'Primary' : 
                              this.classList.contains('secondary') ? 'Secondary' : 
                              this.classList.contains('final') ? 'Final' : 'Unknown';
            
            const buttonText = this.textContent.trim().split('\n')[0];
            
            // Track the affiliate click
            trackAffiliateClick(buttonType, buttonText, index + 1);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Optional: Add a small delay to ensure tracking is sent
            // e.preventDefault();
            // setTimeout(() => {
            //     window.open(this.href, '_blank');
            // }, 100);
        });
        
        // Hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Affiliate Click Tracking Function
function trackAffiliateClick(buttonType, buttonText, position) {
    const trackingData = {
        event: 'affiliate_click',
        button_type: buttonType,
        button_text: buttonText,
        button_position: position,
        product: 'Pure Moringa',
        affiliate_link: 'https://mdrnremedy.com/#aff=raniere57',
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent
    };
    
    // Console log for debugging
    console.log('Affiliate Click Tracked:', trackingData);
    
    // Google Analytics 4 Event (uncomment when GA is setup)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'affiliate_click', {
    //         'button_type': buttonType,
    //         'button_text': buttonText,
    //         'button_position': position,
    //         'product_name': 'Pure Moringa'
    //     });
    // }
    
    // Facebook Pixel Event (uncomment when FB Pixel is setup)
    // if (typeof fbq !== 'undefined') {
    //     fbq('track', 'Lead', {
    //         content_name: 'Pure Moringa Review',
    //         content_category: 'Supplement Review',
    //         value: 39.00,
    //         currency: 'USD'
    //     });
    // }
    
    // Custom analytics endpoint (replace with your analytics service)
    // fetch('/api/track-affiliate-click', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(trackingData)
    // }).catch(err => console.log('Tracking error:', err));
}

// Conversion Rate Optimization - Show urgency after time
setTimeout(() => {
    const discountBadges = document.querySelectorAll('.discount-badge');
    discountBadges.forEach(badge => {
        if (badge.textContent.includes('80% OFF')) {
            badge.textContent = '80% OFF - Limited Time!';
            badge.style.animation = 'pulse 1s infinite';
        }
    });
}, 30000); // After 30 seconds

// Exit Intent Detection (simplified)
let exitIntentShown = false;
document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        showExitIntentOffer();
    }
});

function showExitIntentOffer() {
    const exitModal = document.createElement('div');
    exitModal.className = 'exit-intent-modal';
    exitModal.innerHTML = `
        <div class="exit-modal-backdrop">
            <div class="exit-modal-content">
                <button class="exit-modal-close">&times;</button>
                <h2>Wait! Don't Miss Out!</h2>
                <p>Get Pure Moringa with our <strong>60-day money-back guarantee</strong></p>
                <div class="exit-offer">
                    <span class="exit-price">$39</span>
                    <span class="exit-guarantee">Risk-Free Trial + FREE Shipping</span>
                </div>
                <a href="https://mdrnremedy.com/#aff=raniere57" target="_blank" class="exit-cta">
                    Claim Your Discount Now
                </a>
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
            animation: fadeIn 0.3s ease-out;
        }
        .exit-modal-backdrop {
            background: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        .exit-modal-content {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            position: relative;
            animation: scaleIn 0.3s ease-out;
        }
        .exit-modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #64748b;
        }
        .exit-offer {
            margin: 2rem 0;
        }
        .exit-price {
            font-size: 3rem;
            font-weight: 800;
            color: #10b981;
            display: block;
        }
        .exit-guarantee {
            color: #64748b;
            font-weight: 600;
        }
        .exit-cta {
            display: inline-block;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 700;
            transition: transform 0.3s ease;
        }
        .exit-cta:hover {
            transform: translateY(-2px);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(exitModal);
    
    // Track exit intent
    trackAffiliateClick('Exit Intent', 'Claim Your Discount Now', 'exit');
    
    // Close modal functionality
    const closeModal = () => {
        document.body.removeChild(exitModal);
        document.head.removeChild(style);
    };
    
    exitModal.querySelector('.exit-modal-close').addEventListener('click', closeModal);
    exitModal.querySelector('.exit-modal-backdrop').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Close after 10 seconds
    setTimeout(closeModal, 10000);
}

// Header Official Button Functionality
function initHeaderButton() {
    const headerBtn = document.querySelector('.header-official-btn');
    
    if (headerBtn) {
        // Add click tracking
        headerBtn.addEventListener('click', function(e) {
            trackAffiliateClick('Header', 'Official Website', 'header');
            
            // Add visual feedback
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
        });
        
        // Enhanced hover effects
        headerBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        });
        
        headerBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });
        
        // Entrance animation
        setTimeout(() => {
            headerBtn.style.opacity = '1';
            headerBtn.style.transform = 'translateY(-2px)';
        }, 1000);
        
        // Initially hidden for animation
        headerBtn.style.opacity = '0';
        headerBtn.style.transform = 'translateY(10px)';
        headerBtn.style.transition = 'all 0.4s ease-out';
    }
}

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

// Load related reviews when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadRelatedReviews('puremoringa');
});

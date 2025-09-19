// Prostavive Review JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Rating Animation
    const targetRating = 4.7;
    const ratingElement = document.querySelector('.verdict-rating .rating-score');
    
    if (ratingElement) {
        let currentRating = 0;
        const increment = targetRating / 50;
        
        const animateRating = () => {
            if (currentRating < targetRating) {
                currentRating += increment;
                ratingElement.textContent = currentRating.toFixed(1);
                requestAnimationFrame(animateRating);
            } else {
                ratingElement.textContent = targetRating.toFixed(1);
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateRating();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(ratingElement);
    }
    
    // Affiliate Link Tracking
    function trackAffiliateClick(buttonType, productName = 'Prostavive') {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'affiliate_link',
                event_label: `${productName}_${buttonType}`,
                value: 1
            });
        }
        
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: productName,
                content_category: 'Health Supplement',
                value: 69.00,
                currency: 'USD'
            });
        }
        
        console.log(`Affiliate click tracked: ${productName} - ${buttonType}`);
    }
    
    // Add click tracking to conversion buttons
    const conversionButtons = document.querySelectorAll('.conversion-btn, .header-official-btn');
    conversionButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            const buttonType = this.classList.contains('header-official-btn') ? 'header' : 
                              this.classList.contains('secondary') ? 'secondary' : 
                              this.classList.contains('final') ? 'final' : `conversion_${index + 1}`;
            
            trackAffiliateClick(buttonType);
        });
    });
    
    // Lightbox functionality
    window.openLightbox = function(src, alt) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const caption = document.getElementById('lightbox-caption');
        
        if (lightbox && lightboxImg) {
            lightbox.style.display = 'block';
            lightboxImg.src = src;
            lightboxImg.alt = alt;
            if (caption) {
                caption.textContent = alt;
            }
            document.body.style.overflow = 'hidden';
        }
    };
    
    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Close lightbox events
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                closeLightbox();
            }
        });
    }
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Load Related Reviews
    loadRelatedReviews('prostavive');
    
    console.log('Prostavive review JavaScript loaded successfully');
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
            const stars = '★'.repeat(Math.floor(review.rating)) + (review.rating % 1 ? '☆' : '');
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

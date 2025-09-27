// Cognicare Pro Review JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    });

    progressBars.forEach(bar => observer.observe(bar));

    // Rating animation
    const stars = document.querySelectorAll('.stars i');
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.opacity = '0';
            star.style.transform = 'scale(0.5)';
            star.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                star.style.opacity = '1';
                star.style.transform = 'scale(1)';
            }, 100);
        }, index * 100);
    });

    // Scroll indicator
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

    // Affiliate link tracking
    function trackAffiliateClick(productName, linkType) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'affiliate_click', {
                'product_name': productName,
                'link_type': linkType,
                'event_category': 'engagement'
            });
        }
    }

    // Add click tracking to affiliate links
    const affiliateLinks = document.querySelectorAll('a[href*="clickbank.net"]');
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackAffiliateClick('Cognicare Pro', 'affiliate_link');
        });
    });

    // Exit-intent modal
    let exitIntentShown = false;
    
    function showExitIntentOffer(modalContent) {
        if (exitIntentShown) return;
        
        const modal = document.createElement('div');
        modal.className = 'exit-modal';
        modal.innerHTML = modalContent;
        
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
                color: #7c3aed;
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
                background: linear-gradient(135deg, #7c3aed, #5b21b6);
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
    }

    // Exit-intent modal for Cognicare Pro
    const exitIntentModalContent = `
        <div class="exit-modal-content">
            <button class="exit-modal-close">&times;</button>
            <h2>Wait! Don't Miss Out!</h2>
            <p>Get <strong>Cognicare Pro</strong> with our <strong>money-back guarantee</strong></p>
            <div class="exit-offer">
                <span class="exit-price">$39</span>
                <span class="exit-guarantee">Risk-Free + Selected FREE Shipping</span>
            </div>
            <a href="https://205aaikmx9-dj-c0u0-4l0y-bp.hop.clickbank.net" target="_blank" class="exit-cta">Claim Your Discount Now</a>
        </div>`;
    
    // Show exit intent modal
    let mouseY = 0;
    document.addEventListener('mouseout', function(e) {
        if (e.clientY <= 0) {
            setTimeout(() => {
                showExitIntentOffer(exitIntentModalContent);
            }, 1000);
        }
    });

    // Load related reviews
    function loadRelatedReviews() {
        const container = document.getElementById('related-reviews-container');
        if (!container) return;

        const allReviews = [
            {
                title: 'Neuro Prime Review',
                description: 'Advanced cognitive support for mental clarity and focus.',
                rating: '4.7/5',
                icon: 'fas fa-brain',
                url: './neuroprime.html'
            },
            {
                title: 'ZenCortex Review',
                description: 'Natural hearing support with cognitive benefits.',
                rating: '4.8/5',
                icon: 'fas fa-ear-listen',
                url: './zencortex.html'
            },
            {
                title: 'Neuro Quiet Review',
                description: 'Calm support for better sleep and mental wellness.',
                rating: '4.6/5',
                icon: 'fas fa-moon',
                url: './neuroquiet.html'
            }
        ];

        // Filter out current review
        const currentReview = 'cognicarepro';
        const filteredReviews = allReviews.filter(review => 
            !review.url.includes(currentReview)
        );

        // Display related reviews
        container.innerHTML = filteredReviews.map(review => `
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

    // Load related reviews
    loadRelatedReviews();

    // Video fallback logic
    (function enhanceVideoErrorHandling(){
        const onReady = () => {
            const videoIframe = document.getElementById('youtube-video');
            const videoFallback = document.getElementById('video-fallback');
            const youtubeUrl = "https://www.youtube.com/watch?v=qn5L7LhS-vQ&t=5s";

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
});

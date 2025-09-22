// YuSleep Review Specific JavaScript

(function initEntrypoint(){
    const init = () => {
        initProgressBars();
        initTimelineAnimations();
        initRatingAnimations(4.8);
        initVideoSection('YuSleep Review Video');
        initConversionTracking();
        initHeaderButton();
        initMobileMenu();
        loadRelatedReviews('yusleep');
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.transition = 'width 2s ease-out';
                    progressBar.style.width = targetWidth;
                }, 200);
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });
    progressBars.forEach(bar => { progressObserver.observe(bar); });
}

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
    }, { threshold: 0.3 });
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease-out';
        timelineObserver.observe(item);
    });
}

function initRatingAnimations(targetRating) {
    const ratingElements = document.querySelectorAll('.rating');
    ratingElements.forEach(rating => {
        const stars = rating.querySelectorAll('.stars i');
        const ratingNumber = rating.querySelector('.rating-number');
        rating.addEventListener('mouseenter', function() {
            stars.forEach((star, index) => {
                setTimeout(() => {
                    star.style.transform = 'scale(1.2) rotate(5deg)';
                    setTimeout(() => { star.style.transform = 'scale(1) rotate(0deg)'; }, 150);
                }, index * 50);
            });
        });
        const verdictScore = document.querySelector('.verdict-section .rating-score');
        if (verdictScore) {
            let currentRating = 0;
            const increment = targetRating / 30;
            const ratingAnimation = setInterval(() => {
                currentRating += increment;
                if (currentRating >= targetRating) {
                    verdictScore.textContent = targetRating;
                    clearInterval(ratingAnimation);
                } else {
                    verdictScore.textContent = currentRating.toFixed(1);
                }
            }, 50);
        }
        if (ratingNumber) {
            ratingNumber.textContent = targetRating.toFixed(1) + '/5';
        }
    });
}

function initVideoSection(label) {
    const videoSection = document.querySelector('.video-product-section');
    const videoWrapper = document.querySelector('.video-wrapper');
    const productImageLarge = document.querySelector('.product-image-large');
    if (!videoSection) return;
    const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => { if(videoWrapper){ videoWrapper.style.transform = 'scale(1)'; videoWrapper.style.opacity = '1'; } }, 200);
                setTimeout(() => { if(productImageLarge){ productImageLarge.style.transform = 'translateY(0)'; productImageLarge.style.opacity = '1'; } }, 400);
                videoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    if (videoWrapper) { videoWrapper.style.transform = 'scale(0.95)'; videoWrapper.style.opacity = '0'; videoWrapper.style.transition = 'all 0.6s ease-out'; }
    if (productImageLarge) { productImageLarge.style.transform = 'translateY(30px)'; productImageLarge.style.opacity = '0'; productImageLarge.style.transition = 'all 0.6s ease-out'; }
    videoObserver.observe(videoSection);
    const iframe = document.querySelector('.video-wrapper iframe');
    if (iframe) {
        trackReviewInteraction('video_section_viewed', label);
        if(videoWrapper){ videoWrapper.addEventListener('click', function() { trackReviewInteraction('video_clicked', label); }); }
    }
}

function initConversionTracking() {
    const buttons = document.querySelectorAll('.conversion-btn, .header-official-btn');
    buttons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const type = this.classList.contains('primary') ? 'Primary' : this.classList.contains('secondary') ? 'Secondary' : this.classList.contains('final') ? 'Final' : 'Header';
            const text = this.textContent.trim().split('\n')[0];
            trackAffiliateClick(type, text, index + 1);
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 150);
        });
        button.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-3px) scale(1.02)'; });
        button.addEventListener('mouseleave', function() { this.style.transform = ''; });
    });

    let exitIntentShown = false;
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            showExitIntentOffer();
        }
    });
}

function trackAffiliateClick(buttonType, buttonText, position) {
    const trackingData = {
        event: 'affiliate_click',
        button_type: buttonType,
        button_text: buttonText,
        button_position: position,
        product: 'YuSleep',
        affiliate_link: 'https://fcee9pn9l9s5965m2os4gd2oeg.hop.clickbank.net',
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent
    };
    console.log('Affiliate Click Tracked:', trackingData);
}

function showExitIntentOffer() {
    const exitModal = document.createElement('div');
    exitModal.className = 'exit-intent-modal';
    exitModal.innerHTML = `
        <div class="exit-modal-backdrop">
            <div class="exit-modal-content">
                <button class="exit-modal-close">&times;</button>
                <h2>Wait! Don't Miss Out!</h2>
                <p>Get <strong>YuSleep</strong> with our <strong>money-back guarantee</strong></p>
                <div class="exit-offer">
                    <span class="exit-price">$39</span>
                    <span class="exit-guarantee">Risk-Free + Selected FREE Shipping</span>
                </div>
                <a href="https://fcee9pn9l9s5965m2os4gd2oeg.hop.clickbank.net" target="_blank" class="exit-cta">Claim Your Discount Now</a>
            </div>
        </div>
    `;
    const style = document.createElement('style');
    style.textContent = `
        .exit-intent-modal{position:fixed;top:0;left:0;width:100%;height:100%;z-index:10000;animation:fadeIn .3s ease-out}
        .exit-modal-backdrop{background:rgba(0,0,0,.8);width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:2rem}
        .exit-modal-content{background:#fff;padding:3rem;border-radius:20px;text-align:center;max-width:500px;position:relative;animation:scaleIn .3s ease-out}
        .exit-modal-close{position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:2rem;cursor:pointer;color:#64748b}
        .exit-offer{margin:2rem 0}
        .exit-price{font-size:3rem;font-weight:800;color:var(--product-primary);display:block}
        .exit-guarantee{color:#64748b;font-weight:600}
        .exit-cta{display:inline-block;background:linear-gradient(135deg,var(--product-primary),var(--product-secondary));color:#fff;padding:1rem 2rem;border-radius:50px;text-decoration:none;font-weight:700;transition:transform .3s ease}
        .exit-cta:hover{transform:translateY(-2px)}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes scaleIn{from{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}
    `;
    document.head.appendChild(style);
    document.body.appendChild(exitModal);
    trackAffiliateClick('Exit Intent', 'Claim Your Discount Now', 'exit');
    const closeModal=()=>{document.body.removeChild(exitModal);document.head.removeChild(style)};
    exitModal.querySelector('.exit-modal-close').addEventListener('click', closeModal);
    exitModal.querySelector('.exit-modal-backdrop').addEventListener('click', function(e){ if(e.target===this){ closeModal(); }});
    setTimeout(closeModal, 10000);
}

function initHeaderButton() {
    const headerBtn = document.querySelector('.header-official-btn');
    if (!headerBtn) return;
    headerBtn.addEventListener('click', function(){ trackAffiliateClick('Header', 'Official Website', 'header'); });
    setTimeout(() => { headerBtn.style.opacity = '1'; headerBtn.style.transform = 'translateY(-2px)'; }, 1000);
    headerBtn.style.opacity = '0'; headerBtn.style.transform = 'translateY(10px)'; headerBtn.style.transition = 'all 0.4s ease-out';
}

function loadRelatedReviews(currentReviewId) {
    const allReviews = [
        { id: 'javaburn', name: 'JavaBurn', rating: 4.5, description: 'Coffee metabolism booster for weight management.', url: './javaburn.html', icon: 'fas fa-coffee' },
        { id: 'gluco6', name: 'Gluco6', rating: 4.6, description: 'Blood sugar support with plant-based ingredients.', url: './gluco6.html', icon: 'fas fa-heartbeat' },
        { id: 'pinealguardian', name: 'Pineal Guardian', rating: 4.7, description: 'Sleep and melatonin support formula.', url: './pinealguardian.html', icon: 'fas fa-moon' },
        { id: 'hepatoburn', name: 'HepatoBurn', rating: 4.6, description: 'Liver purification and weight support.', url: './hepatoburn.html', icon: 'fas fa-fire' },
        { id: 'quietumplus', name: 'Quietum Plus', rating: 4.8, description: 'Ear health and tinnitus support.', url: './quietumplus.html', icon: 'fas fa-volume-mute' },
        { id: 'audifort', name: 'Audifort', rating: 4.7, description: 'Hearing health support formula.', url: './audifort.html', icon: 'fas fa-ear-listen' },
        { id: 'jointgenesis', name: 'Joint Genesis', rating: 4.8, description: 'Joint health and flexibility support.', url: './jointgenesis.html', icon: 'fas fa-bone' },
        { id: 'prodentim', name: 'ProDentim', rating: 4.9, description: 'Oral probiotic for teeth and gums.', url: './prodentim.html', icon: 'fas fa-tooth' },
        { id: 'prostavive', name: 'ProstaVive', rating: 4.7, description: 'Prostate health support.', url: './prostavive.html', icon: 'fas fa-male' },
        { id: 'mitolyn', name: 'Mitolyn', rating: 4.5, description: 'Cellular energy support.', url: './mitolyn.html', icon: 'fas fa-bolt' },
        { id: 'puremoringa', name: 'Pure Moringa', rating: 4.4, description: 'Superfood powder for wellness.', url: './puremoringa.html', icon: 'fas fa-leaf' }
    ];
    const related = allReviews.filter(r => r.id !== currentReviewId).slice(0, 3);
    const container = document.getElementById('related-reviews-container');
    if (!container) return;
    container.innerHTML = related.map(review => `
        <a href="${review.url}" class="related-review-card">
            <div class="related-review-header">
                <div class="related-review-icon"><i class="${review.icon}"></i></div>
                <h3 class="related-review-title">${review.name}</h3>
            </div>
            <div class="related-review-rating">
                <div class="related-review-stars">${'<i class="fas fa-star"></i>'.repeat(Math.floor(review.rating))}</div>
                <span>${review.rating}/5</span>
            </div>
            <p class="related-review-description">${review.description}</p>
            <div class="related-review-cta">Read Full Review <i class="fas fa-arrow-right"></i></div>
        </a>
    `).join('');
}

function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        const newNavToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newNavToggle, navToggle);
        newNavToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.classList.toggle('active');
            newNavToggle.classList.toggle('active');
        });
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                newNavToggle.classList.remove('active');
            });
        });
    }
}

function trackReviewInteraction(action, element) { console.log(`Review interaction: ${action} on ${element}`); }

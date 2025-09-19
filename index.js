// ReviewAndBuy Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initSmoothScrolling();
    initAnimations();
    initReviewCards();
    initSearchFunctionality();
    
    console.log('ReviewAndBuy site initialized successfully!');
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.review-card, .category-card, .hero-section');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Review Cards Interactions
function initReviewCards() {
    const reviewCards = document.querySelectorAll('.review-card:not(.coming-soon)');
    
    reviewCards.forEach(card => {
        // Add hover effect with rating animation
        card.addEventListener('mouseenter', function() {
            const stars = this.querySelectorAll('.rating i');
            stars.forEach((star, index) => {
                setTimeout(() => {
                    star.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        star.style.transform = 'scale(1)';
                    }, 100);
                }, index * 50);
            });
        });
        
        // Add click tracking for analytics (placeholder)
        const readMoreBtn = card.querySelector('.read-more');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', function(e) {
                const reviewTitle = card.querySelector('h3').textContent;
                trackReviewClick(reviewTitle);
            });
        }
    });
}

// Analytics tracking placeholder
function trackReviewClick(reviewTitle) {
    // This would integrate with Google Analytics or other tracking service
    console.log(`Review clicked: ${reviewTitle}`);
    
    // Example Google Analytics event (uncomment when GA is setup)
    // gtag('event', 'review_click', {
    //     'review_title': reviewTitle,
    //     'page_location': window.location.href
    // });
}

// Navigate to review page function
window.navigateToReview = function(url) {
    console.log(`Smart navigation to: ${url}`);
    
    // Test if clean URLs are supported
    fetch(url, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                // Clean URL works, use it
                console.log('✅ Clean URL supported, navigating...');
                window.location.href = url;
            } else {
                // Clean URL doesn't work, try with .html
                console.log('⚠️ Clean URL not supported, trying .html...');
                return fetch(url + '.html', { method: 'HEAD' });
            }
        })
        .then(response => {
            if (response && response.ok) {
                console.log('✅ .html URL works, navigating...');
                window.location.href = url + '.html';
            } else if (response) {
                console.error('❌ Neither clean URL nor .html URL works');
                // Force navigation anyway - let the server handle it
                console.log('🔄 Forcing navigation to clean URL...');
                window.location.href = url;
            }
        })
        .catch(error => {
            console.error('Navigation test failed:', error);
            // Fallback to direct navigation attempt
            console.log('🔄 Falling back to direct navigation...');
            window.location.href = url;
        });
};

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Utility Functions for Review Pages
const ReviewUtils = {
    // Function to create consistent header for review pages
    createReviewHeader: function(productName, rating, category) {
        return `
            <div class="review-header">
                <div class="breadcrumb">
                    <a href="../index.html">Home</a> > 
                    <a href="../index.html#${category.toLowerCase()}">${category}</a> > 
                    <span>${productName}</span>
                </div>
                <h1>${productName} Review</h1>
                <div class="review-meta">
                    <div class="rating">
                        ${this.generateStars(rating)}
                        <span class="rating-number">${rating}/5</span>
                    </div>
                    <div class="review-date">
                        <i class="fas fa-calendar"></i>
                        <span>Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Generate star rating HTML
    generateStars: function(rating) {
        let starsHtml = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        
        return starsHtml;
    },
    
    // Create pros and cons section
    createProsAndCons: function(pros, cons) {
        return `
            <div class="pros-cons-section">
                <div class="pros-cons-grid">
                    <div class="pros">
                        <h3><i class="fas fa-thumbs-up"></i> Pros</h3>
                        <ul>
                            ${pros.map(pro => `<li>${pro}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="cons">
                        <h3><i class="fas fa-thumbs-down"></i> Cons</h3>
                        <ul>
                            ${cons.map(con => `<li>${con}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Create verdict section
    createVerdict: function(rating, summary, recommendation) {
        const ratingText = rating >= 4.5 ? 'Excellent' : 
                          rating >= 4 ? 'Very Good' : 
                          rating >= 3.5 ? 'Good' : 
                          rating >= 3 ? 'Average' : 'Below Average';
        
        return `
            <div class="verdict-section">
                <h2>Our Verdict</h2>
                <div class="verdict-card">
                    <div class="verdict-rating">
                        <span class="rating-score">${rating}</span>
                        <div class="rating-details">
                            <div class="stars">${this.generateStars(rating)}</div>
                            <span class="rating-text">${ratingText}</span>
                        </div>
                    </div>
                    <div class="verdict-content">
                        <p class="summary">${summary}</p>
                        <div class="recommendation">
                            <strong>Our Recommendation:</strong>
                            <p>${recommendation}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Make ReviewUtils available globally for review pages
window.ReviewUtils = ReviewUtils;

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchButton || !searchResults) {
        console.log('Search elements not found on this page');
        return;
    }
    
    // Sample product database (in a real app, this would come from a server)
    const productsDatabase = [
        {
            id: 'puremoringa',
            name: 'Pure Moringa Supplement',
            description: 'Organic moringa leaf supplement for energy and wellness',
            category: 'Health & Supplements',
            rating: 4.9,
            url: 'reviews/puremoringa.html',
            icon: 'fas fa-leaf',
            keywords: ['moringa', 'supplement', 'organic', 'energy', 'health', 'wellness', 'superfood']
        },
        {
            id: 'mitolyn',
            name: 'Mitolyn Weight Loss',
            description: 'Revolutionary mitochondrial support supplement for natural weight loss and energy boost',
            category: 'Health & Supplements',
            rating: 4.8,
            url: 'reviews/mitolyn.html',
            icon: 'fas fa-fire',
            keywords: ['mitolyn', 'weight loss', 'mitochondrial', 'metabolism', 'fat burner', 'energy', 'supplement', 'natural']
        },
        {
            id: 'prostavive',
            name: 'Prostavive Prostate Support',
            description: 'Natural prostate support supplement with clinically-studied ingredients for urinary health and male vitality',
            category: 'Health & Supplements',
            rating: 4.7,
            url: 'reviews/prostavive.html',
            icon: 'fas fa-shield-alt',
            keywords: ['prostavive', 'prostate', 'prostate health', 'urinary support', 'men\'s health', 'saw palmetto', 'male vitality', 'supplement', 'natural']
        },
        {
            id: 'sleeplean',
            name: 'Sleep Lean Weight Loss',
            description: 'Natural weight loss sleep supplement that targets blue light exposure and improves sleep quality for better weight management',
            category: 'Health & Supplements',
            rating: 4.8,
            url: 'reviews/sleeplean.html',
            icon: 'fas fa-moon',
            keywords: ['sleep lean', 'weight loss', 'sleep supplement', 'blue light', 'sleep quality', 'natural weight loss', 'sleep aid', 'supplement', 'valerian', '5-htp', 'sleeplean', 'sleeplean us', 'sleeplean buy', 'buy sleeplean', 'sleeplean 2025', 'sleeplean safe', 'sleeplean scam', 'sleeplean pills', 'sleeplean sleep', 'sleeplean review', 'is sleeplean safe', 'sleeplean office', 'sleeplean reviews', 'is sleeplean legit', 'sleeplean results', 'does sleeplean work', 'sleeplean benefits', 'sleeplean official', 'how to use sleeplean', 'sleeplean discount', 'sleeplean clickbank', 'sleeplean fat burner', 'sleeplean supplement', 'sleeplean weight loss', 'sleeplean real review', 'sleeplean review 2025', 'sleeplean comparison']
        },
        {
            id: 'prodentim',
            name: 'ProDentim Dental Health',
            description: 'Revolutionary dental probiotic supplement with 3.5 billion probiotics for teeth and gums health. Repopulates mouth with good bacteria',
            category: 'Health & Supplements',
            rating: 4.9,
            url: 'reviews/prodentim.html',
            icon: 'fas fa-tooth',
            keywords: ['prodentim', 'dental probiotic', 'teeth health', 'gum health', 'oral microbiome', 'dental supplement', 'oral health', 'teeth whitening', 'bad breath', 'dental care', 'oral hygiene', 'probiotic supplement', 'dental probiotics', 'oral probiotics', 'teeth probiotics', 'gum probiotics', 'dental health supplement', 'oral health supplement', 'teeth health supplement', 'gum health supplement', 'dental care supplement', 'oral care supplement', 'teeth care supplement', 'gum care supplement', 'dental wellness', 'oral wellness', 'teeth wellness', 'gum wellness', 'dental support', 'oral support', 'teeth support', 'gum support', 'dental maintenance', 'oral maintenance', 'teeth maintenance', 'gum maintenance', 'dental protection', 'oral protection', 'teeth protection', 'gum protection', 'dental strengthening', 'oral strengthening', 'teeth strengthening', 'gum strengthening', 'dental repair', 'oral repair', 'teeth repair', 'gum repair', 'dental restoration', 'oral restoration', 'teeth restoration', 'gum restoration', 'dental rejuvenation', 'oral rejuvenation', 'teeth rejuvenation', 'gum rejuvenation', 'dental regeneration', 'oral regeneration', 'teeth regeneration', 'gum regeneration', 'dental healing', 'oral healing', 'teeth healing', 'gum healing', 'dental treatment', 'oral treatment', 'teeth treatment', 'gum treatment', 'dental therapy', 'oral therapy', 'teeth therapy', 'gum therapy', 'dental medicine', 'oral medicine', 'teeth medicine', 'gum medicine', 'dental remedy', 'oral remedy', 'teeth remedy', 'gum remedy', 'dental solution', 'oral solution', 'teeth solution', 'gum solution', 'dental formula', 'oral formula', 'teeth formula', 'gum formula', 'dental blend', 'oral blend', 'teeth blend', 'gum blend', 'dental mix', 'oral mix', 'teeth mix', 'gum mix', 'dental combination', 'oral combination', 'teeth combination', 'gum combination', 'dental complex', 'oral complex', 'teeth complex', 'gum complex', 'dental system', 'oral system', 'teeth system', 'gum system', 'dental approach', 'oral approach', 'teeth approach', 'gum approach', 'dental method', 'oral method', 'teeth method', 'gum method', 'dental technique', 'oral technique', 'teeth technique', 'gum technique', 'dental strategy', 'oral strategy', 'teeth strategy', 'gum strategy', 'dental plan', 'oral plan', 'teeth plan', 'gum plan', 'dental program', 'oral program', 'teeth program', 'gum program', 'dental routine', 'oral routine', 'teeth routine', 'gum routine', 'dental regimen', 'oral regimen', 'teeth regimen', 'gum regimen', 'dental protocol', 'oral protocol', 'teeth protocol', 'gum protocol', 'dental procedure', 'oral procedure', 'teeth procedure', 'gum procedure', 'dental process', 'oral process', 'teeth process', 'gum process', 'dental practice', 'oral practice', 'teeth practice', 'gum practice', 'dental habit', 'oral habit', 'teeth habit', 'gum habit', 'dental custom', 'oral custom', 'teeth custom', 'gum custom', 'dental tradition', 'oral tradition', 'teeth tradition', 'gum tradition', 'dental culture', 'oral culture', 'teeth culture', 'gum culture', 'dental lifestyle', 'oral lifestyle', 'teeth lifestyle', 'gum lifestyle', 'dental wellness', 'oral wellness', 'teeth wellness', 'gum wellness', 'dental fitness', 'oral fitness', 'teeth fitness', 'gum fitness', 'dental strength', 'oral strength', 'teeth strength', 'gum strength', 'dental power', 'oral power', 'teeth power', 'gum power', 'dental energy', 'oral energy', 'teeth energy', 'gum energy', 'dental vitality', 'oral vitality', 'teeth vitality', 'gum vitality', 'dental vigor', 'oral vigor', 'teeth vigor', 'gum vigor', 'dental force', 'oral force', 'teeth force', 'gum force', 'dental might', 'oral might', 'teeth might', 'gum might', 'dental potency', 'oral potency', 'teeth potency', 'gum potency', 'dental effectiveness', 'oral effectiveness', 'teeth effectiveness', 'gum effectiveness', 'dental efficiency', 'oral efficiency', 'teeth efficiency', 'gum efficiency', 'dental performance', 'oral performance', 'teeth performance', 'gum performance', 'dental results', 'oral results', 'teeth results', 'gum results', 'dental outcomes', 'oral outcomes', 'teeth outcomes', 'gum outcomes', 'dental benefits', 'oral benefits', 'teeth benefits', 'gum benefits', 'dental advantages', 'oral advantages', 'teeth advantages', 'gum advantages', 'dental perks', 'oral perks', 'teeth perks', 'gum perks', 'dental rewards', 'oral rewards', 'teeth rewards', 'gum rewards', 'dental gains', 'oral gains', 'teeth gains', 'gum gains', 'dental improvements', 'oral improvements', 'teeth improvements', 'gum improvements', 'dental enhancements', 'oral enhancements', 'teeth enhancements', 'gum enhancements', 'dental upgrades', 'oral upgrades', 'teeth upgrades', 'gum upgrades', 'dental boosts', 'oral boosts', 'teeth boosts', 'gum boosts', 'dental increases', 'oral increases', 'teeth increases', 'gum increases', 'dental rises', 'oral rises', 'teeth rises', 'gum rises', 'dental growth', 'oral growth', 'teeth growth', 'gum growth', 'dental development', 'oral development', 'teeth development', 'gum development', 'dental progress', 'oral progress', 'teeth progress', 'gum progress', 'dental advancement', 'oral advancement', 'teeth advancement', 'gum advancement', 'dental evolution', 'oral evolution', 'teeth evolution', 'gum evolution', 'dental transformation', 'oral transformation', 'teeth transformation', 'gum transformation', 'dental change', 'oral change', 'teeth change', 'gum change', 'dental modification', 'oral modification', 'teeth modification', 'gum modification', 'dental adjustment', 'oral adjustment', 'teeth adjustment', 'gum adjustment', 'dental adaptation', 'oral adaptation', 'teeth adaptation', 'gum adaptation', 'dental optimization', 'oral optimization', 'teeth optimization', 'gum optimization', 'dental maximization', 'oral maximization', 'teeth maximization', 'gum maximization', 'dental enhancement', 'oral enhancement', 'teeth enhancement', 'gum enhancement', 'dental improvement', 'oral improvement', 'teeth improvement', 'gum improvement', 'dental betterment', 'oral betterment', 'teeth betterment', 'gum betterment', 'dental upgrade', 'oral upgrade', 'teeth upgrade', 'gum upgrade', 'dental boost', 'oral boost', 'teeth boost', 'gum boost', 'dental increase', 'oral increase', 'teeth increase', 'gum increase', 'dental rise', 'oral rise', 'teeth rise', 'gum rise', 'dental growth', 'oral growth', 'teeth growth', 'gum growth', 'dental development', 'oral development', 'teeth development', 'gum development', 'dental progress', 'oral progress', 'teeth progress', 'gum progress', 'dental advancement', 'oral advancement', 'teeth advancement', 'gum advancement', 'dental evolution', 'oral evolution', 'teeth evolution', 'gum evolution', 'dental transformation', 'oral transformation', 'teeth transformation', 'gum transformation', 'dental change', 'oral change', 'teeth change', 'gum change', 'dental modification', 'oral modification', 'teeth modification', 'gum modification', 'dental adjustment', 'oral adjustment', 'teeth adjustment', 'gum adjustment', 'dental adaptation', 'oral adaptation', 'teeth adaptation', 'gum adaptation', 'dental optimization', 'oral optimization', 'teeth optimization', 'gum optimization', 'dental maximization', 'oral maximization', 'teeth maximization', 'gum maximization']
        },
        {
            id: 'jointgenesis',
            name: 'Joint Genesis Joint Health',
            description: 'Dr. Weis joint health supplement with Mobilee® and hyaluronan for flexible joints. Based on Japanese village research for joint mobility',
            category: 'Health & Supplements',
            rating: 4.8,
            url: 'reviews/jointgenesis.html',
            icon: 'fas fa-bone',
            keywords: ['joint genesis', 'joint health', 'joint pain relief', 'arthritis supplement', 'joint flexibility', 'joint mobility', 'dr weis', 'mobilee', 'hyaluronan', 'joint supplement', 'joint pain', 'arthritis', 'joint inflammation', 'joint stiffness', 'joint comfort', 'joint support', 'joint maintenance', 'joint protection', 'joint strengthening', 'joint repair', 'joint restoration', 'joint rejuvenation', 'joint regeneration', 'joint healing', 'joint treatment', 'joint therapy', 'joint medicine', 'joint remedy', 'joint solution', 'joint formula', 'joint blend', 'joint mix', 'joint combination', 'joint complex', 'joint system', 'joint approach', 'joint method', 'joint technique', 'joint strategy', 'joint plan', 'joint program', 'joint routine', 'joint regimen', 'joint protocol', 'joint procedure', 'joint process', 'joint practice', 'joint habit', 'joint custom', 'joint tradition', 'joint culture', 'joint lifestyle', 'joint wellness', 'joint fitness', 'joint strength', 'joint power', 'joint energy', 'joint vitality', 'joint vigor', 'joint force', 'joint might', 'joint potency', 'joint effectiveness', 'joint efficiency', 'joint performance', 'joint results', 'joint outcomes', 'joint benefits', 'joint advantages', 'joint perks', 'joint rewards', 'joint gains', 'joint improvements', 'joint enhancements', 'joint upgrades', 'joint boosts', 'joint increases', 'joint rises', 'joint growth', 'joint development', 'joint progress', 'joint advancement', 'joint evolution', 'joint transformation', 'joint change', 'joint modification', 'joint adjustment', 'joint adaptation', 'joint optimization', 'joint maximization', 'joint enhancement', 'joint improvement', 'joint betterment', 'joint upgrade', 'joint boost', 'joint increase', 'joint rise', 'joint growth', 'joint development', 'joint progress', 'joint advancement', 'joint evolution', 'joint transformation', 'joint change', 'joint modification', 'joint adjustment', 'joint adaptation', 'joint optimization', 'joint maximization', 'joint genesis for joints', 'joint genesis uk', 'joint genesis™', 'buy joint genesis', 'joint genesis buy', 'joint genesis usa', 'joint genesis 2025', 'joint genesis work', 'joint genesis safe', 'joint genesis scam', 'joint genesis 2023', 'order joint genesis', 'joint genesis order', 'joint genesis price', 'joint genesis offer', 'joint genesis pills', 'joint genesis review', 'joint genesis amazon', 'joint genesis reddit', 'joint genesis is good', 'joint genesis is safe', 'joint genesis dosage', 'joint genesis works?', 'joint genesis reviews']
        },
        {
            id: 'audifort',
            name: 'Audifort Hearing Health',
            description: 'Andrew Ross hearing health supplement with 20+ natural ingredients including Maca Root and Green Tea. Supports healthy hearing and cognitive clarity',
            category: 'Health & Supplements',
            rating: 4.7,
            url: 'reviews/audifort.html',
            icon: 'fas fa-ear-listen',
            keywords: ['audifort', 'hearing health', 'hearing support', 'ear wellness', 'hearing supplement', 'tinnitus relief', 'hearing clarity', 'ear health', 'hearing improvement', 'audifort review', 'audifort buy', 'audifort official', 'audifort ingredients', 'audifort side effects', 'audifort results', 'audifort scam', 'audifort legit', 'audifort price', 'audifort benefits', 'audifort supplement', 'audifort drops', 'audifort formula', 'audifort natural', 'audifort safe', 'audifort works', 'audifort order', 'audifort website', 'audifort 2025', 'audifort 2024', 'audifort discount', 'audifort coupon', 'audifort free trial', 'audifort money back guarantee', 'audifort customer reviews', 'audifort testimonials', 'audifort before after', 'audifort transformation', 'audifort success stories', 'audifort real results', 'audifort honest review', 'audifort detailed review', 'audifort comprehensive review', 'audifort complete analysis', 'audifort scientific review', 'audifort clinical studies', 'audifort research', 'audifort studies', 'audifort evidence', 'audifort proof', 'audifort facts', 'audifort truth', 'audifort reality', 'audifort experience', 'audifort journey', 'audifort story', 'audifort case study', 'audifort investigation', 'audifort evaluation', 'audifort assessment', 'audifort examination', 'audifort analysis', 'audifort breakdown', 'audifort explanation', 'audifort guide', 'audifort tutorial', 'audifort instructions', 'audifort how to use', 'audifort dosage', 'audifort directions', 'audifort tips', 'audifort advice', 'audifort recommendations', 'audifort suggestions', 'audifort help', 'audifort support', 'audifort assistance', 'audifort guidance', 'audifort mentorship', 'audifort coaching', 'audifort training', 'audifort education', 'audifort learning', 'audifort knowledge', 'audifort information', 'audifort data', 'audifort statistics', 'audifort numbers', 'audifort figures', 'audifort metrics', 'audifort measurements', 'audifort tracking', 'audifort monitoring', 'audifort observation', 'audifort surveillance', 'audifort supervision', 'audifort management', 'audifort control', 'audifort regulation', 'audifort governance', 'audifort administration', 'audifort leadership', 'audifort direction', 'audifort guidance', 'audifort oversight', 'hearing health', 'ear health', 'hearing support', 'ear support', 'hearing wellness', 'ear wellness', 'hearing care', 'ear care', 'hearing maintenance', 'ear maintenance', 'hearing protection', 'ear protection', 'hearing strengthening', 'ear strengthening', 'hearing repair', 'ear repair', 'hearing restoration', 'ear restoration', 'hearing rejuvenation', 'ear rejuvenation', 'hearing regeneration', 'ear regeneration', 'hearing healing', 'ear healing', 'hearing treatment', 'ear treatment', 'hearing therapy', 'ear therapy', 'hearing medicine', 'ear medicine', 'hearing remedy', 'ear remedy', 'hearing solution', 'ear solution', 'hearing formula', 'ear formula', 'hearing blend', 'ear blend', 'hearing mix', 'ear mix', 'hearing combination', 'ear combination', 'hearing complex', 'ear complex', 'hearing system', 'ear system', 'hearing approach', 'ear approach', 'hearing method', 'ear method', 'hearing technique', 'ear technique', 'hearing strategy', 'ear strategy', 'hearing plan', 'ear plan', 'hearing program', 'ear program', 'hearing routine', 'ear routine', 'hearing regimen', 'ear regimen', 'hearing protocol', 'ear protocol', 'hearing procedure', 'ear procedure', 'hearing process', 'ear process', 'hearing practice', 'ear practice', 'hearing habit', 'ear habit', 'hearing custom', 'ear custom', 'hearing tradition', 'ear tradition', 'hearing culture', 'ear culture', 'hearing lifestyle', 'ear lifestyle', 'hearing fitness', 'ear fitness', 'hearing strength', 'ear strength', 'hearing power', 'ear power', 'hearing energy', 'ear energy', 'hearing vitality', 'ear vitality', 'hearing vigor', 'ear vigor', 'hearing force', 'ear force', 'hearing might', 'ear might', 'hearing potency', 'ear potency', 'hearing effectiveness', 'ear effectiveness', 'hearing efficiency', 'ear efficiency', 'hearing performance', 'ear performance', 'hearing results', 'ear results', 'hearing outcomes', 'ear outcomes', 'hearing benefits', 'ear benefits', 'hearing advantages', 'ear advantages', 'hearing perks', 'ear perks', 'hearing rewards', 'ear rewards', 'hearing gains', 'ear gains', 'hearing improvements', 'ear improvements', 'hearing enhancements', 'ear enhancements', 'hearing upgrades', 'ear upgrades', 'hearing boosts', 'ear boosts', 'hearing increases', 'ear increases', 'hearing rises', 'ear rises', 'hearing growth', 'ear growth', 'hearing development', 'ear development', 'hearing progress', 'ear progress', 'hearing advancement', 'ear advancement', 'hearing evolution', 'ear evolution', 'hearing transformation', 'ear transformation', 'hearing change', 'ear change', 'hearing modification', 'ear modification', 'hearing adjustment', 'ear adjustment', 'hearing adaptation', 'ear adaptation', 'hearing optimization', 'ear optimization', 'hearing maximization', 'ear maximization', 'hearing enhancement', 'ear enhancement', 'hearing improvement', 'ear improvement', 'hearing betterment', 'ear betterment', 'hearing upgrade', 'ear upgrade', 'hearing boost', 'ear boost', 'hearing increase', 'ear increase', 'hearing rise', 'ear rise', 'hearing growth', 'ear growth', 'hearing development', 'ear development', 'hearing progress', 'ear progress', 'hearing advancement', 'ear advancement', 'hearing evolution', 'ear evolution', 'hearing transformation', 'ear transformation', 'hearing change', 'ear change', 'hearing modification', 'ear modification', 'hearing adjustment', 'ear adjustment', 'hearing adaptation', 'ear adaptation', 'hearing optimization', 'ear optimization', 'hearing maximization', 'ear maximization', 'saudifort', 'audifort buy', 'audifort usa', 'buy audifort', 'audifort scam', 'audifort 2025', 'audifort drop', 'audifort work', 'audifort drops', 'audifort order', 'audifort price', 'audifort review', 'audifort amazon', 'what is audifort', 'audifort results', 'audifort reviews', 'audifort formula', 'audifort is legit', 'is audifort a scam', 'audifort for pain', 'audifort hearing', 'does audifort work', 'audifort tinnitus', 'audifort benefits', 'what is audifort?', 'buy audifort online', 'audifort suplement', 'does audifort works', 'audifort supplement']
        },
        {
            id: 'greensuperfood',
            name: 'Green Superfood Blend',
            description: 'Coming soon - Comprehensive green superfood powder',
            category: 'Health & Supplements',
            rating: null,
            url: '#',
            icon: 'fas fa-seedling',
            keywords: ['green', 'superfood', 'powder', 'blend', 'nutrition', 'health']
        },
        {
            id: 'spirulina',
            name: 'Spirulina Tablets',
            description: 'Coming soon - High-quality spirulina supplement',
            category: 'Health & Supplements',
            rating: null,
            url: '#',
            icon: 'fas fa-tablets',
            keywords: ['spirulina', 'tablets', 'supplement', 'algae', 'protein', 'health']
        },
        {
            id: 'chlorella',
            name: 'Chlorella Powder',
            description: 'Coming soon - Pure chlorella powder supplement',
            category: 'Health & Supplements',
            rating: null,
            url: '#',
            icon: 'fas fa-leaf',
            keywords: ['chlorella', 'powder', 'supplement', 'detox', 'health', 'green']
        }
    ];
    
    // Search function
    function performSearch(query) {
        if (!query || query.trim().length < 2) {
            hideSearchResults();
            return;
        }
        
        const searchTerm = query.toLowerCase().trim();
        const results = productsDatabase.filter(product => {
            return product.name.toLowerCase().includes(searchTerm) ||
                   product.description.toLowerCase().includes(searchTerm) ||
                   product.category.toLowerCase().includes(searchTerm) ||
                   product.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));
        });
        
        displaySearchResults(results, searchTerm);
    }
    
    // Display search results
    function displaySearchResults(results, searchTerm) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h4>No reviews found</h4>
                    <p>We couldn't find any reviews for "${searchTerm}"</p>
                    <p>Try searching for: moringa, supplements, health</p>
                </div>
            `;
        } else {
            searchResults.innerHTML = results.map(product => `
                <div class="search-result-item" onclick="navigateToProduct('${product.url}', '${product.name}')">
                    <div class="search-result-icon">
                        <i class="${product.icon}"></i>
                    </div>
                    <div class="search-result-content">
                        <h4>${highlightSearchTerm(product.name, searchTerm)}</h4>
                        <p>${highlightSearchTerm(product.description, searchTerm)}</p>
                        ${product.rating ? `<div class="mini-rating">${generateMiniStars(product.rating)} ${product.rating}/5</div>` : ''}
                    </div>
                </div>
            `).join('');
        }
        
        showSearchResults();
    }
    
    // Highlight search term in results
    function highlightSearchTerm(text, term) {
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    // Generate mini stars for search results
    function generateMiniStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star" style="color: #fbbf24; font-size: 0.8rem;"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt" style="color: #fbbf24; font-size: 0.8rem;"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star" style="color: #fbbf24; font-size: 0.8rem;"></i>';
        }
        
        return stars;
    }
    
    // Show/hide search results
    function showSearchResults() {
        searchResults.classList.add('show');
    }
    
    function hideSearchResults() {
        searchResults.classList.remove('show');
    }
    
    // Navigate to product page
    window.navigateToProduct = function(url, productName) {
        if (url === '#') {
            showNotification(`${productName} review is coming soon!`);
            return;
        }
        
        // Track search click
        console.log(`Search result clicked: ${productName}`);
        
        // Navigate to product page
        window.location.href = url;
    };
    
    // Event listeners
    searchInput.addEventListener('input', function() {
        const query = this.value;
        performSearch(query);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value;
            if (query.trim()) {
                performSearch(query);
            }
        }
    });
    
    searchButton.addEventListener('click', function() {
        const query = searchInput.value;
        if (query.trim()) {
            performSearch(query);
        } else {
            searchInput.focus();
        }
    });
    
    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.hero-search')) {
            hideSearchResults();
        }
    });
    
    // Show search results when focusing on input
    searchInput.addEventListener('focus', function() {
        if (this.value.trim().length >= 2) {
            performSearch(this.value);
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        max-width: 350px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

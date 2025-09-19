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
            rating: 4.2,
            url: 'reviews/puremoringa',
            icon: 'fas fa-leaf',
            keywords: ['moringa', 'supplement', 'organic', 'energy', 'health', 'wellness', 'superfood']
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

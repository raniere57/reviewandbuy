// ReviewAndBuy Components - Sistema de Herança
// Este arquivo gerencia componentes reutilizáveis para as páginas de review

class ComponentInheritance {
    constructor() {
        this.components = {
            leftSidebar: this.createLeftSidebar(),
            rightSidebar: this.createRightSidebar(),
            header: this.createHeader(),
            footer: this.createFooter()
        };
    }

    // Cria o sidebar esquerdo com Google Ads
    createLeftSidebar() {
        return `
        <!-- Left Sidebar for Ads -->
        <aside class="sidebar-left">
            <div class="ad-space">
                <!-- vertical1 -->
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-8182694361964802"
                     data-ad-slot="5808913495"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script>
                     (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
            <div class="ad-space">
                <!-- vertical2 -->
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-8182694361964802"
                     data-ad-slot="5808913495"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script>
                     (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
        </aside>`;
    }

    // Cria o sidebar direito com Google Ads
    createRightSidebar() {
        return `
        <!-- Right Sidebar for Ads -->
        <aside class="sidebar-right">
            <div class="ad-space">
                <!-- vertical1 -->
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-8182694361964802"
                     data-ad-slot="5808913495"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script>
                     (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
            <div class="ad-space">
                <!-- vertical2 -->
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-8182694361964802"
                     data-ad-slot="5808913495"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script>
                     (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
        </aside>`;
    }

    // Cria o header
    createHeader() {
        return `
        <!-- Header (inherited from main site) -->
        <header class="header">
            <div class="container">
                <div class="nav-brand">
                    <a href="../index.html" class="logo">
                        <i class="fas fa-star"></i>
                        <span>ReviewAndBuy</span>
                    </a>
                </div>
                <nav class="nav-menu">
                    <ul>
                        <li><a href="../index.html">Home</a></li>
                        <li><a href="../index.html#reviews">Reviews</a></li>
                        <li><a href="../index.html#categories">Categories</a></li>
                        <li><a href="../index.html#about">About</a></li>
                        <li><a href="../index.html#contact">Contact</a></li>
                    </ul>
                </nav>
                <div class="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>`;
    }

    // Cria o footer
    createFooter() {
        return `
        <!-- Footer (inherited from main site) -->
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-brand">
                            <a href="../index.html" class="logo">
                                <i class="fas fa-star"></i>
                                <span>ReviewAndBuy</span>
                            </a>
                            <p>Honest product reviews you can trust. We test products so you don't have to.</p>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="../index.html">Home</a></li>
                            <li><a href="../index.html#reviews">Reviews</a></li>
                            <li><a href="../index.html#categories">Categories</a></li>
                            <li><a href="../index.html#about">About Us</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Categories</h3>
                        <ul>
                            <li><a href="../index.html#health">Health & Supplements</a></li>
                            <li><a href="../index.html#fitness">Fitness & Sports</a></li>
                            <li><a href="../index.html#home">Home & Garden</a></li>
                            <li><a href="../index.html#tech">Tech & Electronics</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Connect</h3>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-facebook"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-youtube"></i></a>
                        </div>
                        <p>contact@reviewandbuy.site</p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 ReviewAndBuy. All rights reserved. | <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
                </div>
            </div>
        </footer>`;
    }

    // Inicializa a herança de componentes na página atual
    initInheritance() {
        // Substitui placeholders por componentes reais
        this.replacePlaceholders();
        
        // Inicializa funcionalidades do header
        this.initHeaderFunctionality();
        
        // Inicializa Google Ads
        this.initGoogleAds();
    }

    // Substitui placeholders por componentes
    replacePlaceholders() {
        // Substitui sidebar esquerdo
        const leftSidebarPlaceholder = document.querySelector('.sidebar-left');
        if (leftSidebarPlaceholder) {
            leftSidebarPlaceholder.outerHTML = this.components.leftSidebar;
        }

        // Substitui sidebar direito
        const rightSidebarPlaceholder = document.querySelector('.sidebar-right');
        if (rightSidebarPlaceholder) {
            rightSidebarPlaceholder.outerHTML = this.components.rightSidebar;
        }

        // Substitui header se necessário
        const headerPlaceholder = document.querySelector('.header');
        if (headerPlaceholder && !headerPlaceholder.querySelector('.nav-brand')) {
            headerPlaceholder.outerHTML = this.components.header;
        }

        // Substitui footer se necessário
        const footerPlaceholder = document.querySelector('.footer');
        if (footerPlaceholder && !footerPlaceholder.querySelector('.footer-brand')) {
            footerPlaceholder.outerHTML = this.components.footer;
        }
    }

    // Inicializa funcionalidades do header
    initHeaderFunctionality() {
        // Mobile Navigation Toggle
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

    // Inicializa Google Ads
    initGoogleAds() {
        // Verifica se o script do Google Ads já foi carregado
        if (typeof adsbygoogle !== 'undefined') {
            // Força a renderização dos anúncios
            (adsbygoogle = window.adsbygoogle || []).push({});
        } else {
            // Aguarda o script carregar
            window.addEventListener('load', function() {
                if (typeof adsbygoogle !== 'undefined') {
                    (adsbygoogle = window.adsbygoogle || []).push({});
                }
            });
        }
    }
}

// Inicializa o sistema de herança quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    const inheritance = new ComponentInheritance();
    inheritance.initInheritance();
    
    console.log('Component inheritance system initialized!');
});

// Exporta para uso em outros arquivos
window.ComponentInheritance = ComponentInheritance;

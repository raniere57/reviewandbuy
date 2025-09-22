### 🎯 Objetivo
Criar reviews idênticos em estrutura e UX, mudando apenas: paleta do produto, mídia (imagem/vídeo) e informações (benefícios, preço mínimo, garantia, copy), seguindo o padrão aplicado no review do Finessa.

---

### 📦 Arquivos a criar/editar para cada novo review
- HTML: `reviews/[produto].html`
- CSS: `css/[produto].css` (copiar a base do `css/puremoringa.css` e ajustar cores)
- JS: `js/[produto].js`
- Imagem: `images/[produto]/PRODUTO1.jpg` (ou PNG/WebP) — usar o nome do arquivo disponível
- Sitemap: `sitemap.xml` (adicionar a URL do novo review)
- Homepage: `index.html` (card) e `index.js` (productsDatabase para busca)

---

### 🧱 Estrutura do HTML (idêntica entre reviews)
- Head com SEO, OG/Twitter, Adsense, fontes e `canonical`
- Header herdado (navbar, menu mobile via JS da página do review)
- Main com três colunas: `sidebar-left` (ads herdados), `article.review-content`, `sidebar-right` (ads herdados)
- Seções internas do article (ordem fixa):
  1) Breadcrumb
  2) Review Header (imagem do produto, título H1, rating, meta, botão "Official Website")
  3) Seção Vídeo + Imagem grande do produto
  4) Seção Artigo (conteúdo editorial SEO)
  5) Conversão primária (preço e CTA)
  6) Quick Summary (bullets + prós/contras)
  7) What is [Produto]? (benefícios, ingredientes em 3 colunas)
  8) Testing Process (linha do tempo 3 etapas)
  9) Pros & Cons (2 colunas)
  10) Resultados (3 cards com barras)
  11) Side Effects (2 cards: mild e warning)
  12) Final Verdict (rating animado + CTA final)
- Related Reviews Section (fora do main)
- Footer herdado
- Scripts: `../js/components.js` (sempre primeiro), `../index.js`, `../js/[produto].js`

---

### 🖼️ Mídia do produto
- Imagem header (eager):
```html
<img src="../images/[produto]/PRODUTO1.jpg" alt="[Produto] - descrição curta com benefício" class="product-photo" loading="eager" width="400" height="400" decoding="async">
```
- Imagem grande ao lado do vídeo (lazy):
```html
<img src="../images/[produto]/PRODUTO1.jpg" alt="[Produto] - descrição complementar" class="product-photo-large" loading="lazy" width="300" height="280" decoding="async">
```
- YouTube (lazy):
```html
<iframe src="https://www.youtube.com/embed/[VIDEO_ID]" title="[Produto] Review Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" width="560" height="315"></iframe>
```

---

### 🎨 CSS (copiar base e ajustar)
1) Copie TODO o `css/puremoringa.css` como base do novo arquivo em `css/[produto].css`.
2) Ajuste somente a paleta do produto no topo:
```css
:root {
    --product-primary: #0ea5e9; /* cor principal */
    --product-secondary: #0284c7; /* cor de apoio */
    --product-accent: #22d3ee; /* destaque */
}
```
3) Seção de vídeo: manter container `.video-product-section`. Para a imagem ao lado do vídeo, use sem caixa/sombra/borda:
```css
.product-image-large { background: transparent; border: none; box-shadow: none; padding: 0; height: auto; }
.product-photo-large { box-shadow: none; border-radius: 0; }
```
4) Seção de artigo do produto (estilo do Finessa):
```css
.[produto]-article-section { background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 4rem 0; margin: 3rem 0; border-radius: 20px; position: relative; overflow: hidden; }
.[produto]-article-section .article-content { background: white; padding: 3rem; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
.[produto]-article-section .article-content::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--product-secondary), var(--product-primary), var(--product-accent)); border-radius: 16px 16px 0 0; }
```
5) Não remova containers essenciais: `.video-product-section`, `.summary-card`, `.content-section`, `.pros-cons-section`, `.verdict-section`.

---

### 🧠 Conteúdo e palavras‑chave (SEO)
- H1: `[Produto] Review 2025: Complete Analysis & Benefits`
- Título da seção artigo (H2): “`[Produto] Review: [Benefit/Problem Keyword]`”
- Misture termos de pesquisa amplos (o que é, como funciona, benefícios) e termos de decisão (preço, oficial, funciona, é bom, resultados) de forma NATURAL no texto. Não mencione “topo” ou “fundo de funil” explicitamente ao leitor.
- Seção artigo: mantenha 4–5 parágrafos curtos, cobrindo: contexto do problema, proposta do produto, como funciona, para quem é, por que importa. Realce termos importantes com **negrito** quando fizer sentido.
- Quick Summary: 3 positivos + 1 negativo.
- Ingredientes/benefícios: 3 colunas com ícones, focando resultados práticos.
- Resultados: 3 cards com barras.

---

### 💰 Preço e CTAs
- Mostrar o menor preço disponível (padrão usado: $39). Ajustar em TODAS as áreas:
  - Conversão primária (seção após o artigo): `current-price` → `$39`
  - CTA final (legenda): "from $39" (opcional)
  - Exit-Intent no JS: valor `$39`
  - Schema Offer `price`: `"39.00"`
- CTA padrão:
```html
<a href="[LINK_AFILIADO]" target="_blank" rel="nofollow noopener" class="conversion-btn primary">
    <i class="fas fa-[icone]"></i>
    Get [Produto] Now
    <span class="btn-subtitle">Official Website - Best Price</span>
</a>
```
- Botão do header: `Official Website` com o mesmo link de afiliado.

---

### 🧩 JavaScript do review (`js/[produto].js`)
Inclua as funções abaixo (base do Finessa):
- Animações: barras de progresso, timeline, rating (alvo típico 4.7–4.9)
- Vídeo: animações de entrada e tracking de interação
- Tracking de cliques nos CTAs (console ou GA/Facebook quando houver)
- Exit‑Intent com valor mínimo ($39) e link afiliado
- Related Reviews com URLs RELATIVAS ao review: `../reviews/*.html`
- Menu mobile do review (toggle do hambúrguer)

Snippet base:
```javascript
document.addEventListener('DOMContentLoaded', function() {
  initProgressBars();
  initTimelineAnimations();
  initRatingAnimations(4.8); // ajuste por produto
  initVideoSection('[Produto] Review Video');
  initConversionTracking();
  initHeaderButton();
  initMobileMenu();
  loadRelatedReviews('[produto]');
});

function loadRelatedReviews(currentId) {
  const all = [
    { id: 'javaburn', name: 'JavaBurn', rating: 4.5, url: '../reviews/javaburn.html', icon: 'fas fa-coffee' },
    // ... (manter 10–11 reviews) ...
  ];
  const related = all.filter(r => r.id !== currentId).slice(0, 3);
  const container = document.getElementById('related-reviews-container');
  if (!container) return;
  container.innerHTML = related.map(r => `
    <a href="${r.url}" class="related-review-card">
      <div class="related-review-header">
        <div class="related-review-icon"><i class="${r.icon}"></i></div>
        <h3 class="related-review-title">${r.name}</h3>
      </div>
      <div class="related-review-rating">
        <div class="related-review-stars">${'<i class="fas fa-star"></i>'.repeat(Math.floor(r.rating))}</div>
        <span>${r.rating}/5</span>
      </div>
      <div class="related-review-cta">Read Full Review <i class="fas fa-arrow-right"></i></div>
    </a>`).join('');
}

function showExitIntentOffer() {
  // garantir preço $39
}

function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    const newToggle = navToggle.cloneNode(true);
    navToggle.parentNode.replaceChild(newToggle, navToggle);
    newToggle.addEventListener('click', (e) => {
      e.preventDefault();
      navMenu.classList.toggle('active');
      newToggle.classList.toggle('active');
    });
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        newToggle.classList.remove('active');
      });
    });
  }
}
```

---

### 🔎 SEO e Schema
- Title, Description e Keywords (misturar topo e fundo de funil)
- OG/Twitter (imagem do produto)
- Canonical: `https://reviewandbuy.site/reviews/[produto]`
- Meta Adsense obrigatório no `<head>`
- JSON‑LD Review + Product (atualize nome, descrição, marca, imagem, `price: "39.00"`, `availability: InStock`, `url: [LINK_AFILIADO]`, `aggregateRating`, `datePublished/Modified`)

Template base:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Product",
    "name": "[Produto]",
    "description": "[Descrição completa com benefícios]",
    "brand": { "@type": "Brand", "name": "[Marca]" },
    "image": "https://reviewandbuy.site/images/[produto]/PRODUTO1.jpg",
    "offers": {
      "@type": "Offer",
      "price": "39.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "[LINK_AFILIADO]"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "ratingCount": "32000"
    }
  },
  "reviewRating": { "@type": "Rating", "ratingValue": "4.8", "bestRating": "5" },
  "author": { "@type": "Organization", "name": "ReviewAndBuy Team" },
  "publisher": { "@type": "Organization", "name": "ReviewAndBuy", "url": "https://reviewandbuy.site" },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "reviewBody": "[Resumo honesto do review com benefícios e garantia]"
}
</script>
```

---

### 📚 Integração com a Homepage e Busca
- Adicionar card em `index.html` (em Latest Reviews):
```html
<div class="review-card">
  <div class="review-image"><i class="fas fa-[icon]"></i></div>
  <div class="review-content">
    <h3>[Produto Nome Curto]</h3>
    <div class="rating">
      <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
      <span>4.8/5</span>
    </div>
    <p>[Resumo curto 1 linha]</p>
    <a href="reviews/[produto].html" class="read-more">Read Full Review</a>
  </div>
</div>
```
- Adicionar ao `productsDatabase` no `index.js` para funcionar na busca/autocomplete:
```javascript
{
  id: '[produto]',
  name: '[Produto Nome Completo]',
  description: '[Descrição curta para busca]',
  category: 'Health & Supplements',
  rating: 4.8,
  url: 'reviews/[produto].html',
  icon: 'fas fa-[icon]',
  keywords: ['palavras', 'de', 'topo', 'e', 'fundo', 'de', 'funil']
}
```

---

### 🗺️ Sitemap
Adicionar ao `sitemap.xml`:
```xml
<url>
  <loc>https://reviewandbuy.site/reviews/[produto].html</loc>
  <lastmod>[YYYY-MM-DD]</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

---

### ✅ Checklist Final
- Estrutura e containers idênticos aos reviews existentes
- Paleta ajustada no CSS e sem "caixa" na imagem da seção de vídeo
- Seção de artigo estilizada com faixa no topo e título em gradiente
- Vídeo YouTube com `loading="lazy"`
- Menor preço visível ($39) em: conversão, CTA final, exit‑intent e schema
- Related Reviews com links relativos `../reviews/*.html`
- Botão do header com link de afiliado correto
- Menu mobile do review funcionando (toggle/fechamento)
- Scripts: `components.js` antes de `index.js` e `js/[produto].js`
- Card adicionado na homepage e entrada no `productsDatabase`
- Sitemap atualizado
- Alt texts descritivos nas imagens

---

### 🧪 Dicas de QA
- Testar desktop e mobile (menu, CTAs, animações, related links)
- Verificar schema no Rich Results Test
- Conferir `canonical`, OG/Twitter e `lastmod` no sitemap
- Validar lazy loading e dimensões de imagens para evitar CLS
- Rodar busca na homepage pelo nome do produto e keywords chave

---

### ⚙️ Inicialização JavaScript (evitar falhas de timing)
Use um entrypoint robusto que executa mesmo se o script carregar após o DOM estar pronto:
```javascript
(function initEntrypoint(){
  const init = () => {
    initProgressBars();
    initTimelineAnimations();
    initRatingAnimations(4.8); // ajuste por produto
    initVideoSection('[Produto] Review Video');
    initConversionTracking();
    initHeaderButton();
    initMobileMenu();
    loadRelatedReviews('[produto]');
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

### 🔗 Paths de Related Reviews
Como os reviews ficam em `reviews/`, use links RELATIVOS ao arquivo atual:
```javascript
{ id: 'javaburn', url: './javaburn.html' }
// e assim por diante para todos os reviews
```

### 📱 Menu Mobile do Review
Implemente o toggle mesmo se o HTML já estiver no DOM:
```javascript
function initMobileMenu(){
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    const newToggle = navToggle.cloneNode(true);
    navToggle.parentNode.replaceChild(newToggle, navToggle);
    newToggle.addEventListener('click', (e) => {
      e.preventDefault();
      navMenu.classList.toggle('active');
      newToggle.classList.toggle('active');
    });
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        newToggle.classList.remove('active');
      });
    });
  }
}
```

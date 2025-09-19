# 📝 Template para Novos Reviews

Este documento explica como adicionar novos reviews ao site com vídeos do YouTube e imagens dos produtos.

## 🎯 Estrutura Básica

Para cada novo produto, você precisará criar:

1. **HTML**: `html/nomedoproduto.html`
2. **CSS**: `css/nomedoproduto.css`  
3. **JS**: `js/nomedoproduto.js`
4. **Imagem**: `images/nomedoproduto/PRODUTO1.jpg`

## 📹 Vídeo do YouTube

### Como Adicionar o Vídeo

1. **Pegue o ID do vídeo** do YouTube
   - URL: `https://www.youtube.com/watch?v=IDN2xnbVgnM`
   - ID: `IDN2xnbVgnM`

2. **Use esta estrutura HTML**:
```html
<!-- Video Review Section -->
<section class="video-review-section">
    <h2>Watch Our Video Review</h2>
    <div class="video-container">
        <div class="video-wrapper">
            <iframe 
                src="https://www.youtube.com/embed/SEU_VIDEO_ID_AQUI" 
                title="Nome do Produto Review Video" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>
        </div>
        <div class="video-description">
            <h3><i class="fab fa-youtube"></i> Video Highlights</h3>
            <ul class="video-highlights">
                <li><i class="fas fa-play-circle"></i> Unboxing e primeiras impressões</li>
                <li><i class="fas fa-play-circle"></i> Processo de teste detalhado</li>
                <li><i class="fas fa-play-circle"></i> Resultados antes e depois</li>
                <li><i class="fas fa-play-circle"></i> Demonstração de uso</li>
                <li><i class="fas fa-play-circle"></i> Veredicto final</li>
            </ul>
            <p class="video-note">
                <i class="fas fa-info-circle"></i>
                Este vídeo complementa nossa análise escrita com demonstrações práticas.
            </p>
        </div>
    </div>
</section>
```

## 🖼️ Imagem do Produto

### Estrutura de Pastas
```
images/
└── nomedoproduto/
    ├── PRODUTO1.jpg (imagem principal)
    ├── PRODUTO2.jpg (opcional)
    └── PRODUTO3.jpg (opcional)
```

### Como Adicionar a Imagem

1. **Substitua o ícone** na seção de header:
```html
<div class="product-image">
    <img src="../images/nomedoproduto/PRODUTO1.jpg" alt="Nome do Produto" class="product-photo">
</div>
```

### Funcionalidades Automáticas

- ✅ **Lightbox**: Clique na imagem para visualizar em tamanho maior
- ✅ **Hover Effect**: Efeito de zoom suave ao passar o mouse
- ✅ **Responsive**: Adapta automaticamente para mobile
- ✅ **Loading**: Otimização automática de carregamento

## 🎨 CSS Necessário

O CSS base já está configurado no arquivo principal. Para reviews específicos, adicione no arquivo `css/nomedoproduto.css`:

```css
/* Importa estilos base */
@import url('../index.css');

/* Personalizações específicas do produto */
.product-image {
    /* Cores específicas se necessário */
}

.video-review-section h2::before {
    /* Emoji específico do produto */
    content: '🌿'; /* Para produtos naturais */
    /* content: '💊'; Para suplementos */
    /* content: '🏃'; Para fitness */
    /* content: '🏠'; Para casa */
}
```

## 📱 JavaScript Funcionalidades

O JavaScript base já inclui:

- ✅ **Animações de entrada** do vídeo
- ✅ **Tracking de interações** 
- ✅ **Lightbox da imagem**
- ✅ **Efeitos hover** nos highlights
- ✅ **Responsividade** automática

## 🔄 Checklist para Novo Review

### Antes de Começar
- [ ] Escolher vídeo do YouTube
- [ ] Preparar imagem do produto (recomendado: 800x600px)
- [ ] Definir nome único para arquivos

### Criação dos Arquivos
- [ ] Copiar `reviews/puremoringa.html` como template
- [ ] Copiar `css/puremoringa.css` como template  
- [ ] Copiar `js/puremoringa.js` como template
- [ ] Criar pasta `images/nomedoproduto/`

### Personalização
- [ ] Alterar ID do vídeo no iframe
- [ ] Atualizar src da imagem
- [ ] Personalizar highlights do vídeo
- [ ] Ajustar cores/emoji se necessário
- [ ] Testar em desktop e mobile

### Integração
- [ ] Adicionar link no `index.html`
- [ ] Atualizar busca no `index.js`
- [ ] Testar navegação completa

## 🎬 Exemplos de Vídeos

### URLs de Exemplo
- Pure Moringa: `https://www.youtube.com/watch?v=IDN2xnbVgnM`
- Próximo produto: `https://www.youtube.com/watch?v=NOVO_ID`

### Embed URLs
- Pure Moringa: `https://www.youtube.com/embed/IDN2xnbVgnM`
- Próximo produto: `https://www.youtube.com/embed/NOVO_ID`

## 📊 Otimizações Automáticas

### Performance
- **Lazy loading** do vídeo (só carrega quando visível)
- **Imagens otimizadas** com object-fit
- **CSS otimizado** com reutilização de estilos

### SEO
- **Alt text** automático nas imagens
- **Title** descritivo nos vídeos
- **Schema markup** preparado

### Analytics
- **Tracking** de cliques no vídeo
- **Tracking** de visualização da imagem
- **Métricas** de engajamento por seção

---

**💡 Dica**: Use este template como base e personalize conforme necessário para cada produto específico!

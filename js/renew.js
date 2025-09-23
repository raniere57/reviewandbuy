// Renew Review Specific JavaScript

(function initEntrypoint(){
    const init = () => {
        initProgressBars();
        initTimelineAnimations();
        initRatingAnimations(4.8);
        initVideoSection('Renew Review Video');
        initConversionTracking();
        initHeaderButton();
        initMobileMenu();
        loadRelatedReviews('renew');
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

function initProgressBars(){
    const bars=document.querySelectorAll('.progress');
    const obs=new IntersectionObserver((entries)=>{
        entries.forEach(e=>{ if(e.isIntersecting){ const el=e.target; const w=el.style.width; el.style.width='0%'; setTimeout(()=>{ el.style.transition='width 2s ease-out'; el.style.width=w; },200); obs.unobserve(el);} });
    },{threshold:0.5,rootMargin:'0px 0px -100px 0px'});
    bars.forEach(b=>obs.observe(b));
}

function initTimelineAnimations(){
    const items=document.querySelectorAll('.timeline-item');
    const obs=new IntersectionObserver((entries)=>{
        entries.forEach((e,i)=>{ if(e.isIntersecting){ setTimeout(()=>{ e.target.style.opacity='1'; e.target.style.transform='translateX(0)'; }, i*200); obs.unobserve(e.target);} });
    },{threshold:0.3});
    items.forEach(it=>{ it.style.opacity='0'; it.style.transform='translateX(-30px)'; it.style.transition='all 0.6s ease-out'; obs.observe(it); });
}

function initRatingAnimations(target){
    const ratings=document.querySelectorAll('.rating');
    ratings.forEach(r=>{
        const stars=r.querySelectorAll('.stars i');
        const number=r.querySelector('.rating-number');
        r.addEventListener('mouseenter',()=>{ stars.forEach((s,i)=>{ setTimeout(()=>{ s.style.transform='scale(1.2) rotate(5deg)'; setTimeout(()=>{ s.style.transform='scale(1) rotate(0deg)'; },150); }, i*50); }); });
        const score=document.querySelector('.verdict-section .rating-score');
        if(score){ let cur=0, inc=target/30; const t=setInterval(()=>{ cur+=inc; if(cur>=target){ score.textContent=target; clearInterval(t);} else { score.textContent=cur.toFixed(1);} },50); }
        if(number){ number.textContent=target.toFixed(1) + '/5'; }
    });
}

function initVideoSection(label){
    const section=document.querySelector('.video-product-section');
    const wrap=document.querySelector('.video-wrapper');
    const img=document.querySelector('.product-image-large');
    if(!section) return;
    const obs=new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ setTimeout(()=>{ if(wrap){ wrap.style.transform='scale(1)'; wrap.style.opacity='1'; } },200); setTimeout(()=>{ if(img){ img.style.transform='translateY(0)'; img.style.opacity='1'; } },400); obs.unobserve(e.target);} }); },{threshold:0.3});
    if(wrap){ wrap.style.transform='scale(0.95)'; wrap.style.opacity='0'; wrap.style.transition='all 0.6s ease-out'; }
    if(img){ img.style.transform='translateY(30px)'; img.style.opacity='0'; img.style.transition='all 0.6s ease-out'; }
    obs.observe(section);
    const iframe=document.querySelector('.video-wrapper iframe');
    if(iframe){ trackReviewInteraction('video_section_viewed', label); if(wrap){ wrap.addEventListener('click',()=>trackReviewInteraction('video_clicked', label)); } }
}

function initConversionTracking(){
    const btns=document.querySelectorAll('.conversion-btn, .header-official-btn');
    btns.forEach((btn,i)=>{
        btn.addEventListener('click',function(){ const type=this.classList.contains('primary')?'Primary':this.classList.contains('secondary')?'Secondary':this.classList.contains('final')?'Final':'Header'; const text=this.textContent.trim().split('\n')[0]; trackAffiliateClick(type,text,i+1); this.style.transform='scale(0.95)'; setTimeout(()=>{ this.style.transform=''; },150); });
        btn.addEventListener('mouseenter',function(){ this.style.transform='translateY(-3px) scale(1.02)'; });
        btn.addEventListener('mouseleave',function(){ this.style.transform=''; });
    });
    let shown=false; document.addEventListener('mouseleave',e=>{ if(e.clientY<=0 && !shown){ shown=true; showExitIntentOffer(); } });
}

function trackAffiliateClick(buttonType, buttonText, position){
    console.log('Affiliate Click Tracked:', {buttonType,buttonText,position,product:'Renew',affiliate_link:'https://hop.clickbank.net/?vendor=renew&affiliate=raniere57&lid=235060',timestamp:new Date().toISOString(),page_url:window.location.href,user_agent:navigator.userAgent});
}

function showExitIntentOffer(){
    const modal=document.createElement('div'); modal.className='exit-intent-modal';
    modal.innerHTML=`
    <div class="exit-modal-backdrop">
        <div class="exit-modal-content">
            <button class="exit-modal-close">&times;</button>
            <h2>Wait! Don't Miss Out!</h2>
            <p>Get <strong>Renew</strong> with our <strong>money-back guarantee</strong></p>
            <div class="exit-offer">
                <span class="exit-price">$49</span>
                <span class="exit-guarantee">Risk-Free + Selected FREE Shipping</span>
            </div>
            <a href="https://hop.clickbank.net/?vendor=renew&affiliate=raniere57&lid=235060" target="_blank" class="exit-cta">Claim Your Discount Now</a>
        </div>
    </div>`;
    const style=document.createElement('style'); style.textContent=`
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
    document.head.appendChild(style); document.body.appendChild(modal);
    const close=()=>{ document.body.removeChild(modal); document.head.removeChild(style); };
    modal.querySelector('.exit-modal-close').addEventListener('click',close);
    modal.querySelector('.exit-modal-backdrop').addEventListener('click',e=>{ if(e.target===e.currentTarget) close(); });
    setTimeout(close,10000);
}

function initHeaderButton(){
    const headerBtn=document.querySelector('.header-official-btn'); if(!headerBtn) return;
    headerBtn.addEventListener('click',function(){ trackAffiliateClick('Header','Official Website','header'); });
    setTimeout(()=>{ headerBtn.style.opacity='1'; headerBtn.style.transform='translateY(-2px)'; },1000);
    headerBtn.style.opacity='0'; headerBtn.style.transform='translateY(10px)'; headerBtn.style.transition='all 0.4s ease-out';
}

function loadRelatedReviews(currentId){
    const all=[
        {id:'javaburn',name:'JavaBurn',rating:4.5,description:'Coffee metabolism booster for weight management.',url:'./javaburn.html',icon:'fas fa-coffee'},
        {id:'gluco6',name:'Gluco6',rating:4.6,description:'Blood sugar support with plant-based ingredients.',url:'./gluco6.html',icon:'fas fa-heartbeat'},
        {id:'pinealguardian',name:'Pineal Guardian',rating:4.7,description:'Sleep and melatonin support formula.',url:'./pinealguardian.html',icon:'fas fa-moon'},
        {id:'hepatoburn',name:'HepatoBurn',rating:4.6,description:'Liver purification and weight support.',url:'./hepatoburn.html',icon:'fas fa-fire'},
        {id:'quietumplus',name:'Quietum Plus',rating:4.8,description:'Ear health and tinnitus support.',url:'./quietumplus.html',icon:'fas fa-volume-mute'},
        {id:'audifort',name:'Audifort',rating:4.7,description:'Hearing health support formula.',url:'./audifort.html',icon:'fas fa-ear-listen'},
        {id:'jointgenesis',name:'Joint Genesis',rating:4.8,description:'Joint health and flexibility support.',url:'./jointgenesis.html',icon:'fas fa-bone'},
        {id:'prodentim',name:'ProDentim',rating:4.9,description:'Oral probiotic for teeth and gums.',url:'./prodentim.html',icon:'fas fa-tooth'},
        {id:'prostavive',name:'ProstaVive',rating:4.7,description:'Prostate health support.',url:'./prostavive.html',icon:'fas fa-male'},
        {id:'mitolyn',name:'Mitolyn',rating:4.5,description:'Cellular energy support.',url:'./mitolyn.html',icon:'fas fa-bolt'},
        {id:'puremoringa',name:'Pure Moringa',rating:4.4,description:'Superfood powder for wellness.',url:'./puremoringa.html',icon:'fas fa-leaf'},
        {id:'sugardefender',name:'Sugar Defender',rating:4.8,description:'Blood sugar support and energy balance.',url:'./sugardefender.html',icon:'fas fa-heartbeat'},
        {id:'finessa',name:'Finessa',rating:4.6,description:'Natural bloating and gut health support.',url:'./finessa.html',icon:'fas fa-leaf'},
        {id:'yusleep',name:'YuSleep',rating:4.7,description:'Natural sleep support and relaxation.',url:'./yusleep.html',icon:'fas fa-bed'},
        {id:'leanbiome',name:'LeanBiome',rating:4.5,description:'Gut health and weight management support.',url:'./leanbiome.html',icon:'fas fa-fire'},
        {id:'igenics',name:'Igenics',rating:4.7,description:'Eye health and vision clarity support.',url:'./igenics.html',icon:'fas fa-eye'},
        {id:'nagano-tonic',name:'Nagano Tonic',rating:4.6,description:'Natural weight loss and metabolism support.',url:'./nagano-tonic.html',icon:'fas fa-fire'},
        {id:'livpure',name:'Liv Pure',rating:4.8,description:'Liver health and weight loss support.',url:'./livpure.html',icon:'fas fa-leaf'},
        {id:'neuroprime',name:'Neuro Prime',rating:4.8,description:'Natural brain health support.',url:'./neuroprime.html',icon:'fas fa-brain'},
        {id:'neurosurge',name:'Neuro Surge',rating:4.7,description:'Brain health and cognitive function support.',url:'./neurosurge.html',icon:'fas fa-brain'},
        {id:'glucoextend',name:'Gluco Extend',rating:4.8,description:'Blood sugar support and glucose balance.',url:'./glucoextend.html',icon:'fas fa-heartbeat'},
        {id:'thyrafemmebalance',name:'ThyraFemme Balance',rating:4.8,description:'Female hormonal and thyroid support.',url:'./thyrafemmebalance.html',icon:'fas fa-heart'}
    ];
    const related=all.filter(r=>r.id!==currentId).slice(0,3);
    const container=document.getElementById('related-reviews-container'); if(!container) return;
    container.innerHTML=related.map(r=>`
        <a href="${r.url}" class="related-review-card">
            <div class="related-review-header">
                <div class="related-review-icon"><i class="${r.icon}"></i></div>
                <h3 class="related-review-title">${r.name}</h3>
            </div>
            <div class="related-review-rating">
                <div class="related-review-stars">${'<i class="fas fa-star"></i>'.repeat(Math.floor(r.rating))}</div>
                <span>${r.rating}/5</span>
            </div>
            <p class="related-review-description">${r.description}</p>
            <div class="related-review-cta">Read Full Review <i class="fas fa-arrow-right"></i></div>
        </a>
    `).join('');
}

function initMobileMenu(){
    const navToggle=document.querySelector('.nav-toggle');
    const navMenu=document.querySelector('.nav-menu');
    if(navToggle && navMenu){
        const newToggle=navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newToggle, navToggle);
        newToggle.addEventListener('click',e=>{ e.preventDefault(); navMenu.classList.toggle('active'); newToggle.classList.toggle('active'); });
        document.querySelectorAll('.nav-menu a').forEach(l=>{ l.addEventListener('click',()=>{ navMenu.classList.remove('active'); newToggle.classList.remove('active'); }); });
    }
}

function trackReviewInteraction(action, element){ console.log(`Review interaction: ${action} on ${element}`); }

// Add iframe error handling
(function enhanceVideoErrorHandling(){
    const onReady = () => {
        const wrapper=document.querySelector('.video-wrapper');
        const iframe=wrapper ? wrapper.querySelector('iframe') : null;
        const fallback=wrapper ? wrapper.querySelector('.video-fallback') : null;
        if(!iframe) return;
        let loaded=false;
        const timer=setTimeout(()=>{
            if(!loaded && fallback){ fallback.style.display='block'; }
        }, 3000);
        iframe.addEventListener('load',()=>{ loaded=true; clearTimeout(timer); });
        iframe.addEventListener('error',()=>{ if(fallback){ fallback.style.display='block'; } });
        // Some browsers block without firing error; probe via postMessage try-catch
        try { iframe.contentWindow.postMessage('ping','*'); } catch(err){ if(fallback){ fallback.style.display='block'; } }
    };
    if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', onReady);} else { onReady(); }
})();

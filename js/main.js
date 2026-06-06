/* ============================================================
   AFYA CAPITAL — interactions
   ============================================================ */
(function(){
  "use strict";

  /* ---------- NAV: scroll state + hide on scroll down ---------- */
  const nav = document.querySelector('header.nav');
  let lastY = 0;
  function onScroll(){
    const y = window.scrollY;
    if(nav){
      nav.classList.toggle('scrolled', y > 40);
      // hide when scrolling down past hero, show when scrolling up
      if(y > 460 && y > lastY + 4){ nav.classList.add('hide'); }
      else if(y < lastY - 4 || y < 200){ nav.classList.remove('hide'); }
      // on-dark detection: is a [data-dark] band under the navbar?
      const navH = nav.offsetHeight;
      let dark = false;
      document.querySelectorAll('[data-dark]').forEach(function(band){
        const r = band.getBoundingClientRect();
        if(r.top <= navH*0.6 && r.bottom >= navH*0.6) dark = true;
      });
      nav.classList.toggle('on-dark', dark);
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- MOBILE MENU ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('nav.links');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        links.classList.remove('open'); toggle.classList.remove('open');
      });
    });
  }

  /* ---------- REVEAL ON SCROLL (IO + manual fallback) ---------- */
  const reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function checkReveals(){
    const vh = window.innerHeight || document.documentElement.clientHeight;
    for(let i=reveals.length-1;i>=0;i--){
      const el = reveals[i];
      const r = el.getBoundingClientRect();
      if(r.top < vh*0.92 && r.bottom > 0){
        el.classList.add('in');
        reveals.splice(i,1);
      }
    }
  }
  if('IntersectionObserver' in window){
    const ro = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); ro.unobserve(e.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -6% 0px'});
    reveals.forEach(function(el){ ro.observe(el); });
  }
  // manual fallback — guarantees content appears even if IO is throttled
  window.addEventListener('scroll', checkReveals, {passive:true});
  window.addEventListener('resize', checkReveals);
  window.addEventListener('load', checkReveals);
  checkReveals();
  requestAnimationFrame(checkReveals);
  setTimeout(checkReveals, 300);

  /* ---------- COUNTER ANIMATION ---------- */
  function animateCount(el){
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const isK = el.getAttribute('data-k') === '1';
    const dur = 1500, start = performance.now();
    function tick(now){
      const p = Math.min((now - start)/dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      let val = target * eased;
      let out;
      if(isK){ out = (val/1000 >= 1 ? (val/1000).toFixed(val>=10000?0:1) : Math.round(val)); }
      else { out = Math.round(val); }
      el.firstChild ? (el.childNodes[0].nodeValue = out) : (el.textContent = out);
      if(p < 1) requestAnimationFrame(tick);
      else { el.childNodes[0].nodeValue = isK ? (target/1000)+'' : target; }
    }
    requestAnimationFrame(tick);
  }
  const counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  function fireCounter(el){
    if(el.getAttribute('data-done')==='1') return;
    el.setAttribute('data-done','1');
    animateCount(el);
  }
  function checkCounters(){
    const vh = window.innerHeight || document.documentElement.clientHeight;
    counters.forEach(function(el){
      const r = el.getBoundingClientRect();
      if(r.top < vh*0.95 && r.bottom > 0) fireCounter(el);
    });
  }
  if('IntersectionObserver' in window && counters.length){
    const co = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ fireCounter(e.target); co.unobserve(e.target); }
      });
    }, {threshold:0.4});
    counters.forEach(function(el){ co.observe(el); });
  }
  // manual fallback — guarantees counters run even if IO is throttled
  window.addEventListener('scroll', checkCounters, {passive:true});
  window.addEventListener('load', checkCounters);
  checkCounters();
  requestAnimationFrame(checkCounters);
  setTimeout(checkCounters, 300);

  /* ---------- INTERACTIVE MARKETS ---------- */
  const mkItems = document.querySelectorAll('.mk-item');
  const mkSlides = document.querySelectorAll('.mk-slide');
  function selectMarket(i){
    mkItems.forEach(function(it,n){ it.classList.toggle('active', n===i); });
    mkSlides.forEach(function(sl,n){ sl.classList.toggle('active', n===i); });
  }
  mkItems.forEach(function(it,i){
    it.addEventListener('mouseenter', function(){ selectMarket(i); });
    it.addEventListener('click', function(){ selectMarket(i); });
  });

  /* ---------- ACTIVE NAV LINK BY PAGE ---------- */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.links a[data-page]').forEach(function(a){
    if(a.getAttribute('data-page') === path) a.classList.add('active');
  });

  /* ---------- CONTACT FORM (demo) ---------- */
  const form = document.querySelector('form.cform');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = 'Request Received \u2713';
      btn.style.background = 'var(--gold-tint)';
      form.reset();
      setTimeout(function(){ btn.innerHTML = orig; btn.style.background=''; }, 3200);
    });
  }

})();

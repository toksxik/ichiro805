// Basic interactions for the landing page
(function(){
  'use strict';

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      var targetId = this.getAttribute('href');
      if(targetId.length>1){
        e.preventDefault();
        var el = document.querySelector(targetId);
        if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); }
      }
    });
  });

  // Quick problem suggest demo (client-only, illustrative)
  var quickBtn = document.getElementById('quickSuggest');
  var quickInput = document.getElementById('quickProblem');
  var quickResult = document.getElementById('quickResult');
  if(quickBtn){
    quickBtn.addEventListener('click', function(){
      var q = quickInput.value.trim();
      if(!q){
        quickResult.className = 'mt-3 small text-danger';
        quickResult.textContent = 'Please type a short problem to try this demo.';
        quickResult.classList.remove('d-none');
        return;
      }
      // Minimal illustrative suggestions
      var suggestions = [
        '1) Clarify the goal & metrics; 2) Gather relevant data; 3) Ask AI for common patterns; 4) Prototype a small experiment; 5) Measure and iterate.'
      ];
      quickResult.className = 'mt-3 small text-start text-dark';
      quickResult.innerHTML = '<strong>Suggested workflow:</strong><br>' + suggestions[0];
      quickResult.classList.remove('d-none');
    });
  }

  // Subscribe form handling (no backend) — show confirm message
  var subscribeForm = document.getElementById('subscribeForm');
  var subscribeMsg = document.getElementById('subscribeMsg');
  if(subscribeForm){
    subscribeForm.addEventListener('submit', function(e){
      e.preventDefault();
      var email = (subscribeForm.querySelector('input[name="email"]')||{}).value||'';
      var ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
      subscribeMsg.classList.remove('d-none');
      subscribeMsg.classList.remove('text-success','text-danger');
      if(ok){
        subscribeMsg.classList.add('text-success');
        subscribeMsg.textContent = 'Thanks — check your inbox for a welcome note (this is a demo page).';
        subscribeForm.reset();
      } else {
        subscribeMsg.classList.add('text-danger');
        subscribeMsg.textContent = 'Please enter a valid email address.';
      }
    });
  }

  // Small accessibility improvement: focus outline on keyboard users only
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

  // Mobile nav toggle (shared navbar)
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  if(navToggle && mobileNav){
    navToggle.addEventListener('click', function(){
      var isHidden = mobileNav.classList.contains('hidden');
      if(isHidden){
        mobileNav.classList.remove('hidden');
        navToggle.textContent = 'Close';
      } else {
        mobileNav.classList.add('hidden');
        navToggle.textContent = 'Menu';
      }
    });
  }

  // Reading progress and TOC highlighting for article pages
  var progressEl = document.getElementById('readingProgress');
  var tocLinks = document.querySelectorAll('.toc a');
  if(progressEl){
    function updateProgress(){
      var article = document.querySelector('.article-content');
      if(!article) return;
      var rect = article.getBoundingClientRect();
      var height = article.scrollHeight - window.innerHeight;
      var scrolled = Math.min(Math.max(window.scrollY - (article.offsetTop - 30), 0), height);
      var pct = height > 0 ? (scrolled / height) * 100 : 0;
      progressEl.style.width = pct + '%';
    }
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  // Highlight TOC items as sections enter viewport
  if(tocLinks && tocLinks.length>0){
    var sections = Array.from(tocLinks).map(function(a){
      var id = a.getAttribute('href');
      return document.querySelector(id);
    }).filter(Boolean);

    function onScrollHighlight(){
      var fromTop = window.scrollY + 100;
      var current = sections[0];
      for(var i=0;i<sections.length;i++){
        if(sections[i].offsetTop <= fromTop){ current = sections[i]; }
      }
      tocLinks.forEach(function(a){ a.classList.remove('active'); });
      var activeLink = Array.from(tocLinks).find(function(a){ return a.getAttribute('href') === '#' + current.id; });
      if(activeLink) activeLink.classList.add('active');
    }
    window.addEventListener('scroll', onScrollHighlight);
    window.addEventListener('resize', onScrollHighlight);
    onScrollHighlight();
  }

})();
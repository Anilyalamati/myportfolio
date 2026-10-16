/**
 * Main Interactive Logic & Motion System
 * Anil Yalamati — AI/ML Developer Portfolio
 */

// 1. Render Optional Verified Assets if Configured
    (function initOptionalAssets() {
      const navResumeSlot = document.getElementById('nav-resume-slot');
      if (PORTFOLIO_CONFIG.resumeUrl && navResumeSlot) {
        navResumeSlot.innerHTML = `
          <a href="${PORTFOLIO_CONFIG.resumeUrl}" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-2 px-4 py-2 rounded border border-lime/40 text-lime font-mono text-xs uppercase tracking-wider hover:bg-lime/10 transition-colors">
            <span>Resume</span>
          </a>
        `;
      }

      const emailSlot = document.getElementById('contact-email-slot');
      if (PORTFOLIO_CONFIG.email && emailSlot) {
        emailSlot.innerHTML = `
          <a href="mailto:${PORTFOLIO_CONFIG.email}"
             class="inline-flex items-center gap-3 px-7 py-4 rounded border border-white/20 bg-charcoal-900 hover:border-lime text-warm-50 font-display font-medium text-sm sm:text-base transition-all">
            <span>Email Directly</span>
          </a>
        `;
      }

      const portraitFrame = document.getElementById('portrait-visual-frame');
      if (PORTFOLIO_CONFIG.portraitUrl && portraitFrame) {
        portraitFrame.innerHTML = `
          <img src="${PORTFOLIO_CONFIG.portraitUrl}" alt="Portrait of Anil Yalamati"
               class="w-full h-full object-cover rounded" />
        `;
      }
    })();

    // 2. Sticky Header & Active Section Scroll-Spy
    const siteHeader = document.getElementById('site-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    function updateHeaderOnScroll() {
      if (window.scrollY > 24) {
        siteHeader.classList.add('bg-charcoal-950/90', 'backdrop-blur-md', 'border-white/10');
        siteHeader.classList.remove('border-transparent');
      } else {
        siteHeader.classList.remove('bg-charcoal-950/90', 'backdrop-blur-md', 'border-white/10');
        siteHeader.classList.add('border-transparent');
      }
    }
    window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
    updateHeaderOnScroll();

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('data-section') === id);
          });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    sections.forEach((sec) => sectionObserver.observe(sec));

    // 3. Accessible Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function setMobileMenuOpen(isOpen) {
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
      mobileMenuDrawer.classList.toggle('hidden', !isOpen);
      menuIconOpen.classList.toggle('hidden', isOpen);
      menuIconClose.classList.toggle('hidden', !isOpen);
    }

    mobileMenuBtn.addEventListener('click', () => {
      const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      setMobileMenuOpen(!expanded);
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => setMobileMenuOpen(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        closeProjectModal();
      }
    });

    // 4. Scroll-Triggered Reveal Animations (IntersectionObserver)
    const revealItems = document.querySelectorAll('.reveal-item, .clip-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));

    // 5. EasyTrip Interactive Preview Tabs
    const easytripTabBtns = document.querySelectorAll('.easytrip-tab-btn');
    const easytripViews = {
      planner: document.getElementById('easytrip-view-planner'),
      safety: document.getElementById('easytrip-view-safety'),
      emergency: document.getElementById('easytrip-view-emergency')
    };

    easytripTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-easytrip-tab');
        easytripTabBtns.forEach((b) => {
          const active = b === btn;
          b.className = active
            ? 'easytrip-tab-btn px-2.5 py-1 rounded text-[11px] font-mono bg-lime text-charcoal-950 font-medium'
            : 'easytrip-tab-btn px-2.5 py-1 rounded text-[11px] font-mono bg-charcoal-850 text-warm-300 hover:text-warm-50';
        });
        Object.keys(easytripViews).forEach((key) => {
          easytripViews[key].classList.toggle('hidden', key !== target);
        });
      });
    });

    // 6. Deepfake Detection Interactive Preview Tabs
    const deepfakeTabBtns = document.querySelectorAll('.deepfake-tab-btn');
    const deepfakeViews = {
      upload: document.getElementById('deepfake-view-upload'),
      analysis: document.getElementById('deepfake-view-analysis')
    };

    function switchDeepfakeTab(target) {
      deepfakeTabBtns.forEach((b) => {
        const active = b.getAttribute('data-deepfake-tab') === target;
        b.className = active
          ? 'deepfake-tab-btn px-2.5 py-1 rounded text-[11px] font-mono bg-lime text-charcoal-950 font-medium'
          : 'deepfake-tab-btn px-2.5 py-1 rounded text-[11px] font-mono bg-charcoal-850 text-warm-300 hover:text-warm-50';
      });
      Object.keys(deepfakeViews).forEach((key) => {
        deepfakeViews[key].classList.toggle('hidden', key !== target);
      });
    }

    deepfakeTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => switchDeepfakeTab(btn.getAttribute('data-deepfake-tab')));
    });

    const simulateDeepfakeBtn = document.getElementById('simulate-deepfake-scan-btn');
    if (simulateDeepfakeBtn) {
      simulateDeepfakeBtn.addEventListener('click', () => switchDeepfakeTab('analysis'));
    }

    // 7. ML Recommendation System Interactive Preview
    const recModeBtns = document.querySelectorAll('.rec-mode-btn');
    const recViews = {
      content: document.getElementById('rec-view-content'),
      pipeline: document.getElementById('rec-view-pipeline')
    };

    recModeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-rec-mode');
        recModeBtns.forEach((b) => {
          const active = b === btn;
          b.className = active
            ? 'rec-mode-btn px-2.5 py-1 rounded text-[11px] font-mono bg-lime text-charcoal-950 font-medium'
            : 'rec-mode-btn px-2.5 py-1 rounded text-[11px] font-mono bg-charcoal-850 text-warm-300 hover:text-warm-50';
        });
        Object.keys(recViews).forEach((k) => {
          recViews[k].classList.toggle('hidden', k !== mode);
        });
      });
    });

    // REC_SEED_DATA loaded from js/config.js

    const recSeedSelect = document.getElementById('rec-seed-select');
    const recOutputList = document.getElementById('rec-output-list');

    function renderRecommendationPreview(seedKey) {
      const items = REC_SEED_DATA[seedKey] || REC_SEED_DATA['ai-systems'];
      recOutputList.innerHTML = items.map((item) => `
        <div class="p-3.5 rounded bg-charcoal-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-start gap-3">
            <span class="font-mono text-xs px-2 py-0.5 rounded bg-lime/15 text-lime font-medium">RANK ${item.rank}</span>
            <div>
              <h5 class="font-display text-sm font-medium text-warm-50">${item.title}</h5>
              <p class="font-mono text-[11px] text-warm-400 mt-0.5">${item.tags}</p>
            </div>
          </div>
          <span class="font-mono text-[11px] text-lime shrink-0">${item.align}</span>
        </div>
      `).join('');
    }

    if (recSeedSelect && recOutputList) {
      recSeedSelect.addEventListener('change', (e) => renderRecommendationPreview(e.target.value));
      renderRecommendationPreview('ai-systems');
    }

    // 8. Project Category Filter
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectArticles = document.querySelectorAll('[data-project-category]');

    projectFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-project-filter');
        projectFilterBtns.forEach((b) => {
          const active = b === btn;
          b.className = active
            ? 'project-filter-btn px-3.5 py-1.5 rounded text-xs font-mono uppercase tracking-wider bg-lime text-charcoal-950 font-semibold transition-all'
            : 'project-filter-btn px-3.5 py-1.5 rounded text-xs font-mono uppercase tracking-wider bg-charcoal-900 text-warm-300 border border-white/10 hover:border-white/30 transition-all';
        });
        projectArticles.forEach((art) => {
          const cat = art.getAttribute('data-project-category');
          art.classList.toggle('hidden', filter !== 'all' && cat !== filter);
        });
      });
    });

    // 9. Skills Stage Filter (Applied vs Learning)
    const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillItems = document.querySelectorAll('.skill-item');

    skillFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const stage = btn.getAttribute('data-skill-filter');
        skillFilterBtns.forEach((b) => {
          const active = b === btn;
          b.className = active
            ? 'skill-filter-btn px-3.5 py-1.5 rounded text-xs font-mono uppercase tracking-wider bg-lime text-charcoal-950 font-semibold transition-all'
            : 'skill-filter-btn px-3.5 py-1.5 rounded text-xs font-mono uppercase tracking-wider bg-charcoal-900 text-warm-300 border border-white/10 hover:border-white/30 transition-all';
        });
        skillItems.forEach((item) => {
          const itemStage = item.getAttribute('data-skill-stage');
          item.classList.toggle('hidden', stage !== 'all' && itemStage !== stage);
        });
      });
    });

    // 10. Project Technical Modal (For Deepfake Detection & ML Recommendation System)
    // MODAL_CONTENT loaded from js/config.js

    const projectModal = document.getElementById('project-modal');
    const modalEyebrow = document.getElementById('modal-eyebrow');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalGithubLink = document.getElementById('modal-github-link');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalSecondaryClose = document.getElementById('modal-secondary-close');

    function openProjectModal(key) {
      const data = MODAL_CONTENT[key];
      if (!data) return;
      modalEyebrow.textContent = data.eyebrow;
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.body;
      modalGithubLink.setAttribute('href', data.repoUrl);
      projectModal.classList.remove('hidden');
      projectModal.classList.add('flex');
    }

    function closeProjectModal() {
      projectModal.classList.add('hidden');
      projectModal.classList.remove('flex');
    }

    document.querySelectorAll('[data-modal-target]').forEach((btn) => {
      btn.addEventListener('click', () => openProjectModal(btn.getAttribute('data-modal-target')));
    });
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
    if (modalSecondaryClose) modalSecondaryClose.addEventListener('click', closeProjectModal);
    if (projectModal) {
      projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeProjectModal();
      });
    }

    // 11. Reduced Motion Toggle & Custom Cursor Follower
    let motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const toggleMotionBtn = document.getElementById('toggle-motion-btn');

    function applyMotionPreference() {
      document.body.classList.toggle('reduced-motion-forced', motionReduced);
      if (toggleMotionBtn) {
        toggleMotionBtn.setAttribute('aria-pressed', String(motionReduced));
        toggleMotionBtn.textContent = motionReduced ? 'Motion: Reduced' : 'Motion: Standard';
      }
    }
    applyMotionPreference();

    if (toggleMotionBtn) {
      toggleMotionBtn.addEventListener('click', () => {
        motionReduced = !motionReduced;
        applyMotionPreference();
      });
    }

    const cursorFollower = document.getElementById('cursor-follower');
    if (cursorFollower && window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', (e) => {
        if (motionReduced) return;
        cursorFollower.style.transform = `translate3d(${e.clientX - 14}px, ${e.clientY - 14}px, 0)`;
      }, { passive: true });

      document.querySelectorAll('a, button, select').forEach((el) => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('cursor-Expanded'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('cursor-Expanded'));
      });
    }

    // 12. Lightweight Hero Topological Vector Lattice Canvas
    (function initHeroCanvas() {
      const canvas = document.getElementById('hero-lattice-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let width = 0;
      let height = 0;
      let animId = null;
      let pointer = { x: 0.65, y: 0.45 };
      let tick = 0;

      const nodes = [];
      const COLS = 11;
      const ROWS = 6;

      function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = rect.width || window.innerWidth;
        height = rect.height || window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        buildNodes();
        drawFrame();
      }

      function buildNodes() {
        nodes.length = 0;
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            nodes.push({
              r,
              c,
              baseX: (c / (COLS - 1)) * width,
              baseY: (r / (ROWS - 1)) * height,
              x: 0,
              y: 0
            });
          }
        }
      }

      function drawFrame() {
        ctx.clearRect(0, 0, width, height);
        const px = pointer.x * width;
        const py = pointer.y * height;

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dx = n.baseX - px;
          const dy = n.baseY - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.max(0, 1 - dist / 340);
          const waveX = motionReduced ? 0 : Math.sin(tick * 0.015 + n.c * 0.5 + n.r * 0.3) * 8;
          const waveY = motionReduced ? 0 : Math.cos(tick * 0.012 + n.r * 0.6 + n.c * 0.4) * 8;
          n.x = n.baseX + waveX + (dx / (dist || 1)) * pull * 16;
          n.y = n.baseY + waveY + (dy / (dist || 1)) * pull * 16;
        }

        // Draw subtle lattice lines
        ctx.lineWidth = 1;
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const idx = r * COLS + c;
            const n = nodes[idx];
            if (c < COLS - 1) {
              const right = nodes[idx + 1];
              ctx.strokeStyle = 'rgba(244, 243, 239, 0.045)';
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(right.x, right.y);
              ctx.stroke();
            }
            if (r < ROWS - 1) {
              const down = nodes[idx + COLS];
              ctx.strokeStyle = 'rgba(244, 243, 239, 0.045)';
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(down.x, down.y);
              ctx.stroke();
            }
          }
        }

        // Draw intersection nodes
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dx = n.x - px;
          const dy = n.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const highlight = Math.max(0, 1 - dist / 260);
          ctx.fillStyle = highlight > 0.25
            ? `rgba(212, 255, 51, ${0.2 + highlight * 0.55})`
            : 'rgba(244, 243, 239, 0.14)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, highlight > 0.25 ? 2.2 : 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      function loop() {
        if (!motionReduced) {
          tick += 1;
          drawFrame();
        }
        animId = window.requestAnimationFrame(loop);
      }

      window.addEventListener('resize', resizeCanvas);
      window.addEventListener('mousemove', (e) => {
        pointer.x = e.clientX / Math.max(window.innerWidth, 1);
        pointer.y = e.clientY / Math.max(window.innerHeight, 1);
        if (motionReduced) drawFrame();
      }, { passive: true });

      window.onload = function() {
        resizeCanvas();
        if (animId) window.cancelAnimationFrame(animId);
        loop();
      };
      resizeCanvas();
    })();

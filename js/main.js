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

    // 2. Sticky Header, Scroll-Spy, Reading Progress & Quick Bar
    const siteHeader = document.getElementById('site-header');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const floatingQuickBar = document.getElementById('floating-quick-bar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    function updateHeaderOnScroll() {
      const scrollY = window.scrollY;
      if (scrollY > 24) {
        siteHeader.classList.add('bg-charcoal-950/90', 'backdrop-blur-md', 'border-white/10');
        siteHeader.classList.remove('border-transparent');
      } else {
        siteHeader.classList.remove('bg-charcoal-950/90', 'backdrop-blur-md', 'border-white/10');
        siteHeader.classList.add('border-transparent');
      }

      if (scrollProgressBar) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
        scrollProgressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
      }

      if (floatingQuickBar) {
        if (scrollY > 480) {
          floatingQuickBar.classList.add('is-visible');
        } else {
          floatingQuickBar.classList.remove('is-visible');
        }
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
          const view = easytripViews[key];
          if (view) {
            const isTarget = key === target;
            view.classList.toggle('hidden', !isTarget);
            if (isTarget) {
              view.classList.remove('tab-view-transition');
              void view.offsetWidth;
              view.classList.add('tab-view-transition');
            }
          }
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
        const view = deepfakeViews[key];
        if (view) {
          const isTarget = key === target;
          view.classList.toggle('hidden', !isTarget);
          if (isTarget) {
            view.classList.remove('tab-view-transition');
            void view.offsetWidth;
            view.classList.add('tab-view-transition');
          }
        }
      });
    }

    deepfakeTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => switchDeepfakeTab(btn.getAttribute('data-deepfake-tab')));
    });

    const simulateDeepfakeBtn = document.getElementById('simulate-deepfake-scan-btn');
    const deepfakeScanOverlay = document.getElementById('deepfake-scan-overlay');
    const deepfakeScanStatus = document.getElementById('deepfake-scan-status');

    if (simulateDeepfakeBtn) {
      simulateDeepfakeBtn.addEventListener('click', () => {
        if (motionReduced || !deepfakeScanOverlay) {
          switchDeepfakeTab('analysis');
          return;
        }

        deepfakeScanOverlay.classList.remove('hidden');
        simulateDeepfakeBtn.disabled = true;

        const scanStages = [
          'Deconstructing facial landmarks...',
          'Computing FFT frequency spectrum...',
          'Evaluating GAN boundary residuals...',
          'Artifact confidence: 94.8% synthetic'
        ];
        let step = 0;
        const interval = setInterval(() => {
          step++;
          if (step < scanStages.length && deepfakeScanStatus) {
            deepfakeScanStatus.textContent = scanStages[step];
          }
        }, 260);

        setTimeout(() => {
          clearInterval(interval);
          deepfakeScanOverlay.classList.add('hidden');
          simulateDeepfakeBtn.disabled = false;
          switchDeepfakeTab('analysis');
        }, 1150);
      });
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
          const view = recViews[k];
          if (view) {
            const isTarget = k === mode;
            view.classList.toggle('hidden', !isTarget);
            if (isTarget) {
              view.classList.remove('tab-view-transition');
              void view.offsetWidth;
              view.classList.add('tab-view-transition');
            }
          }
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

      document.querySelectorAll('a, button, select, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('cursor-Expanded'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('cursor-Expanded'));
      });
    }

    // 12. Interactive Card Spotlight Effect
    (function initCardSpotlight() {
      if (motionReduced || !window.matchMedia('(pointer: fine)').matches) return;
      const cards = document.querySelectorAll('.spotlight-card, .project-card-frame');
      cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        }, { passive: true });
      });
    })();

    // 13. Magnetic Button Hover Interaction
    (function initMagneticButtons() {
      if (motionReduced || !window.matchMedia('(pointer: fine)').matches) return;
      const magneticBtns = document.querySelectorAll('.btn-magnetic');
      magneticBtns.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate3d(${x * 0.16}px, ${y * 0.16}px, 0)`;
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate3d(0, 0, 0)';
          btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        btn.addEventListener('mouseenter', () => {
          btn.style.transition = 'none';
        });
      });
    })();

    // 14. High-Performance Hero Topological Lattice Canvas with Synaptic Pulses & Ripple Dynamics
    (function initHeroCanvas() {
      const canvas = document.getElementById('hero-lattice-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let width = 0;
      let height = 0;
      let animId = null;
      let tick = 0;

      const pointer = {
        current: { x: 0.65, y: 0.45 },
        target: { x: 0.65, y: 0.45 }
      };

      const nodes = [];
      const COLS = 12;
      const ROWS = 7;
      const ripples = [];
      const pulses = [];
      const dust = [];

      function resizeCanvas() {
        const rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
        width = rect.width || window.innerWidth;
        height = rect.height || window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        buildNodes();
        buildDust();
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

      function buildDust() {
        dust.length = 0;
        const count = Math.min(32, Math.floor(width / 40));
        for (let i = 0; i < count; i++) {
          dust.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: -0.15 - Math.random() * 0.25,
            size: 0.6 + Math.random() * 1.4,
            alpha: 0.12 + Math.random() * 0.28,
            pulseOffset: Math.random() * Math.PI * 2
          });
        }
      }

      function spawnPulse() {
        if (nodes.length === 0 || pulses.length >= 6) return;
        const idx = Math.floor(Math.random() * nodes.length);
        const from = nodes[idx];
        const neighbors = [];
        if (from.c < COLS - 1) neighbors.push(nodes[idx + 1]);
        if (from.r < ROWS - 1) neighbors.push(nodes[idx + COLS]);
        if (neighbors.length === 0) return;
        const to = neighbors[Math.floor(Math.random() * neighbors.length)];
        pulses.push({
          from,
          to,
          progress: 0,
          speed: 0.018 + Math.random() * 0.022
        });
      }

      function triggerRipple(x, y) {
        if (motionReduced) return;
        ripples.push({
          x,
          y,
          radius: 0,
          maxRadius: Math.min(width, height) * 0.75,
          speed: 5.5,
          intensity: 1.0
        });
      }

      function drawFrame() {
        ctx.clearRect(0, 0, width, height);

        // Smooth Pointer Easing (Lerp)
        if (!motionReduced) {
          pointer.current.x += (pointer.target.x - pointer.current.x) * 0.06;
          pointer.current.y += (pointer.target.y - pointer.current.y) * 0.06;
        }

        const px = pointer.current.x * width;
        const py = pointer.current.y * height;

        // Update Ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rip = ripples[i];
          rip.radius += rip.speed;
          rip.intensity = Math.max(0, 1 - rip.radius / rip.maxRadius);
          if (rip.intensity <= 0) {
            ripples.splice(i, 1);
          }
        }

        // Draw Ambient Dust Particles
        for (let i = 0; i < dust.length; i++) {
          const p = dust[i];
          if (!motionReduced) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.y < 0) p.y = height;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
          }
          const flicker = Math.sin(tick * 0.03 + p.pulseOffset) * 0.1;
          const a = Math.max(0.04, Math.min(0.5, p.alpha + flicker));
          ctx.fillStyle = `rgba(212, 255, 51, ${a})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Calculate Node Positions with Waves, Mouse Pull, and Shockwaves
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dx = n.baseX - px;
          const dy = n.baseY - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.max(0, 1 - dist / 360);
          const waveX = motionReduced ? 0 : Math.sin(tick * 0.016 + n.c * 0.45 + n.r * 0.28) * 8;
          const waveY = motionReduced ? 0 : Math.cos(tick * 0.013 + n.r * 0.5 + n.c * 0.35) * 8;

          let ripOffset = 0;
          for (let r = 0; r < ripples.length; r++) {
            const rip = ripples[r];
            const rdx = n.baseX - rip.x;
            const rdy = n.baseY - rip.y;
            const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
            const delta = Math.abs(rDist - rip.radius);
            if (delta < 80) {
              const strength = Math.cos((delta / 80) * (Math.PI / 2)) * rip.intensity * 20;
              ripOffset += strength;
            }
          }

          n.x = n.baseX + waveX + (dx / (dist || 1)) * pull * 18 + (ripOffset ? (dx / (dist || 1)) * ripOffset : 0);
          n.y = n.baseY + waveY + (dy / (dist || 1)) * pull * 18 + (ripOffset ? (dy / (dist || 1)) * ripOffset : 0);
        }

        // Draw Lattice Lines
        ctx.lineWidth = 1;
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const idx = r * COLS + c;
            const n = nodes[idx];
            if (c < COLS - 1) {
              const right = nodes[idx + 1];
              ctx.strokeStyle = 'rgba(244, 243, 239, 0.05)';
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(right.x, right.y);
              ctx.stroke();
            }
            if (r < ROWS - 1) {
              const down = nodes[idx + COLS];
              ctx.strokeStyle = 'rgba(244, 243, 239, 0.05)';
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(down.x, down.y);
              ctx.stroke();
            }
          }
        }

        // Synaptic Neural Signal Pulses
        if (!motionReduced) {
          if (tick % 36 === 0 && Math.random() > 0.3) {
            spawnPulse();
          }

          for (let i = pulses.length - 1; i >= 0; i--) {
            const pulse = pulses[i];
            pulse.progress += pulse.speed;
            if (pulse.progress >= 1) {
              pulses.splice(i, 1);
              continue;
            }

            const currentX = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.progress;
            const currentY = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.progress;
            const pAlpha = Math.sin(pulse.progress * Math.PI) * 0.9;

            ctx.fillStyle = `rgba(212, 255, 51, ${pAlpha})`;
            ctx.shadowColor = 'rgba(212, 255, 51, 0.8)';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(currentX, currentY, 2.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        // Draw Intersection Nodes
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dx = n.x - px;
          const dy = n.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const highlight = Math.max(0, 1 - dist / 280);

          if (highlight > 0.25) {
            ctx.fillStyle = `rgba(212, 255, 51, ${0.25 + highlight * 0.65})`;
            ctx.shadowColor = 'rgba(212, 255, 51, 0.5)';
            ctx.shadowBlur = 6 * highlight;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 2.4 + highlight * 0.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = 'rgba(244, 243, 239, 0.16)';
            ctx.beginPath();
            ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      function loop() {
        if (!motionReduced) {
          tick += 1;
          drawFrame();
        }
        animId = window.requestAnimationFrame(loop);
      }

      window.addEventListener('resize', resizeCanvas, { passive: true });
      window.addEventListener('mousemove', (e) => {
        pointer.target.x = e.clientX / Math.max(window.innerWidth, 1);
        pointer.target.y = e.clientY / Math.max(window.innerHeight, 1);
        if (motionReduced) drawFrame();
      }, { passive: true });

      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        triggerRipple(e.clientX - rect.left, e.clientY - rect.top);
      });

      // Immediate & Window Load Initialization
      resizeCanvas();
      if (animId) window.cancelAnimationFrame(animId);
      loop();

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resizeCanvas);
      }
      window.addEventListener('load', resizeCanvas);
    })();

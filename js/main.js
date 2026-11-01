/**
 * THE LEDGER — CORE ARCHITECTURAL SCRIPTS
 * Role: Dhaval Patel Portfolio V2
 * Concept: Minimalist, Mechanical Precision, Zero Bloat
 * Phase 2: Hero Polish, Layout Fixes, Hero Motion
 */

(function () {
  'use strict';

  // Check reduced motion preference
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
  }

  // Helper to parse hex or rgb string into r, g, b
  function parseColor(str) {
    str = (str || '').trim();
    if (str.startsWith('#')) {
      if (str.length === 4) {
        str = '#' + str[1] + str[1] + str[2] + str[2] + str[3] + str[3];
      }
      var num = parseInt(str.slice(1), 16);
      return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    }
    var rgbMatch = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
      return { r: parseInt(rgbMatch[1], 10), g: parseInt(rgbMatch[2], 10), b: parseInt(rgbMatch[3], 10) };
    }
    return { r: 180, g: 175, b: 165 };
  }

  // 1. Interactive Dot Grid Controller (Hero Canvas)
  var DotGrid = (function () {
    var canvas, ctx;
    var heroSection;
    var dots = [];
    var mouse = { x: -9999, y: -9999, active: false };
    var animationFrameId = null;
    var isHeroVisible = true;
    var isTabVisible = !document.hidden;
    var hairlineColor = { r: 217, g: 213, b: 202 };
    var accentColor = { r: 232, g: 72, b: 28 };
    var dotSpacing = 28;
    var baseRadius = 1.25;
    var maxDist = 140;
    var maxScale = 1.8;
    var isTouchDevice = false;

    function readCSSColors() {
      var styles = getComputedStyle(document.documentElement);
      var hairlineHex = styles.getPropertyValue('--hairline').trim();
      var accentHex = styles.getPropertyValue('--accent').trim();
      hairlineColor = parseColor(hairlineHex);
      accentColor = parseColor(accentHex);
    }

    function createDots(width, height) {
      dots = [];
      var cols = Math.ceil(width / dotSpacing) + 1;
      var rows = Math.ceil(height / dotSpacing) + 1;
      var offsetX = (width - (cols - 1) * dotSpacing) / 2;
      var offsetY = (height - (rows - 1) * dotSpacing) / 2;
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var baseAlpha = isTouchDevice ? 0.25 : (isDark ? 0.42 : 0.40);

      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          dots.push({
            x: offsetX + c * dotSpacing,
            y: offsetY + r * dotSpacing,
            currentScale: 1,
            targetScale: 1,
            currentR: hairlineColor.r,
            currentG: hairlineColor.g,
            currentB: hairlineColor.b,
            currentAlpha: baseAlpha,
            targetAlpha: baseAlpha
          });
        }
      }
    }

    function resize() {
      if (!canvas || !heroSection) return;
      var rect = heroSection.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var width = rect.width;
      var height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 640;
      createDots(width, height);
      render();
    }

    function render() {
      if (!ctx || !canvas) return;
      var width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      var height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
      ctx.clearRect(0, 0, width, height);

      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var baseAlpha = isTouchDevice ? 0.25 : (isDark ? 0.42 : 0.40);

      for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];

        if (!isTouchDevice && !prefersReducedMotion && mouse.active) {
          var dx = mouse.x - dot.x;
          var dy = mouse.y - dot.y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            var factor = 1 - (dist / maxDist); // 0 to 1
            dot.targetScale = 1 + factor * (maxScale - 1);
            dot.targetR = Math.round(hairlineColor.r + (accentColor.r - hairlineColor.r) * factor);
            dot.targetG = Math.round(hairlineColor.g + (accentColor.g - hairlineColor.g) * factor);
            dot.targetB = Math.round(hairlineColor.b + (accentColor.b - hairlineColor.b) * factor);
            dot.targetAlpha = baseAlpha + factor * (0.95 - baseAlpha);
          } else {
            dot.targetScale = 1;
            dot.targetR = hairlineColor.r;
            dot.targetG = hairlineColor.g;
            dot.targetB = hairlineColor.b;
            dot.targetAlpha = baseAlpha;
          }

          // Smooth lerp for continuous fluidity
          dot.currentScale += (dot.targetScale - dot.currentScale) * 0.12;
          dot.currentR += (dot.targetR - dot.currentR) * 0.12;
          dot.currentG += (dot.targetG - dot.currentG) * 0.12;
          dot.currentB += (dot.targetB - dot.currentB) * 0.12;
          dot.currentAlpha += (dot.targetAlpha - dot.currentAlpha) * 0.12;
        } else {
          dot.targetScale = 1;
          dot.targetR = hairlineColor.r;
          dot.targetG = hairlineColor.g;
          dot.targetB = hairlineColor.b;
          dot.targetAlpha = baseAlpha;

          // Smooth return to resting state
          dot.currentScale += (1 - dot.currentScale) * 0.12;
          dot.currentR += (hairlineColor.r - dot.currentR) * 0.12;
          dot.currentG += (hairlineColor.g - dot.currentG) * 0.12;
          dot.currentB += (hairlineColor.b - dot.currentB) * 0.12;
          dot.currentAlpha += (baseAlpha - dot.currentAlpha) * 0.12;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, baseRadius * dot.currentScale, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + Math.round(dot.currentR) + ',' + Math.round(dot.currentG) + ',' + Math.round(dot.currentB) + ',' + dot.currentAlpha.toFixed(2) + ')';
        ctx.fill();
      }
    }

    function loop() {
      if (!isHeroVisible || !isTabVisible || isTouchDevice || prefersReducedMotion) {
        animationFrameId = null;
        return;
      }
      render();

      var animating = mouse.active;
      if (!animating) {
        for (var i = 0; i < dots.length; i++) {
          if (Math.abs(dots[i].currentScale - 1) > 0.01) {
            animating = true;
            break;
          }
        }
      }

      if (animating) {
        animationFrameId = requestAnimationFrame(loop);
      } else {
        animationFrameId = null;
      }
    }

    function startLoop() {
      if (!animationFrameId && isHeroVisible && isTabVisible && !isTouchDevice && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(loop);
      }
    }

    function stopLoop() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    function onMouseMove(e) {
      if (isTouchDevice || prefersReducedMotion || !canvas) return;
      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        mouse.active = false;
        mouse.x = -9999;
        mouse.y = -9999;
      } else {
        mouse.x = x;
        mouse.y = y;
        mouse.active = true;
        startLoop();
      }
    }

    function onMouseLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      startLoop();
    }

    function init() {
      canvas = document.getElementById('hero-dot-grid');
      heroSection = document.getElementById('intro');
      if (!canvas || !heroSection) return;

      ctx = canvas.getContext('2d');
      if (!ctx) return;

      readCSSColors();
      resize();

      if (!isTouchDevice && !prefersReducedMotion) {
        heroSection.addEventListener('mousemove', onMouseMove, { passive: true });
        heroSection.addEventListener('mouseleave', onMouseLeave, { passive: true });
        window.addEventListener('scroll', function () {
          if (!mouse.active || !heroSection) return;
          var rect = heroSection.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            mouse.active = false;
            mouse.x = -9999;
            mouse.y = -9999;
          }
        }, { passive: true });
      }

      // Resize observer or debounced window resize
      var resizeTimeout;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
          readCSSColors();
          resize();
        }, 150);
      }, { passive: true });

      // Tab visibility pause
      document.addEventListener('visibilitychange', function () {
        isTabVisible = !document.hidden;
        if (isTabVisible && isHeroVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      });

      // IntersectionObserver for Hero off-screen pause
      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            isHeroVisible = entry.isIntersecting;
            if (isHeroVisible && isTabVisible) {
              startLoop();
            } else {
              stopLoop();
            }
          });
        }, { threshold: 0.05 });
        observer.observe(heroSection);
      }

      render();
    }

    function updateColors() {
      readCSSColors();
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var baseAlpha = isTouchDevice ? 0.25 : (isDark ? 0.42 : 0.40);
      for (var i = 0; i < dots.length; i++) {
        dots[i].targetR = hairlineColor.r;
        dots[i].targetG = hairlineColor.g;
        dots[i].targetB = hairlineColor.b;
        dots[i].targetAlpha = baseAlpha;
        dots[i].currentR = hairlineColor.r;
        dots[i].currentG = hairlineColor.g;
        dots[i].currentB = hairlineColor.b;
        dots[i].currentAlpha = baseAlpha;
      }
      render();
    }

    return {
      init: init,
      updateColors: updateColors
    };
  })();

  // 2. GSAP Hero Load Animation
  function initHeroMotion() {
    if (prefersReducedMotion) return;

    function runAnimation() {
      if (typeof gsap === 'undefined') return;

      var words = document.querySelectorAll('.hero-word');
      var underline = document.querySelector('.hero-accent-underline');
      var fadeItems = document.querySelectorAll('.hero-fade-item');

      if (!words.length) return;

      var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(words,
        { y: '105%' },
        { y: '0%', duration: 0.9, stagger: 0.05 }
      );

      if (underline) {
        tl.fromTo(underline,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: 'expo.out' },
          '-=0.45'
        );
      }

      if (fadeItems.length) {
        tl.fromTo(fadeItems,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          '-=0.4'
        );
      }
    }

    if (typeof gsap !== 'undefined') {
      runAnimation();
    } else {
      window.addEventListener('load', runAnimation);
    }
  }

  // 3. Theme Toggle Controller
  function initTheme() {
    var toggleBtn = document.getElementById('theme-toggle');
    var labelSpan = document.getElementById('theme-label');

    function updateLabel() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (labelSpan) {
        labelSpan.textContent = isDark ? 'LIGHT' : 'DARK';
      }
      DotGrid.updateColors();
    }

    updateLabel();

    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
          document.documentElement.removeAttribute('data-theme');
          try { localStorage.setItem('dhaval_theme', 'light'); } catch (e) {}
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          try { localStorage.setItem('dhaval_theme', 'dark'); } catch (e) {}
        }
        updateLabel();
      });
    }
  }

  // 4. Email Copy Action with Live Feedback
  function initCopyEmail() {
    var copyBtn = document.getElementById('btn-copy-email');
    var feedback = document.getElementById('copy-live-feedback');
    var email = 'dpatel0254@gmail.com';

    if (!copyBtn) return;

    copyBtn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          copyBtn.textContent = 'Copied ✓';
          if (feedback) feedback.textContent = 'Email address copied to clipboard.';
          setTimeout(function () {
            copyBtn.textContent = 'Copy';
            if (feedback) feedback.textContent = '';
          }, 1600);
        }).catch(function () {
          window.location.href = 'mailto:' + email;
        });
      } else {
        window.location.href = 'mailto:' + email;
      }
    });
  }

  // 5. Smooth Scroll for "View work ↓" and Nav Links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          var targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // 6. Slide-Over Case Panel Controller
  function initCasePanel() {
    var projectsData = [
      {
        idx: '01 / 04 · PROJECT LEAD',
        title: 'Watch Assembly & Multi-Channel E-Commerce ERP with BI',
        built: [
          'Centralized stock across Shopify, WooCommerce and internal wholesale, eliminating overselling across 4 channels',
          'Multi-step assembly tracking: movements across raw parts, assembly, QC, final packing and dispatch',
          'Real-time stock audit: perpetual inventory with reconciliation logs, flagged discrepancies between physical count and system records',
          'Invoicing and dispatch modules with barcode scanning, batch tracking and GST-compliant invoicing'
        ],
        stack: 'Node.js, Express, MongoDB, Vue.js, AWS',
        templateId: 'sketch-template-1'
      },
      {
        idx: '02 / 04 · PROJECT LEAD',
        title: 'Industrial Manufacturing ERP with FIFO Stock Ledger',
        built: [
          'FIFO inventory ledger: automated cost-layer consumption for raw materials, ensuring accurate COGS reporting',
          'Production order management: BOM (bill of materials) explosion, routing across machine stations, labor allocation',
          'Vendor evaluation & PO lifecycle: supplier ratings, PO creation, multi-stage approval workflows, GRN (goods receipt note) generation',
          'Dispatch & accounts integration: delivery challans, credit note handling, accounts-receivable aging reports'
        ],
        stack: 'Node.js, Express, MongoDB, Vue.js, AWS',
        templateId: 'sketch-template-2'
      },
      {
        idx: '03 / 04 · BACKEND DEVELOPER',
        title: 'B2B Diamond Trading Platform',
        built: [
          'High-concurrency inventory search across thousands of certified diamonds with multi-attribute filtering (cut, clarity, carat, color, price)',
          'Role-based price tiering: dynamic pricing engine displaying different margins based on buyer tier and payment terms',
          'Offline-first inventory sync: periodic batch sync allowing sales reps to present inventory during trade exhibitions without reliable internet',
          'Trade inquiry to memo pipeline: inquiry generation, memo issuance, return tracking, final invoicing with tax calculations'
        ],
        stack: 'Node.js, Express, MongoDB, Vue.js, AWS S3',
        templateId: 'sketch-template-3'
      },
      {
        idx: '04 / 04 · BACKEND DEVELOPER',
        title: 'Jewellery E-Commerce Platform',
        built: [
          'Dynamic pricing engine: real-time gold/silver market rate integration recalculating product prices on every visit based on metal weight, purity and gemstone markup',
          'Custom jewellery customizer: interactive ring/pendant builder allowing metal, diamond spec and engraving customization with live price updates',
          'Checkout with multi-step payment: partial payment, EMI options, secure Razorpay integration with automated order confirmation',
          'Integrated order-to-dispatch tracking: automated SMS/email notifications at each stage from casting to dispatch'
        ],
        stack: 'Node.js, Express, MongoDB, Vue.js, AWS S3, Razorpay',
        templateId: 'sketch-template-4'
      }
    ];

    var casePanel = document.getElementById('case-panel');
    var scrim = document.getElementById('panel-scrim');
    var panelIndex = document.getElementById('panel-index');
    var panelTitle = document.getElementById('panel-title');
    var panelBuiltList = document.getElementById('panel-built-list');
    var panelStack = document.getElementById('panel-stack');
    var sketchContainer = document.getElementById('panel-sketch-container');
    var closeBtn = document.getElementById('panel-close-btn');
    var footerCloseBtn = document.getElementById('panel-footer-close-btn');
    var prevBtn = document.getElementById('panel-prev-btn');
    var nextBtn = document.getElementById('panel-next-btn');
    var workRows = document.querySelectorAll('.work-row');

    if (!casePanel || !scrim) return;

    var currentProjectIndex = 0;
    var isOpen = false;
    var originatingTrigger = null;

    function populatePanel(index) {
      var data = projectsData[index];
      if (!data) return;

      if (panelIndex) panelIndex.textContent = data.idx;
      if (panelTitle) panelTitle.textContent = data.title;

      if (panelBuiltList) {
        panelBuiltList.innerHTML = '';
        data.built.forEach(function (bullet) {
          var li = document.createElement('li');
          li.textContent = bullet;
          panelBuiltList.appendChild(li);
        });
      }

      if (panelStack) panelStack.textContent = data.stack;

      if (sketchContainer) {
        sketchContainer.innerHTML = '';
        var tpl = document.getElementById(data.templateId);
        if (tpl) {
          var clone = document.importNode(tpl.content, true);
          sketchContainer.appendChild(clone);
        }
      }
    }

    function animateSketchStrokes() {
      if (prefersReducedMotion || typeof gsap === 'undefined') return;
      var svg = sketchContainer.querySelector('svg');
      if (!svg) return;

      var strokeElements = svg.querySelectorAll('line, rect, path');
      var validElements = [];

      strokeElements.forEach(function (el) {
        var len = 0;
        if (el.getTotalLength) {
          try { len = el.getTotalLength(); } catch (e) {}
        }
        if (!len) {
          var tag = el.tagName.toLowerCase();
          if (tag === 'line') {
            var x1 = parseFloat(el.getAttribute('x1') || 0);
            var y1 = parseFloat(el.getAttribute('y1') || 0);
            var x2 = parseFloat(el.getAttribute('x2') || 0);
            var y2 = parseFloat(el.getAttribute('y2') || 0);
            len = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
          } else if (tag === 'rect') {
            var w = parseFloat(el.getAttribute('width') || 0);
            var h = parseFloat(el.getAttribute('height') || 0);
            len = (w + h) * 2;
          }
        }
        if (len > 0) {
          el.style.strokeDasharray = len;
          el.style.strokeDashoffset = len;
          validElements.push(el);
        }
      });

      if (validElements.length) {
        gsap.to(validElements, {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: 'expo.out'
        });
      }
    }

    function openPanel(index, trigger) {
      if (index < 0 || index >= projectsData.length) return;
      currentProjectIndex = index;
      originatingTrigger = trigger || document.activeElement;
      isOpen = true;

      populatePanel(currentProjectIndex);

      casePanel.setAttribute('aria-hidden', 'false');
      scrim.setAttribute('aria-hidden', 'false');
      document.body.classList.add('panel-open');
      scrim.classList.add('is-open');

      if (prefersReducedMotion || typeof gsap === 'undefined') {
        casePanel.classList.add('is-open');
        casePanel.style.transform = 'translateX(0)';
        casePanel.style.visibility = 'visible';
        if (closeBtn) closeBtn.focus();
        return;
      }

      casePanel.classList.add('is-open');
      casePanel.style.visibility = 'visible';

      var tl = gsap.timeline({
        onComplete: function () {
          animateSketchStrokes();
          if (closeBtn) closeBtn.focus();
        }
      });

      tl.fromTo(casePanel,
        { x: '100%' },
        { x: '0%', duration: 0.7, ease: 'expo.out' }
      );

      var animItems = casePanel.querySelectorAll('.panel-animate-item');
      if (animItems.length) {
        tl.fromTo(animItems,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'expo.out' },
          '-=0.35'
        );
      }
    }

    function closePanel() {
      if (!isOpen) return;
      isOpen = false;

      scrim.classList.remove('is-open');
      document.body.classList.remove('panel-open');
      casePanel.setAttribute('aria-hidden', 'true');
      scrim.setAttribute('aria-hidden', 'true');

      function finalize() {
        casePanel.classList.remove('is-open');
        casePanel.style.visibility = 'hidden';
        if (originatingTrigger && typeof originatingTrigger.focus === 'function') {
          originatingTrigger.focus();
        }
      }

      if (prefersReducedMotion || typeof gsap === 'undefined') {
        casePanel.style.transform = 'translateX(100%)';
        finalize();
        return;
      }

      gsap.to(casePanel, {
        x: '100%',
        duration: 0.5,
        ease: 'expo.in',
        onComplete: finalize
      });
    }

    function navigate(delta) {
      var nextIdx = (currentProjectIndex + delta) % projectsData.length;
      if (nextIdx < 0) nextIdx += projectsData.length; // loop around 01 <-> 04
      currentProjectIndex = nextIdx;

      populatePanel(currentProjectIndex);

      if (!prefersReducedMotion && typeof gsap !== 'undefined') {
        var animItems = casePanel.querySelectorAll('.panel-animate-item');
        if (animItems.length) {
          gsap.fromTo(animItems,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'expo.out', onComplete: animateSketchStrokes }
          );
        } else {
          animateSketchStrokes();
        }
      }
    }

    // Event Bindings
    workRows.forEach(function (row) {
      row.addEventListener('click', function () {
        var idx = parseInt(row.getAttribute('data-project-idx'), 10) - 1;
        openPanel(idx, row);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    if (footerCloseBtn) footerCloseBtn.addEventListener('click', closePanel);
    if (scrim) scrim.addEventListener('click', closePanel);

    if (prevBtn) prevBtn.addEventListener('click', function () { navigate(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { navigate(1); });

    // Keyboard Trap and Esc
    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closePanel();
        return;
      }

      if (e.key === 'Tab') {
        var focusables = casePanel.querySelectorAll('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;

        var first = focusables[0];
        var last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
  }

  // 7. Mobile Navigation Toggle
  function initMobileMenu() {
    var menuBtn = document.getElementById('mobile-menu-btn');
    var navLinks = document.querySelector('.nav-links');
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', function () {
      var isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('is-open');
    });
  }

  // Initialization Lifecycle
  document.addEventListener('DOMContentLoaded', function () {
    DotGrid.init();
    initHeroMotion();
    initTheme();
    initCopyEmail();
    initSmoothScroll();
    initCasePanel();
    initMobileMenu();
  });

})();

/**
 * The Architectural Ledger — Core Client Interactions
 * Project: Dhaval Patel Portfolio
 * Standard: Vanilla ES6+ &middot; Zero Bloat &middot; Accessible (WCAG AAA)
 */

(function () {
  'use strict';

  // 1. Non-Blocking IntersectionObserver ScrollSpy with Keyboard ARIA Management
  function initScrollSpy() {
    var navLinks = document.querySelectorAll('.nav-anchor');
    var sections = document.querySelectorAll('.content-right section');

    if (!navLinks.length || !sections.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'location');
              } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      }, {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      });

      sections.forEach(function (sec) {
        observer.observe(sec);
      });
    } else {
      // Fallback for environments without IntersectionObserver
      var onScroll = function () {
        var scrollPos = window.scrollY || window.pageYOffset;
        var threshold = 160;

        sections.forEach(function (sec) {
          var top = sec.offsetTop - threshold;
          var bottom = top + sec.offsetHeight;
          var id = sec.getAttribute('id');

          if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(function (link) {
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'location');
              } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  // 2. Resilient Contact Form Mailto Handler with Validation & Zero Data Loss
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var statusMsg = document.createElement('div');
    statusMsg.setAttribute('role', 'status');
    statusMsg.setAttribute('aria-live', 'polite');
    statusMsg.className = 'form-status';
    form.appendChild(statusMsg);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = document.getElementById('form-name');
      var emailInput = document.getElementById('form-email');
      var subjectInput = document.getElementById('form-subject');
      var messageInput = document.getElementById('form-message');

      var name = nameInput ? nameInput.value.trim() : '';
      var email = emailInput ? emailInput.value.trim() : '';
      var rawSubject = subjectInput ? subjectInput.value.trim() : '';
      var subject = (rawSubject.length > 0)
        ? rawSubject.replace(/[\r\n]+/g, ' ')
        : 'Project Inquiry / Opportunity';
      var message = messageInput ? messageInput.value.trim() : '';

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        statusMsg.textContent = 'Please fill out all required fields (Name, Email, and Message).';
        statusMsg.className = 'form-status form-status-error';
        return;
      }

      if (!emailPattern.test(email)) {
        statusMsg.textContent = 'Please enter a valid email address (e.g., name@company.com).';
        statusMsg.className = 'form-status form-status-error';
        if (emailInput) emailInput.focus();
        return;
      }

      var bodyContent = 'From: ' + name + ' (' + email + ')\n\nMessage:\n' + message;
      var mailtoUrl = 'mailto:dpatel0254@gmail.com?' +
        'subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(bodyContent);

      if (mailtoUrl.length > 2000) {
        statusMsg.textContent = 'Message is too long for direct mailto launch. Please use the direct email link or shorten the message.';
        statusMsg.className = 'form-status form-status-error';
        return;
      }

      statusMsg.textContent = 'Opening your email client... If it does not launch automatically, write directly to dpatel0254@gmail.com.';
      statusMsg.className = 'form-status form-status-success';

      window.location.href = mailtoUrl;
      // Intentionally do NOT call form.reset() to prevent user data loss
    });
  }

  // 3. Accessible One-Click Email Copy Utility
  function initCopyEmail() {
    var copyBtn = document.getElementById('btn-copy-email');
    if (!copyBtn) return;

    var liveAnnounce = document.createElement('span');
    liveAnnounce.setAttribute('role', 'status');
    liveAnnounce.setAttribute('aria-live', 'polite');
    liveAnnounce.style.position = 'absolute';
    liveAnnounce.style.left = '-9999px';
    document.body.appendChild(liveAnnounce);

    copyBtn.addEventListener('click', function () {
      var email = 'dpatel0254@gmail.com';
      var origText = copyBtn.textContent;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          copyBtn.textContent = 'Copied to Clipboard!';
          liveAnnounce.textContent = 'Email address copied to clipboard.';
          setTimeout(function () {
            copyBtn.textContent = origText;
            liveAnnounce.textContent = '';
          }, 2500);
        }).catch(function () {
          window.location.href = 'mailto:' + email;
        });
      } else {
        window.location.href = 'mailto:' + email;
      }
    });
  }

  // 4. Accessible Theme Toggle (Warm Editorial Light vs Deep Charcoal Dark)
  function initThemeToggle() {
    var toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    var iconSpan = toggleBtn.querySelector('.theme-toggle-icon');
    var textSpan = toggleBtn.querySelector('.theme-toggle-text');
    var metaThemeColor = document.getElementById('meta-theme-color');

    function updateButtonState(theme) {
      if (theme === 'dark') {
        if (iconSpan) iconSpan.textContent = '☼';
        if (textSpan) textSpan.textContent = 'Light';
        toggleBtn.setAttribute('aria-label', 'Switch to light theme');
        if (metaThemeColor) metaThemeColor.setAttribute('content', '#15191E');
      } else {
        if (iconSpan) iconSpan.textContent = '☾';
        if (textSpan) textSpan.textContent = 'Dark';
        toggleBtn.setAttribute('aria-label', 'Switch to dark theme');
        if (metaThemeColor) metaThemeColor.setAttribute('content', '#F4F2EC');
      }
    }

    var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateButtonState(currentTheme);

    toggleBtn.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var nextTheme = isDark ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', nextTheme);
      try {
        localStorage.setItem('portfolio-theme', nextTheme);
      } catch (err) {}

      updateButtonState(nextTheme);
    });
  }

  // Lifecycle Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initScrollSpy();
      initContactForm();
      initCopyEmail();
      initThemeToggle();
    });
  } else {
    initScrollSpy();
    initContactForm();
    initCopyEmail();
    initThemeToggle();
  }
})();

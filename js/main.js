/**
 * PTLC.SG - Parent Teacher Learning Center
 * Vanilla JavaScript - No frameworks, no libraries
 */

(function() {
  'use strict';

  /* ============================================
     DOM READY
     ============================================ */
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function() {
    initMobileMenu();
    initSmoothScroll();
    initScrollTop();
    initFAQAccordion();
    initFormValidation();
    initProgrammeFilter();
    initModal();
    initLazyLoad();
    initCurrentNav();
    initAnimationOnScroll();
  });

  /* ============================================
     MOBILE MENU TOGGLE
     ============================================ */
  function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function() {
      const isOpen = menu.classList.toggle('active');
      btn.classList.toggle('active');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click (mobile)
    menu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth < 1024) {
          menu.classList.remove('active');
          btn.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
          menu.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        menu.classList.remove('active');
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  /* ============================================
     SMOOTH SCROLLING
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      });
    });
  }

  /* ============================================
     SCROLL TO TOP BUTTON
     ============================================ */
  function initScrollTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     FAQ ACCORDION
     ============================================ */
  function initFAQAccordion() {
    document.querySelectorAll('.faq-question').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        // Close all others (optional - remove if you want multiple open)
        document.querySelectorAll('.faq-question').forEach(function(other) {
          if (other !== btn) {
            other.setAttribute('aria-expanded', 'false');
            other.nextElementSibling.classList.remove('active');
          }
        });

        this.setAttribute('aria-expanded', !isExpanded);
        answer.classList.toggle('active');
      });
    });
  }

  /* ============================================
     FORM VALIDATION
     ============================================ */
  function initFormValidation() {
    const forms = document.querySelectorAll('.validate-form');
    forms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(function(field) {
          const errorEl = field.parentNode.querySelector('.form-error');
          let fieldValid = true;
          let errorMsg = '';

          if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
              fieldValid = false;
              errorMsg = 'Please enter a valid email address.';
            }
          } else if (field.type === 'tel') {
            const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/;
            if (!phoneRegex.test(field.value.trim())) {
              fieldValid = false;
              errorMsg = 'Please enter a valid phone number.';
            }
          } else {
            if (!field.value.trim()) {
              fieldValid = false;
              errorMsg = 'This field is required.';
            }
          }

          if (!fieldValid) {
            isValid = false;
            field.style.borderColor = '#c53030';
            if (errorEl) {
              errorEl.textContent = errorMsg;
              errorEl.classList.add('visible');
            }
          } else {
            field.style.borderColor = '';
            if (errorEl) {
              errorEl.classList.remove('visible');
            }
          }
        });

        if (!isValid) {
          e.preventDefault();
        } else {
          // For demo - prevent actual submission and show success
          e.preventDefault();
          const successMsg = form.querySelector('.form-success');
          if (successMsg) {
            successMsg.style.display = 'block';
            form.reset();
            setTimeout(function() {
              successMsg.style.display = 'none';
            }, 5000);
          }
        }
      });

      // Clear errors on input
        form.querySelectorAll('input, textarea, select').forEach(function(field) {
        field.addEventListener('input', function() {
          this.style.borderColor = '';
          const errorEl = this.parentNode.querySelector('.form-error');
          if (errorEl) errorEl.classList.remove('visible');
        });
      });
    });
  }

  /* ============================================
     PROGRAMME FILTER
     ============================================ */
  function initProgrammeFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.programme-card');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const filter = this.dataset.filter;

        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        cards.forEach(function(card) {
          const category = card.dataset.category;
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            card.style.animation = 'fadeInUp 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ============================================
     MODAL
     ============================================ */
  function initModal() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    modalTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.dataset.modal;
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
          // Focus first focusable element
          const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusable) focusable.focus();
        }
      });
    });

    modalOverlays.forEach(function(overlay) {
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });

      const closeBtn = overlay.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        });
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        modalOverlays.forEach(function(m) {
          if (m.classList.contains('active')) {
            m.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      }
    });
  }

  /* ============================================
     LAZY LOADING IMAGES
     ============================================ */
  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, { rootMargin: '50px' });

      document.querySelectorAll('img[data-src]').forEach(function(img) {
        imageObserver.observe(img);
      });
    } else {
      // Fallback
      document.querySelectorAll('img[data-src]').forEach(function(img) {
        img.src = img.dataset.src;
      });
    }
  }

  /* ============================================
     CURRENT NAV HIGHLIGHT
     ============================================ */
  function initCurrentNav() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-menu a').forEach(function(link) {
      const href = link.getAttribute('href');
      if (href && (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html'))) {
        link.classList.add('active');
      }
    });
  }

  /* ============================================
     ANIMATION ON SCROLL
     ============================================ */
  function initAnimationOnScroll() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
        el.style.opacity = '0';
        observer.observe(el);
      });
    }
  }

})();

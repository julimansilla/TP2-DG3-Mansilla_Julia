/* ============================================================
   BIBLIOTECA UI — Interacciones simples
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  const sections = [...document.querySelectorAll('.ui-section[id]')];
  const sidebarLinks = [...document.querySelectorAll('.ui-sidebar__link')];

  const setActiveLink = (id) => {
    sidebarLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  if (sections.length && sidebarLinks.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActiveLink(visible.target.id);
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-16% 0px -58% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const galleryMain = document.getElementById('uiGalleryMain');
  const thumbs = document.querySelectorAll('[data-ui-img]');

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      if (!galleryMain) return;

      thumbs.forEach((item) => item.classList.toggle('is-active', item === thumb));

      galleryMain.style.opacity = '0';
      window.setTimeout(() => {
        galleryMain.src = thumb.dataset.uiImg;
        galleryMain.style.opacity = '1';
      }, 160);
    });
  });
});

/* Kino Obzor — animace jako samostatná, volitelná vrstva.
 * Základní program, účty i rezervace fungují také bez tohoto souboru.
 */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const preferenceHandlers = [];

  function animate(element, keyframes, options) {
    if (reducedMotion.matches || typeof element?.animate !== 'function') return null;
    const animation = element.animate(keyframes, options);
    // Zrušení animace není chyba aplikace.
    animation.finished.catch(() => {});
    return animation;
  }

  // Postupné zobrazení sekcí. Bez IntersectionObserver zůstane vše viditelné.
  const revealSelector = '.poster-track, .program-title-block, .screening, .club-banner, .info-card, .snack-hero, .snack-card, .benefit, .detail-hero, .seat-panel, .booking-summary, .booking-success, .reservation-card';
  const registered = new WeakSet();
  const revealObserver = typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -16px 0px' }) : null;

  function registerReveals(root = document) {
    if (!revealObserver || reducedMotion.matches) return;
    $$(revealSelector, root).forEach((element, index) => {
      if (registered.has(element)) return;
      registered.add(element);
      const stagger = element.matches('.screening, .snack-card, .benefit, .reservation-card');
      element.style.setProperty('--reveal-delay', `${stagger ? (index % 3) * 60 : 0}ms`);
      element.classList.add('motion-reveal');
      revealObserver.observe(element);
    });
  }

  function updateReveals() {
    if (reducedMotion.matches) {
      revealObserver?.disconnect();
      $$('.motion-reveal').forEach(element => element.classList.add('is-visible'));
    } else registerReveals();
  }
  updateReveals();
  preferenceHandlers.push(updateReveals);

  // Nové výsledky filtrů a rezervací dostanou stejnou animaci jako původní obsah.
  if (typeof MutationObserver === 'function') {
    const contentObserver = new MutationObserver(records => {
      records.forEach(record => record.removedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        if (node.matches('.motion-reveal')) revealObserver?.unobserve(node);
        $$('.motion-reveal', node).forEach(element => revealObserver?.unobserve(element));
      }));
      new Set(records.map(record => record.target)).forEach(root => registerReveals(root));
    });
    ['#screening-list', '#film-root', '#account-root', '#booking-root'].forEach(selector => {
      const root = $(selector);
      if (root) contentObserver.observe(root, { childList: true });
    });
  }

  // Fokus klávesnice vždy okamžitě odkryje také rodičovskou sekci.
  document.addEventListener('focusin', event => {
    let element = event.target.closest('.motion-reveal');
    while (element) {
      element.classList.add('is-visible');
      revealObserver?.unobserve(element);
      element = element.parentElement?.closest('.motion-reveal');
    }
  });

  // Při použití šipek se nové plakáty krátce posunou ve zvoleném směru.
  ['#poster-prev', '#poster-next'].forEach(selector => {
    const button = $(selector);
    if (!button) return;
    button.addEventListener('click', () => {
      const offset = selector === '#poster-next' ? 16 : -16;
      $$('.film-card', $('#poster-track')).forEach((card, index) => {
        animate(card, [
          { opacity: 0, transform: `translateX(${offset}px)` },
          { opacity: 1, transform: 'translateX(0)' }
        ], { duration: 380, delay: index * 55, easing: 'cubic-bezier(.2,.7,.2,1)' });
      });
    });
  });

  // Filmové tipy: prolínání, jemný pohyb obrazu a ovladatelné střídání.
  const hero = $('.hero');
  const image = $('#hero-image');
  const dots = $$('[data-hero]');
  if (hero && image && dots.length > 1) {
    const interval = 6500;
    let timer = null;
    let userPaused = false;
    let hovered = false;
    let inView = true;
    let pageSuspended = false;
    let requestNumber = 0;
    let requestedSource = image.getAttribute('src');
    let displayedSource = requestedSource;
    let fade = null;
    let drift = null;
    let progress = null;

    // Dvojice obrazů umožňuje prolínání bez prázdného záběru při načítání.
    const previousImage = image.cloneNode();
    previousImage.removeAttribute('id');
    previousImage.classList.add('hero-image-buffer');
    previousImage.alt = '';
    previousImage.setAttribute('aria-hidden', 'true');
    previousImage.hidden = true;
    image.before(previousImage);

    const playback = document.createElement('div');
    playback.className = 'hero-playback';
    const dotGroup = $('.hero-dots', hero);
    dotGroup.before(playback);
    playback.append(dotGroup);
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'hero-toggle';
    playback.append(toggle);
    dots.forEach(dot => {
      const indicator = document.createElement('span');
      indicator.className = 'hero-progress';
      indicator.setAttribute('aria-hidden', 'true');
      dot.append(indicator);
    });

    function canPlay() {
      const focusedControl = hero.contains(document.activeElement) && document.activeElement !== toggle;
      return !userPaused && !hovered && inView && !pageSuspended && !document.hidden &&
        !reducedMotion.matches && !focusedControl && !$('dialog[open]');
    }

    function updateToggle() {
      toggle.hidden = reducedMotion.matches;
      const label = userPaused ? 'Spustit automatické střídání filmových tipů' : 'Pozastavit automatické střídání filmových tipů';
      toggle.setAttribute('aria-label', label);
      toggle.title = label;
      const symbol = userPaused ? '<path d="m9 5 10 7-10 7z"/>' : '<path d="M8 5v14M16 5v14"/>';
      toggle.innerHTML = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${symbol}</svg><span>${userPaused ? 'Spustit' : 'Pozastavit'}</span>`;
    }

    function scheduleRotation() {
      clearTimeout(timer);
      timer = null;
      progress?.cancel();
      progress = null;
      hero.classList.toggle('is-autoplay', canPlay());
      if (!canPlay()) { drift?.pause(); return; }
      drift?.play();
      const activeIndex = Math.max(0, dots.findIndex(dot => dot.getAttribute('aria-current') === 'true'));
      progress = animate($('.hero-progress', dots[activeIndex]), [
        { transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }
      ], { duration: interval, easing: 'linear', fill: 'forwards' });
      timer = setTimeout(() => {
        timer = null;
        dots[(activeIndex + 1) % dots.length].click();
      }, interval);
    }

    function startDrift() {
      drift?.cancel();
      drift = animate(image, [
        { transform: 'scale(1.04)' }, { transform: 'scale(1)' }
      ], { duration: interval, easing: 'ease-out', fill: 'forwards' });
      if (!canPlay()) drift?.pause();
    }

    function changeImage() {
      const nextSource = image.getAttribute('src');
      if (nextSource === requestedSource) { scheduleRotation(); return; }
      requestedSource = nextSource;
      const thisRequest = ++requestNumber;
      fade?.cancel();
      drift?.cancel();
      if (reducedMotion.matches || typeof image.animate !== 'function') {
        image.style.opacity = '';
        previousImage.hidden = true;
        displayedSource = nextSource;
        scheduleRotation();
        return;
      }
      previousImage.src = displayedSource;
      previousImage.hidden = false;
      image.style.opacity = '0';
      const ready = typeof image.decode === 'function' ? image.decode().catch(() => {}) : Promise.resolve();
      ready.then(() => {
        // Rychlé klikání nesmí vrátit starší obrázek ani skrýt aktuální banner.
        if (thisRequest !== requestNumber || reducedMotion.matches) return;
        displayedSource = nextSource;
        image.style.opacity = '';
        fade = animate(image, [{ opacity: 0 }, { opacity: 0.94 }], { duration: 600, easing: 'ease-out' });
        if (fade) fade.finished.then(() => {
          if (thisRequest === requestNumber) previousImage.hidden = true;
        }).catch(() => {});
        else previousImage.hidden = true;
        startDrift();
        animate($('#hero-copy'), [
          { opacity: 0.2, transform: 'translateY(7px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 420, easing: 'ease-out' });
        scheduleRotation();
      });
      scheduleRotation();
    }

    dots.forEach(dot => dot.addEventListener('click', changeImage));
    toggle.addEventListener('click', () => {
      userPaused = !userPaused;
      updateToggle();
      scheduleRotation();
    });
    hero.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') { hovered = true; scheduleRotation(); }
    });
    hero.addEventListener('pointerleave', () => { hovered = false; scheduleRotation(); });
    hero.addEventListener('focusin', scheduleRotation);
    hero.addEventListener('focusout', () => queueMicrotask(scheduleRotation));
    document.addEventListener('visibilitychange', scheduleRotation);
    window.addEventListener('pagehide', () => { pageSuspended = true; scheduleRotation(); });
    window.addEventListener('pageshow', () => { pageSuspended = false; scheduleRotation(); });

    if (typeof IntersectionObserver === 'function') {
      const heroObserver = new IntersectionObserver(entries => {
        inView = entries[0].isIntersecting;
        scheduleRotation();
      }, { threshold: 0.1 });
      heroObserver.observe(hero);
    }
    if (typeof MutationObserver === 'function') {
      const dialogObserver = new MutationObserver(scheduleRotation);
      $$('dialog').forEach(dialog => dialogObserver.observe(dialog, { attributes: true, attributeFilter: ['open'] }));
    }
    preferenceHandlers.push(() => {
      ++requestNumber;
      fade?.cancel();
      drift?.cancel();
      image.style.opacity = '';
      previousImage.hidden = true;
      displayedSource = image.getAttribute('src');
      updateToggle();
      if (!reducedMotion.matches) startDrift();
      scheduleRotation();
    });
    updateToggle();
    startDrift();
    scheduleRotation();
  }

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches && typeof document.getAnimations === 'function') {
      document.getAnimations().forEach(animation => animation.cancel());
    }
    preferenceHandlers.forEach(handler => handler());
  });
})();

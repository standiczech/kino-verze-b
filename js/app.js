/* Kino Obzor — klientská logika bez frameworku a bez serveru. */
(() => {
  'use strict';
  const { films, screenings, days, dateKey } = window.KinoData;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const filmById = id => films.find(film => film.id === id);
  const money = value => new Intl.NumberFormat('cs-CZ', {style:'currency',currency:'CZK',maximumFractionDigits:0}).format(value);
  const localDate = day => new Date(`${day}T12:00:00`);
  const formatDate = day => localDate(day).toLocaleDateString('cs-CZ',{day:'numeric',month:'long'});
  const longDate = day => localDate(day).toLocaleDateString('cs-CZ',{weekday:'long',day:'numeric',month:'long'});
  const arrow = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
  const params = new URLSearchParams(location.search);
  const STORAGE = {users:'obzor-users-v1',bookings:'obzor-bookings-v1',session:'obzor-session-v1'};
  let toastTimer;

  function readStorage(key, fallback = [], session = false) {
    try { return JSON.parse((session ? sessionStorage : localStorage).getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function writeStorage(key, value, session = false) {
    try { (session ? sessionStorage : localStorage).setItem(key, JSON.stringify(value)); return true; }
    catch { toast('Prohlížeč nepovolil uložení. Povolte místní úložiště a zkuste to znovu.'); return false; }
  }
  const currentUser = () => readStorage(STORAGE.session, null, true);
  function allBookings() {
    const bookings = readStorage(STORAGE.bookings);
    return Array.isArray(bookings) ? bookings : [];
  }
  function toast(message) {
    const box = $('#toast');
    clearTimeout(toastTimer);
    box.textContent = message; box.hidden = false;
    toastTimer = setTimeout(() => { box.hidden = true; }, 5500);
  }

  // Nativní dialog zajišťuje fokus, modalitu a zavření klávesou Escape.
  function openDialog(dialog) {
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open');
  }
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => { if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }});
    dialog.addEventListener('close', () => { if (!$('dialog[open]')) document.body.classList.remove('modal-open'); });
  });
  document.addEventListener('click', event => {
    const close = event.target.closest('[data-close-dialog]');
    if (close) close.closest('dialog').close();
    const authButton = event.target.closest('[data-auth]');
    if (authButton) openAuth(authButton.dataset.auth);
    const trailerButton = event.target.closest('[data-trailer]');
    if (trailerButton) openTrailer(trailerButton.dataset.trailer);
  });

  // Mobilní navigace včetně návratu fokusu při Escape.
  const menuButton = $('.menu-button');
  function closeMenu() { menuButton.setAttribute('aria-expanded','false'); $('#mobile-nav').classList.remove('is-open'); }
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    $('#mobile-nav').classList.toggle('is-open', !expanded);
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  $('#mobile-nav').addEventListener('click', event => { if (event.target.closest('a,button')) closeMenu(); });
  matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  // Přístupná validace: chyby u konkrétních polí a fokus na první chybu.
  function fieldError(input, message) {
    input.setAttribute('aria-invalid', String(Boolean(message)));
    const target = $(`#${input.id}-error`);
    if (target) target.textContent = message;
  }
  function validateForm(form) {
    let firstInvalid = null;
    $$('input,textarea', form).forEach(input => {
      if (input.disabled || input.closest('[hidden]') || input.type === 'checkbox') return;
      let message = '';
      if (input.required && !input.value.trim()) message = input.type === 'email' ? 'Doplňte e-mail, ať víme, kam rezervace patří.' : 'Toto pole prosím vyplňte.';
      else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) message = 'Zadejte platný e-mail, například jana@example.cz.';
      else if (input.minLength > 0 && input.value.trim().length < input.minLength) message = `Zadejte alespoň ${input.minLength} znaků.`;
      fieldError(input, message);
      if (message && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }
  document.addEventListener('input', event => {
    if (event.target.matches('input,textarea') && event.target.getAttribute('aria-invalid') === 'true') fieldError(event.target, '');
  });

  // Ukázkový lokální účet. Hesla jsou odvozena pomocí PBKDF2, nikoli uložena jako text.
  // Toto není autentizační systém pro produkční nasazení.
  let authMode = 'login';
  function openAuth(mode = 'login') {
    authMode = mode;
    const isRegister = mode === 'register', isReset = mode === 'reset';
    $('#auth-form').reset();
    $$('.form-error', $('#auth-dialog')).forEach(element => { element.textContent = ''; });
    $$('input', $('#auth-form')).forEach(input => input.removeAttribute('aria-invalid'));
    $('#auth-name-field').hidden = !isRegister;
    $('#auth-name').required = isRegister; $('#auth-name').minLength = 2;
    $('#auth-confirm-field').hidden = !isRegister; $('#auth-confirm').required = isRegister;
    $('#auth-password-field').hidden = isReset; $('#auth-password').required = !isReset;
    $('#auth-password').autocomplete = isRegister ? 'new-password' : 'current-password';
    $('.forgot-button').hidden = mode !== 'login';
    $('#auth-title').textContent = isRegister ? 'Váš příběh začíná tady.' : isReset ? 'Zapomenuté heslo?' : 'Vítejte zpátky.';
    $('#auth-description').textContent = isRegister ? 'Založte si ukázkový účet a mějte své rezervace pohromadě.' : isReset ? 'Zadejte e-mail svého ukázkového účtu.' : 'Přihlaste se a mějte své filmové večery na jednom místě.';
    $('#auth-submit').textContent = isRegister ? 'Zaregistrovat se' : isReset ? 'Zobrazit možnosti obnovy' : 'Přihlásit se';
    $('#auth-switch').innerHTML = isRegister ? 'Už máte účet? <button data-auth="login">Přihlaste se</button>' : 'Ještě nejste v klubu? <button data-auth="register">Vytvořte si účet</button>';
    openDialog($('#auth-dialog'));
    setTimeout(() => (isRegister ? $('#auth-name') : $('#auth-email')).focus(), 0);
  }
  async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({name:'PBKDF2',salt:encoder.encode(salt),iterations:100000,hash:'SHA-256'},key,256);
    return [...new Uint8Array(bits)].map(byte => byte.toString(16).padStart(2,'0')).join('');
  }
  function refreshAuth() {
    const user = currentUser();
    const button = $('.header-actions > .login-link');
    if (user) {
      button.removeAttribute('data-auth');
      $('span',button).textContent = 'Můj účet';
      button.onclick = () => { location.href = 'ucet.html'; };
      $('.header-actions > .btn').hidden = true;
    } else {
      button.dataset.auth = 'login'; $('span',button).textContent = 'Přihlásit se';
      button.onclick = null; $('.header-actions > .btn').hidden = false;
    }
  }
  $('#auth-form').addEventListener('submit', async event => {
    event.preventDefault(); const form = event.currentTarget;
    if (!validateForm(form)) return;
    const email = $('#auth-email').value.trim().toLowerCase();
    const password = $('#auth-password').value;
    if (authMode === 'reset') {
      $('#auth-error').textContent = 'Tato klientská ukázka nemá e-mailový server. Obnovení hesla není dostupné. Pro další vyzkoušení si vytvořte účet s jiným testovacím e-mailem.';
      return;
    }
    const button = $('#auth-submit'); button.disabled = true;
    try {
      const users = readStorage(STORAGE.users);
      let user;
      if (authMode === 'register') {
        if (password !== $('#auth-confirm').value) { fieldError($('#auth-confirm'), 'Hesla se neshodují. Zadejte je prosím znovu.'); $('#auth-confirm').focus(); return; }
        if (users.some(item => item.email === email)) { fieldError($('#auth-email'), 'Tento ukázkový účet už existuje. Přihlaste se.'); $('#auth-email').focus(); return; }
        const salt = [...crypto.getRandomValues(new Uint8Array(16))].map(byte => byte.toString(16).padStart(2,'0')).join('');
        user = {name:$('#auth-name').value.trim(),email,salt,hash:await hashPassword(password,salt)};
        if (!writeStorage(STORAGE.users,[...users,user])) return;
      } else {
        user = users.find(item => item.email === email);
        if (!user || await hashPassword(password,user.salt) !== user.hash) { $('#auth-error').textContent = 'E-mail nebo heslo nesouhlasí. Ověřte údaje, nebo si nejdříve vytvořte ukázkový účet.'; return; }
      }
      if (!writeStorage(STORAGE.session,{name:user.name,email:user.email},true)) return;
      $('#auth-dialog').close(); form.reset(); refreshAuth();
      if ($('#account-root')) renderAccount();
      if ($('#booking-name')) { $('#booking-name').value = user.name; $('#booking-email').value = user.email; }
      toast(authMode === 'register' ? 'Vítejte v Obzoru. Váš ukázkový účet je připravený.' : 'Jste přihlášeni. Vítejte zpátky.');
    } catch { $('#auth-error').textContent = 'Účet se nepodařilo zpracovat. Otevřete web přes localhost nebo HTTPS a zkontrolujte, zda je povolené úložiště.'; }
    finally { button.disabled = false; }
  });
  refreshAuth();

  function posterCard(film) {
    return `<a class="film-card ${film.color}" href="film.html?id=${film.id}"><div class="poster"><img src="assets/${film.image}" alt="" loading="lazy"><span class="tag ${film.tag==='Premiéra'?'tag-peach':''}">${film.tag}</span><div class="poster-title"><small>${film.kicker}</small>${film.title}</div></div><div class="film-card-meta"><div><h3>${film.title}</h3><p>${film.genre} · ${film.length} min</p></div><span class="circle-arrow" aria-hidden="true">${arrow}</span></div></a>`;
  }
  if ($('#poster-track')) {
    let carouselIndex = 0;
    const movieFilms = films.filter(film => film.category === 'kino');
    function renderPosters() {
      $('#poster-track').innerHTML = Array.from({length:3},(_,i) => posterCard(movieFilms[(carouselIndex+i)%movieFilms.length])).join('');
      $('#poster-track').scrollLeft = 0;
    }
    $('#poster-prev').addEventListener('click', () => { carouselIndex = (carouselIndex - 1 + movieFilms.length) % movieFilms.length; renderPosters(); });
    $('#poster-next').addEventListener('click', () => { carouselIndex = (carouselIndex + 1) % movieFilms.length; renderPosters(); });
    renderPosters();
    $$('[data-hero]').forEach(button => button.addEventListener('click', () => {
      const film = films[Number(button.dataset.hero)];
      $('#hero-image').src = `assets/${film.image}`;
      $('#hero-image').alt = ['Pohled z vesmíru na zakřivení Země','Slunce zapadající nad poklidnou krajinou','Večerní atmosféra příběhu Město v rytmu'][Number(button.dataset.hero)];
      $('#hero-copy').textContent = `${film.title} — ${film.kicker}`;
      $('#hero-tickets').href = `film.html?id=${film.id}`;
      $('#hero-trailer').dataset.trailer = film.id;
      $$('[data-hero]').forEach(dot => dot.setAttribute('aria-current',String(dot===button)));
    }));
  }

  function openTrailer(id) {
    const film = filmById(id); if (!film) return;
    $('#trailer-title').textContent = film.title;
    const scenes = [film.kicker, film.description.split('. ')[0] + '.', 'Celý příběh už na vás čeká v Obzoru.'];
    let frame = 0;
    function renderFrame() {
      $('#trailer-content').innerHTML = `<div class="storyboard"><img src="assets/${film.image}" alt=""><div class="storyboard-caption"><span class="eyebrow">${frame+1} / 3 · textová upoutávka</span><h3>${escape(scenes[frame])}</h3><button class="btn btn-peach" id="next-scene">${frame===2?'Znovu přehrát':'Další záběr'} ${arrow}</button></div></div>`;
      $('#next-scene').onclick = () => { frame=(frame+1)%scenes.length; renderFrame(); $('#next-scene').focus(); };
    }
    renderFrame(); openDialog($('#trailer-dialog'));
  }

  // Program: kombinovatelné filtry, datum, stránkování a stav bez výsledků.
  if ($('#program-filters')) {
    const matchedFilm = films.find(film => film.title.toLowerCase() === (params.get('q') || '').toLowerCase());
    let category = matchedFilm?.category || 'kino', selectedDay = days.includes(params.get('date')) ? params.get('date') : days[0], page=1;
    const pageSize = document.body.classList.contains('page-index') ? 3 : 6;
    $('#filter-date').min = days[0]; $('#filter-date').max = days.at(-1); $('#filter-date').value = selectedDay;
    $('#film-search').value = (params.get('q') || '').slice(0,100);
    function renderDays() {
      $('#program-days').innerHTML = days.map((day,index) => `<button type="button" class="day" data-day="${day}" aria-pressed="${day===selectedDay}" aria-label="${escape(longDate(day))}"><span>${index===0?'Dnes':index===1?'Zítra':localDate(day).toLocaleDateString('cs-CZ',{weekday:'short'})}</span><strong>${localDate(day).getDate()}. ${localDate(day).getMonth()+1}.</strong></button>`).join('');
      $$('.segmented button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.category===category)));
    }
    function renderProgram() {
      const search = $('#film-search').value.trim().toLocaleLowerCase('cs');
      const format = $('#filter-format').value;
      const matches = screenings.filter(show => {
        const film = filmById(show.filmId);
        return show.day === selectedDay && film.category===category && (!format || show.format===format) && film.title.toLocaleLowerCase('cs').includes(search);
      }).sort((a,b) => a.time.localeCompare(b.time));
      const pageCount = Math.ceil(matches.length/pageSize);
      page = Math.min(page, Math.max(1,pageCount));
      $('#results-info').textContent = `${longDate(selectedDay)} · ${matches.length} ${matches.length===1?'událost':matches.length<5?'události':'událostí'}`;
      $('#screening-list').innerHTML = matches.length ? matches.slice((page-1)*pageSize,page*pageSize).map(show => {
        const film=filmById(show.filmId);
        return `<article class="screening"><a class="screening-thumb" href="film.html?id=${film.id}" aria-label="Detail: ${film.title}"><img src="assets/${film.image}" alt="" loading="lazy"></a><div class="screening-info"><h3><a href="film.html?id=${film.id}">${film.title}</a></h3><p class="screening-sub"><span>${film.genre}</span><span>·</span><span>${film.length} min</span><span class="age">${film.age}</span></p><p class="show-meta"><strong>${show.time}</strong><span>Sál ${show.hall}</span><span>${film.category==='kino'?show.format:'Živě'}</span><span>${film.category==='kino'?show.language:'Česky'}</span></p></div><div class="screening-buy"><strong>od ${money(film.price)}</strong><a class="btn" href="rezervace.html?show=${show.id}" aria-label="Vstupenky na ${film.title} v ${show.time}">Vstupenky ${arrow}</a></div></article>`;
      }).join('') : '<div class="empty-state"><h3>Tady je zatím ticho.</h3><p class="muted">Pro tuto kombinaci nemáme žádnou projekci. Zkuste jiný den nebo upravte filtry.</p><button class="btn btn-ghost" id="reset-filters">Vymazat filtry</button></div>';
      $('#program-pagination').innerHTML = pageCount > 1 ? Array.from({length:pageCount},(_,i)=>`<button data-page="${i+1}" aria-label="Strana ${i+1}" ${i+1===page?'aria-current="page"':''}>${i+1}</button>`).join('') : '';
      if ($('#reset-filters')) $('#reset-filters').onclick = () => { $('#film-search').value=''; $('#filter-format').value=''; page=1; renderProgram(); };
    }
    $('#program-days').addEventListener('click', event => {
      const dayButton = event.target.closest('[data-day]'); if (!dayButton) return;
      selectedDay=dayButton.dataset.day; $('#filter-date').value=selectedDay; page=1;
      $$('.day').forEach(button => button.setAttribute('aria-pressed',String(button===dayButton))); renderProgram();
    });
    $$('.segmented button').forEach(button => button.addEventListener('click', () => {
      category=button.dataset.category; page=1;
      $$('.segmented button').forEach(item => item.setAttribute('aria-pressed',String(item===button))); renderProgram();
    }));
    $('#program-filters').addEventListener('submit', event => event.preventDefault());
    $('#film-search').addEventListener('input', () => { page=1; renderProgram(); });
    $('#filter-format').addEventListener('change', () => { page=1; renderProgram(); });
    $('#filter-date').addEventListener('change', () => {
      if (!days.includes($('#filter-date').value)) { $('#filter-date').value=selectedDay; toast('Vyberte datum z následujících 28 dní.'); return; }
      selectedDay=$('#filter-date').value; page=1;
      $$('.day').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.day===selectedDay)));
      $(`.day[data-day="${selectedDay}"]`).scrollIntoView({block:'nearest',inline:'center'}); renderProgram();
    });
    $('#open-calendar').addEventListener('click', () => { try { $('#filter-date').showPicker(); } catch { $('#filter-date').focus(); } });
    $('#program-pagination').addEventListener('click', event => { const button=event.target.closest('[data-page]'); if (button) { page=Number(button.dataset.page); renderProgram(); $('#program-title').scrollIntoView({block:'start'}); } });
    renderDays(); renderProgram();
  }

  if ($('#film-root')) {
    const film=filmById(params.get('id'));
    if (!film) {
      $('#film-root').innerHTML='<div class="empty-state"><h1>Tenhle příběh tu není.</h1><p class="lead muted">Odkaz na film není platný. V programu si určitě vyberete jiný.</p><a class="btn" href="program.html">Zpátky do programu</a></div>';
    } else {
      document.title=`${film.title} | Kino Obzor`;
      $('#film-breadcrumb').textContent=film.title;
      const shows=screenings.filter(show=>show.filmId===film.id).slice(0,6);
      $('#film-root').innerHTML=`<section class="detail-hero"><img src="assets/${film.image}" alt="Ilustrační fotografie k filmu ${film.title}"><div class="detail-title"><span class="tag tag-peach">${film.tag}</span><h1>${film.title}</h1><p class="screening-sub"><span>${film.genre}</span><span>·</span><span>${film.length} min</span><span>·</span><span>${film.year}</span><span class="tag">${film.age}</span></p><div class="hero-actions"><a href="#show-options" class="btn btn-peach">Vybrat projekci ${arrow}</a><button class="btn btn-light" data-trailer="${film.id}">Filmová ukázka</button></div></div></section><div class="detail-grid"><div><section><span class="eyebrow muted">${film.kicker}</span><h2>O příběhu</h2><p>${film.description}</p></section><section class="show-options" id="show-options"><h2>Nejbližší projekce</h2>${shows.map(show=>`<div class="show-option"><div><strong>${formatDate(show.day)} · ${show.time}</strong><p>Sál ${show.hall} · ${film.category==='kino'?`${show.format} · ${show.language}`:'Živé vystoupení'}</p></div><a class="btn" href="rezervace.html?show=${show.id}" aria-label="Vybrat místa ${formatDate(show.day)} v ${show.time}">${money(film.price)} ${arrow}</a></div>`).join('')}<a class="text-link" style="margin-top:25px" href="program.html?q=${encodeURIComponent(film.title)}">Všechny termíny ${arrow}</a></section></div><aside class="info-card"><h2>Dobré vědět</h2><dl class="film-info"><dt>${film.category==='kino'?'Režie':'Účinkující'}</dt><dd>${film.director}</dd><dt>Obsazení</dt><dd>${film.cast}</dd><dt>Délka</dt><dd>${film.length} minut</dd><dt>Přístupnost</dt><dd>${film.age==='Vše'?'Bez omezení':`Od ${film.age.replace('+','')} let`}</dd><dt>Vstupné</dt><dd>od ${money(film.price)}</dd></dl><p class="demo-note" style="margin-top:22px">Fiktivní titul a obsazení pro demonstraci studentského projektu. Fotografie je ilustrační.</p></aside></div>`;
    }
  }

  // Výběr sedadel a rezervace. Stav se ověřuje znovu těsně před uložením.
  function initialOccupied(showId) {
    const seed=[...showId].reduce((sum,char)=>sum+char.charCodeAt(0),0);
    return Array.from({length:80},(_,i)=>i).filter(i=>(i*13+seed)%17<3).map(i=>`${'ABCDEFGH'[Math.floor(i/10)]}${i%10+1}`);
  }
  function occupiedSeats(showId) {
    return new Set([...initialOccupied(showId),...allBookings().filter(booking=>booking.showId===showId).flatMap(booking=>booking.seats)]);
  }
  function bookingMarkup(booking) {
    const film=filmById(booking.filmId);
    return `<div class="ticket"><span class="eyebrow muted">Vaše ukázková vstupenka</span><h3>${film.title}</h3><p>${formatDate(booking.day)} · ${booking.time} · Sál ${booking.hall}</p><p>Sedadla: <strong>${booking.seats.join(', ')}</strong></p><p>Na jméno: ${escape(booking.name)}</p><p>Celkem: <strong>${money(booking.total)}</strong></p><div class="ticket-code">${booking.code}</div><p class="demo-note">Ukázková rezervace · Není platnou vstupenkou</p></div>`;
  }
  function showSuccess(booking) {
    $('#booking-root').innerHTML=`<section class="booking-success"><div class="success-icon" aria-hidden="true">✓</div><span class="eyebrow">Máte se na co těšit</span><h2>Vaše místa jsou připravená.</h2><p class="muted" style="margin-top:15px;font-size:13px">Rezervace je uložená v tomto prohlížeči. Potvrzení si můžete vytisknout nebo uložit jako PDF.</p>${bookingMarkup(booking)}<div class="action-row"><button class="btn" id="print-booking">Vytisknout potvrzení</button><a class="btn btn-light" href="program.html">Zpátky do programu</a></div><p class="demo-note">Potvrzení se e-mailem neodesílá. Projekt nemá server ani platební bránu.</p></section>`;
    $('#print-booking').addEventListener('click',()=>window.print());
    document.title='Rezervace potvrzena | Kino Obzor';
    $('.booking-success').setAttribute('tabindex','-1'); $('.booking-success').focus();
  }
  if ($('#booking-root')) {
    const show=screenings.find(item=>item.id===params.get('show'));
    if (!show) {
      $('#booking-root').innerHTML='<div class="empty-state"><h2>Tahle projekce už není v programu.</h2><p class="muted" style="margin-top:15px">Vyberte si prosím nový termín. Program se aktualizuje pro následujících 28 dní.</p><a class="btn" href="program.html">Vybrat projekci</a></div>';
    } else {
      const film=filmById(show.filmId), selected=new Set();
      const user=currentUser();
      $('#booking-root').innerHTML=`<div class="booking-grid"><section class="seat-panel" aria-labelledby="seat-title"><h2 id="seat-title" style="font-size:25px">${film.title}</h2><p class="muted" style="font-size:12px;margin-top:10px">${formatDate(show.day)} · ${show.time} · Sál ${show.hall} · ${film.category==='kino'?show.format:'Živě'}</p><div class="steps"><span class="active"><b>1</b> Vyberte místa</span><span><b>2</b> Doplňte údaje</span><span><b>3</b> Potvrďte rezervaci</span></div><div class="cinema-screen" style="margin-top:40px">FILMOVÉ PLÁTNO / PÓDIUM</div><div id="seats" class="seats" role="group" aria-label="Výběr sedadel v sále"></div><div class="seat-legend"><span><i class="seat-key"></i>Volné</span><span><i class="seat-key selected"></i>Váš výběr</span><span><i class="seat-key occupied"></i>Obsazené</span></div><p class="demo-note" style="text-align:center">Klikněte na sedadla. Vybrat můžete nejvýše 8 míst.</p></section><aside class="booking-summary"><h2>Váš filmový večer</h2><div class="summary-line"><span>Vstupné za osobu</span><strong>${money(film.price)}</strong></div><div class="summary-line"><span>Vybraná místa</span><strong id="selected-seats">Zatím žádná</strong></div><div class="summary-line total"><span>Celkem</span><span id="total-price" aria-live="polite">${money(0)}</span></div><form id="booking-form" novalidate><div class="form-field"><label for="booking-name">Jméno a příjmení *</label><input id="booking-name" required minlength="2" maxlength="80" autocomplete="name" value="${escape(user?.name||'')}" aria-describedby="booking-name-error"><span class="form-error" id="booking-name-error"></span></div><div class="form-field"><label for="booking-email">E-mail *</label><input id="booking-email" type="email" required maxlength="150" autocomplete="email" value="${escape(user?.email||'')}" aria-describedby="booking-email-error"><span class="form-error" id="booking-email-error"></span></div><label class="check-label"><input id="booking-consent" type="checkbox" required><span>Rozumím, že jde o ukázkovou rezervaci uloženou pouze v tomto prohlížeči.</span></label><div class="form-error full-width" id="booking-error" role="alert"></div><button class="btn full-width" type="submit" style="margin-top:10px">Potvrdit rezervaci ${arrow}</button><p class="demo-note">Nezadáváte platební údaje. Rezervace je zdarma a není skutečnou vstupenkou.</p></form></aside></div>`;
      function renderSeats() {
        const occupied=occupiedSeats(show.id);
        $('#seats').innerHTML=[...'ABCDEFGH'].map(row=>`<span class="row-label">${row}</span>`+Array.from({length:10},(_,i)=>{
          const seat=`${row}${i+1}`;
          return `<button type="button" class="seat" data-seat="${seat}" aria-label="Řada ${row}, sedadlo ${i+1}${occupied.has(seat)?', obsazeno':''}" aria-pressed="${selected.has(seat)}" ${occupied.has(seat)?'disabled':''}>${i+1}</button>`;
        }).join('')).join('');
      }
      function updateTotal() {
        $('#selected-seats').textContent=[...selected].sort().join(', ') || 'Zatím žádná';
        $('#total-price').textContent=money(selected.size*film.price);
      }
      renderSeats();
      $('#seats').addEventListener('click',event=>{
        const button=event.target.closest('[data-seat]'); if (!button || button.disabled) return;
        const seat=button.dataset.seat;
        if (selected.has(seat)) selected.delete(seat);
        else if (selected.size<8) selected.add(seat);
        else { toast('Najednou si můžete vybrat nejvýše 8 míst.'); return; }
        button.setAttribute('aria-pressed',String(selected.has(seat))); updateTotal(); $('#booking-error').textContent='';
      });
      $('#booking-form').addEventListener('submit', event=>{
        event.preventDefault();
        if (!selected.size) { $('#booking-error').textContent='Nejdříve si vyberte alespoň jedno volné sedadlo.'; $('#seats .seat:not(:disabled)').focus(); return; }
        if (!validateForm(event.currentTarget)) return;
        if (!$('#booking-consent').checked) { $('#booking-error').textContent='Potvrďte prosím, že rozumíte ukázkovému režimu.'; $('#booking-consent').focus(); return; }
        const occupied=occupiedSeats(show.id);
        if ([...selected].some(seat=>occupied.has(seat))) { selected.clear(); renderSeats(); updateTotal(); $('#booking-error').textContent='Některé místo se mezitím obsadilo. Vyberte si prosím jiné.'; return; }
        const random=crypto.getRandomValues(new Uint32Array(2));
        const booking={code:`OB-${random[0].toString(36).toUpperCase().padStart(7,'0')}-${random[1].toString(36).toUpperCase()}`,showId:show.id,filmId:film.id,day:show.day,time:show.time,hall:show.hall,seats:[...selected].sort(),name:$('#booking-name').value.trim(),email:$('#booking-email').value.trim().toLowerCase(),total:selected.size*film.price,createdAt:new Date().toISOString()};
        if (writeStorage(STORAGE.bookings,[...allBookings(),booking])) showSuccess(booking);
      });
      window.addEventListener('storage',event=>{ if (event.key===STORAGE.bookings && $('#seats')) {
        const occupied=occupiedSeats(show.id); selected.forEach(seat=>{if(occupied.has(seat))selected.delete(seat);}); renderSeats(); updateTotal();
      }});
    }
  }

  function renderAccount() {
    const user=currentUser();
    if (!user) {
      $('#account-heading').innerHTML='<span class="eyebrow">Vaše místo v Obzoru</span><h1>Vaše rezervace pohromadě.</h1>';
      $('#account-root').innerHTML='<section class="empty-state"><h2>Nejdříve se přihlaste.</h2><p class="muted" style="margin:18px auto;max-width:450px">Zobrazíme rezervace vytvořené na e-mail vašeho účtu. Pokud účet ještě nemáte, založte si ho se stejným e-mailem jako u rezervace.</p><div class="action-row"><button class="btn" data-auth="login">Přihlásit se</button><button class="btn btn-ghost" data-auth="register">Vytvořit účet</button></div></section>';
      return;
    }
    const mine=allBookings().filter(booking=>booking.email===user.email).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
    $('#account-heading').innerHTML=`<div class="account-top"><div><span class="eyebrow">Váš Kino klub</span><h1>Ahoj, ${escape(user.name)}.</h1><p class="lead muted">${escape(user.email)} · Váš přehled filmových večerů.</p></div><button class="btn btn-ghost" id="logout">Odhlásit se</button></div>`;
    $('#account-root').innerHTML=`<h2 style="font-size:28px">Moje rezervace <span class="muted">(${mine.length})</span></h2>${mine.length?`<div class="reservations">${mine.map(booking=>{
      const film=filmById(booking.filmId); if(!film)return '';
      return `<article class="reservation-card"><img src="assets/${film.image}" alt=""><div><h3>${film.title}</h3><p>${formatDate(booking.day)} · ${booking.time} · Sál ${booking.hall}</p><p>Sedadla ${booking.seats.join(', ')} · ${money(booking.total)}</p></div><div><code>${booking.code}</code><button class="btn btn-ghost" style="margin-top:10px" data-cancel="${booking.code}">Zrušit rezervaci</button></div></article>`;
    }).join('')}</div>`:'<section class="empty-state"><h3>První příběh na vás teprve čeká.</h3><p class="muted">Vyberte si film a rezervujte si svoje oblíbené místo.</p><a class="btn" href="program.html">Prohlédnout program</a></section>'}<p class="notice">Účet a rezervace jsou uložené pouze v tomto prohlížeči. Po vymazání místních dat se odstraní. Přehled není propojený s jinými zařízeními.</p>`;
    $('#logout').onclick=()=>{ try { sessionStorage.removeItem(STORAGE.session); } catch { /* Soukromý režim */ } refreshAuth(); renderAccount(); toast('Jste odhlášeni. Zase brzy na viděnou.'); };
  }
  if ($('#account-root')) {
    renderAccount();
    $('#account-root').addEventListener('click',event=>{
      const button=event.target.closest('[data-cancel]'); if(!button)return;
      const code=button.dataset.cancel;
      openDialog($('#confirm-dialog'));
      $('#confirm-cancel').onclick=()=>{
        const user=currentUser();
        if(!user)return;
        const remaining=allBookings().filter(booking=>!(booking.code===code && booking.email===user.email));
        if(writeStorage(STORAGE.bookings,remaining)){ $('#confirm-dialog').close(); renderAccount(); toast('Rezervace je zrušená. Místa jsou znovu volná.'); }
      };
    });
  }
  if ($('#contact-form')) $('#contact-form').addEventListener('submit',event=>{
    event.preventDefault(); if(!validateForm(event.currentTarget))return;
    $('#contact-result').innerHTML='<p class="notice">Údaje jsou v pořádku. Ve skutečné aplikaci by se zpráva nyní odeslala. V této klientské ukázce se nic neodesílá ani neukládá.</p>';
    $('#contact-result').setAttribute('tabindex','-1'); $('#contact-result').focus();
  });
})();

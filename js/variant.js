
(() => {
  const el = id => document.getElementById(id);
  const calendar = el('calendar'),
        format = el('format'),
        title = el('film');

  const first = availableDays[0],
        last = availableDays.at(-1);

  let start = availableDays.includes(todayStr) ? todayStr : first;
  let category = 'kino';

  calendar.min = first;
  calendar.max = last;

  el('period').textContent =
    'Výběr z programu pražských kin od ' +
    formatShortDate(first) +
    ' do ' +
    formatShortDate(last) + '.';

  if (todayStr > last) {
    el('schedule-title').textContent = 'Archiv programu';
  }

  function timeLinks(movie, shows) {
    return shows.map(show => {
      const badge = show.format === '4DX 2D' ? '4DX' :
        show.format === '3D' ? '3D' :
        ({
          'Český dabing': 'DAB',
          'České titulky': 'TIT',
          'České znění': 'CZ'
        }[show.language] || show.format);

      const formatClass =
        badge === '4DX' ? ' is-4dx' :
        badge === '3D' ? ' is-3d' : '';

      const info = `${show.venue} · Sál ${show.hall} · ${show.format} · ${show.language}`;

      return `
        <a class="time-chip${formatClass}"
           href="rezervace.html?show=${encodeURIComponent(show.id)}"
           title="${info}"
           aria-label="${movie.title}, ${show.time}, ${info}">
          <span>${show.time}</span>
          <small>${badge}</small>
        </a>
      `;
    }).join('');
  }

  function setCategory(kind) {
    category = kind;

    title.replaceChildren(
      new Option(
        kind === 'kino' ? 'Vyberte film' : 'Vyberte událost',
        ''
      )
    );

    title.setAttribute('aria-label', title.options[0].text);

    movies
      .filter(movie => movie.category === kind)
      .forEach(movie => {
        title.add(new Option(movie.title, movie.id));
      });

    format.value = '';
    format.disabled = kind !== 'kino';

    document.querySelectorAll('[data-kind]').forEach(button => {
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.kind === kind)
      );
    });

    render();
  }

  function render() {
    calendar.value = start;

    el('day-tabs').innerHTML = availableDays.map(day => {
      const label = day === todayStr
        ? 'Dnes'
        : parseDate(day).toLocaleDateString('cs-CZ', {
            weekday: 'short',
            day: 'numeric',
            month: 'numeric'
          });

      return `
        <button type="button"
                data-day="${day}"
                aria-label="${formatLongDate(day)}"
                aria-pressed="${day === start}">
          ${label}
        </button>
      `;
    }).join('');

    const groups = new Map();

    for (const show of screenings) {
      const movie = getMovieById(show.filmId);

      if (
        show.day !== start ||
        movie.category !== category ||
        (title.value && movie.id !== title.value) ||
        (format.value && format.value !== show.format)
      ) {
        continue;
      }

      if (!groups.has(movie.id)) {
        groups.set(movie.id, []);
      }

      groups.get(movie.id).push(show);
    }

    const total = [...groups.values()].reduce(
      (n, shows) => n + shows.length,
      0
    );

    const item = category === 'kino'
      ? ['film', 'filmy', 'filmů']
      : ['událost', 'události', 'událostí'];

    const noun = groups.size === 1
      ? item[0]
      : groups.size >= 2 && groups.size <= 4
        ? item[1]
        : item[2];

    const summary = `
      <h2 class="day-heading">
        ${formatLongDate(start)} · ${groups.size}
        ${noun} (${total} promítání)
      </h2>
    `;

    const cards = [...groups.values()].map(shows => {
      const movie = getMovieById(shows[0].filmId);
      const detail = 'film.html?id=' + movie.id;
      const times = timeLinks(movie, shows);

      return `
        <article class="show-row">
          <a href="${detail}" aria-label="${movie.title}">
            <img src="${movie.image}" alt="">
          </a>

          <div>
            <h3>
              <a href="${detail}">${movie.title}</a>
            </h3>

            <p>
              ${movie.genre} ·
              ${movie.length} min ·
              ${movie.age} ·
              od ${formatPrice(movie.price)}
            </p>

            <p>
              Promítáme (${shows.length}×) –
              kliknutím na čas vyberete sedadla:
            </p>

            <div class="times">
              ${times}
            </div>
          </div>
        </article>
      `;
    }).join('') || `
      <div class="empty-state">
        <h3>Nic jsme nenašli</h3>
        <p>
          Pro vybraný den není pro tyto filtry žádná projekce.
        </p>
        <button class="btn" id="clear-filters">
          Vymazat filtry
        </button>
      </div>
    `;

    el('lineup').innerHTML = summary + cards;

    if (el('clear-filters')) {
      el('clear-filters').onclick = () => {
        start = availableDays.includes(todayStr)
          ? todayStr
          : first;

        setCategory('kino');
      };
    }
  }

  document.querySelectorAll('[data-kind]').forEach(button => {
    button.onclick = () => setCategory(button.dataset.kind);
  });

  el('day-tabs').onclick = e => {
    if (e.target.dataset.day) {
      start = e.target.dataset.day;
      render();
    }
  };

  calendar.onchange = () => {
    if (availableDays.includes(calendar.value)) {
      start = calendar.value;
    }

    render();
  };

  format.onchange = title.onchange = () => {
    render();
  };

  setCategory('kino');
})();

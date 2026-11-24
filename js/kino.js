// Data filmu a doprovodnych akci
const movies = [
  {
    id: "hunger-games",
    title: "Hunger Games: Úsvit sklizně",
    kicker: "Padesáté hry patří Haymitchovi.",
    genre: "Akční / Dobrodružný / Sci-Fi",
    length: 158,
    age: "12+",
    year: 2026,
    image: "assets/img/hunger-games-plakat.webp",
    backdrop: "assets/img/hunger-games-zaber.webp",
    director: "Francis Lawrence",
    cast: "Joseph Zada, Mckenna Grace, Jesse Plemons",
    description:
      "Dvanáctý kraj posílá do jubilejních Hladových her čtyři mladé lidi. Mezi vylosovanými je i Haymitch Abernathy. Zatímco Kapitol chystá velkou podívanou, Haymitch hledá cestu zpátky k dívce, kterou musel opustit.",
    category: "kino",
    tag: "Sci-fi",
    price: 189,
  },
  {
    id: "drevorubec",
    title: "Dřevorubec",
    kicker: "Z reklamní agentury na beskydskou pilu.",
    genre: "Romantický / Komedie",
    length: 98,
    age: "Vše",
    year: 2026,
    image: "assets/img/drevorubec-plakat.webp",
    backdrop: "assets/img/drevorubec-zaber.webp",
    director: "Petr Zahrádka",
    cast: "Pavla Gajdošíková, Adam Vacula, Marek Lambora",
    description:
      "Jana čeká, že ji přítel požádá o ruku. Místo toho od něj dostane na starost rodinnou pilu v Beskydech. Když propustí zkušeného dřevorubce Pavla, brzy zjistí, jak moc ho na pile potřebuje.",
    category: "kino",
    tag: "Český film",
    price: 169,
  },
  {
    id: "ebenezer",
    title: "Ebenezer: Vánoční koleda",
    kicker: "Čtyři duchové a jediná noc na změnu.",
    genre: "Fantasy / Drama / Komedie",
    length: 115,
    age: "12+",
    year: 2026,
    image: "assets/img/ebenezer-plakat.webp",
    backdrop: "assets/img/ebenezer-zaber.webp",
    director: "Ti West",
    cast: "Johnny Depp, Rupert Grint, Andrea Riseborough",
    description:
      "Londýn slaví Vánoce a lakomý Ebenezer Scrooge počítá peníze. Během jediné noci mu nečekaní návštěvníci ukážou, koho svými rozhodnutími zranil a jak na něj budou lidé jednou vzpomínat.",
    category: "kino",
    tag: "Fantasy",
    price: 179,
  },
  {
    id: "kocour",
    title: "Kocour v klobouku",
    kicker: "Co všechno se vejde do jednoho klobouku?",
    genre: "Animovaný / Dobrodružný / Komedie",
    length: 107,
    age: "Vše",
    year: 2026,
    image: "assets/img/kocour-plakat.webp",
    backdrop: "assets/img/kocour-zaber.webp",
    director: "Alessandro Carloni, Erica Rivinoja",
    cast: "Bill Hader, Xochitl Gomez, Quinta Brunson",
    description:
      "Gabby a Sebastian si zvykají na nové město. Kocour s pruhovaným kloboukem má oběma sourozencům pomoci. Jeho nápady ale obrátí jejich nový domov vzhůru nohama.",
    category: "kino",
    tag: "Pro celou rodinu",
    price: 149,
  },
  {
    id: "vecer-na-male-scene",
    title: "Večer na malé scéně",
    kicker: "Komorní divadelní představení.",
    genre: "Divadelní komedie",
    length: 100,
    age: "12+",
    year: 2026,
    image: "assets/img/kino.webp",
    backdrop: "assets/img/kino.webp",
    director: "Lucie Horáková",
    cast: "Divadelní soubor Na obzoru",
    description:
      "Co se stane, když se obyvatelé jednoho domu rozhodnou uspořádat společnou večeři? Komorní divadelní komedie o sousedech, tajemstvích a věcech, které je lepší říct nahlas.",
    category: "divadlo",
    tag: "Divadlo",
    price: 249,
  },
  {
    id: "jazz-pod-obzorem",
    title: "Jazz pod Obzorem",
    kicker: "Živý jazzový večer v sále.",
    genre: "Jazzový koncert",
    length: 90,
    age: "Vše",
    year: 2026,
    image: "assets/img/mesto.webp",
    backdrop: "assets/img/mesto.webp",
    director: "Obzor Quartet",
    cast: "Klavír, kontrabas, bicí, saxofon",
    description:
      "Obzor Quartet přináší večer jazzových standardů i vlastních skladeb. Živý koncert v komorní atmosféře našeho kina.",
    category: "koncert",
    tag: "Koncert",
    price: 229,
  },
];

// Rozpis promitani (Cinema City Novy Smichov a CineStar Cerny Most)
const cinemas = {
  cc: "Cinema City Nový Smíchov",
  cs: "CineStar Černý Most",
};

const schedule = [
  {
    venue: "cc", filmId: "drevorubec", hall: "10", format: "2D", language: "České znění",
    timesByDate: { "2026-11-24": ["16:20", "18:30"], "2026-11-25": ["16:20", "18:30"] },
  },
  {
    venue: "cc", filmId: "drevorubec", hall: "8", format: "2D", language: "České znění",
    timesByDate: {
      "2026-11-26": ["15:10"], "2026-11-27": ["15:10"], "2026-11-28": ["15:10"],
      "2026-11-29": ["15:10"], "2026-11-30": ["15:10"], "2026-12-01": ["15:10"],
    },
  },
  {
    venue: "cc", filmId: "ebenezer", hall: "11", format: "2D", language: "České titulky",
    timesByDate: {
      "2026-11-26": ["15:40", "20:30"], "2026-11-27": ["15:40", "20:30"], "2026-11-28": ["15:40", "20:30"],
      "2026-11-29": ["15:40", "20:30"], "2026-11-30": ["15:40", "20:30"], "2026-12-01": ["15:40", "20:30"],
    },
  },
  {
    venue: "cc", filmId: "ebenezer", hall: "7", format: "3D", language: "České titulky",
    timesByDate: { "2026-11-24": ["21:00"], "2026-11-25": ["21:00"] },
  },
  {
    venue: "cc", filmId: "ebenezer", hall: "7", format: "2D", language: "Český dabing",
    timesByDate: { "2026-11-24": ["13:50"], "2026-11-25": ["13:50"] },
  },
  {
    venue: "cc", filmId: "ebenezer", hall: "8", format: "2D", language: "České titulky",
    timesByDate: { "2026-11-24": ["17:30"], "2026-11-25": ["17:30"] },
  },
  {
    venue: "cc", filmId: "ebenezer", hall: "8", format: "2D", language: "Český dabing",
    timesByDate: { "2026-11-24": ["12:30", "15:00"], "2026-11-25": ["12:30", "15:00"] },
  },
  {
    venue: "cc", filmId: "ebenezer", hall: "9", format: "2D", language: "České titulky",
    timesByDate: { "2026-11-24": ["16:30"] },
  },
  {
    venue: "cc", filmId: "hunger-games", hall: "1", format: "2D", language: "České titulky",
    timesByDate: {
      "2026-11-24": ["14:20", "17:30", "20:40"], "2026-11-25": ["14:20", "17:30", "20:40"],
      "2026-11-26": ["14:10", "17:20", "20:30"], "2026-11-27": ["14:10", "17:20", "20:30"],
      "2026-11-28": ["10:50", "14:00", "17:10", "20:30"], "2026-11-29": ["10:50", "14:00", "17:10", "20:30"],
      "2026-11-30": ["14:10", "17:20", "20:30"], "2026-12-01": ["14:10", "17:20", "20:30"],
    },
  },
  {
    venue: "cc", filmId: "hunger-games", hall: "12", format: "3D", language: "České titulky",
    timesByDate: {
      "2026-11-24": ["20:00"], "2026-11-25": ["20:10"], "2026-11-26": ["20:00"], "2026-11-27": ["20:00"],
      "2026-11-28": ["20:00"], "2026-11-29": ["20:00"], "2026-11-30": ["20:00"], "2026-12-01": ["20:00"],
    },
  },
  {
    venue: "cc", filmId: "hunger-games", hall: "12", format: "3D", language: "Český dabing",
    timesByDate: {
      "2026-11-24": ["14:40"], "2026-11-25": ["14:40"], "2026-11-26": ["16:40"], "2026-11-27": ["16:40"],
      "2026-11-28": ["16:40"], "2026-11-29": ["16:40"], "2026-11-30": ["16:40"], "2026-12-01": ["16:40"],
    },
  },
  {
    venue: "cc", filmId: "hunger-games", hall: "2", format: "2D", language: "České titulky",
    timesByDate: {
      "2026-11-24": ["13:00", "16:10", "19:20"], "2026-11-25": ["13:00", "16:10", "19:20"],
      "2026-11-26": ["13:40", "16:50", "20:00"], "2026-11-27": ["13:40", "16:50", "20:00"],
      "2026-11-28": ["13:00", "16:10", "19:30"], "2026-11-29": ["13:00", "16:10", "19:30"],
      "2026-11-30": ["13:40", "16:50", "20:00"], "2026-12-01": ["13:40", "16:50", "20:00"],
    },
  },
  {
    venue: "cc", filmId: "hunger-games", hall: "3", format: "4DX 2D", language: "České titulky",
    timesByDate: {
      "2026-11-24": ["18:20", "21:30"], "2026-11-25": ["18:20", "21:30"],
      "2026-11-26": ["18:10", "21:20"], "2026-11-27": ["18:10", "21:20"],
      "2026-11-28": ["18:10", "21:30"], "2026-11-29": ["18:10", "21:30"],
      "2026-11-30": ["18:10", "21:20"], "2026-12-01": ["18:10", "21:20"],
    },
  },
  {
    venue: "cc", filmId: "hunger-games", hall: "3", format: "4DX 2D", language: "Český dabing",
    timesByDate: {
      "2026-11-24": ["12:00", "15:10"], "2026-11-25": ["15:10"], "2026-11-26": ["15:00"], "2026-11-27": ["15:00"],
      "2026-11-28": ["14:50"], "2026-11-29": ["14:50"], "2026-11-30": ["15:00"], "2026-12-01": ["15:00"],
    },
  },
  {
    venue: "cc", filmId: "hunger-games", hall: "4", format: "2D", language: "České titulky",
    timesByDate: {
      "2026-11-26": ["16:00", "19:10"], "2026-11-27": ["16:00", "19:10"],
      "2026-11-28": ["18:00", "21:20"], "2026-11-29": ["18:00", "21:20"],
      "2026-11-30": ["16:00", "19:10"], "2026-12-01": ["16:00", "19:10"],
    },
  },
  {
    venue: "cc", filmId: "hunger-games", hall: "4", format: "2D", language: "Český dabing",
    timesByDate: { "2026-11-24": ["15:20", "18:30"], "2026-11-25": ["15:20", "18:30"] },
  },
  {
    venue: "cc", filmId: "hunger-games", hall: "5", format: "2D", language: "České titulky",
    timesByDate: { "2026-11-24": ["18:00", "21:10"], "2026-11-25": ["18:00", "21:10"] },
  },
  {
    venue: "cc", filmId: "hunger-games", hall: "8", format: "2D", language: "České titulky",
    timesByDate: { "2026-11-24": ["20:00"], "2026-11-25": ["20:00"] },
  },
  {
    venue: "cc", filmId: "kocour", hall: "10", format: "2D", language: "Český dabing",
    timesByDate: { "2026-11-24": ["14:00"], "2026-11-25": ["14:00"] },
  },
  {
    venue: "cc", filmId: "kocour", hall: "2", format: "3D", language: "Český dabing",
    timesByDate: { "2026-11-28": ["10:40"], "2026-11-29": ["10:40"] },
  },
  {
    venue: "cc", filmId: "kocour", hall: "9", format: "2D", language: "Český dabing",
    timesByDate: {
      "2026-11-26": ["12:30"], "2026-11-27": ["12:30"], "2026-11-28": ["10:10", "12:30"],
      "2026-11-29": ["10:10", "12:30"], "2026-11-30": ["12:30"], "2026-12-01": ["12:30"],
    },
  },
  {
    venue: "cs", filmId: "drevorubec", hall: "2", format: "2D", language: "České znění",
    timesByDate: {
      "2026-11-24": ["17:00", "19:10"], "2026-11-25": ["18:00"], "2026-11-26": ["17:20"],
      "2026-11-27": ["15:10", "17:20"], "2026-11-28": ["15:10", "17:20"], "2026-11-29": ["15:10", "17:20"],
      "2026-11-30": ["15:10", "17:20"], "2026-12-01": ["15:10", "17:20"],
    },
  },
  {
    venue: "cs", filmId: "ebenezer", hall: "10", format: "3D", language: "Český dabing",
    timesByDate: { "2026-11-24": ["17:15"], "2026-11-25": ["17:15"] },
  },
  {
    venue: "cs", filmId: "ebenezer", hall: "11", format: "2D", language: "Český dabing",
    timesByDate: { "2026-11-24": ["19:20"] },
  },
  {
    venue: "cs", filmId: "ebenezer", hall: "12", format: "3D", language: "Český dabing",
    timesByDate: {
      "2026-11-26": ["15:10"], "2026-11-27": ["15:10"], "2026-11-28": ["15:10"],
      "2026-11-29": ["15:10"], "2026-11-30": ["15:10"], "2026-12-01": ["15:10"],
    },
  },
  {
    venue: "cs", filmId: "ebenezer", hall: "4", format: "3D", language: "České titulky",
    timesByDate: {
      "2026-11-24": ["15:20"], "2026-11-27": ["15:20"], "2026-11-30": ["15:20"], "2026-12-01": ["15:20"],
    },
  },
  {
    venue: "cs", filmId: "ebenezer", hall: "5", format: "2D", language: "České titulky",
    timesByDate: { "2026-11-24": ["20:40"] },
  },
  {
    venue: "cs", filmId: "ebenezer", hall: "5", format: "2D", language: "Český dabing",
    timesByDate: {
      "2026-11-24": ["13:10", "15:40", "18:10"], "2026-11-25": ["17:50", "20:20"], "2026-11-26": ["18:10"],
      "2026-11-27": ["15:40", "18:10"], "2026-11-28": ["13:10", "15:40", "18:10"], "2026-11-29": ["13:10", "15:40", "18:10"],
      "2026-11-30": ["15:40", "18:10"], "2026-12-01": ["15:40", "18:10"],
    },
  },
  {
    venue: "cs", filmId: "hunger-games", hall: "10", format: "2D", language: "Český dabing",
    timesByDate: {
      "2026-11-24": ["20:15"], "2026-11-25": ["20:15"], "2026-11-26": ["13:50", "20:15"], "2026-11-27": ["13:50", "20:15"],
      "2026-11-28": ["13:50", "20:15"], "2026-11-29": ["13:50", "20:15"], "2026-11-30": ["13:50", "20:15"], "2026-12-01": ["13:50", "20:15"],
    },
  },
  {
    venue: "cs", filmId: "hunger-games", hall: "11", format: "2D", language: "České titulky",
    timesByDate: { "2026-11-24": ["15:50"], "2026-11-25": ["15:50"] },
  },
  {
    venue: "cs", filmId: "hunger-games", hall: "11", format: "2D", language: "Český dabing",
    timesByDate: {
      "2026-11-26": ["15:50"], "2026-11-27": ["15:50"], "2026-11-28": ["15:50"],
      "2026-11-29": ["15:50"], "2026-11-30": ["15:50"], "2026-12-01": ["15:50"],
    },
  },
  {
    venue: "cs", filmId: "hunger-games", hall: "12", format: "3D", language: "České titulky",
    timesByDate: {
      "2026-11-24": ["18:15"], "2026-11-25": ["18:15"], "2026-11-26": ["18:15"], "2026-11-27": ["18:15"],
      "2026-11-28": ["18:15"], "2026-11-29": ["18:15"], "2026-11-30": ["18:15"], "2026-12-01": ["18:15"],
    },
  },
  {
    venue: "cs", filmId: "hunger-games", hall: "12", format: "3D", language: "Český dabing",
    timesByDate: { "2026-11-24": ["14:50"], "2026-11-25": ["14:50"] },
  },
  {
    venue: "cs", filmId: "hunger-games", hall: "4", format: "3D", language: "Český dabing",
    timesByDate: {
      "2026-11-26": ["19:50"], "2026-11-27": ["19:50"], "2026-11-28": ["19:50"],
      "2026-11-29": ["19:50"], "2026-11-30": ["19:50"], "2026-12-01": ["19:50"],
    },
  },
  {
    venue: "cs", filmId: "hunger-games", hall: "6", format: "2D", language: "České titulky",
    timesByDate: { "2026-11-24": ["17:40"], "2026-11-29": ["10:20", "13:40", "17:00", "20:20"] },
  },
  {
    venue: "cs", filmId: "hunger-games", hall: "6", format: "2D", language: "Český dabing",
    timesByDate: {
      "2026-11-24": ["14:20", "21:00"], "2026-11-25": ["17:45", "21:00"], "2026-11-26": ["18:50"],
      "2026-11-27": ["15:30", "18:50"], "2026-11-28": ["12:10", "15:30", "18:50"],
      "2026-11-30": ["15:30", "18:50"], "2026-12-01": ["15:30", "18:50"],
    },
  },
  {
    venue: "cs", filmId: "hunger-games", hall: "8", format: "2D", language: "Český dabing",
    timesByDate: { "2026-11-28": ["11:20"], "2026-11-29": ["12:10", "15:30", "18:50"] },
  },
  {
    venue: "cs", filmId: "hunger-games", hall: "9", format: "2D", language: "České titulky",
    timesByDate: {
      "2026-11-24": ["13:40", "20:20"], "2026-11-25": ["20:20"], "2026-11-26": ["20:20"],
      "2026-11-27": ["13:40", "17:00", "20:20"], "2026-11-28": ["10:20", "13:40", "17:00", "20:20"],
      "2026-11-30": ["13:40", "17:00", "20:20"], "2026-12-01": ["13:40", "17:00", "20:20"],
    },
  },
  {
    venue: "cs", filmId: "hunger-games", hall: "9", format: "2D", language: "Český dabing",
    timesByDate: { "2026-11-24": ["17:00"] },
  },
  {
    venue: "cs", filmId: "kocour", hall: "3", format: "3D", language: "Český dabing",
    timesByDate: { "2026-11-28": ["12:00"], "2026-11-29": ["12:00"] },
  },
];

// Vytvoreni seznamu vsech promitani
const screenings = [];
for (const group of schedule) {
  for (const [day, times] of Object.entries(group.timesByDate)) {
    for (const time of times) {
      screenings.push({
        id: group.venue + "-" + day + "-" + group.hall + "-" + time.replace(":", "") + "-" + group.filmId,
        venue: cinemas[group.venue],
        day: day,
        time: time,
        hall: group.hall,
        filmId: group.filmId,
        format: group.format,
        language: group.language,
      });
    }
  }
}

const availableDays = [];
for (const item of screenings) {
  if (!availableDays.includes(item.day)) {
    availableDays.push(item.day);
  }
}
availableDays.sort();

// Pridani divadla a koncertu do programu
availableDays.forEach((day, index) => {
  const filmId = index % 2 === 0 ? "jazz-pod-obzorem" : "vecer-na-male-scene";
  screenings.push({
    id: "obzor-" + day + "-" + filmId,
    day: day,
    filmId: filmId,
    time: "19:00",
    hall: "1",
    venue: "Kino Obzor",
    format: "Živě",
    language: "Česky",
  });
});

screenings.sort((a, b) => a.day.localeCompare(b.day) || a.time.localeCompare(b.time));

// Pomocne promenne a funkce
const arrowSvg = '<svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const urlParams = new URLSearchParams(window.location.search);

const STORAGE_KEYS = {
  users: "kino_uzivatele",
  bookings: "kino_rezervace",
  currentUser: "kino_prihlaseny",
};

let toastTimer = null;

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text || "";
  return div.innerHTML.replace(/"/g, "&quot;");
}

function getMovieById(id) {
  return movies.find((m) => m.id === id);
}

function formatPrice(amount) {
  return amount + " Kč";
}

function toDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

const todayStr = toDateString(new Date());

function parseDate(dayStr) {
  return new Date(dayStr + "T12:00:00");
}

function formatShortDate(dayStr) {
  return parseDate(dayStr).toLocaleDateString("cs-CZ", { day: "numeric", month: "long" });
}

function formatLongDate(dayStr) {
  return parseDate(dayStr).toLocaleDateString("cs-CZ", { weekday: "long", day: "numeric", month: "long" });
}

function loadStorage(key, fallback = [], useSession = false) {
  const storage = useSession ? sessionStorage : localStorage;
  const raw = storage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function saveStorage(key, value, useSession = false) {
  const storage = useSession ? sessionStorage : localStorage;
  storage.setItem(key, JSON.stringify(value));
}

function getCurrentUser() {
  return loadStorage(STORAGE_KEYS.currentUser, null, true);
}

function getAllBookings() {
  const list = loadStorage(STORAGE_KEYS.bookings, []);
  return Array.isArray(list) ? list : [];
}

function showToast(message) {
  const box = document.getElementById("toast");
  if (!box) return;
  clearTimeout(toastTimer);
  box.textContent = message;
  box.hidden = false;
  toastTimer = setTimeout(() => {
    box.hidden = true;
  }, 4500);
}

// Modaly a mobilni menu
function openDialog(dialog) {
  if (dialog && !dialog.open) {
    dialog.showModal();
    document.body.classList.add("modal-open");
  }
}

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("close", () => {
    if (!document.querySelector("dialog[open]")) {
      document.body.classList.remove("modal-open");
    }
  });
});

document.addEventListener("click", (e) => {
  const closeBtn = e.target.closest("[data-close-dialog]");
  if (closeBtn) {
    closeBtn.closest("dialog").close();
    return;
  }
  const authBtn = e.target.closest("[data-auth]");
  if (authBtn) {
    openAuthModal(authBtn.dataset.auth);
    return;
  }
  const trailerBtn = e.target.closest("[data-trailer]");
  if (trailerBtn) {
    openTrailer(trailerBtn.dataset.trailer);
  }
});

const menuBtn = document.querySelector(".menu-button");
const mobileNav = document.getElementById("mobile-nav");

function closeMobileMenu() {
  if (!menuBtn || !mobileNav) return;
  menuBtn.setAttribute("aria-expanded", "false");
  mobileNav.classList.remove("is-open");
}

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.classList.toggle("is-open", !isOpen);
  });

  mobileNav.addEventListener("click", (e) => {
    if (e.target.closest("a, button")) closeMobileMenu();
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) closeMobileMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });
}

// Validace formularu
function setFieldError(input, message) {
  input.classList.toggle("is-invalid", Boolean(message));
  const errorEl = document.getElementById(input.id + "-error");
  if (errorEl) errorEl.textContent = message;
}

function validateForm(form) {
  let firstInvalid = null;
  const fields = form.querySelectorAll("input, textarea");

  fields.forEach((input) => {
    if (input.disabled || input.closest("[hidden]") || input.type === "checkbox") return;

    let error = "";
    const value = input.value.trim();

    if (input.required && !value) {
      error = input.type === "email" ? "Vyplňte prosím e-mail." : "Toto pole je povinné.";
    } else if (input.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Zadejte platnou e-mailovou adresu.";
    } else if (input.minLength > 0 && value.length < input.minLength) {
      error = "Zadejte alespoň " + input.minLength + " znaků.";
    }

    setFieldError(input, error);
    if (error && !firstInvalid) firstInvalid = input;
  });

  if (firstInvalid) {
    firstInvalid.focus();
    return false;
  }
  return true;
}

document.addEventListener("input", (e) => {
  if (e.target.matches("input, textarea") && e.target.classList.contains("is-invalid")) {
    setFieldError(e.target, "");
  }
});

// Prihlaseni a registrace v localStorage (skolni projekt bez backendu)
const authTexts = {
  login: {
    title: "Přihlášení",
    description: "Přihlaste se ke svému účtu a spravujte své rezervace.",
    button: "Přihlásit se",
  },
  register: {
    title: "Registrace",
    description: "Vytvořte si účet v Kino klubu Obzor.",
    button: "Zaregistrovat se",
  },
  reset: {
    title: "Zapomenuté heslo",
    description: "Zadejte e-mail svého účtu.",
    button: "Obnovit heslo",
  },
};

let authMode = "login";

function openAuthModal(mode = "login") {
  authMode = mode;
  const dialog = document.getElementById("auth-dialog");
  const form = document.getElementById("auth-form");
  if (!dialog || !form) return;

  const isRegister = mode === "register";
  const isReset = mode === "reset";

  form.reset();
  dialog.querySelectorAll(".form-error").forEach((el) => (el.textContent = ""));
  form.querySelectorAll("input").forEach((el) => el.classList.remove("is-invalid"));

  document.getElementById("auth-name-field").hidden = !isRegister;
  document.getElementById("auth-name").required = isRegister;
  document.getElementById("auth-name").minLength = 2;

  document.getElementById("auth-confirm-field").hidden = !isRegister;
  document.getElementById("auth-confirm").required = isRegister;

  document.getElementById("auth-password-field").hidden = isReset;
  document.getElementById("auth-password").required = !isReset;

  document.querySelector(".forgot-button").hidden = mode !== "login";

  const text = authTexts[mode];
  document.getElementById("auth-title").textContent = text.title;
  document.getElementById("auth-description").textContent = text.description;
  document.getElementById("auth-submit").textContent = text.button;
  document.getElementById("auth-switch").innerHTML = isRegister
    ? 'Už máte účet? <button type="button" data-auth="login">Přihlaste se</button>'
    : 'Nemáte ještě účet? <button type="button" data-auth="register">Zaregistrujte se</button>';

  openDialog(dialog);
}

function updateHeaderAuth() {
  const user = getCurrentUser();
  const loginBtn = document.querySelector(".header-actions > .login-link");
  const regBtn = document.querySelector(".header-actions > .btn");
  if (!loginBtn || !regBtn) return;

  if (user) {
    loginBtn.removeAttribute("data-auth");
    loginBtn.querySelector("span").textContent = "Můj účet";
    loginBtn.onclick = () => {
      window.location.href = "ucet.html";
    };
    regBtn.hidden = true;
  } else {
    loginBtn.dataset.auth = "login";
    loginBtn.querySelector("span").textContent = "Přihlásit se";
    loginBtn.onclick = null;
    regBtn.hidden = false;
  }
}

const authForm = document.getElementById("auth-form");
if (authForm) {
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm(authForm)) return;

    const email = document.getElementById("auth-email").value.trim().toLowerCase();
    const password = document.getElementById("auth-password").value;
    const errorBox = document.getElementById("auth-error");

    if (authMode === "reset") {
      errorBox.textContent = "Projekt nemá připojený e-mailový server. Pro testování si prosím vytvořte nový účet.";
      return;
    }

    const users = loadStorage(STORAGE_KEYS.users, []);
    let user = null;

    if (authMode === "register") {
      const confirmInput = document.getElementById("auth-confirm");
      if (password !== confirmInput.value) {
        setFieldError(confirmInput, "Hesla se neshodují.");
        confirmInput.focus();
        return;
      }
      if (users.some((u) => u.email === email)) {
        setFieldError(document.getElementById("auth-email"), "Účet s tímto e-mailem už existuje.");
        return;
      }

      // Demo ucet ulozeny jen lokalne v localStorage
      user = {
        name: document.getElementById("auth-name").value.trim(),
        email: email,
        password: password,
      };
      users.push(user);
      saveStorage(STORAGE_KEYS.users, users);
    } else {
      user = users.find((u) => u.email === email);
      if (!user || user.password !== password) {
        errorBox.textContent = "Nesprávný e-mail nebo heslo.";
        return;
      }
    }

    saveStorage(STORAGE_KEYS.currentUser, { name: user.name, email: user.email }, true);

    document.getElementById("auth-dialog").close();
    authForm.reset();
    updateHeaderAuth();

    if (document.getElementById("account-root")) renderAccount();
    if (document.getElementById("booking-name")) {
      document.getElementById("booking-name").value = user.name;
      document.getElementById("booking-email").value = user.email;
    }

    showToast(authMode === "register" ? "Účet byl úspěšně vytvořen." : "Přihlášení proběhlo úspěšně.");
  });
}

updateHeaderAuth();

// Textova ukazka filmu (modal)
function openTrailer(id) {
  const movie = getMovieById(id);
  const dialog = document.getElementById("trailer-dialog");
  if (!movie || !dialog) return;

  document.getElementById("trailer-title").textContent = movie.title;
  const firstSentence = movie.description.split(".")[0] + ".";
  const scenes = [movie.kicker, firstSentence, "Vyberte si termín v programu kina."];
  let step = 0;

  function renderScene() {
    document.getElementById("trailer-content").innerHTML = `
      <div class="storyboard">
        <img src="${movie.backdrop}" alt="">
        <div class="storyboard-caption">
          <span class="section-label">${step + 1} / 3 · upoutávka</span>
          <h3>${escapeHtml(scenes[step])}</h3>
          <button type="button" class="btn" id="next-scene">
            ${step === 2 ? "Znovu přehrát" : "Další záběr"} ${arrowSvg}
          </button>
        </div>
      </div>
    `;
    document.getElementById("next-scene").addEventListener("click", () => {
      step = (step + 1) % scenes.length;
      renderScene();
    });
  }

  renderScene();
  openDialog(dialog);
}

// Uvodni stranka: hero slider a karusel plakatu
function initHome() {
  const track = document.getElementById("poster-track");
  if (!track) return;

  const cinemaMovies = movies.filter((m) => m.category === "kino");
  let posterIndex = 0;

  function renderPosters() {
    let html = "";
    for (let i = 0; i < 3; i++) {
      const movie = cinemaMovies[(posterIndex + i) % cinemaMovies.length];
      html += `
        <a class="film-card" href="film.html?id=${movie.id}">
          <div class="poster">
            <img src="${movie.image}" alt="${escapeHtml(movie.title)}" loading="lazy">
            <span class="tag">${movie.tag}</span>
          </div>
          <div class="film-card-meta">
            <div>
              <h3>${movie.title}</h3>
              <p>${movie.genre} · ${movie.length} min</p>
            </div>
            <span class="circle-arrow">${arrowSvg}</span>
          </div>
        </a>
      `;
    }
    track.innerHTML = html;
    track.scrollLeft = 0;
  }

  document.getElementById("poster-prev").addEventListener("click", () => {
    posterIndex = (posterIndex - 1 + cinemaMovies.length) % cinemaMovies.length;
    renderPosters();
  });

  document.getElementById("poster-next").addEventListener("click", () => {
    posterIndex = (posterIndex + 1) % cinemaMovies.length;
    renderPosters();
  });

  renderPosters();

  if (!document.querySelector(".hero")) return;

  // Prepinani hlavniho banneru
  const dots = Array.from(document.querySelectorAll("[data-hero]"));
  const heroBox = document.querySelector(".hero");
  const pauseBtn = document.getElementById("hero-pause");
  let currentSlide = 0;
  let paused = false;
  let hovered = false;

  function showSlide(index) {
    currentSlide = index;
    const movie = movies[index];
    const img = document.getElementById("hero-image");
    img.style.opacity = "0.25";
    setTimeout(() => {
      img.src = movie.backdrop;
      img.alt = movie.title;
      img.style.opacity = "0.94";
    }, 150);

    document.getElementById("hero-copy").textContent = movie.title + " — " + movie.kicker;
    document.getElementById("hero-tickets").href = "film.html?id=" + movie.id;
    document.getElementById("hero-trailer").dataset.trailer = movie.id;

    dots.forEach((btn, i) => {
      btn.setAttribute("aria-current", String(i === index));
    });
  }

  dots.forEach((btn) => {
    btn.addEventListener("click", () => {
      showSlide(Number(btn.dataset.hero));
    });
  });

  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      paused = !paused;
      pauseBtn.textContent = paused ? "Spustit" : "Pozastavit";
    });
  }

  if (heroBox) {
    heroBox.addEventListener("mouseenter", () => { hovered = true; });
    heroBox.addEventListener("mouseleave", () => { hovered = false; });
  }

  setInterval(() => {
    if (!paused && !hovered) {
      showSlide((currentSlide + 1) % dots.length);
    }
  }, 6500);
}

// Program kina a filtrovani
function initProgram() {
  const form = document.getElementById("program-filters");
  if (!form) return;

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = toDateString(tomorrowDate);

  const fromDate = parseDate(availableDays[0]).toLocaleDateString("cs-CZ");
  const toDate = parseDate(availableDays[availableDays.length - 1]).toLocaleDateString("cs-CZ");
  document.getElementById("program-period").textContent =
    "Výběr z programu pražských kin od " + fromDate + " do " + toDate + ".";

  if (todayStr > availableDays[availableDays.length - 1]) {
    document.getElementById("program-title").textContent = "Archiv programu";
  }

  const defaultDay = availableDays.includes(todayStr) ? todayStr : availableDays[0];
  const initialQuery = (urlParams.get("q") || "").slice(0, 80);
  const exactMatch = movies.find((m) => m.title.toLowerCase() === initialQuery.toLowerCase());

  let selectedCategory = exactMatch ? exactMatch.category : "kino";
  let selectedDay = availableDays.includes(urlParams.get("date")) ? urlParams.get("date") : defaultDay;
  let currentPage = 1;
  const perPage = 6;

  const dateInput = document.getElementById("filter-date");
  const searchInput = document.getElementById("film-search");
  const formatSelect = document.getElementById("filter-format");

  dateInput.min = availableDays[0];
  dateInput.max = availableDays[availableDays.length - 1];
  dateInput.value = selectedDay;
  searchInput.value = initialQuery;

  function getDayLabel(dayStr) {
    if (dayStr === todayStr) return "Dnes";
    if (dayStr === tomorrowStr) return "Zítra";
    return parseDate(dayStr).toLocaleDateString("cs-CZ", { weekday: "short" });
  }

  function getFormatBadge(show) {
    if (show.format === "4DX 2D") return "4DX";
    if (show.format === "3D") return "3D";
    if (show.language === "Český dabing") return "DAB";
    if (show.language === "České titulky") return "TIT";
    if (show.language === "České znění") return "CZ";
    return show.format;
  }

  function renderDays() {
    const container = document.getElementById("program-days");
    container.innerHTML = availableDays
      .map((dayStr) => {
        const d = parseDate(dayStr);
        return `
          <button type="button" class="day" data-day="${dayStr}" aria-pressed="${dayStr === selectedDay}">
            <span>${getDayLabel(dayStr)}</span>
            <strong>${d.getDate()}. ${d.getMonth() + 1}.</strong>
          </button>
        `;
      })
      .join("");

    document.querySelectorAll(".segmented button").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.category === selectedCategory));
    });
  }

  function renderProgram() {
    const query = searchInput.value.trim().toLowerCase();
    const format = formatSelect.value;

    const matching = screenings
      .filter((show) => {
        const movie = getMovieById(show.filmId);
        return (
          show.day === selectedDay &&
          movie.category === selectedCategory &&
          (!format || show.format === format) &&
          movie.title.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => a.time.localeCompare(b.time));

    // Seskupeni projekci podle filmu, aby byl kazdy film v dany den jen jednou
    const grouped = [];
    const byFilm = {};

    for (const show of matching) {
      if (!byFilm[show.filmId]) {
        byFilm[show.filmId] = {
          movie: getMovieById(show.filmId),
          shows: [],
        };
        grouped.push(byFilm[show.filmId]);
      }
      byFilm[show.filmId].shows.push(show);
    }

    const totalPages = Math.ceil(grouped.length / perPage);
    if (currentPage > totalPages) currentPage = Math.max(1, totalPages);

    const count = grouped.length;
    const countLabel =
      selectedCategory === "kino"
        ? count === 1 ? "film" : count >= 2 && count <= 4 ? "filmy" : "filmů"
        : count === 1 ? "událost" : count >= 2 && count <= 4 ? "události" : "událostí";

    document.getElementById("results-info").textContent =
      count > 0
        ? formatLongDate(selectedDay) + " · " + count + " " + countLabel + " (" + matching.length + " promítání)"
        : formatLongDate(selectedDay) + " · 0 promítání";

    const listEl = document.getElementById("screening-list");
    if (grouped.length === 0) {
      listEl.innerHTML = `
        <div class="empty-state">
          <h3>Nic jsme nenašli</h3>
          <p class="muted">Pro zadaný filtr nemáme žádnou projekci. Zkuste jiný den nebo zrušte filtry.</p>
          <button type="button" class="btn btn-ghost" id="reset-filters">Vymazat filtry</button>
        </div>
      `;
      document.getElementById("reset-filters").addEventListener("click", () => {
        searchInput.value = "";
        formatSelect.value = "";
        formatSelect.disabled = false;
        selectedCategory = "kino";
        selectedDay = defaultDay;
        dateInput.value = selectedDay;
        currentPage = 1;
        renderDays();
        renderProgram();
      });
    } else {
      const pageItems = grouped.slice((currentPage - 1) * perPage, currentPage * perPage);
      listEl.innerHTML = pageItems
        .map(({ movie, shows }) => {
          const timesHtml = shows
            .map((show) => {
              const formatClass =
                show.format === "4DX 2D" ? " is-4dx" : show.format === "3D" ? " is-3d" : "";
              const info = show.venue + " · Sál " + show.hall + " · " + show.format + " · " + show.language;
              return `
                <a class="time-chip${formatClass}" href="rezervace.html?show=${show.id}" title="${escapeHtml(info)}">
                  <span>${show.time}</span>
                  <small>${getFormatBadge(show)}</small>
                </a>
              `;
            })
            .join("");

          const mainLink =
            shows.length === 1
              ? `rezervace.html?show=${shows[0].id}`
              : `film.html?id=${movie.id}#show-options`;
          const buttonText = shows.length === 1 ? "Vstupenky" : "Detail filmu";

          return `
            <article class="screening">
              <a class="screening-thumb" href="film.html?id=${movie.id}">
                <img src="${movie.image}" alt="${escapeHtml(movie.title)}" loading="lazy">
              </a>
              <div class="screening-info">
                <h3><a href="film.html?id=${movie.id}">${movie.title}</a></h3>
                <p class="screening-sub">
                  <span>${movie.genre}</span>
                  <span>·</span>
                  <span>${movie.length} min</span>
                  <span class="age">${movie.age}</span>
                </p>
                <p class="show-times-label">Promítáme (${shows.length}×) – kliknutím na čas vyberete sedadla:</p>
                <div class="show-times">${timesHtml}</div>
              </div>
              <div class="screening-buy">
                <strong>od ${formatPrice(movie.price)}</strong>
                <a class="btn" href="${mainLink}">
                  ${buttonText} ${arrowSvg}
                </a>
              </div>
            </article>
          `;
        })
        .join("");
    }

    // Strankovani
    const paginationEl = document.getElementById("program-pagination");
    if (totalPages <= 1) {
      paginationEl.innerHTML = "";
    } else {
      let pagHtml = "";
      for (let i = 1; i <= totalPages; i++) {
        const active = i === currentPage ? ' aria-current="page"' : "";
        pagHtml += `<button type="button" data-page="${i}"${active}>${i}</button>`;
      }
      paginationEl.innerHTML = pagHtml;
    }
  }

  document.getElementById("program-days").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-day]");
    if (!btn) return;
    selectedDay = btn.dataset.day;
    dateInput.value = selectedDay;
    currentPage = 1;
    renderDays();
    renderProgram();
  });

  document.querySelectorAll(".segmented button").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedCategory = btn.dataset.category;
      formatSelect.value = "";
      formatSelect.disabled = selectedCategory !== "kino";
      currentPage = 1;
      renderDays();
      renderProgram();
    });
  });

  form.addEventListener("submit", (e) => e.preventDefault());

  searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderProgram();
  });

  formatSelect.addEventListener("change", () => {
    currentPage = 1;
    renderProgram();
  });

  dateInput.addEventListener("change", () => {
    if (!availableDays.includes(dateInput.value)) {
      dateInput.value = selectedDay;
      showToast("Vyberte prosím datum ze zveřejněného programu.");
      return;
    }
    selectedDay = dateInput.value;
    currentPage = 1;
    renderDays();
    renderProgram();
  });

  document.getElementById("open-calendar").addEventListener("click", () => {
    if (dateInput.showPicker) {
      dateInput.showPicker();
    } else {
      dateInput.focus();
    }
  });

  document.getElementById("program-pagination").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-page]");
    if (!btn) return;
    currentPage = Number(btn.dataset.page);
    renderProgram();
    document.getElementById("program-title").scrollIntoView({ behavior: "smooth" });
  });

  formatSelect.disabled = selectedCategory !== "kino";
  renderDays();
  renderProgram();
}

// Detail filmu
function initFilmDetail() {
  const root = document.getElementById("film-root");
  if (!root) return;

  const movie = getMovieById(urlParams.get("id"));
  if (!movie) {
    root.innerHTML = `
      <div class="empty-state">
        <h1>Film nebyl nalezen</h1>
        <p class="lead muted">Odkaz na film není platný. Vraťte se zpět do programu.</p>
        <a class="btn" href="program.html">Zpět do programu</a>
      </div>
    `;
    return;
  }

  document.title = movie.title + " | Kino Obzor";
  document.getElementById("film-breadcrumb").textContent = movie.title;

  const movieShows = screenings.filter((s) => s.filmId === movie.id);
  const upcoming = movieShows.filter((s) => s.day >= todayStr);
  const shownList = (upcoming.length > 0 ? upcoming : movieShows).slice(0, 6);

  root.innerHTML = `
    <section class="detail-hero">
      <img src="${movie.backdrop}" alt="${escapeHtml(movie.title)}">
      <div class="detail-title">
        <span class="tag tag-accent">${movie.tag}</span>
        <h1>${movie.title}</h1>
        <p class="screening-sub">
          <span>${movie.genre}</span>
          <span>·</span>
          <span>${movie.length} min</span>
          <span>·</span>
          <span>${movie.year}</span>
          <span class="tag">${movie.age}</span>
        </p>
        <div class="hero-actions">
          <a href="#show-options" class="btn">Vybrat projekci ${arrowSvg}</a>
          <button type="button" class="btn btn-light" data-trailer="${movie.id}">Filmová ukázka</button>
        </div>
      </div>
    </section>

    <div class="detail-grid">
      <div>
        <section>
          <span class="section-label muted">${movie.kicker}</span>
          <h2>O filmu</h2>
          <p>${movie.description}</p>
        </section>
        <section class="show-options" id="show-options">
          <h2>Nejbližší termíny</h2>
          ${shownList
            .map(
              (show) => `
              <div class="show-option">
                <div>
                  <strong>${formatShortDate(show.day)} · ${show.time}</strong>
                  <p>
                    ${show.venue} · sál ${show.hall} ·
                    ${movie.category === "kino" ? show.format + " · " + show.language : "Živé vystoupení"}
                  </p>
                </div>
                <a class="btn" href="rezervace.html?show=${show.id}">
                  ${formatPrice(movie.price)} ${arrowSvg}
                </a>
              </div>
            `
            )
            .join("")}
          <a class="text-link section-gap" href="program.html?q=${encodeURIComponent(movie.title)}&amp;date=${shownList[0].day}">
            Zobrazit všechny termíny ${arrowSvg}
          </a>
        </section>
      </div>

      <aside class="info-card">
        <h2>Informace</h2>
        <dl class="film-info">
          <dt>${movie.category === "kino" ? "Režie" : "Účinkující"}</dt>
          <dd>${movie.director}</dd>
          <dt>Obsazení</dt>
          <dd>${movie.cast}</dd>
          <dt>Délka</dt>
          <dd>${movie.length} minut</dd>
          <dt>Přístupnost</dt>
          <dd>${movie.age === "Vše" ? "Bez omezení" : "Od " + movie.age.replace("+", "") + " let"}</dd>
          <dt>Vstupné</dt>
          <dd>od ${formatPrice(movie.price)}</dd>
        </dl>
        <p class="demo-note film-note">
          Ceny a rezervace sedadel slouží pro ukázku studentského projektu.
        </p>
      </aside>
    </div>
  `;
}

// Rezervace sedadel
const occupiedPresets = [
  ["B4", "B5", "C5", "C6", "D3", "D4", "D5", "E6", "E7", "F4", "F5"],
  ["A5", "A6", "C3", "C4", "D6", "D7", "D8", "E4", "E5", "G5", "G6"],
  ["B2", "B3", "C6", "C7", "D4", "D5", "E3", "E4", "F6", "F7", "F8"],
  ["C4", "C5", "C6", "D5", "D6", "E5", "E6", "F3", "F4", "G4", "G5"],
];

function getOccupiedSeats(showId) {
  const presetIndex = showId.length % occupiedPresets.length;
  const seats = [...occupiedPresets[presetIndex]];

  const bookings = getAllBookings();
  for (const booking of bookings) {
    if (booking.showId === showId) {
      for (const s of booking.seats) {
        if (!seats.includes(s)) seats.push(s);
      }
    }
  }
  return seats;
}

function showBookingConfirmation(booking) {
  const movie = getMovieById(booking.filmId);
  document.title = "Rezervace potvrzena | Kino Obzor";
  document.getElementById("booking-root").innerHTML = `
    <section class="booking-success">
      <div class="success-icon">✓</div>
      <span class="section-label">Rezervace dokončena</span>
      <h2>Vaše místa jsou rezervována</h2>
      <p class="muted confirmation-copy">
        Rezervace byla uložena do prohlížeče. Potvrzení si můžete vytisknout nebo uložit jako PDF.
      </p>
      <div class="ticket">
        <span class="section-label muted">Vstupenka</span>
        <h3>${movie ? movie.title : escapeHtml(booking.filmTitle)}</h3>
        <p>${formatShortDate(booking.day)} · ${booking.time} · ${escapeHtml(booking.venue)} · sál ${escapeHtml(booking.hall)}</p>
        <p>Sedadla: <strong>${escapeHtml(booking.seats.join(", "))}</strong></p>
        <p>Na jméno: ${escapeHtml(booking.name)}</p>
        <p>Celkem: <strong>${formatPrice(booking.total)}</strong></p>
        <div class="ticket-code">${escapeHtml(booking.code)}</div>
        <p class="demo-note">Testovací rezervace · Není platnou vstupenkou</p>
      </div>
      <div class="action-row">
        <button type="button" class="btn" id="print-booking">Vytisknout potvrzení</button>
        <a class="btn btn-light" href="program.html">Zpět do programu</a>
      </div>
    </section>
  `;
  document.getElementById("print-booking").addEventListener("click", () => window.print());
}

function initBooking() {
  const root = document.getElementById("booking-root");
  if (!root) return;

  const show = screenings.find((s) => s.id === urlParams.get("show"));
  if (!show) {
    root.innerHTML = `
      <div class="empty-state">
        <h2>Projekce nebyla nalezena</h2>
        <p class="muted error-copy">Vyberte si prosím termín přímo v programu kina.</p>
        <a class="btn" href="program.html">Přejít na program</a>
      </div>
    `;
    return;
  }

  const movie = getMovieById(show.filmId);
  let selectedSeats = [];
  const user = getCurrentUser();

  root.innerHTML = `
    <div class="booking-grid">
      <section class="seat-panel">
        <h2 class="seat-title">${movie.title}</h2>
        <p class="muted seat-details">
          ${formatShortDate(show.day)} · ${show.time} · ${show.venue} · sál ${show.hall} · ${show.format}
        </p>
        <div class="steps">
          <span class="active"><b>1</b> Vyberte místa</span>
          <span><b>2</b> Doplňte údaje</span>
          <span><b>3</b> Potvrďte rezervaci</span>
        </div>
        <div class="cinema-screen screen-gap">PLÁTNO / PÓDIUM</div>
        <div id="seats" class="seats"></div>
        <div class="seat-legend">
          <span><i class="seat-key"></i> Volné</span>
          <span><i class="seat-key selected"></i> Váš výběr</span>
          <span><i class="seat-key occupied"></i> Obsazené</span>
        </div>
        <p class="demo-note centered-note">Kliknutím označíte sedadla (maximálně 8 míst).</p>
      </section>

      <aside class="booking-summary">
        <h2>Souhrn rezervace</h2>
        <div class="summary-line">
          <span>Vstupné za osobu</span>
          <strong>${formatPrice(movie.price)}</strong>
        </div>
        <div class="summary-line">
          <span>Vybraná místa</span>
          <strong id="selected-seats">Zatím žádná</strong>
        </div>
        <div class="summary-line total">
          <span>Celkem</span>
          <span id="total-price">${formatPrice(0)}</span>
        </div>
        <form id="booking-form" novalidate>
          <div class="form-field">
            <label for="booking-name">Jméno a příjmení *</label>
            <input id="booking-name" required minlength="2" maxlength="80" value="${escapeHtml(user ? user.name : "")}">
            <span class="form-error" id="booking-name-error"></span>
          </div>
          <div class="form-field">
            <label for="booking-email">E-mail *</label>
            <input id="booking-email" type="email" required maxlength="120" value="${escapeHtml(user ? user.email : "")}">
            <span class="form-error" id="booking-email-error"></span>
          </div>
          <label class="check-label">
            <input id="booking-consent" type="checkbox" required>
            <span>Souhlasím s uložením testovací rezervace v prohlížeči.</span>
          </label>
          <div class="form-error full-width" id="booking-error"></div>
          <button class="btn full-width button-gap" type="submit">
            Potvrdit rezervaci ${arrowSvg}
          </button>
          <p class="demo-note">Nezadávají se žádné platební údaje.</p>
        </form>
      </aside>
    </div>
  `;

  function renderSeats() {
    const occupied = getOccupiedSeats(show.id);
    const rows = "ABCDEFGH";
    let html = "";

    for (const row of rows) {
      html += `<span class="row-label">${row}</span>`;
      for (let num = 1; num <= 10; num++) {
        const code = row + num;
        const isOccupied = occupied.includes(code);
        html += `
          <button
            type="button"
            class="seat"
            data-seat="${code}"
            aria-pressed="${selectedSeats.includes(code)}"
            ${isOccupied ? "disabled" : ""}
          >${num}</button>
        `;
      }
    }
    document.getElementById("seats").innerHTML = html;
  }

  function updateSummary() {
    const sorted = [...selectedSeats].sort();
    document.getElementById("selected-seats").textContent = sorted.length ? sorted.join(", ") : "Zatím žádná";
    document.getElementById("total-price").textContent = formatPrice(selectedSeats.length * movie.price);
  }

  renderSeats();

  document.getElementById("seats").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-seat]");
    if (!btn || btn.disabled) return;

    const seat = btn.dataset.seat;
    if (selectedSeats.includes(seat)) {
      selectedSeats = selectedSeats.filter((s) => s !== seat);
    } else if (selectedSeats.length < 8) {
      selectedSeats.push(seat);
    } else {
      showToast("Najednou můžete vybrat nejvýše 8 sedadel.");
      return;
    }

    btn.setAttribute("aria-pressed", String(selectedSeats.includes(seat)));
    updateSummary();
    document.getElementById("booking-error").textContent = "";
  });

  document.getElementById("booking-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const errorBox = document.getElementById("booking-error");

    if (selectedSeats.length === 0) {
      errorBox.textContent = "Vyberte prosím alespoň jedno volné sedadlo.";
      return;
    }
    if (!validateForm(e.currentTarget)) return;

    if (!document.getElementById("booking-consent").checked) {
      errorBox.textContent = "Potvrďte prosím souhlas pod formulářem.";
      return;
    }

    const code = "OB-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newBooking = {
      code: code,
      showId: show.id,
      filmId: movie.id,
      filmTitle: movie.title,
      venue: show.venue,
      day: show.day,
      time: show.time,
      hall: show.hall,
      seats: [...selectedSeats].sort(),
      name: document.getElementById("booking-name").value.trim(),
      email: document.getElementById("booking-email").value.trim().toLowerCase(),
      total: selectedSeats.length * movie.price,
      createdAt: new Date().toISOString(),
    };

    const allBookings = getAllBookings();
    allBookings.push(newBooking);
    saveStorage(STORAGE_KEYS.bookings, allBookings);
    showBookingConfirmation(newBooking);
  });
}

// Profil a sprava rezervaci
function renderAccount() {
  const heading = document.getElementById("account-heading");
  const root = document.getElementById("account-root");
  if (!heading || !root) return;

  const user = getCurrentUser();
  if (!user) {
    heading.innerHTML = `
      <span class="section-label">Kino klub Obzor</span>
      <h1>Moje rezervace</h1>
    `;
    root.innerHTML = `
      <section class="empty-state">
        <h2>Nejdříve se přihlaste</h2>
        <p class="muted account-intro">
          Po přihlášení se zobrazí všechny rezervace vytvořené na váš e-mail.
        </p>
        <div class="action-row">
          <button type="button" class="btn" data-auth="login">Přihlásit se</button>
          <button type="button" class="btn btn-ghost" data-auth="register">Vytvořit účet</button>
        </div>
      </section>
    `;
    return;
  }

  const myBookings = getAllBookings()
    .filter((r) => r.email === user.email)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  heading.innerHTML = `
    <div class="account-top">
      <div>
        <span class="section-label">Váš profil</span>
        <h1>Ahoj, ${escapeHtml(user.name)}</h1>
        <p class="lead muted">${escapeHtml(user.email)} · Přehled vašich rezervací</p>
      </div>
      <button type="button" class="btn btn-ghost" id="logout">Odhlásit se</button>
    </div>
  `;

  root.innerHTML = `
    <h2 class="bookings-title">Moje rezervace <span class="muted">(${myBookings.length})</span></h2>
    ${
      myBookings.length > 0
        ? `<div class="reservations">
            ${myBookings
              .map((r) => {
                const movie = getMovieById(r.filmId);
                const title = movie ? movie.title : r.filmTitle || "Rezervace";
                return `
                  <article class="reservation-card">
                    <img src="${movie ? movie.image : "assets/img/kino.webp"}" alt="">
                    <div>
                      <h3>${escapeHtml(title)}</h3>
                      <p>${formatShortDate(r.day)} · ${r.time} · ${escapeHtml(r.venue || "Kino Obzor")} · sál ${escapeHtml(r.hall)}</p>
                      <p>Sedadla ${escapeHtml(r.seats.join(", "))} · ${formatPrice(r.total)}</p>
                    </div>
                    <div>
                      <code>${escapeHtml(r.code)}</code>
                      <button type="button" class="btn btn-ghost button-gap" data-cancel="${escapeHtml(r.code)}">
                        Zrušit rezervaci
                      </button>
                    </div>
                  </article>
                `;
              })
              .join("")}
          </div>`
        : `<section class="empty-state">
            <h3>Zatím nemáte žádné rezervace.</h3>
            <p class="muted">Vyberte si film v programu a rezervujte si svá místa.</p>
            <a class="btn" href="program.html">Prohlédnout program</a>
          </section>`
    }
    <p class="notice">
      Účet a rezervace jsou uložené lokálně v tomto prohlížeči (localStorage).
    </p>
  `;

  document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.removeItem(STORAGE_KEYS.currentUser);
    updateHeaderAuth();
    renderAccount();
    showToast("Byli jste odhlášeni.");
  });
}

function initAccount() {
  const root = document.getElementById("account-root");
  if (!root) return;

  renderAccount();

  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cancel]");
    if (!btn) return;
    const code = btn.dataset.cancel;
    const dialog = document.getElementById("confirm-dialog");
    openDialog(dialog);

    document.getElementById("confirm-cancel").onclick = () => {
      const user = getCurrentUser();
      if (!user) return;
      const remaining = getAllBookings().filter((r) => !(r.code === code && r.email === user.email));
      saveStorage(STORAGE_KEYS.bookings, remaining);
      dialog.close();
      renderAccount();
      showToast("Rezervace byla zrušena.");
    };
  });
}

// Kontaktni formular
function initContact() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;
    document.getElementById("contact-result").innerHTML = `
      <p class="notice">
        Formulář byl úspěšně zkontrolován. V klientském projektu bez backendu se zpráva neodesílá.
      </p>
    `;
    form.reset();
  });
}

// Plynule zobrazeni sekci pri skrolovani
function initScrollAnimations() {
  const elements = document.querySelectorAll(".club-banner, .snack-card, .benefit, .info-card, .snack-hero");
  if (!("IntersectionObserver" in window) || elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
}

// Spusteni skriptu podle aktivni stranky
initHome();
initProgram();
initFilmDetail();
initBooking();
initAccount();
initContact();
initScrollAnimations();

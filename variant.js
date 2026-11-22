(() => {
  const {films, days, screenings} = window.KinoData;
  const movies = films.filter(film => film.category === 'kino');
  const byId = new Map(movies.map(film => [film.id, film]));
  const get = id => document.getElementById(id);
  const calendar = get('calendar'), format = get('format'), film = get('film');
  let start = days[0], page = 1;
  const date = day => new Date(day + 'T12:00:00');
  const longDay = day => date(day).toLocaleDateString('cs-CZ',{weekday:'long',day:'numeric',month:'numeric'});
  calendar.min = days[0]; calendar.max = days.at(-1);
  movies.forEach(movie => film.add(new Option(movie.title,movie.id)));
  function render() {
    calendar.value = start;
    const week = Math.floor(days.indexOf(start)/7)*7;
    get('day-tabs').innerHTML = days.slice(week,week+7).map(day => {
      const label = day === days[0] ? 'Dnes' : date(day).toLocaleDateString('cs-CZ',{weekday:'short'});
      return '<button data-day="'+day+'" aria-label="'+longDay(day)+'" aria-pressed="'+(day===start)+'">'+label.charAt(0).toUpperCase()+label.slice(1)+'</button>';
    }).join('');
    const groups = new Map();
    for (const show of screenings) {
      if (show.day < start || !byId.has(show.filmId) || (film.value && show.filmId !== film.value) || (format.value && show.format !== format.value)) continue;
      const key = [show.day,show.filmId,show.hall,show.format,show.language].join('/');
      if (!groups.has(key)) groups.set(key,[]);
      groups.get(key).push(show);
    }
    const rows = [...groups.values()];
    const count = Math.ceil(rows.length/3);
    let previous = '';
    get('lineup').innerHTML = rows.slice((page-1)*3,page*3).map(shows => {
      const show=shows[0], movie=byId.get(show.filmId), detail='film.html?id='+movie.id;
      const heading = previous===show.day ? '' : '<h2 class="day-heading">'+longDay(show.day)+'</h2>';
      previous=show.day;
      const times=shows.map(s=>'<a class="btn" aria-label="Vstupenky na '+movie.title+' v '+s.time+'" href="rezervace.html?show='+s.id+'">'+s.time+'<small>Vstupenky</small></a>').join('');
      return heading+'<article class="show-row"><a href="'+detail+'" aria-label="'+movie.title+'"><img src="assets/'+movie.image+'" alt=""></a><div><h3><a href="'+detail+'">'+movie.title+'</a></h3><p>'+movie.genre+' · '+movie.length+' min</p><p>'+show.format+' projekce · '+show.language+' · Sál '+show.hall+'</p><div class="times">'+times+'</div></div></article>';
    }).join('') || '<p>Pro vybranou kombinaci není v programu žádná projekce.</p>';
    const button = (p,label,desc) => '<button data-page="'+p+'" aria-label="'+desc+'" '+(p===page?'aria-current="page"':'')+' '+(p<1||p>count?'disabled':'')+'>'+label+'</button>';
    const numbers = [...new Set([1,...[page-1,page,page+1,2,3].filter(n=>n>0&&n<=count),count])].sort((a,b)=>a-b);
    get('pages').innerHTML = count<2?'':button(page-1,'‹','Předchozí strana')+numbers.map((n,i)=>(i&&n-numbers[i-1]>1?' … ':'')+button(n,n,'Strana '+n)).join('')+button(page+1,'›','Další strana');
  }
  get('day-tabs').onclick = e => {if(e.target.dataset.day){start=e.target.dataset.day;page=1;render();}};
  calendar.onchange = () => {if(days.includes(calendar.value)) start=calendar.value;page=1;render();};
  format.onchange = film.onchange = () => {page=1;render();};
  get('pages').onclick = e => {if(e.target.dataset.page){page=Number(e.target.dataset.page);render();}};
  render();
})();

/* Ukázková data studentského projektu. Žádný požadavek na externí API. */
window.KinoData = (() => {
  const films = [
    { id:'za-hranici-svetla', title:'Za hranicí světla', kicker:'Vesmír je teprve začátek.', genre:'Sci-fi / Dobrodružný', length:142, age:'12+', year:2026, image:'vesmir.jpg', color:'space', director:'Adam Novotný', cast:'Tereza Černá, Daniel Vávra, Jakub Mareš', description:'Jedna zpráva ze vzdálené galaxie změní všechno. Astronautka Eva opouští Zemi, aby našla odpověď na otázku, kterou si lidstvo pokládá odjakživa. Na cestě za hranice známého vesmíru ale zjišťuje, že ty největší objevy se někdy odehrávají uvnitř nás.', category:'kino', tag:'Premiéra', price:189 },
    { id:'posledni-leto', title:'Poslední léto', kicker:'Některé chvíle zůstávají.', genre:'Drama / Romantický', length:108, age:'12+', year:2026, image:'leto.jpg', color:'summer', director:'Klára Malá', cast:'Anna Dvořáková, Matěj Beneš, Eva Holá', description:'Malé město, nekonečně dlouhé večery a jedno léto, které nikdo nechce nechat skončit. Tři kamarádi se před odchodem na vysokou školu vrací na místo svého dětství. Příběh o přátelství, prvních láskách a odvaze udělat krok do neznáma.', category:'kino', tag:'Český film', price:169 },
    { id:'mesto-v-rytmu', title:'Město v rytmu', kicker:'Každá ulice má svůj příběh.', genre:'Hudební / Komedie', length:116, age:'Vše', year:2026, image:'mesto.jpg', color:'city', director:'Marek Veselý', cast:'Nela Procházková, Filip Kučera, Ondřej Král', description:'Pouliční hudebnice a noční řidič se potkají ve městě, které nikdy nespí. Z náhodného setkání vznikne kapela, přátelství a plán, který je dost bláznivý na to, aby vyšel. Film plný hudby a malých radostí všedního dne.', category:'kino', tag:'Náš tip', price:179 },
    { id:'velke-male-dobrodruzstvi', title:'Velké malé dobrodružství', kicker:'Odvaha nemá velikost.', genre:'Rodinný / Dobrodružný', length:94, age:'Vše', year:2026, image:'hory.jpg', color:'nature', director:'Petra Zelená', cast:'Eliška Svobodová, Tomáš Hájek', description:'Dva sourozenci najdou na půdě starou mapu a vydají se na výpravu za zapomenutou horskou chatou. Cestou je čeká nečekaný pomocník, záhadné stopy a největší prázdninové dobrodružství. Rodinný příběh pro malé i velké objevitele.', category:'kino', tag:'Pro celou rodinu', price:149 },
    { id:'vecer-na-male-scene', title:'Večer na malé scéně', kicker:'Tak blízko příběhu.', genre:'Divadelní komedie', length:100, age:'12+', year:2026, image:'kino.jpg', color:'stage', director:'Lucie Horáková', cast:'Divadelní soubor Na obzoru', description:'Co se stane, když se obyvatelé jednoho domu rozhodnou uspořádat společnou večeři? Komorní divadelní komedie o sousedech, tajemstvích a věcech, které je lepší říct nahlas. Živé představení přímo v našem malém sále.', category:'divadlo', tag:'Živě na scéně', price:249 },
    { id:'jazz-pod-obzorem', title:'Jazz pod Obzorem', kicker:'Večer, který má rytmus.', genre:'Jazzový koncert', length:90, age:'Vše', year:2026, image:'mesto.jpg', color:'jazz', director:'Obzor Quartet', cast:'Klavír, kontrabas, bicí, saxofon', description:'Zhasneme světla, rozsvítíme pódium. Obzor Quartet přináší večer jazzových standardů i vlastních skladeb. Pohodlně se usaďte a nechte se na chvíli unést jen hudbou. Živý koncert v příjemné atmosféře našeho kina.', category:'koncert', tag:'Živá hudba', price:229 }
  ];
  function dateKey(date) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
  const today = new Date(); today.setHours(12,0,0,0);
  const days = Array.from({length:28}, (_,i) => { const d=new Date(today); d.setDate(d.getDate()+i); return dateKey(d); });
  const screenings = days.flatMap((day,i) => {
    const bill = i % 2 === 0
      ? [[0,'17:00',1,'3D'],[1,'18:15',2,'2D'],[1,'20:30',2,'2D']]
      : [[2,'10:30',1,'2D'],[2,'14:30',1,'2D'],[2,'18:00',1,'2D'],[3,'16:00',2,'2D']];
    bill.push([i % 2 ? 4 : 5,'19:00',3,'2D']);
    return bill.map(([index,time,hall,format],j) => ({id:day+'-'+j,day,filmId:films[index].id,time,hall,format,language:index===1?'České titulky':'České znění'}));
  });
  return {films,screenings,days,dateKey};
})();

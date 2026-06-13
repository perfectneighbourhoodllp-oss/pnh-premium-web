/* AUTO-GENERATED from index.html — verbatim homepage logic. */

let lenis=null;
function goTo(t){ if(!t) return; if(lenis) lenis.scrollTo(t,{offset:0,duration:1.3}); else t.scrollIntoView({behavior:'smooth'}); }
const prefersReduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP=(typeof gsap!=='undefined' && typeof ScrollTrigger!=='undefined');

const RESIDENCES=window.PROPERTIES;
const _LEGACY=[
  {name:"Prestige Golfshire",loc:"Nandi Hills, Devanahalli",developer:"Prestige Group",type:"villa",status:"invite",facing:"North",sqft:"8,120–9,905",entry:"12.9",range:"₹12.9 – 36 Cr",hi:["15 min to Kempegowda Int'l Airport","At the foot of Nandi Hills, on a private lake"],tags:["Hills-facing","Lakefront","Golf"],img:"1600596542815-ffad4c1539a9",lat:13.370,lng:77.683},
  {name:"Embassy Boulevard",loc:"Sarjapur Road",developer:"Embassy Group",type:"villa",status:"ready",facing:"East",sqft:"4,400–6,400",entry:"14.5",range:"₹14.5 – 22 Cr",hi:["25 min to ORR tech corridor","Gated villa community with clubhouse"],tags:["Gated","Clubhouse","Smart Home"],img:"1613490493576-7fde63acd811",lat:12.901,lng:77.689},
  {name:"Embassy Lake Terraces",loc:"Hebbal",developer:"Embassy Group",type:"apartment",status:"ready",facing:"North-East",sqft:"3,500–5,100",entry:"11.2",range:"₹11.2 – 18 Cr",hi:["10 min to Manyata Tech Park","Overlooking Hebbal Lake"],tags:["Lake View","Sky Lounge","Concierge"],img:"1545324418-cc1a3fa10c00",lat:13.041,lng:77.591},
  {name:"Embassy Springs — The Grove",loc:"Devanahalli",developer:"Embassy Group",type:"plot",status:"ready",facing:"East",sqft:"6,000–9,000",entry:"8.6",range:"₹8.6 – 14 Cr",hi:["12 min to International Airport","Plotted enclave in a 288-acre township"],tags:["Plotted","Greenway","Township"],img:"",lat:13.249,lng:77.711},
  {name:"Godrej Reserve",loc:"Devanahalli",developer:"Godrej Properties",type:"plot",status:"ready",facing:"North",sqft:"4,800–7,800",entry:"9.1",range:"₹9.1 – 13 Cr",hi:["14 min to International Airport","Bordering a reserved forest edge"],tags:["Forest Edge","Plotted","Gated"],img:"1505691938895-1758d7feb511",lat:13.231,lng:77.706},
  {name:"Prestige Dew Drops",loc:"Whitefield",developer:"Prestige Group",type:"villa",status:"ready",facing:"West",sqft:"5,200–6,900",entry:"13.8",range:"₹13.8 – 19 Cr",hi:["8 min to Whitefield ITPL","Private-pool villas with gardens"],tags:["Private Pool","Garden","Gated"],img:"1564013799919-ab600027ffc6",lat:12.969,lng:77.749},
  {name:"Brigade Orchards — Signature",loc:"Devanahalli",developer:"Brigade Group",type:"villa",status:"invite",facing:"North-East",sqft:"6,100–8,100",entry:"16.4",range:"₹16.4 – 24 Cr",hi:["12 min to International Airport","Smart villas within a sports township"],tags:["Smart Home","Orchard","Sports"],img:"",lat:13.227,lng:77.717},
  {name:"Bhartiya City — Leela",loc:"Thanisandra",developer:"Bhartiya Urban",type:"apartment",status:"ready",facing:"East",sqft:"3,200–4,800",entry:"10.5",range:"₹10.5 – 16 Cr",hi:["15 min to Manyata Tech Park","Leela-serviced city-within-a-city"],tags:["Leela Serviced","Township","Sky Deck"],img:"",lat:13.063,lng:77.625},
  {name:"Prestige White Meadows",loc:"Whitefield",developer:"Prestige Group",type:"villa",status:"invite",facing:"North",sqft:"7,000–9,400",entry:"19.2",range:"₹19.2 – 28 Cr",hi:["10 min to Whitefield ITPL","Mature, tree-lined gated estate"],tags:["Gated","Mature Trees","Clubhouse"],img:"1568605114967-8130f3a36994",lat:12.958,lng:77.726},
  {name:"Total Environment — Rhapsody",loc:"Whitefield",developer:"Total Environment",type:"villa",status:"ready",facing:"East",sqft:"5,400–7,200",entry:"15.1",range:"₹15.1 – 21 Cr",hi:["12 min to Whitefield","Architect-series homes, terrace gardens"],tags:["Architect Series","Terrace Garden","Bespoke"],img:"",lat:12.989,lng:77.741},
  {name:"Embassy Grove",loc:"Koramangala",developer:"Embassy Group",type:"villa",status:"sold",facing:"North-West",sqft:"6,600–8,800",entry:"22.0",range:"₹22 – 30 Cr",hi:["Central Koramangala address","Gated villas in the heart of the city"],tags:["Central","Gated","Private Lift"],img:"1600585154340-be6161a56a0c",lat:12.935,lng:77.626},
  {name:"Adarsh Palm Retreat",loc:"Bellandur",developer:"Adarsh Developers",type:"villa",status:"ready",facing:"East",sqft:"6,000–8,000",entry:"17.6",range:"₹17.6 – 24 Cr",hi:["10 min to Outer Ring Road","Lakeside villas with a clubhouse"],tags:["Lakeside","Clubhouse","Gated"],img:"1512917774080-9991f1c4c750",lat:12.928,lng:77.681},
  {name:"Nambiar Bellesa",loc:"Sarjapur",developer:"Nambiar Builders",type:"apartment",status:"ready",facing:"North-East",sqft:"3,000–4,200",entry:"9.4",range:"₹9.4 – 14 Cr",hi:["20 min to Outer Ring Road","Resort-style towers with a spa"],tags:["Resort Style","Spa","Infinity Pool"],img:"",lat:12.882,lng:77.741},
  {name:"Tata Promont",loc:"Banashankari",developer:"Tata Housing",type:"apartment",status:"ready",facing:"West",sqft:"4,000–5,600",entry:"12.8",range:"₹12.8 – 18 Cr",hi:["Hilltop address over South Bangalore","Panoramic city-skyline views"],tags:["Hilltop","City View","Concierge"],img:"1600607687939-ce8a6c25118c",lat:12.915,lng:77.546},
  {name:"Prestige Kingfisher Towers",loc:"UB City",developer:"Prestige Group",type:"penthouse",status:"sold",facing:"North",sqft:"6,000–8,300",entry:"38",range:"₹38 – 60 Cr",hi:["At UB City, Vittal Mallya Road","Sky-garden penthouses in the CBD"],tags:["UB City","Sky Garden","Private Lift"],img:"1542314831-068cd1dbfeeb",lat:12.971,lng:77.596},
  {name:"Phoenix Kessaku",loc:"Rajajinagar",developer:"Phoenix Mills",type:"penthouse",status:"invite",facing:"East",sqft:"5,200–7,400",entry:"24.5",range:"₹24.5 – 34 Cr",hi:["10 min to Orion Mall","Sky-deck residences with concierge"],tags:["Sky Deck","Concierge","Wellness"],img:"1600566753086-00f18fb6b3ea",lat:13.003,lng:77.552},
  {name:"Phoenix One West",loc:"Rajajinagar",developer:"Phoenix Mills",type:"apartment",status:"ready",facing:"North-West",sqft:"4,200–5,900",entry:"13.9",range:"₹13.9 – 19 Cr",hi:["8 min to Orion Mall","Set within a private forest park"],tags:["Forest Park","Wellness","Clubhouse"],img:"1600210492486-724fe5c67fb0",lat:13.006,lng:77.549},
  {name:"Sobha International City",loc:"Dwarka Sector",developer:"Sobha Ltd",type:"villa",status:"invite",facing:"North",sqft:"6,400–8,600",entry:"18.3",range:"₹18.3 – 26 Cr",hi:["20 min to NICE Road","Presidential villas around a lagoon"],tags:["Presidential","Lagoon","Gated"],img:"",lat:12.918,lng:77.490},
  {name:"Prestige Leela Residences",loc:"Old Airport Road",developer:"Prestige Group",type:"apartment",status:"ready",facing:"East",sqft:"3,900–5,400",entry:"16.0",range:"₹16 – 23 Cr",hi:["Adjacent to The Leela Palace","Branded, fully-serviced residences"],tags:["Leela Branded","Serviced","Concierge"],img:"1600573472550-8090b5e0745e",lat:12.960,lng:77.648},
  {name:"Embassy One — Four Seasons",loc:"Bellary Road",developer:"Embassy Group",type:"penthouse",status:"invite",facing:"North",sqft:"5,600–7,900",entry:"30",range:"₹30 – 44 Cr",hi:["12 min to the city centre","Four Seasons-serviced penthouses"],tags:["Four Seasons","Concierge","Sky Pool"],img:"1600585152220-90363fe7e115",lat:13.020,lng:77.591}
];
const statusMeta={ready:{label:"Ready",cls:"",color:"#7c7f8c",txt:"#171721"},invite:{label:"By Invitation",cls:"invite",color:"#cdddff",txt:"#171721"},sold:{label:"Sold Out",cls:"sold",color:"#45454f",txt:"#ededf3"}};
const imgURL=id=> !id ? '' : /[\/.]/.test(id) ? id : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
const propHero=x=>((window.PROP_IMAGES&&window.PROP_IMAGES[x.slug])||[])[0]||x.img;
const monogram=n=>n.split('—')[0].trim().split(' ').slice(0,2).map(w=>w[0]).join('');

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -7% 0px'});
function observeReveals(){ document.querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el)); }

const grid=document.getElementById('grid');
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function cardHTML(r,i,animate){
  const media=propHero(r)?`<img src="${imgURL(propHero(r))}" alt="${r.name}" loading="lazy" />`
    :`<div class="card-mono">${monogram(r.name)}</div>`;
  const hls=r.hi.map(h=>`<div class="hl"><svg viewBox="0 0 24 24"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg><span>${h}</span></div>`).join('');
  const tags=r.tags.map(t=>`<span class="tag">${t}</span>`).join('');
  const wa=`https://wa.me/919379627377?text=${encodeURIComponent("I'm interested in "+r.name+" ("+r.loc+").")}`;
  return `<article class="card ${animate?'reveal':'in'}" data-type="${r.type}" data-name="${r.name}" data-slug="${r.slug}" style="transition-delay:${(i%3)*0.06}s" data-hover>
    <div class="card-media">${media}
      <span class="card-pricebadge">${r.range}</span><span class="card-facing">${r.facing}</span>
      <div class="card-overlay"><div class="card-loc">${r.loc}</div><h3 class="card-name">${r.name}</h3></div>
    </div>
    <div class="card-body">
      <div class="card-dev">${r.developer} · ${cap(r.type)}</div>
      <div class="card-specs">
        <div class="spec"><div class="v">${r.sqft}</div><div class="k">Sq Ft</div></div>
        <div class="spec"><div class="v">${r.entry}</div><div class="k">Cr · Entry</div></div>
      </div>
      <div class="card-hl">${hls}</div>
      <div class="card-tags">${tags}</div>
      <div class="card-actions">
        <a class="btn-view" href="/${r.slug}" data-hover>View Residence <span class="arr">→</span></a>
        <a class="btn-wa" href="${wa}" target="_blank" rel="noopener" data-hover><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2z"/></svg> WhatsApp</a>
      </div>
    </div></article>`;
}
/* ---- typology + attribute (feature) filters ---- */
let curType='all', curFeatures=[];
const FEATURES=[
  {key:'lake',label:'Lakefront',kw:['lake','lakefront','lagoon','waterfront']},
  {key:'hills',label:'Hills & Views',kw:['hills-facing','hilltop','nandi hills','city view','panoramic','skyline','foot of nandi']},
  {key:'golf',label:'Golf Course',kw:['golf']},
  {key:'pool',label:'Private Pool',kw:['private pool','heated pool','sky pool','plunge pool']},
  {key:'gated',label:'Gated',kw:['gated']},
  {key:'branded',label:'Branded Residence',kw:['leela','four seasons','branded','serviced']},
  {key:'sky',label:'Sky / Terrace',kw:['sky deck','sky garden','sky lounge','sky bungalow','rooftop','terrace','skywalk']},
  {key:'green',label:'Forest & Green',kw:['forest','greenway','orchard','park','reserve','terrace garden']},
  {key:'concierge',label:'Concierge & Spa',kw:['concierge','spa']},
  {key:'airport',label:'Near the Airport',kw:["min to international airport","min to kempegowda","min to int'l airport"]}
];
function hay(r){return ((r.name||'')+' '+(r.developer||'')+' '+(r.tags||[]).join(' ')+' '+(r.amenities||[]).join(' ')+' '+(r.hi||[]).join(' ')+' '+(r.facing||'')+' '+(r.micro||'')).toLowerCase();}
function matchFeat(r){return curFeatures.every(fk=>{const f=FEATURES.find(x=>x.key===fk);return f&&f.kw.some(k=>hay(r).includes(k));});}

const featbar=document.getElementById('featbar');
featbar.innerHTML=FEATURES.map(f=>`<button class="feat" data-feature="${f.key}" data-hover>${f.label}</button>`).join('')+'<button class="feat-clear" id="featClear" data-hover hidden>Clear ✕</button>';

function syncUI(){
  document.querySelectorAll('#filters .filter').forEach(f=>f.classList.toggle('active',f.dataset.filter===curType));
  document.querySelectorAll('#featbar .feat').forEach(f=>f.classList.toggle('active',curFeatures.includes(f.dataset.feature)));
  const clr=document.getElementById('featClear'); if(clr) clr.hidden=curFeatures.length===0;
}
let firstRender=true;
function render(){
  const list=RESIDENCES.filter(r=>(curType==='all'||r.type===curType)&&matchFeat(r));
  if(list.length){ grid.innerHTML=list.map((r,i)=>cardHTML(r,i,firstRender)).join(''); }
  else { grid.innerHTML='<div class="no-res">No residences match these filters.<button id="resetF" data-hover>Clear all</button></div>'; }
  const parts=[]; if(curType!=='all')parts.push(curType+'s'); curFeatures.forEach(fk=>{const f=FEATURES.find(x=>x.key===fk);if(f)parts.push(f.label.toLowerCase());});
  document.getElementById('collMeta').textContent=`${list.length} ${list.length===1?'residence':'residences'}`+(parts.length?` · ${parts.join(' · ')}`:' in the collection');
  if(firstRender) observeReveals();
  grid.querySelectorAll('.card').forEach(c=>c.addEventListener('click',()=>{ location.href='/'+c.dataset.slug; }));
  grid.querySelectorAll('.btn-wa').forEach(a=>a.addEventListener('click',ev=>ev.stopPropagation()));
  const rf=document.getElementById('resetF'); if(rf) rf.addEventListener('click',()=>{curType='all';curFeatures=[];syncUI();render();});
  if(hasGSAP) ScrollTrigger.refresh();
}
render(); firstRender=false;
document.getElementById('filters').addEventListener('click',e=>{const b=e.target.closest('.filter');if(!b)return;curType=b.dataset.filter;syncUI();render();});
featbar.addEventListener('click',e=>{const b=e.target.closest('.feat');if(b){const k=b.dataset.feature,i=curFeatures.indexOf(k);if(i>=0)curFeatures.splice(i,1);else curFeatures.push(k);syncUI();render();return;}if(e.target.closest('#featClear')){curFeatures=[];syncUI();render();}});

(function(){
  const a=document.getElementById('mqRow');
  if(a){const it=[
    "An 18-hole golf course at the foot of Nandi Hills",
    "Bengaluru's first Four Seasons residences",
    "Only one sky bungalow per floor",
    "A private heated pool in every villa",
    "A 40,000 sq ft sky-mansion penthouse",
    "A 2-acre sky deck above Hebbal Lake",
    "Leela-serviced living",
    "Villas shaped around hundred-year-old trees",
    "85% open green — a home within a forest",
    "Interiors by Yabu Pushelberg",
    "A private lake and championship fairways"
  ];
    a.innerHTML=(it.map(t=>`<span class="dot"></span><span class="it">${t}</span>`).join('')).repeat(2);}
  const b=document.getElementById('mqRow2');
  if(b){const it=["Nandi Hills","Whitefield","Koramangala","UB City","Hebbal","Devanahalli","Sarjapur","Bellandur"];
    b.innerHTML=(it.map(t=>`<span class="dot"></span><span class="it">${t}</span>`).join('')).repeat(2);}
})();

try{
  if(typeof L!=='undefined'){
    const map=L.map('leafmap',{scrollWheelZoom:false,zoomControl:true}).setView([12.99,77.62],11);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'© OpenStreetMap, © CARTO',maxZoom:19}).addTo(map);
    const listEl=document.getElementById('mapList'); const markers={};
    function setActive(slug,fly){
      document.querySelectorAll('.mrow').forEach(x=>x.classList.toggle('active',x.dataset.slug===slug));
      for(const s in markers){ const ic=markers[s]._icon; if(ic) ic.classList.toggle('active',s===slug); }
      if(fly){
        const r=RESIDENCES.find(x=>x.slug===slug); if(r) map.flyTo([r.lat,r.lng],Math.max(map.getZoom(),13),{duration:.8});
        if(markers[slug]) markers[slug].openPopup();
        const row=document.querySelector('.mrow[data-slug="'+slug+'"]'); if(row) row.scrollIntoView({block:'nearest',behavior:'smooth'});
      }
    }
    RESIDENCES.forEach((r,i)=>{
      const st=statusMeta[r.status];
      const icon=L.divIcon({className:'pin '+(st.cls||''),html:`<b>${r.entry}</b><small>Cr</small>`,iconSize:[62,28],iconAnchor:[31,14],popupAnchor:[0,-14]});
      const m=L.marker([r.lat,r.lng],{icon,riseOnHover:true}).addTo(map);
      const pimg=propHero(r)?imgURL(propHero(r)):imgURL('1600596542815-ffad4c1539a9');
      m.bindPopup(`<a class="mpop" href="/${r.slug}"><img src="${pimg}" alt=""/><div class="mpop-b"><div class="pop-name">${r.name}</div><div class="pop-loc">${r.loc} · ${st.label}</div><div class="pop-price">${r.range}</div></div></a>`,{closeButton:false,offset:[0,2]});
      m.on('click',()=>setActive(r.slug,true)); m.on('mouseover',()=>setActive(r.slug,false));
      markers[r.slug]=m;
      const row=document.createElement('div'); row.className='mrow'; row.dataset.slug=r.slug;
      row.innerHTML=`<div class="mrow-idx">${String(i+1).padStart(2,'0')}</div><div class="mrow-main"><div class="mrow-name">${r.name}</div><div class="mrow-loc">${r.loc} · ${cap(r.type)}</div></div><div class="mrow-price">${r.range}</div>`;
      row.addEventListener('mouseenter',()=>setActive(r.slug,false));
      row.addEventListener('click',()=>setActive(r.slug,true));
      listEl.appendChild(row);
    });
    setTimeout(()=>map.invalidateSize(),300);
  } else { const el=document.getElementById('leafmap'); if(el){el.style.display='flex';el.style.alignItems='center';el.style.justifyContent='center';el.innerHTML='<span style="font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:#70707d">Map unavailable offline</span>';} }
}catch(e){console.warn('Map skipped:',e);}

if(typeof Lenis!=='undefined' && !prefersReduce){
  lenis=new Lenis({duration:1.15,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true});
  if(hasGSAP){ gsap.registerPlugin(ScrollTrigger); lenis.on('scroll',ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
  else { (function raf(t){lenis.raf(t);requestAnimationFrame(raf);})(); }
} else if(hasGSAP){ gsap.registerPlugin(ScrollTrigger); }

let lifted=false;
function lift(){ if(lifted) return; lifted=true; const pl=document.getElementById('preloader'); if(pl) pl.classList.add('done'); if(lenis) lenis.start(); if(hasGSAP) ScrollTrigger.refresh(); }
(function intro(){
  const numEl=document.getElementById('plNum'), fill=document.getElementById('plFill');
  if(lenis) lenis.stop();
  if(prefersReduce){ if(numEl)numEl.textContent=100; if(fill)fill.style.width='100%'; setTimeout(lift,200); return; }
  let n=0;
  const tk=setInterval(()=>{ n+=Math.max(1,Math.round((100-n)/9)); if(n>=100){n=100;clearInterval(tk);setTimeout(lift,320);} if(numEl)numEl.textContent=n; if(fill)fill.style.width=n+'%'; },22);
})();

const cIO=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting) return;
  const el=e.target.querySelector('[data-count]'); if(!el||el.dataset.done) return; el.dataset.done=1;
  const target=+el.dataset.count; let cur=0; const step=Math.max(1,Math.round(target/45));
  (function tick(){cur+=step;if(cur>=target)cur=target;el.firstChild.nodeValue=cur;if(cur<target)requestAnimationFrame(tick);})();
}),{threshold:.5});
document.querySelectorAll('.stat').forEach(s=>cIO.observe(s));

document.querySelectorAll('[data-words]').forEach(el=>{ el.innerHTML=el.textContent.trim().split(/\s+/).map(w=>`<span class="wd">${w}</span>`).join(' '); });
if(hasGSAP && !prefersReduce){
  gsap.to('#heroVid',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.to('#featImg',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.feature',start:'top bottom',end:'bottom top',scrub:true}});
  document.querySelectorAll('[data-words]').forEach(el=>{
    gsap.to(el.querySelectorAll('.wd'),{color:'#ededf3',stagger:.06,ease:'none',scrollTrigger:{trigger:el,start:'top 80%',end:'top 38%',scrub:true}});
  });
}else{ document.querySelectorAll('[data-words] .wd').forEach(w=>w.style.color='var(--starlight)'); }

const prog=document.getElementById('prog'), header=document.getElementById('header');
function onScroll(y){ const h=document.documentElement.scrollHeight-window.innerHeight; if(prog) prog.style.transform='scaleX('+(h>0?y/h:0)+')'; header.classList.toggle('shrink',y>60); }
if(lenis) lenis.on('scroll',({scroll})=>onScroll(scroll));
addEventListener('scroll',()=>onScroll(window.scrollY||document.documentElement.scrollTop),{passive:true});

const cur=document.getElementById('cursor'),dot=document.getElementById('cursorDot');
if(!prefersReduce && matchMedia('(min-width:901px)').matches){
  let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;});
  (function loop(){cx+=(mx-cx)*.18;cy+=(my-cy)*.18;cur.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;requestAnimationFrame(loop);})();
  document.addEventListener('mouseover',e=>{if(e.target.closest('[data-hover]'))cur.classList.add('is-hover');});
  document.addEventListener('mouseout',e=>{if(e.target.closest('[data-hover]'))cur.classList.remove('is-hover');});
  document.querySelectorAll('[data-magnetic]').forEach(el=>{
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.28}px,${(e.clientY-r.top-r.height/2)*.4}px)`;});
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
}

function sendToSheet(form,btn,okText,extra){
  const name=form.querySelector('[name=name]'), email=form.querySelector('[name=email]');
  if((name&&!name.value.trim())||(email&&!email.value.trim())){ const o0=btn.innerHTML; btn.textContent='Add your details'; setTimeout(()=>btn.innerHTML=o0,2000); return; }
  const orig=btn.innerHTML; btn.disabled=true; btn.textContent='Sending…';
  const fd=new FormData(form); if(extra) Object.keys(extra).forEach(k=>fd.append(k,extra[k]));
  const done=ok=>{ btn.disabled=false; if(ok){ btn.textContent=okText; form.reset(); } else { btn.textContent='Try WhatsApp instead'; } setTimeout(()=>btn.innerHTML=orig,4000); };
  const url=window.SHEETS_URL||'';
  if(!url){ done(true); return; }
  fetch(url,{method:'POST',mode:'no-cors',body:fd}).then(()=>done(true)).catch(()=>done(false));
}
document.getElementById('enquiry').addEventListener('submit',e=>{e.preventDefault();sendToSheet(e.target,e.target.querySelector('.submit'),'Thank you — we\'ll be in touch',{source:'Homepage Enquiry'});});
document.getElementById('capture').addEventListener('submit',e=>{e.preventDefault();sendToSheet(e.target,e.target.querySelector('button'),'Requested ✓',{source:'Hero — Private Access'});});

/* SEO: collection ItemList structured data */
try{
  const ld={"@context":"https://schema.org","@type":"ItemList","name":"The Collection — Perfect Neighbourhood","numberOfItems":RESIDENCES.length,"itemListElement":RESIDENCES.map((r,i)=>({"@type":"ListItem","position":i+1,"name":r.name,"url":location.origin+'/'+r.slug}))};
  const s=document.createElement('script'); s.type='application/ld+json'; s.textContent=JSON.stringify(ld); document.head.appendChild(s);
}catch(err){}

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',ev=>{
  const id=a.getAttribute('href'); if(id.length>1){const t=document.querySelector(id); if(t){ev.preventDefault();goTo(t);}}
}));
window.addEventListener('load',()=>{ if(hasGSAP) ScrollTrigger.refresh(); });

/* ---------- hero video: ensure playback; respect reduced-motion ---------- */
(function(){
  const v=document.getElementById('heroVid'); if(!v) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){ v.removeAttribute('autoplay'); v.pause(); return; }
  const pr=v.play&&v.play(); if(pr&&pr.catch) pr.catch(()=>{}); /* autoplay blocked -> poster image shows */
})();

/* ---------- hero topographic lines (canvas) ---------- */
(function(){
  const c=document.getElementById('topo'); if(!c) return;
  const ctx=c.getContext('2d'); if(!ctx) return;
  const dpr=Math.min(2,window.devicePixelRatio||1);
  let w=0,h=0,lines=18;
  function size(){ const r=c.getBoundingClientRect(); w=c.width=Math.max(1,r.width*dpr); h=c.height=Math.max(1,r.height*dpr); lines=r.width<700?12:18; }
  size(); addEventListener('resize',size,{passive:true});
  function frame(t){
    ctx.clearRect(0,0,w,h);
    ctx.lineWidth=1*dpr;
    for(let i=0;i<lines;i++){
      const y0=(i/(lines-1))*h;
      ctx.beginPath();
      ctx.strokeStyle='rgba(205,221,255,'+(0.05+0.05*Math.sin(i*0.5+t*0.3))+')';
      for(let x=0;x<=w;x+=14*dpr){
        const yy=y0 + Math.sin(x*0.0042 + i*0.6 + t*0.4)*24*dpr + Math.sin(x*0.011 - t*0.25 + i)*10*dpr;
        x===0?ctx.moveTo(x,yy):ctx.lineTo(x,yy);
      }
      ctx.stroke();
    }
  }
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){ frame(6); return; }
  let t=0,raf;
  (function loop(){ frame(t); t+=0.01; raf=requestAnimationFrame(loop); })();
  // pause when hero scrolled out of view, to save battery
  const hero=document.querySelector('.hero');
  if(hero && 'IntersectionObserver' in window){
    new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ if(!raf)(function loop(){ frame(t); t+=0.01; raf=requestAnimationFrame(loop); })(); } else { cancelAnimationFrame(raf); raf=null; } }),{threshold:0}).observe(hero);
  }
})();

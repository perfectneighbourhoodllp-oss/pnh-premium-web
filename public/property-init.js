/* AUTO-GENERATED from property.html — verbatim property behavior (DOM built server-side). */

const PROPS=window.PROPERTIES||[];
const id=window.__SLUG__||new URLSearchParams(location.search).get('id');
const p=PROPS.find(x=>x.slug===id);
const app=document.getElementById('app');
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const imgURL=(idv,w)=> !idv ? '' : /[\/.]/.test(idv) ? idv : `https://images.unsplash.com/photo-${idv}?auto=format&fit=crop&w=${w||900}&q=80`;
const propImgs=x=>(window.PROP_IMAGES&&window.PROP_IMAGES[x.slug])||[];
const propHero=x=>propImgs(x)[0]||x.img;
const mono=n=>n.split('—')[0].trim().split(' ').slice(0,2).map(w=>w[0]).join('');
const pinSvg='<svg viewBox="0 0 24 24"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>';
const tick='<svg viewBox="0 0 24 24"><path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z"/></svg>';
const POOL=["1613490493576-7fde63acd811","1600596542815-ffad4c1539a9","1512917774080-9991f1c4c750","1600607687939-ce8a6c25118c","1600566753086-00f18fb6b3ea","1600210492486-724fe5c67fb0","1600573472550-8090b5e0745e","1600585152220-90363fe7e115","1564013799919-ab600027ffc6","1568605114967-8130f3a36994"];

let lenis=null;
function goTo(t){ if(!t) return; if(lenis) lenis.scrollTo(t,{duration:1.2}); else t.scrollIntoView({behavior:'smooth'}); }


/* ---------- behaviour ---------- */
const prefersReduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP=(typeof gsap!=='undefined' && typeof ScrollTrigger!=='undefined');

if(typeof Lenis!=='undefined' && !prefersReduce){
  lenis=new Lenis({duration:1.1,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true});
  if(hasGSAP){ gsap.registerPlugin(ScrollTrigger); lenis.on('scroll',ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
  else { (function raf(t){lenis.raf(t);requestAnimationFrame(raf);})(); }
} else if(hasGSAP){ gsap.registerPlugin(ScrollTrigger); }

/* reveals */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.1,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* hero parallax */
if(p && hasGSAP && !prefersReduce){
  gsap.to('.phero-media',{yPercent:9,ease:'none',scrollTrigger:{trigger:'.phero',start:'top top',end:'bottom top',scrub:true}});
}

/* ---------- richer motion + cinematic transitions ---------- */
const veil=document.getElementById('veil');
function countUpEl(el,dur){
  if(!el) return; const target=el.textContent;
  const tokens=target.match(/(\d[\d,]*\.?\d*)|([^\d]+)/g)||[];
  if(!tokens.some(t=>/\d/.test(t))) return;
  const t0=performance.now();
  function fmt(raw,fr){ const dec=(raw.split('.')[1]||'').length; const comma=raw.includes(','); const n=parseFloat(raw.replace(/,/g,'')); const cur=n*fr; let s=dec?cur.toFixed(dec):Math.round(cur).toString(); if(comma) s=Number(s).toLocaleString('en-IN'); return s; }
  function frame(now){ const fr=Math.min(1,(now-t0)/dur); const e=1-Math.pow(1-fr,3); el.textContent=tokens.map(t=>/\d/.test(t)?fmt(t,e):t).join(''); if(fr<1) requestAnimationFrame(frame); else el.textContent=target; }
  requestAnimationFrame(frame);
}
if(p && hasGSAP && !prefersReduce){
  gsap.set(veil,{yPercent:0});
  gsap.timeline({defaults:{ease:'expo.out'}})
    .to(veil,{yPercent:-100,duration:.9,ease:'expo.inOut'},0)
    .fromTo('.phero-media',{clipPath:'inset(48% 0% 48% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.35,ease:'expo.inOut'},.2)
    .from('.phero-eyebrow, .phero h1, .phero-pitch, .phero-sub, .phero-facts, .phero-actions',{y:30,opacity:0,duration:.85,stagger:.07},.6)
    .add(()=>document.querySelectorAll('.phero-facts .v').forEach(el=>countUpEl(el,1100)),.72)
    .set(veil,{yPercent:100});
  gsap.utils.toArray('.gal a').forEach(el=>gsap.fromTo(el,{clipPath:'inset(0% 0% 100% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 88%'}}));
  gsap.utils.toArray('.rel').forEach(el=>gsap.fromTo(el,{clipPath:'inset(0% 0% 100% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:.9,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 90%'}}));
  gsap.to('.phero-inner',{yPercent:-14,opacity:.4,ease:'none',scrollTrigger:{trigger:'.phero',start:'top top',end:'bottom top',scrub:true}});
} else {
  if(veil) veil.style.display='none';
  if(p && !prefersReduce) document.querySelectorAll('.phero-facts .v').forEach(el=>countUpEl(el,900));
}
function exitTo(url){ if(prefersReduce||!hasGSAP||!veil){ location.href=url; return; } gsap.set(veil,{yPercent:100,display:'block'}); gsap.to(veil,{yPercent:0,duration:.7,ease:'expo.inOut',onComplete:()=>{location.href=url;}}); }
document.querySelectorAll('a[href]').forEach(a=>{ const h=a.getAttribute('href')||''; if(a.target==='_blank') return; if(h && !/^(https?:|mailto:|tel:|#)/.test(h)){ a.addEventListener('click',e=>{ if(e.metaKey||e.ctrlKey||e.shiftKey) return; e.preventDefault(); exitTo(h); }); } });

/* ---------- graphic animations (image-filled name · compass · connectivity) ---------- */
if(p){
  if(hasGSAP && !prefersReduce){
    gsap.fromTo('.bigtype-h',{backgroundPosition:'50% 14%'},{backgroundPosition:'50% 86%',ease:'none',scrollTrigger:{trigger:'.bigtype',start:'top bottom',end:'bottom top',scrub:true}});
  }
  const facingDeg={'North':0,'North-East':45,'East':90,'South-East':135,'South':180,'South-West':225,'West':270,'North-West':315};
  const deg=facingDeg[p.facing]!=null?facingDeg[p.facing]:0;
  const frac=(function(s){s=(s||'').toLowerCase();if(s.includes('ready'))return 1;const y=(s.match(/20\d\d/)||[])[0];if(!y)return .85;const yr=+y;return yr<=2026?.7:yr<=2028?.5:.35;})(p.possession);
  const needle=document.getElementById('needle'), tlFill=document.getElementById('tlFill');
  if(hasGSAP && !prefersReduce){
    if(needle) gsap.fromTo(needle,{rotation:0},{rotation:deg,ease:'expo.out',duration:1.5,scrollTrigger:{trigger:'.gfx-row',start:'top 82%'}});
    if(tlFill) gsap.fromTo(tlFill,{width:'0%'},{width:(frac*100)+'%',ease:'expo.out',duration:1.4,scrollTrigger:{trigger:'.gfx-row',start:'top 82%'}});
  } else { if(needle) needle.style.transform='rotate('+deg+'deg)'; if(tlFill) tlFill.style.width=(frac*100)+'%'; }
  const cmLines=document.querySelectorAll('.cm-line i'), cmTimes=document.querySelectorAll('.cm-time[data-time]');
  if(hasGSAP && !prefersReduce){
    ScrollTrigger.create({trigger:'.connmap',start:'top 80%',once:true,onEnter:()=>{
      gsap.to(cmLines,{scaleX:1,duration:1,ease:'expo.out',stagger:.12});
      cmTimes.forEach((el,i)=>setTimeout(()=>countUpEl(el,900),i*130));
    }});
  } else { cmLines.forEach(l=>l.style.transform='scaleX(1)'); }
}

/* mini map */
if(p){ try{
  if(typeof L!=='undefined'){
    const map=L.map('pmap',{scrollWheelZoom:false,zoomControl:true,attributionControl:false}).setView([p.lat,p.lng],13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{maxZoom:19}).addTo(map);
    const icon=L.divIcon({className:'',html:`<div class="pin"><span>${p.entry}</span></div>`,iconSize:[34,34],iconAnchor:[17,34]});
    L.marker([p.lat,p.lng],{icon}).addTo(map);
    setTimeout(()=>map.invalidateSize(),300);
  } else { const el=document.getElementById('pmap'); if(el){el.style.display='flex';el.style.alignItems='center';el.style.justifyContent='center';el.innerHTML='<span style="font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.4)">Map unavailable offline</span>';} }
}catch(e){console.warn('map',e);} }

/* ---------- choreographed staggered reveals ---------- */
if(p && hasGSAP && !prefersReduce){
  [['.usp .u','.usp'],['.facts-grid .fact','.facts-grid'],['.config','.config-list'],['.amen','.amen-grid']].forEach(([sel,trig])=>{
    const items=gsap.utils.toArray(sel); if(!items.length) return;
    gsap.from(items,{y:26,opacity:0,duration:.7,ease:'expo.out',stagger:.07,scrollTrigger:{trigger:trig,start:'top 84%'}});
  });
  if(document.querySelector('.bigtype-h')) gsap.from('.bigtype-h',{scale:.93,opacity:0,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:'.bigtype',start:'top 80%'}});
}

/* ---------- immersive: lightbox gallery + sticky mobile bar ---------- */
if(p){
  const galLinks=[...document.querySelectorAll('.gal a')];
  if(galLinks.length){
    const imgs=galLinks.map(a=>a.getAttribute('href'));
    const lb=document.createElement('div'); lb.className='lb'; lb.setAttribute('aria-hidden','true');
    lb.innerHTML='<button class="lb-close" aria-label="Close">×</button><button class="lb-prev" aria-label="Previous">‹</button><div class="lb-stage"><img id="lbImg" alt=""/></div><button class="lb-next" aria-label="Next">›</button><div class="lb-meta"><span id="lbCount"></span> · '+p.name+'</div>';
    (document.querySelector('.elyse')||document.body).appendChild(lb);
    const lbImg=lb.querySelector('#lbImg'), lbCount=lb.querySelector('#lbCount'); let cur=0;
    function show(i){ cur=(i+imgs.length)%imgs.length; lbImg.style.opacity=0; const src=imgs[cur]; const pre=new Image(); pre.onload=()=>{lbImg.src=src;lbImg.style.opacity=1;}; pre.src=src; lbCount.textContent=(cur+1)+' / '+imgs.length; }
    function open(i){ show(i); lb.classList.add('open'); document.documentElement.style.overflow='hidden'; if(lenis) lenis.stop(); }
    function close(){ lb.classList.remove('open'); document.documentElement.style.overflow=''; if(lenis) lenis.start(); }
    galLinks.forEach((a,i)=>a.addEventListener('click',e=>{e.preventDefault(); open(i);}));
    lb.querySelector('.lb-close').addEventListener('click',close);
    lb.querySelector('.lb-prev').addEventListener('click',()=>show(cur-1));
    lb.querySelector('.lb-next').addEventListener('click',()=>show(cur+1));
    lb.addEventListener('click',e=>{ if(e.target===lb||e.target.classList.contains('lb-stage')) close(); });
    document.addEventListener('keydown',e=>{ if(!lb.classList.contains('open'))return; if(e.key==='Escape')close(); else if(e.key==='ArrowLeft')show(cur-1); else if(e.key==='ArrowRight')show(cur+1); });
    let sx=0; lb.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
    lb.addEventListener('touchend',e=>{ const dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>50) show(cur+(dx<0?1:-1)); },{passive:true});
  }
  const waS=`https://wa.me/919379627377?text=${encodeURIComponent("I'm interested in "+p.name+".")}`;
  const bar=document.createElement('div'); bar.className='sbar';
  bar.innerHTML=`<div class="sbar-info"><div class="sbar-name">${p.name}</div><div class="sbar-price">${p.range}</div></div><div class="sbar-cta"><button class="sbar-btn" id="sbarView">Request Viewing</button><a class="sbar-wa" href="${waS}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2z"/></svg></a></div>`;
  (document.querySelector('.elyse')||document.body).appendChild(bar);
  bar.querySelector('#sbarView').addEventListener('click',()=>goTo(document.getElementById('enquire')));
  const phero=document.querySelector('.phero');
  if(phero && 'IntersectionObserver' in window){ new IntersectionObserver(es=>es.forEach(e=>bar.classList.toggle('show',!e.isIntersecting)),{threshold:0}).observe(phero); }
  else { bar.classList.add('show'); }
}

/* progress + header */
const prog=document.getElementById('prog'), header=document.getElementById('header');
function onScroll(y){ const h=document.documentElement.scrollHeight-window.innerHeight; if(prog) prog.style.transform='scaleX('+(h>0?y/h:0)+')'; header.classList.toggle('shrink',y>60); }
if(lenis) lenis.on('scroll',({scroll})=>onScroll(scroll));
addEventListener('scroll',()=>onScroll(window.scrollY||document.documentElement.scrollTop),{passive:true});

/* cursor + magnetic */
const cur=document.getElementById('cursor'),dot=document.getElementById('cursorDot');
if(!prefersReduce && matchMedia('(min-width:901px)').matches){
  let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;});
  (function loop(){cx+=(mx-cx)*.18;cy+=(my-cy)*.18;cur.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;requestAnimationFrame(loop);})();
  document.addEventListener('mouseover',e=>{if(e.target.closest('[data-hover]'))cur.classList.add('is-hover');if(e.target.closest('.gal a'))cur.classList.add('view');});
  document.addEventListener('mouseout',e=>{if(e.target.closest('[data-hover]'))cur.classList.remove('is-hover');if(e.target.closest('.gal a'))cur.classList.remove('view');});
  document.querySelectorAll('[data-magnetic]').forEach(el=>{
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.4}px)`;});
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
}

/* form + smooth anchors */
const enq=document.getElementById('enq');
if(enq) enq.addEventListener('submit',e=>{
  e.preventDefault(); const btn=enq.querySelector('.submit');
  const n=enq.querySelector('[name=name]').value.trim(), em=enq.querySelector('[name=email]').value.trim();
  if(!n||!em){ btn.textContent='Add name & email'; setTimeout(()=>btn.textContent='Submit Enquiry',2000); return; }
  btn.disabled=true; btn.textContent='Sending…';
  const fd=new FormData(enq); fd.append('source','Property — '+(p?p.name:'')); fd.append('residence',p?p.name:'');
  const done=ok=>{ btn.disabled=false; btn.textContent=ok?'Thank you — we\'ll be in touch':'Try WhatsApp instead'; if(ok) enq.reset(); setTimeout(()=>btn.textContent='Submit Enquiry',4000); };
  const url=window.SHEETS_URL||''; if(!url){ done(true); return; }
  fetch(url,{method:'POST',mode:'no-cors',body:fd}).then(()=>done(true)).catch(()=>done(false));
});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',ev=>{
  const h=a.getAttribute('href'); if(h.length>1){const t=document.querySelector(h); if(t){ev.preventDefault();goTo(t);}}
}));
window.addEventListener('load',()=>{ if(hasGSAP) ScrollTrigger.refresh(); });

;try{window.__pnhLenis=lenis;}catch(e){}

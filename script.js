const openButton=document.getElementById("openInvitation");
const envelopeWrap=document.getElementById("envelopeWrap");
const opening=document.getElementById("opening");
const invitation=document.getElementById("invitation");

function openInvitation(){
  if(envelopeWrap.classList.contains("opened"))return;
  envelopeWrap.classList.add("opened");
  setTimeout(()=>opening.classList.add("fade-out"),850);
  setTimeout(()=>{
    opening.style.display="none";
    invitation.classList.add("active");
    window.scrollTo({top:0,behavior:"instant"});
    document.querySelector(".cover").classList.add("visible");
    updateScroll();
  },1550);
}
openButton.addEventListener("click",openInvitation,{passive:true});
openButton.addEventListener("pointerup",()=>{}, {passive:true});
openButton.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openInvitation()}});

const reveals=document.querySelectorAll(".reveal");
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      entry.target.classList.add("section-active");
      createTransitionMagic(entry.target);
    }
  });
},{threshold:.15});
reveals.forEach(el=>observer.observe(el));

const progressBar=document.querySelector(".scroll-progress span");
let ticking=false;
function updateScroll(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const p=max>0?window.scrollY/max:0;
  progressBar.style.transform=`scaleX(${p})`;
  document.querySelectorAll(".page").forEach(page=>{
    const rect=page.getBoundingClientRect();
    const center=window.innerHeight/2;
    const distance=(rect.top+rect.height/2-center)/window.innerHeight;
    const clamped=Math.max(-1,Math.min(1,distance));
    const wash=page.querySelector(".scene-wash");
    if(wash)wash.style.transform=`translateY(${clamped*-35}px) scale(1.05)`;
    const title=page.querySelector(".cover h2");
    if(title)title.style.transform=`translateY(${clamped*18}px)`;
    page.querySelectorAll(".floating-ornament").forEach(o=>o.style.transform=`translateY(${clamped*-20}px)`);
  });
  ticking=false;
}
window.addEventListener("scroll",()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true;}},{passive:true});
window.addEventListener("resize",updateScroll);

const weddingDate=new Date("2026-10-25T06:00:00+05:30").getTime();
function updateCountdown(){
  let d=Math.max(0,weddingDate-Date.now());
  const days=Math.floor(d/86400000);
  const hours=Math.floor(d/3600000%24);
  const minutes=Math.floor(d/60000%60);
  const seconds=Math.floor(d/1000%60);
  document.getElementById("days").textContent=String(days).padStart(2,"0");
  document.getElementById("hours").textContent=String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent=String(minutes).padStart(2,"0");
  document.getElementById("seconds").textContent=String(seconds).padStart(2,"0");
}
updateCountdown();setInterval(updateCountdown,1000);

const particles=document.getElementById("particles");
for(let i=0;i<34;i++){
  const p=document.createElement("span");
  p.className="particle";
  p.style.left=(Math.random()<.5 ? Math.random()*24 : 76+Math.random()*24)+"%";
  p.style.setProperty("--drift",(Math.random()*120-60)+"px");
  p.style.animationDuration=(9+Math.random()*8)+"s";
  p.style.animationDelay=Math.random()*8+"s";
  particles.appendChild(p);
}
for(let i=0;i<24;i++){
  const b=document.createElement("span");
  b.className="bubble";
  const size=12+Math.random()*32;
  b.style.width=size+"px";b.style.height=size+"px";
  b.style.left=(Math.random()<.5 ? Math.random()*22 : 78+Math.random()*22)+"%";
  b.style.setProperty("--drift",(Math.random()*160-80)+"px");
  b.style.animationDuration=(11+Math.random()*10)+"s";
  b.style.animationDelay=Math.random()*12+"s";
  particles.appendChild(b);
}
function createTransitionMagic(section){
  const rect=section.getBoundingClientRect();
  if(rect.top<window.innerHeight+100){
    for(let i=0;i<5;i++){
      const b=document.createElement("span");
      b.className="bubble";
      const size=18+Math.random()*38;
      b.style.width=size+"px";b.style.height=size+"px";
      b.style.left=(20+Math.random()*60)+"%";
      b.style.bottom="4%";
      b.style.setProperty("--drift",(Math.random()*120-60)+"px");
      b.style.animationDuration="3.8s";
      particles.appendChild(b);
      setTimeout(()=>b.remove(),4000);
    }
  }
}
updateScroll();

/* =========================================================
   EXTRA BACKGROUND DECORATION
   Hearts + bubbles + sparkles stay in side zones.
   They never block clicks or cover the invitation text.
   ========================================================= */
(function(){
  const layer=document.createElement('div');
  layer.id='decor-layer';
  document.body.appendChild(layer);

  const make=(cls,side,delay,duration,size)=>{
    const el=document.createElement('span');
    el.className=cls+' '+side;
    el.style.animationDelay=delay+'s';
    el.style.animationDuration=duration+'s';
    el.style.width=size+'px';
    el.style.height=size+'px';
    el.style.top=(65+Math.random()*35)+'%';
    if(side==='decor-left') el.style.left=(2+Math.random()*17)+'%';
    else el.style.right=(2+Math.random()*17)+'%';
    if(cls==='decor-heart') el.textContent='♥';
    layer.appendChild(el);
  };

  for(let i=0;i<16;i++)
    make('decor-heart',i%2?'decor-right':'decor-left',-Math.random()*9,9+Math.random()*8,14+Math.random()*10);

  for(let i=0;i<28;i++)
    make('decor-bubble',i%2?'decor-right':'decor-left',-Math.random()*10,10+Math.random()*11,6+Math.random()*16);

  for(let i=0;i<30;i++)
    make('decor-spark',i%2?'decor-right':'decor-left',-Math.random()*8,5+Math.random()*7,3+Math.random()*3);
})();

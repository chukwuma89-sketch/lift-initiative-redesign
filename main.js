(()=>{const d=document.documentElement;const st=localStorage.getItem('lift-theme');if(st)d.dataset.theme=st;
const tb=document.getElementById('theme');const setL=()=>{tb.setAttribute('aria-label',d.dataset.theme==='dark'?'Switch to light mode':'Switch to dark mode');tb.innerHTML=d.dataset.theme==='dark'?'<svg width=20 height=20 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>':'<svg width=20 height=20 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'};setL();
tb.onclick=()=>{d.dataset.theme=d.dataset.theme==='dark'?'light':'dark';localStorage.setItem('lift-theme',d.dataset.theme);setL()};
const mb=document.getElementById('menu'),nav=document.getElementById('nav');mb.onclick=()=>{const o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)};nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const counters=document.querySelectorAll('[data-count]');
if(reduced||!window.gsap){d.classList.add('reduced');counters.forEach(c=>c.textContent=c.dataset.count+(c.dataset.suffix||''));return}
gsap.registerPlugin(ScrollTrigger);
const lenis=new Lenis({lerp:.1});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t&&a.getAttribute('href').length>1){e.preventDefault();lenis.scrollTo(t,{offset:-80})}}));
document.querySelectorAll('.split').forEach(h=>{const words=h.textContent.trim().split(/\s+/);h.setAttribute('aria-label',h.textContent.trim());h.innerHTML=words.map(w=>'<span class="line-mask" style="display:inline-block" aria-hidden="true"><span>'+w+'</span></span>').join(' ');gsap.from(h.querySelectorAll('.line-mask>span'),{yPercent:110,duration:.9,ease:'power3.out',stagger:.06,delay:.1})});
gsap.utils.toArray('.reveal').forEach(el=>gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%'}}));
gsap.utils.toArray('.blurin').forEach(el=>gsap.to(el,{filter:'blur(0px)',opacity:1,scale:1,duration:1.3,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%'}}));
gsap.utils.toArray('[data-parallax]').forEach(el=>gsap.fromTo(el,{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:el.parentElement,scrub:true}}));
counters.forEach(c=>{const o={v:0};gsap.to(o,{v:+c.dataset.count,duration:2,ease:'power2.out',scrollTrigger:{trigger:c,start:'top 90%'},onUpdate:()=>c.textContent=Math.round(o.v)+(c.dataset.suffix||'')})});
document.querySelectorAll('.pathway path').forEach(p=>{const L=p.getTotalLength();gsap.set(p,{strokeDasharray:L,strokeDashoffset:L});gsap.to(p,{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:p.closest('svg'),start:'top 85%',end:'bottom 40%',scrub:1}})});
const mq=document.querySelector('.partners');if(mq){const tw=gsap.to(mq,{xPercent:-50,duration:30,ease:'none',repeat:-1});const m=mq.parentElement;['mouseenter','focusin'].forEach(e=>m.addEventListener(e,()=>tw.pause()));['mouseleave','focusout'].forEach(e=>m.addEventListener(e,()=>tw.play()));const pb=document.getElementById('mqpause');if(pb)pb.onclick=()=>{tw.paused()?tw.play():tw.pause();pb.textContent=tw.paused()?'Play logos':'Pause logos'}}
})();

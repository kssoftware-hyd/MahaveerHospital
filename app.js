/* Mahaveer Hospital — app.js */

// ── Mobile nav toggle
const tog = document.getElementById('navToggle');
const men = document.getElementById('navMenu');
if(tog && men){
  tog.addEventListener('click', () => {
    men.classList.toggle('open');
    const spans = tog.querySelectorAll('span');
    if(men.classList.contains('open')){
      spans[0].style.transform='rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity='0';
      spans[2].style.transform='rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s=>{s.style.transform='';s.style.opacity='';});
    }
  });
}

// ── Active nav link
(function(){
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a=>{
    if(a.getAttribute('href')===page) a.classList.add('active');
  });
})();

// ── Scroll reveal
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
},{ threshold: 0.1 });
document.querySelectorAll('[data-aos]').forEach(el=>revealObserver.observe(el));

// ── Navbar shadow on scroll
window.addEventListener('scroll',()=>{
  const nav = document.getElementById('mainNav');
  if(nav) nav.style.boxShadow = window.scrollY>60 ? '0 4px 30px rgba(8,23,43,0.5)' : 'none';
},{ passive:true });

// ── Counter animation
function animateCount(el){
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  let start = 0;
  const dur = 1800;
  const step = dur/60;
  const inc = target/60;
  const timer = setInterval(()=>{
    start = Math.min(start+inc, target);
    el.textContent = Math.floor(start) + suffix;
    if(start>=target) clearInterval(timer);
  },step);
}
const countObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('[data-count]').forEach(animateCount);
      countObserver.unobserve(e.target);
    }
  });
},{threshold:0.3});
document.querySelectorAll('.stats-row').forEach(el=>countObserver.observe(el));

// ── Contact form
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    if(btn){ btn.textContent='Sending...'; btn.disabled=true; }
    setTimeout(()=>{
      const msg = document.getElementById('formSuccess');
      if(msg) msg.style.display='flex';
      if(btn){ btn.textContent='Send Message'; btn.disabled=false; }
      this.reset();
      setTimeout(()=>{
        window.open('https://wa.me/919421294108?text=नमस्कार%20Mahaveer%20Hospital%2C%20मला%20appointment%20बद्दल%20माहिती%20हवी%20आहे.','_blank');
      },1500);
    },1000);
  });
}

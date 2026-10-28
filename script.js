"use strict";
/* ===== EDIT HERE: the ONLY place for the proposal date and password ===== */
const CONFIG = { proposalDate: "29 December 2023", password: "29122023" };
/* (For 2024 use: "29 December 2024" and "29122024") ======================= */

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const mob = innerWidth < 700;

const CAPTIONS = ["Tumhari muskaan","Meri favourite","Saath mein","Hamari tasveer","Wohi pyaari smile","Madam ka andaaz","Lal rang mein","Baccha aur main","Ek aur yaad","Gudda ke saath","Tumhare paas","Chhoti si duniya","Hamara apna pal","Kareeb","Humesha aise hi"];
const PHOTOS = CAPTIONS.map((caption, i) => ({ src: `assets/photos/photo-${String(i + 1).padStart(2, "0")}.jpg`, caption }));

const FULL = `Ankita,

Class 11 se tum mujhe pasand karti thi, aur do saal baad jab tumne baat karna shuru kiya, tab mujhe pata bhi nahi tha ki yeh baat meri zindagi ka itna bada hissa ban jayegi. ${CONFIG.proposalDate} ko maine tumse apne dil ki baat kahi, aur tumhara haan mere liye aaj bhi sabse keemti cheez hai.

Tumhari muskaan mujhe sach mein bahut khoobsurat lagti hai. Mushkil dino mein bhi tum mere saath khadi rahi ho, aur yeh baat main kabhi halke mein nahi leta. Pagla khud ke paas 1350 rs hain, phir bhi vaibhav agar jarurat hogi to mere se le lena haayyyyy. Is baat ke liye main dil se shukriya kehta hoon, aur main iski kadar karta hoon.

Mujhe tumse maafi bhi maangni hai. Main tumhara pichla birthday bhool gaya, aur woh meri galti thi. Kabhi kabhi ghar jaane par main tumse baat karna bhool jata hoon. Main jaanta hoon ki isse tumhe bura lagta hai, aur iska koi bahana nahi hai. Main bas itna kehna chahta hoon ki tumhari feelings mere liye bahut matter karti hain.

Hum dono ne galtiyan ki hain, aur hum kai baar jhagde bhi hain. Rishta sirf pyaar se nahi chalta, usme baat karna, sabr rakhna aur koshish karna bhi zaroori hai. Main woh koshish karna chahta hoon, ek ek din karke.

Madam, tumhara yeh din khushiyon se bhara ho. Happy Birthday, baccha.

Forever yours,
Vaibhav ❤️`;

const PH = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#2a0a16"/><text x="200" y="240" font-size="64" text-anchor="middle" fill="#ff2d87">♥</text><text x="200" y="300" font-size="26" text-anchor="middle" fill="#ffb3cf" font-family="sans-serif">Photo jald aayegi</text></svg>');

const S = { screen: 1, playing: false, muted: false, slideIndex: 0 };
const T = { slide: null, type: null, unlock: null };

/* ---- images: placeholder on error, no loops ---- */
function img(el, src, alt) {
  el.alt = alt;
  el.onerror = () => { el.onerror = null; el.src = PH; };
  el.src = src;
  return el;
}

/* ---- single audio element ---- */
const A = new Audio("assets/audio/our-song.mp3");
A.loop = true; A.preload = "none";
const mb = $("#music");
function playMusic() { try { const p = A.play(); if (p && p.catch) p.catch(() => {}); } catch (e) {} }
mb.onclick = () => (A.paused ? playMusic() : A.pause());
A.onplay = A.onpause = () => mb.setAttribute("aria-pressed", String(!A.paused));
function sync() { A.muted = S.muted; $("#mute").textContent = S.muted ? "🔇 Unmute" : "🔊 Mute"; }

/* ---- ambient hearts ---- */
if (!reduce) {
  const n = mob ? 10 : 18, H = $("#hearts");
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.textContent = "♥";
    s.style.cssText = `left:${Math.random() * 100}%;font-size:${12 + Math.random() * 22}px;animation-duration:${9 + Math.random() * 10}s;animation-delay:-${Math.random() * 15}s`;
    H.append(s);
  }
  for (let i = 0; i < 7; i++) {
    const s = document.createElement("span");
    s.style.cssText = `left:${5 + i * 14}%;animation-duration:${8 + Math.random() * 5}s;animation-delay:-${Math.random() * 8}s`;
    $("#sky").append(s);
  }
}

/* ---- canvas confetti / fireworks (one loop) ---- */
const fx = (() => {
  const c = $("#fx"), x = c.getContext("2d"), cols = ["#ff2d87", "#ffb3cf", "#fbe9f0", "#c2185b", "#ffd1e3"];
  const max = mob ? 60 : 150;
  let P = [], raf = 0, tm = 0, on = false, w = 0, h = 0;
  const size = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
  addEventListener("resize", size);
  const conf = () => { if (P.length < max) P.push({ x: Math.random() * w, y: -10, vx: Math.random() - .5, vy: 1 + Math.random() * 1.5, s: 3 + Math.random() * 4, c: cols[Math.random() * 5 | 0], a: 1, g: 0, f: 0 }); };
  const burst = () => {
    const bx = w * (.15 + Math.random() * .7), by = h * (.12 + Math.random() * .35), n = mob ? 20 : 34, col = cols[Math.random() * 5 | 0];
    for (let i = 0; i < n; i++) { const a = i / n * 6.283, v = 2 + Math.random() * 2.5; P.push({ x: bx, y: by, vx: Math.cos(a) * v, vy: Math.sin(a) * v, s: 2.5, c: col, a: 1, g: .04, f: 1 }); }
  };
  const loop = () => {
    x.clearRect(0, 0, w, h);
    if (Math.random() < .25) conf();
    P = P.filter(p => p.a > 0 && p.y < h + 20);
    for (const p of P) { p.x += p.vx; p.y += p.vy; p.vy += p.g; if (p.f) p.a -= .016; x.globalAlpha = Math.max(p.a, 0); x.fillStyle = p.c; x.fillRect(p.x, p.y, p.s, p.f ? p.s : p.s * 1.6); }
    raf = requestAnimationFrame(loop);
  };
  return {
    start(m) {
      this.stop(); if (reduce || !x) return;
      size(); on = true; raf = requestAnimationFrame(loop);
      if (m === "f") { burst(); tm = setInterval(burst, 1100); }
    },
    stop() { cancelAnimationFrame(raf); clearInterval(tm); P = []; if (on && x) x.clearRect(0, 0, c.width, c.height); on = false; }
  };
})();

/* ---- gallery (Screen 3) ---- */
const ROT = [-4, 3, -2, 5, -3, 2];
$("#gal").innerHTML = PHOTOS.map((p, i) => `<figure class="pol" style="--r:${ROT[i % 6]}deg;--d:${i * 70}ms"><div class="ph"><img alt="${p.caption}" loading="lazy" src="${p.src}"></div><figcaption>${p.caption}</figcaption></figure>`).join("");
$$("#gal img").forEach(im => {
  im.onerror = () => { im.onerror = null; im.src = PH; };
  if (im.complete && !im.naturalWidth) im.onerror();
});
img($("#fin"), PHOTOS[5].src, PHOTOS[5].caption);

/* ---- slideshow (Screen 4) ---- */
const SA = $("#sa"), SB = $("#sb"); let front = SA;
function go(i) {
  S.slideIndex = (i + PHOTOS.length) % PHOTOS.length;
  const p = PHOTOS[S.slideIndex], nx = front === SA ? SB : SA;
  img(nx, p.src, p.caption); nx.classList.add("on"); front.classList.remove("on"); front = nx;
  $("#cap").textContent = p.caption;
  $("#cnt").textContent = `${S.slideIndex + 1}/${PHOTOS.length}`;
  $("#bar").style.width = (S.slideIndex + 1) / PHOTOS.length * 100 + "%";
}
function setPlay(b) {
  clearInterval(T.slide); T.slide = null; S.playing = b;
  if (b) T.slide = setInterval(() => go(S.slideIndex + 1), 4000);
  $("#pp").textContent = b ? "⏸ Pause" : "▶ Play";
}
$("#ctl").addEventListener("click", e => {
  const b = e.target.closest("[data-a]"); if (!b) return;
  const a = b.dataset.a;
  if (a === "prev" || a === "next") { go(S.slideIndex + (a === "next" ? 1 : -1)); if (S.playing) setPlay(true); }
  else if (a === "pp") setPlay(!S.playing);
  else if (a === "mute") { S.muted = !S.muted; sync(); }
});

/* ---- letter (Screen 5) ---- */
function paint(i) { $("#ty").textContent = FULL.slice(0, i); $("#gh").textContent = FULL.slice(i); }
function type() {
  clearTimeout(T.type);
  if (reduce) return paint(FULL.length);
  let i = 0; paint(0);
  (function step() { paint(++i); if (i < FULL.length) T.type = setTimeout(step, 28); })();
}
$("#full").onclick = () => { clearTimeout(T.type); paint(FULL.length); };

/* ---- password (Screen 1) ---- */
$("#f").onsubmit = e => {
  e.preventDefault();
  if ($("#pw").value.trim() === CONFIG.password) {
    $("#err").textContent = "";
    $("#lock").classList.add("unlock"); $("#go").disabled = true;
    clearTimeout(T.unlock); T.unlock = setTimeout(() => show(2), 900);
  } else {
    $("#err").textContent = "Hmm, yeh date toh nahi hai madam 🙈 Hint: hamari pehli ‘yes’ wali tarikh.";
    if (!reduce) { const c = $("#c1"); c.classList.remove("shake"); void c.offsetWidth; c.classList.add("shake"); }
  }
};
$("#eye").onclick = () => {
  const p = $("#pw"), hid = p.type === "password";
  p.type = hid ? "text" : "password";
  $("#eye").setAttribute("aria-label", hid ? "Hide password" : "Show password");
};

/* ---- navigation ---- */
function show(n) {
  clearInterval(T.slide); clearTimeout(T.type); clearTimeout(T.unlock);
  S.playing = false; fx.stop();
  $$(".screen").forEach(s => {
    const a = +s.dataset.n === n;
    s.classList.toggle("active", a); s.inert = !a;
    if (a) s.scrollTop = 0;
  });
  S.screen = n; mb.hidden = n < 2;
  if (n === 2) fx.start("c");
  if (n === 4) { go(0); setPlay(true); }
  if (n === 5) type();
  if (n === 6) fx.start("f");
}
function reset() {
  S.muted = false; S.slideIndex = 0; sync(); A.pause();
  try { A.currentTime = 0; } catch (e) {}
  $("#pw").value = ""; $("#pw").type = "password"; $("#err").textContent = "";
  $("#lock").classList.remove("unlock"); $("#go").disabled = false; paint(0);
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-go]"); if (!b) return;
  b.disabled = true; setTimeout(() => { b.disabled = false; }, 600);
  const n = +b.dataset.go;
  if (b.dataset.m) playMusic();
  if (n === 1) reset();
  show(n);
});
sync(); paint(0);

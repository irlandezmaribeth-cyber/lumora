/* Lumora — atmosphere: drifting fireflies, cursor light, card tilt + spotlight,
   scroll reveals and click sparkles. Purely decorative; the store works without it,
   and everything calm-down for prefers-reduced-motion. */
(() => {
  const still = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;

  /* short search placeholder on phones */
  if (innerWidth < 800) document.getElementById("q").placeholder = "Search";

  /* ---------- fireflies ---------- */
  const cv = document.getElementById("ff"), cx = cv.getContext("2d");
  let W = 0, H = 0, dpr = 1, flies = [], run = true;
  const hues = ["255,200,110", "255,170,90", "214,170,255", "255,225,170"];
  const size = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(46, Math.max(16, W * H / 36000)));
    flies = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 1 + Math.random() * 2.2, a: Math.random() * 6.28,
      s: .12 + Math.random() * .35, t: Math.random() * 6.28, f: .01 + Math.random() * .02,
      c: hues[(Math.random() * hues.length) | 0]
    }));
  };
  const draw = () => {
    if (!run) return;
    cx.clearRect(0, 0, W, H);
    for (const p of flies) {
      p.a += (Math.random() - .5) * .08;
      p.x += Math.cos(p.a) * p.s; p.y += Math.sin(p.a) * p.s - .08;
      p.t += p.f;
      if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
      const k = .35 + .65 * (.5 + .5 * Math.sin(p.t * 6)), R = p.r * 7;
      const g = cx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R);
      g.addColorStop(0, `rgba(${p.c},${.9 * k})`);
      g.addColorStop(.25, `rgba(${p.c},${.28 * k})`);
      g.addColorStop(1, `rgba(${p.c},0)`);
      cx.fillStyle = g; cx.beginPath(); cx.arc(p.x, p.y, R, 0, 6.283); cx.fill();
    }
    requestAnimationFrame(draw);
  };
  size();
  addEventListener("resize", size);
  document.addEventListener("visibilitychange", () => { run = !document.hidden; if (run) draw(); });
  if (still) { draw(); run = false; } else draw();

  /* ---------- cursor light ---------- */
  const cg = document.getElementById("cg");
  if (fine && !still) {
    let mx = innerWidth / 2, my = innerHeight / 3, tx = mx, ty = my;
    addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; cg.classList.add("on"); }, { passive: true });
    document.addEventListener("mouseleave", () => cg.classList.remove("on"));
    (function loop() {
      mx += (tx - mx) * .12; my += (ty - my) * .12;
      cg.style.transform = `translate(${mx - 260}px,${my - 260}px)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- card tilt + spotlight ---------- */
  if (fine && !still) {
    let raf = 0;
    document.addEventListener("pointermove", e => {
      const a = e.target.closest && e.target.closest(".card .art, .tile");
      if (!a) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = a.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        a.style.setProperty("--mx", (x * 100) + "%"); a.style.setProperty("--my", (y * 100) + "%");
        a.style.setProperty("--ry", ((x - .5) * 9).toFixed(2) + "deg"); a.style.setProperty("--rx", ((.5 - y) * 9).toFixed(2) + "deg");
      });
    }, { passive: true });
    document.addEventListener("pointerout", e => {
      const a = e.target.closest && e.target.closest(".card .art, .tile");
      if (a && !a.contains(e.relatedTarget)) { a.style.setProperty("--rx", "0deg"); a.style.setProperty("--ry", "0deg"); }
    });
  }

  /* ---------- scroll reveals (views re-render, so watch #v) ---------- */
  const view = document.getElementById("v");
  if ("IntersectionObserver" in window && !still) {
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("seen"); io.unobserve(en.target); }
    }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
    const scan = () => {
      let i = 0;
      view.querySelectorAll(".card,.tile,.perks>div,.sh2,.ed>div,.promo,.empty").forEach(el => {
        if (el.dataset.rv) return;
        el.dataset.rv = 1; el.classList.add("rv");
        el.style.setProperty("--d", (i++ % 4) * .08 + "s");
        io.observe(el);
      });
    };
    new MutationObserver(scan).observe(view, { childList: true });
    scan();
  }

  /* ---------- click sparkles ---------- */
  if (!still) document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest(".cta,.heart,.heart2,.logo");
    if (!b) return;
    for (let i = 0; i < 9; i++) {
      const s = document.createElement("span");
      s.className = "spk"; s.textContent = i % 3 ? "✦" : "·";
      const ang = Math.random() * 6.283, d = 30 + Math.random() * 46;
      s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;--dx:${Math.cos(ang) * d}px;--dy:${Math.sin(ang) * d - 14}px;font-size:${10 + Math.random() * 12}px`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 900);
    }
  });
})();

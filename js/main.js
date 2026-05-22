/* =========================================================
   P.A.Z — main.js
   - Transição fade entre páginas
   - Hamburger menu mobile
   ========================================================= */

(() => {
  "use strict";

  const FADE_OUT_MS = 500;
  const FADE_IN_MS  = 500;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (sel) => document.querySelector(sel);

  /* ===========================================================
     1) Animação de entrada (fade-in ao carregar a página)
     =========================================================== */
  function playEnterAnimation() {
    if (prefersReducedMotion) return;
    const overlay = $("#pageTransition");
    if (!overlay) return;
    if (!sessionStorage.getItem("paz:incoming")) return;
    sessionStorage.removeItem("paz:incoming");

    overlay.classList.add("is-entering");
    void overlay.offsetWidth;
    requestAnimationFrame(() => {
      overlay.classList.add("is-revealing");
    });
    setTimeout(() => {
      overlay.classList.remove("is-entering", "is-revealing");
    }, FADE_IN_MS + 100);
  }

  /* ===========================================================
     2) Fade-out e navegação
     =========================================================== */
  function navigateWithFade(href) {
    if (prefersReducedMotion) { window.location.href = href; return; }
    const overlay = $("#pageTransition");
    if (!overlay) { window.location.href = href; return; }

    sessionStorage.setItem("paz:incoming", "1");
    overlay.classList.add("is-exiting");
    setTimeout(() => { window.location.href = href; }, FADE_OUT_MS + 60);
  }

  /* ===========================================================
     3) Interceptar cliques em links internos
     =========================================================== */
  function bindLinks() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-link]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      const isExternal = link.target === "_blank" || /^https?:\/\//i.test(href);
      if (isExternal) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
      const target = new URL(href, window.location.href);
      if (target.pathname === window.location.pathname) { e.preventDefault(); return; }
      e.preventDefault();
      navigateWithFade(target.href);
    });
  }

  /* ===========================================================
     4) Hamburger menu mobile
     =========================================================== */
  function bindNavToggle() {
    const toggle = $("#navToggle");
    const nav = document.querySelector(".nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ===========================================================
     5) Marcar item ativo no nav
     =========================================================== */
  function markActiveNav() {
    const current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav__link").forEach((link) => {
      const href = (link.getAttribute("href") || "").split("/").pop();
      link.classList.toggle("is-active", href === current);
    });
  }

  /* ===========================================================
     Boot
     =========================================================== */
  function boot() {
    bindLinks();
    bindNavToggle();
    markActiveNav();
    playEnterAnimation();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();

/* ===========================================================
   Audio Player
   - Tenta autoplay; se bloqueado aguarda primeiro gesto
   - Volume e mute persistem via localStorage entre páginas
   =========================================================== */
const AudioPlayer = (() => {
  const KEY = "paz:audio";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { volume: 0.2, muted: false }; }
    catch { return { volume: 0.2, muted: false }; }
  }

  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
  }

  function updateSliderFill(slider) {
    const pct = parseFloat(slider.value) * 100;
    slider.style.setProperty("--fill", pct + "%");
  }

  function updateUI(player, muted) {
    player.classList.toggle("is-muted", muted);
    const btn = player.querySelector(".audio-player__toggle");
    if (btn) btn.setAttribute("aria-label", muted ? "Ativar música" : "Mutar música");
  }

  function init() {
    const audio  = document.getElementById("bgAudio");
    const player = document.getElementById("audioPlayer");
    const toggle = document.getElementById("audioToggle");
    const slider = document.getElementById("volumeSlider");
    if (!audio || !player || !toggle || !slider) return;

    // Restaurar estado salvo
    const state = load();
    audio.volume = state.volume;
    audio.muted  = state.muted;
    slider.value = state.muted ? 0 : state.volume;
    updateSliderFill(slider);
    updateUI(player, state.muted || state.volume === 0);

    // Tentar autoplay
    const tryPlay = () => audio.play().catch(() => {});

    const p = audio.play();
    if (p !== undefined) {
      p.catch(() => {
        // Bloqueado pelo browser — mostrar hint, esperar gesto
        player.classList.add("is-blocked");
        const onGesture = () => {
          tryPlay();
          player.classList.remove("is-blocked");
          document.removeEventListener("click",      onGesture);
          document.removeEventListener("touchstart", onGesture);
          document.removeEventListener("keydown",    onGesture);
        };
        document.addEventListener("click",      onGesture, { once: true });
        document.addEventListener("touchstart", onGesture, { once: true, passive: true });
        document.addEventListener("keydown",    onGesture, { once: true });
      });
    }

    // Mute / unmute ao clicar no ícone
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const s = load();
      s.muted  = !s.muted;
      audio.muted  = s.muted;
      slider.value = s.muted ? 0 : s.volume;
      updateSliderFill(slider);
      save(s);
      updateUI(player, s.muted);
      if (!s.muted) tryPlay();
    });

    // Slider de volume
    slider.addEventListener("input", () => {
      const vol = parseFloat(slider.value);
      audio.volume = vol;
      audio.muted  = vol === 0;
      updateSliderFill(slider);
      const s = load();
      s.volume = vol > 0 ? vol : s.volume; // preserva último volume não-zero
      s.muted  = vol === 0;
      save(s);
      updateUI(player, vol === 0);
      if (vol > 0) tryPlay();
    });
  }

  return { init };
})();

// Adicionar ao boot
const _origBoot = typeof boot === "function" ? boot : null;
document.addEventListener("DOMContentLoaded", () => AudioPlayer.init());

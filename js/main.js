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

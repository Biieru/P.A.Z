/* =========================================================
   P.A.Z — main.js
   SPA Router + Audio Player + Nav
   ========================================================= */
(() => {
  "use strict";

  /* ===========================================================
     ROUTER SPA
     Troca apenas o conteúdo de #app-content via fetch().
     O header, áudio e atmosfera ficam vivos entre páginas.
     =========================================================== */
  const Router = (() => {
    const FADE_MS  = 460;
    const cache    = {};    // { pathname: DOMParser document }

    const appContent = () => document.getElementById("app-content");
    const overlay    = () => document.getElementById("pageTransition");

    /* Converte pathname em URL fetchável independente do ambiente */
    function toFetchURL(pathname) {
      // Em file://, precisa de URL relativa à localização real do documento
      if (window.location.protocol === "file:") {
        // Descobrir o diretório raiz do site (onde está o index.html)
        const base = window.location.href
          .split("?")[0]
          .replace(/\/[^/]*$/, "/")          // pasta do arquivo atual
          .replace(/\/pages\/$/, "/");       // se estiver em pages/, sobe um nível
        // Montar URL completa: base + pathname sem a barra inicial
        return base + pathname.replace(/^\//, "");
      }
      return pathname; // servidor: usa root-relative normalmente
    }

    /* Busca e parseia um HTML remoto */
    async function fetchDoc(pathname) {
      if (cache[pathname]) return cache[pathname];
      const url = toFetchURL(pathname);
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const html = await res.text();
      const doc  = new DOMParser().parseFromString(html, "text/html");
      cache[pathname] = doc;
      return doc;
    }

    /* Resolve URLs de <img> e <video> no conteúdo injetado para o contexto atual */
    function resolveMediaURLs(node, sourcePath) {
      // sourcePath = pathname da página de onde veio o conteúdo, ex: "/pages/esquadroes.html"
      const sourceDir = sourcePath.replace(/\/[^\/]*$/, "/"); // ex: "/pages/"

      node.querySelectorAll("img[src], video[src], source[src]").forEach(el => {
        const attr = el.getAttribute("src");
        if (!attr || attr.startsWith("http") || attr.startsWith("/") || attr.startsWith("data:")) return;
        // Montar URL absoluta a partir do diretório da página fonte
        try {
          const absolute = new URL(attr, window.location.origin + sourceDir).pathname;
          el.setAttribute("src", absolute);
        } catch {}
      });
    }

    /* Aplica estilos inline específicos da página (<style> no <head>) */
    function applyPageStyles(doc) {
      document.querySelectorAll("style[data-spa]").forEach(el => el.remove());
      doc.querySelectorAll("head > style").forEach(s => {
        const el = document.createElement("style");
        el.setAttribute("data-spa", "1");
        el.textContent = s.textContent;
        document.head.appendChild(el);
      });
    }

    /* Atualiza link ativo no nav */
    function updateNav(pathname) {
      const tail = pathname.replace(/\/$/, "") || "/";
      document.querySelectorAll(".nav__link").forEach(a => {
        const href = a.getAttribute("href") || "";
        // normaliza: remove trailing slash e compara
        const aPath = href.replace(/\/$/, "") || "/";
        a.classList.toggle("is-active", aPath === tail);
      });
    }

    /* Anima fade overlay */
    function fadeOut() {
      const el = overlay();
      if (!el) return Promise.resolve();
      el.classList.add("is-exiting");
      return new Promise(r => setTimeout(r, FADE_MS + 60));
    }

    function fadeIn() {
      const el = overlay();
      if (el) el.classList.remove("is-exiting");
    }

    /* Navegação principal */
    async function navigate(pathname, push = true) {
      // Sem shell SPA (#app-content) → navegação normal completa
      // Acontece quando o usuário acessa pages/*.html diretamente pelo navegador
      if (!appContent()) {
        window.location.href = pathname;
        return;
      }
      // Ignora mesma página
      const current = window.location.pathname.replace(/\/$/, "") || "/";
      const target  = pathname.replace(/\/$/, "") || "/";
      if (target === current && push) return;

      // Fecha nav mobile se estiver aberta
      closeNav();

      await fadeOut();

      try {
        // Home: o conteúdo já está no shell — re-injeta a partir do cache ou parse do index
        const fetchPath = (target === "/" || target.endsWith("index.html"))
          ? "/index.html"   // servidor
          : target;
        // Em file://, evitar pushState (pode falhar) — só atualiza o conteúdo

        const doc   = await fetchDoc(fetchPath);
        const main  = doc.querySelector("main");
        if (!main) throw new Error("No <main>");

        applyPageStyles(doc);

        // Swap conteúdo — resolver URLs de mídia para o contexto atual
        const app = appContent();
        if (app) {
          const cloned = main.cloneNode(true);
          resolveMediaURLs(cloned, fetchPath);
          app.innerHTML = "";
          app.appendChild(cloned);

          // Disparar evento de navegação para scripts externos (ex: vault.js)
          window.dispatchEvent(new CustomEvent("paz:pageload", { detail: { pathname } }));
        }

        // Título
        const title = doc.querySelector("title")?.textContent;
        if (title) document.title = title;

        // URL e estado
        // pushState não funciona em file:// — só executa em servidor
      if (push && window.location.protocol !== "file:") {
        history.pushState({ pathname: target }, title || "", target);
      }
        updateNav(target);
        window.scrollTo({ top: 0, behavior: "instant" });

      } catch (err) {
        console.warn("Router: fallback para navegação normal.", err);
        window.location.href = pathname;
        return;
      }

      fadeIn();
    }

    /* Prefetch silencioso ao idle */
    function prefetch() {
      if (!("requestIdleCallback" in window)) return;
      requestIdleCallback(() => {
        document.querySelectorAll("a[data-link]").forEach(a => {
          const href = a.getAttribute("href") || "";
          if (!href || href.startsWith("http") || href.startsWith("#")) return;
          try {
            const { pathname } = new URL(href, siteBase());
            if (!cache[pathname]) fetchDoc(pathname).catch(() => {});
          } catch {}
        });
      });
    }

    /* Base real do site (sempre a raiz, independente do pushState atual) */
    function siteBase() {
      if (window.location.protocol === "file:") {
        // Sobe até o diretório raiz do projeto (onde está index.html)
        const href = window.location.href.split("?")[0];
        const dir  = href.replace(/\/[^\/]*$/, "/");
        return dir.replace(/\/pages\/$/, "/"); // se estiver dentro de pages/, sobe
      }
      return window.location.origin + "/";
    }

    function init() {
      /* Intercepta cliques — sempre resolve relativo à raiz do site */
      document.addEventListener("click", e => {
        const a = e.target.closest("a[data-link]");
        if (!a) return;
        const href = a.getAttribute("href");
        if (!href) return;
        if (href.startsWith("#")) return;
        let parsed;
        try {
          // Usa siteBase() como base: evita o bug /pages/pages/X
          parsed = new URL(href, siteBase());
        } catch { return; }
        // Link externo? Deixa o browser tratar normalmente
        if (window.location.protocol !== "file:" && parsed.origin !== window.location.origin) return;
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
        e.preventDefault();
        navigate(parsed.pathname);
      });

      /* Botão voltar / avançar */
      window.addEventListener("popstate", e => {
        const p = e.state?.pathname || window.location.pathname;
        navigate(p, false);
      });

      /* Estado inicial */
      history.replaceState(
        { pathname: window.location.pathname },
        document.title,
        window.location.pathname
      );

      updateNav(window.location.pathname);
      prefetch();
    }

    return { init, navigate };
  })();

  /* ===========================================================
     NAV MOBILE — hamburger
     =========================================================== */
  function closeNav() {
    const nav    = document.querySelector(".nav");
    const toggle = document.getElementById("navToggle");
    if (!nav || !nav.classList.contains("is-open")) return;
    nav.classList.remove("is-open");
    if (toggle) {
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    document.body.style.overflow = "";
  }

  function initNav() {
    const toggle = document.getElementById("navToggle");
    const nav    = document.querySelector(".nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
  }

  /* ===========================================================
     AUDIO PLAYER
     O <audio id="bgAudio"> está no shell e nunca é removido.
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

    function fillSlider(slider) {
      slider.style.setProperty("--fill", (parseFloat(slider.value) * 100) + "%");
    }

    function updateUI(muted) {
      const player = document.getElementById("audioPlayer");
      const btn    = document.getElementById("audioToggle");
      if (player) player.classList.toggle("is-muted", muted);
      if (btn)    btn.setAttribute("aria-label", muted ? "Ativar música" : "Mutar música");
    }

    function init() {
      const audio  = document.getElementById("bgAudio");
      const toggle = document.getElementById("audioToggle");
      const slider = document.getElementById("volumeSlider");
      const player = document.getElementById("audioPlayer");
      if (!audio || !toggle || !slider) return;

      // Restaurar preferência
      const s = load();
      audio.volume = s.volume;
      audio.muted  = s.muted;
      slider.value = s.muted ? 0 : s.volume;
      fillSlider(slider);
      updateUI(s.muted || s.volume === 0);

      // Tentar autoplay
      const tryPlay = () => audio.play().catch(() => {});

      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {
          if (player) player.classList.add("is-blocked");
          const onGesture = () => {
            tryPlay();
            if (player) player.classList.remove("is-blocked");
          };
          document.addEventListener("click",      onGesture, { once: true });
          document.addEventListener("touchstart", onGesture, { once: true, passive: true });
        });
      }

      // Mute / unmute
      toggle.addEventListener("click", e => {
        e.stopPropagation();
        const st = load();
        st.muted     = !st.muted;
        audio.muted  = st.muted;
        slider.value = st.muted ? 0 : st.volume;
        fillSlider(slider);
        save(st);
        updateUI(st.muted);
        if (!st.muted) tryPlay();
      });

      // Volume
      slider.addEventListener("input", () => {
        const vol    = parseFloat(slider.value);
        audio.volume = vol;
        audio.muted  = vol === 0;
        fillSlider(slider);
        const st = load();
        if (vol > 0) st.volume = vol;
        st.muted = vol === 0;
        save(st);
        updateUI(vol === 0);
        if (vol > 0) tryPlay();
      });
    }

    return { init };
  })();

  /* ===========================================================
     BOOT
     =========================================================== */
  function boot() {
    Router.init();
    initNav();
    AudioPlayer.init();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();

/* =========================================================
   P.A.Z — main.js
   SPA Router + Audio Player + Nav
   ========================================================= */
(() => {
  "use strict";

  /* ===========================================================
     RAIZ DO SITE
     Derivada do src deste script (js/main.js), portanto estável
     mesmo depois de pushState. Funciona em file://, localhost e
     GitHub Pages (site servido em subdiretório, ex: /P.A.Z/).
     =========================================================== */
  const SITE_ROOT = (() => {
    const s = document.currentScript;
    if (s && s.src) return s.src.replace(/js\/main\.js.*$/, "");
    // Fallback: deriva da URL do documento
    const href = window.location.href.split(/[?#]/)[0];
    return href.replace(/\/[^/]*$/, "/").replace(/\/pages\/$/, "/");
  })();

  /* Exposto para outros scripts montarem caminhos de assets */
  window.PAZ_ROOT = SITE_ROOT;

  /* ===========================================================
     ROUTER SPA
     Troca apenas o conteúdo de #app-content via fetch().
     O header, áudio e atmosfera ficam vivos entre páginas.
     Todas as URLs internas são absolutas (resolvidas contra
     SITE_ROOT), imunes a mudanças de URL via pushState.
     =========================================================== */
  const Router = (() => {
    const FADE_MS = 460;
    const cache   = {};   // { href absoluto: Document }

    const appContent = () => document.getElementById("app-content");
    const overlay    = () => document.getElementById("pageTransition");

    const isHttp = () => /^https?:$/.test(window.location.protocol);

    /* Normaliza: a home tem duas formas (raiz e index.html) */
    function normalize(href) {
      const clean = href.split(/[?#]/)[0];
      return (clean === SITE_ROOT || clean === SITE_ROOT + "index.html")
        ? SITE_ROOT
        : clean;
    }

    /* Tem esquema explícito? (https:, mailto:, data:, …) */
    const hasScheme = str => /^[a-z][a-z0-9+.-]*:/i.test(str);

    /* Converte hrefs relativos de <a data-link> em absolutos,
       resolvidos contra baseHref */
    function absolutizeLinks(scope, baseHref) {
      scope.querySelectorAll("a[data-link]").forEach(a => {
        const raw = a.getAttribute("href");
        if (!raw || raw.startsWith("#") || hasScheme(raw)) return;
        try { a.setAttribute("href", new URL(raw, baseHref).href); } catch {}
      });
    }

    /* Resolve src de <img>/<video>/<source> do conteúdo injetado
       para o contexto da página de origem */
    function absolutizeMedia(node, baseHref) {
      node.querySelectorAll("img[src], video[src], source[src]").forEach(el => {
        const raw = el.getAttribute("src");
        if (!raw || raw.startsWith("/") || hasScheme(raw)) return;
        try { el.setAttribute("src", new URL(raw, baseHref).href); } catch {}
      });
    }

    /* Busca e parseia um HTML remoto */
    async function fetchDoc(href) {
      if (cache[href]) return cache[href];
      const res = await fetch(href);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const html = await res.text();
      const doc  = new DOMParser().parseFromString(html, "text/html");
      cache[href] = doc;
      return doc;
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
    function updateNav(href) {
      const target = normalize(href);
      document.querySelectorAll(".nav__link").forEach(a => {
        const raw = a.getAttribute("href") || "";
        let aHref;
        try { aHref = normalize(new URL(raw, SITE_ROOT).href); } catch { return; }
        a.classList.toggle("is-active", aHref === target);
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

    /* Navegação principal — href sempre absoluto */
    async function navigate(href, push = true) {
      // Sem shell SPA (#app-content) → navegação normal completa
      // Acontece quando o usuário acessa pages/*.html diretamente
      if (!appContent()) {
        window.location.href = href;
        return;
      }

      const target  = normalize(href);
      const current = normalize(window.location.href);
      if (target === current && push) return;

      closeNav();
      await fadeOut();

      try {
        // A raiz é servida como index.html
        const fetchHref = target === SITE_ROOT ? SITE_ROOT + "index.html" : target;

        const doc  = await fetchDoc(fetchHref);
        const main = doc.querySelector("main");
        if (!main) throw new Error("No <main>");

        applyPageStyles(doc);

        const app = appContent();
        if (app) {
          const cloned = main.cloneNode(true);
          absolutizeMedia(cloned, fetchHref);
          absolutizeLinks(cloned, fetchHref);
          app.innerHTML = "";
          app.appendChild(cloned);

          // Disparar evento de navegação para scripts externos (ex: vault.js)
          window.dispatchEvent(new CustomEvent("paz:pageload", { detail: { href: target } }));

          // Atualizar data-page no body para CSS (fundo escuro em páginas internas)
          document.body.dataset.page = (target === SITE_ROOT)
            ? "home"
            : target.slice(SITE_ROOT.length).replace(/^pages\//, "").replace(/\.html$/, "");
        }

        // Título
        const title = doc.querySelector("title")?.textContent;
        if (title) document.title = title;

        // URL e estado — pushState não funciona em file://
        if (push && isHttp()) {
          history.pushState({ href: target }, title || "", target);
        }
        updateNav(target);
        window.scrollTo({ top: 0, behavior: "instant" });

      } catch (err) {
        console.warn("Router: fallback para navegação normal.", err);
        window.location.href = href;
        return;
      }

      fadeIn();
    }

    /* Prefetch silencioso ao idle */
    function prefetch() {
      if (!("requestIdleCallback" in window) || !isHttp()) return;
      requestIdleCallback(() => {
        document.querySelectorAll("a[data-link]").forEach(a => {
          const href = a.getAttribute("href") || "";
          if (!href.startsWith(SITE_ROOT)) return;
          const target = normalize(href);
          const fetchHref = target === SITE_ROOT ? SITE_ROOT + "index.html" : target;
          if (!cache[fetchHref]) fetchDoc(fetchHref).catch(() => {});
        });
      });
    }

    function init() {
      /* Resolver os links do shell contra a URL real do documento,
         antes de qualquer pushState */
      absolutizeLinks(document, window.location.href);

      /* Intercepta cliques em links internos */
      document.addEventListener("click", e => {
        const a = e.target.closest("a[data-link]");
        if (!a) return;
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
        const href = a.getAttribute("href");
        if (!href || href.startsWith("#")) return;
        // Fora do site? Deixa o browser tratar normalmente
        if (!href.startsWith(SITE_ROOT)) return;
        e.preventDefault();
        navigate(href);
      });

      /* Botão voltar / avançar */
      window.addEventListener("popstate", e => {
        navigate(e.state?.href || window.location.href, false);
      });

      /* Estado inicial */
      if (isHttp()) {
        history.replaceState(
          { href: normalize(window.location.href) },
          document.title,
          window.location.href
        );
      }

      updateNav(window.location.href);
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

/* =========================================================
   grande-salao.js — Área Restrita P.A.Z
   SEGURANÇA: login front-end apenas. Para autenticação real,
   substitua gsVerify() por chamada à sua API de backend.
   ========================================================= */

/* ===========================================================
   CREDENCIAIS TEMPORÁRIAS — TROCAR POR AUTENTICAÇÃO REAL
   =========================================================== */
var GS_USER = "Teste123";
var GS_CODE = "Teste852.";
var GS_SESSION_KEY = "paz:grandeSalao";

/* ---- Auth ---- */
function gsVerify(user, code) { return user === GS_USER && code === GS_CODE; }
function gsIsAuthed() { try { return sessionStorage.getItem(GS_SESSION_KEY) === "1"; } catch { return false; } }
function gsSetAuth(val) { try { val ? sessionStorage.setItem(GS_SESSION_KEY,"1") : sessionStorage.removeItem(GS_SESSION_KEY); } catch {} }

/* ---- Views ---- */
function gsShowLogin(msg) {
  var login = document.getElementById("gs-login");
  var content = document.getElementById("gs-content");
  var err = document.getElementById("gs-error");
  if (login)   login.style.display   = "";
  if (content) content.style.display = "none";
  if (err)     err.style.display     = msg ? "block" : "none";
  if (err && msg) err.textContent    = msg;
}
function gsShowContent() {
  var login = document.getElementById("gs-login");
  var content = document.getElementById("gs-content");
  if (login)   login.style.display   = "none";
  if (content) content.style.display = "block";
}

/* ---- Handlers ---- */
function gsHandleLogin(e) {
  e.preventDefault();
  var u = document.getElementById("gs-user-input");
  var c = document.getElementById("gs-code-input");
  if (!u || !c) return;
  if (gsVerify(u.value.trim(), c.value.trim())) {
    gsSetAuth(true); gsShowContent();
  } else {
    gsShowLogin("Acesso negado. Apenas membros autorizados podem entrar no Grande Salão.");
  }
}
function gsHandleLogout() {
  gsSetAuth(false);
  var u = document.getElementById("gs-user-input"); if (u) u.value = "";
  var c = document.getElementById("gs-code-input"); if (c) c.value = "";
  gsShowLogin();
}

/* =========================================================
   EXPORTAÇÃO — PNG e PDF via html2canvas + jsPDF
   ========================================================= */

/* CSS com valores explícitos para html2canvas
   (resolve CSS vars que html2canvas não interpreta) */
var GS_CAPTURE_CSS = [
  ".gs-section-actions{display:none!important}",
  ".gs-section__title{color:#e8c878!important;font-family:'Cinzel',Georgia,serif!important}",
  ".gs-section__desc{color:#a89878!important}",
  ".gs-section__note{color:#a89878!important}",
  ".gs-table-container{background:#050a10!important;border:1px solid rgba(201,169,97,0.35)!important}",
  ".gs-table th{background:#192d0c!important;color:#e8c878!important;font-family:'Cinzel',Georgia,serif!important;vertical-align:middle!important;text-align:center!important;padding:11px 14px!important}",
  ".gs-table th:first-child{text-align:left!important}",
  ".gs-table td{color:#d8cba8!important;font-family:'Cinzel',Georgia,serif!important;font-size:13px!important;vertical-align:middle!important;text-align:center!important;padding:9px 14px!important}",
  ".gs-table td:first-child{color:#e0d5b5!important;text-align:left!important;vertical-align:middle!important}",
  ".gs-table tbody tr{background:#050a10!important}",
  ".gs-table tbody tr:nth-child(even){background:#08101e!important}",
  ".gs-table tbody tr:hover{background:#050a10!important}",
  ".diff-mf{color:#b0e0b0!important}",
  ".diff-f{color:#8fd48f!important}",
  ".diff-mef{color:#6fc46f!important}",
  ".diff-m{color:#d4a840!important}",
  ".diff-md{color:#f0b040!important}",
  ".diff-d{color:#e07830!important}",
  ".diff-di{color:#e05050!important}",
  ".diff-i{color:#c040d0!important}",
  ".sal-fixed{color:#4ac0ff!important;font-weight:600!important;text-align:right!important}",
  ".sal-mult{color:#d4a840!important;text-align:center!important}",
  ".loja-cat{color:#a89878!important;font-style:italic!important}",
  ".loja-price{color:#d8cba8!important;text-align:right!important}",
  ".loja-rare{color:#c049d4!important;font-weight:600!important}",
  ".em-dash{color:#6a6a6a!important}",
  ".gs-pillar__title{color:#e8c878!important;font-family:'Cinzel Decorative','Cinzel',Georgia,serif!important}",
  ".gs-pillar__text,.gs-pillar__list,.gs-archive-intro,.gs-philosophy p{color:#d8cba8!important}",
  ".gs-callout{color:#e8c878!important;border:1px solid rgba(201,169,97,0.35)!important;background:rgba(201,169,97,0.06)!important}",
  ".gs-armatus__intro,.gs-armatus__coin{background:#08101e!important;border:1px solid rgba(201,169,97,0.28)!important}",
  ".gs-panel{background:#08101e!important;border:1px solid rgba(201,169,97,0.28)!important}",
  ".gs-panel__title--gold{color:#e8c878!important}",
  ".gs-panel__title--cyan{color:#4ac0ff!important}",
  ".gs-armatus__coin-label{color:#e8c878!important}",
  ".gs-armatus__intro p,.gs-armatus__coin p,.gs-cmd__desc,.gs-armatus__rules li{color:#d8cba8!important}",
  ".gs-armatus__staff-note{color:#e0d5b5!important;background:rgba(224,80,80,0.08)!important}",
  ".gs-cmd{color:#4ac0ff!important;background:#050a10!important;border:1px solid rgba(74,192,255,0.35)!important}",
  ".gs-cmd__list li,.gs-cmd__label{color:#a89878!important}",
  ".gs-accordion__item{background:#050a10!important;border:1px solid rgba(201,169,97,0.22)!important}",
  ".gs-accordion__item>summary{color:#4ac0ff!important;background:#08101e!important}",
  ".gs-subsection__title{color:#4ac0ff!important}",
  ".gs-pass-tier--bronze{color:#cd7f32!important}",
  ".gs-pass-tier--prata{color:#c8d0d8!important}",
  ".gs-pass-tier--ouro{color:#e8c878!important}",
  ".gs-pass-tier--diamante{color:#7ec8ff!important}",
  ".gs-pass-bonus{color:#4ac0ff!important}",
  ".gs-pass-extras li{color:#a89878!important}",
  ".gs-priority-list li{color:#e0d5b5!important;border-bottom:1px solid rgba(201,169,97,0.15)!important}",
  ".gs-medal-placeholder{color:#a89878!important;border:1px dashed rgba(201,169,97,0.35)!important}",
  ".gs-table{min-width:unset!important;width:100%!important;border-collapse:collapse!important}"
].join("\n");

/* Toast de loading */
function gsShowLoading(msg) {
  var t = document.getElementById("gs-toast") || (function() {
    var el = document.createElement("div");
    el.id = "gs-toast";
    el.style.cssText = "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(5,8,16,0.97);border:1px solid rgba(201,169,97,0.5);color:#e8c878;font-family:'Cinzel',sans-serif;font-size:11px;letter-spacing:0.25em;padding:12px 28px;z-index:9999;pointer-events:none;transition:opacity 0.3s;";
    document.body.appendChild(el);
    return el;
  })();
  if (msg) { t.textContent = msg; t.style.opacity = "1"; t.style.display = "block"; }
  else     { t.style.opacity = "0"; setTimeout(function(){ t.style.display="none"; }, 320); }
}

/* Carregar html2canvas e jsPDF sob demanda */
function gsLoadLibs(needPDF, cb) {
  var toLoad = [];
  if (typeof html2canvas === "undefined")
    toLoad.push("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
  if (needPDF && typeof window.jspdf === "undefined")
    toLoad.push("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
  if (!toLoad.length) { cb(); return; }
  var done = 0;
  toLoad.forEach(function(url) {
    var s = document.createElement("script");
    s.src = url;
    s.onload = function() { if (++done === toLoad.length) cb(); };
    s.onerror = function() {
      gsShowLoading(null);
      alert("Falha ao carregar biblioteca de exportação. Verifique sua conexão.");
    };
    document.head.appendChild(s);
  });
}

/* Capturar elemento com html2canvas aplicando override de cores */
function gsCapture(el, onCanvas) {
  var override = document.createElement("style");
  override.id = "gs-export-override";
  override.textContent = GS_CAPTURE_CSS;
  document.head.appendChild(override);

  var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  fontsReady.then(function() {
    html2canvas(el, {
      backgroundColor: "#050810",
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      imageTimeout: 0
    }).then(function(canvas) {
      override.remove();
      onCanvas(canvas);
    }).catch(function(err) {
      override.remove();
      gsShowLoading(null);
      alert("Erro ao capturar imagem: " + err.message);
    });
  });
}

/* Canvas → download PNG */
function gsCanvasToPNG(canvas, fileName) {
  var a = document.createElement("a");
  a.download = fileName + ".png";
  a.href = canvas.toDataURL("image/png");
  a.click();
}

/* Canvas → download PDF direto (sem dialog) */
function gsCanvasToPDF(canvas, fileName) {
  var jsPDF = window.jspdf.jsPDF;
  /* Dimensões em px (canvas é 2× → dividir por 2) */
  var w = canvas.width  / 2;
  var h = canvas.height / 2;
  var pdf = new jsPDF({
    orientation: w >= h ? "l" : "p",
    unit: "px",
    format: [w, h],   /* página com exatamente as dimensões do conteúdo */
    compress: true
  });
  /* Imagem ocupa a página inteira — zero borda branca */
  pdf.addImage(canvas, "PNG", 0, 0, w, h);
  pdf.save(fileName + ".pdf");
}

/* ---- Exports públicos ---- */

function gsExportSectionPNG(sectionId, fileName) {
  var el = document.getElementById(sectionId); if (!el) return;
  gsShowLoading("GERANDO PNG...");
  gsLoadLibs(false, function() {
    gsCapture(el, function(canvas) {
      gsShowLoading(null);
      gsCanvasToPNG(canvas, "paz-" + (fileName || sectionId));
    });
  });
}

function gsExportSectionPDF(sectionId, fileName) {
  var el = document.getElementById(sectionId); if (!el) return;
  gsShowLoading("GERANDO PDF...");
  gsLoadLibs(true, function() {
    gsCapture(el, function(canvas) {
      gsShowLoading(null);
      gsCanvasToPDF(canvas, "paz-" + (fileName || sectionId));
    });
  });
}

function gsExportPNG() { gsExportSectionPNG("gs-tables-area", "grande-salao-completo"); }
function gsExportPDF() { gsExportSectionPDF("gs-tables-area", "grande-salao-completo"); }

/* =========================================================
   GERADOR DE CONTRATOS — SPA-safe
   ========================================================= */
var GS_CONTRACT_HTML2CANVAS = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
var GS_CONTRACT_JSPDF = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
var GS_CONTRACT_TEMPLATE_URL = (window.PAZ_ROOT || "../") + "assets/images/template.png?v=20260526-04";
var GS_CONTRACT_EMBED_ICON_URL = "https://i.imgur.com/EZWCQ4s.png";
var GS_CONTRACT_MARKDOWN_CLAUSE = "Abandono resulta em consquências graves, que vão desde multas, perda temporária de acesso ao quadro de contratos, caçadas ou expulsão. A liderança da P.A.Z não se responsabiliza por perdas causadas por imprudência ou abandono de formação. Porém traições serão diretamente resolvidas pelo alto escalão da P.A.Z.";
var gsContractResolvedImgSrc = null;
var gsContractCaptureBusy = false;
var gsContractBuildPromise = null;
var gsContractPreviewCanvas = null;
var gsContractPreviewPromise = null;
var gsContractMode = "export";
var gsContractEmbedPayload = null;
var gsContractMarkdownContent = null;

function gsContractEl(id) { return document.getElementById(id); }
function gsContractEls(sel) { return document.querySelectorAll(sel); }

function gsContractLoadLibs(needPDF, onReady, onError) {
  var toLoad = [];
  if (typeof html2canvas === "undefined") toLoad.push(GS_CONTRACT_HTML2CANVAS);
  if (needPDF && typeof window.jspdf === "undefined") toLoad.push(GS_CONTRACT_JSPDF);
  if (!toLoad.length) { onReady(); return; }

  var done = 0;
  function handleDone() {
    done += 1;
    if (done === toLoad.length) onReady();
  }

  toLoad.forEach(function(url) {
    var existing = document.querySelector('script[src="' + url + '"]');
    if (existing) {
      if (existing.dataset.gsLoaded === "1") { handleDone(); return; }
      existing.addEventListener("load", handleDone, { once: true });
      existing.addEventListener("error", function() {
        if (onError) onError();
      }, { once: true });
      return;
    }

    var s = document.createElement("script");
    s.src = url;
    s.onload = function() {
      s.dataset.gsLoaded = "1";
      handleDone();
    };
    s.onerror = function() {
      if (onError) onError();
    };
    document.head.appendChild(s);
  });
}

function gsContractShowStep(step) {
  gsContractEls(".contract-step-btn").forEach(function(btn) {
    btn.classList.toggle("active", btn.dataset.step === step);
  });
  var panelForm = gsContractEl("contract-panel-form");
  var panelPreview = gsContractEl("contract-panel-preview");
  var panelMarkdown = gsContractEl("contract-panel-markdown");
  if (panelForm) panelForm.classList.toggle("active", step === "form");
  if (panelPreview) panelPreview.classList.toggle("active", step === "preview");
  if (panelMarkdown) panelMarkdown.classList.toggle("active", step === "markdown");
}

function gsContractApplyModalMode() {
  var overlay = gsContractEl("contractOverlay");
  var sub = gsContractEl("contract-modal-sub");
  var exportActions = gsContractEl("contract-export-actions");
  var previewWrap = gsContractEl("contract-preview-wrap");
  var panelForm = gsContractEl("contract-panel-form");
  var loading = gsContractEl("contract-loading");
  var imgUrlField = gsContractEl("cf-img-url");
  var isEmbed = gsContractMode === "embed";

  if (overlay) overlay.dataset.contractMode = gsContractMode;
  if (panelForm) panelForm.classList.toggle("is-embed-form", isEmbed);
  if (exportActions) exportActions.classList.toggle("is-embed-mode", isEmbed);
  if (previewWrap) previewWrap.classList.toggle("is-embed-mode", isEmbed);
  if (loading) loading.textContent = isEmbed ? "Gerando contrato..." : "Gerando contrato...";
  if (imgUrlField) {
    imgUrlField.placeholder = isEmbed
      ? "Cole a URL pública (https://) da imagem do alvo..."
      : "Cole a URL de uma imagem...";
  }
  if (sub) {
    sub.textContent = isEmbed
      ? "Formato Embed — Quadro de Contratos Abissais — P.A.Z"
      : "Exportação PNG/PDF — Quadro de Contratos Abissais — P.A.Z";
  }
}

function gsContractClearEmbedLocalImage() {
  var fileField = gsContractEl("cf-img-file");
  if (fileField) fileField.value = "";
  if (gsContractResolvedImgSrc && gsContractResolvedImgSrc.indexOf("data:") === 0) {
    gsContractResolvedImgSrc = null;
    gsContractSetImgPreview(null);
  }
}

function gsContractSyncEmbedColorFromPicker() {
  var picker = gsContractEl("cf-embed-color");
  var hex = gsContractEl("cf-embed-color-hex");
  if (picker && hex) hex.value = picker.value.toUpperCase();
}

function gsContractSyncEmbedColorFromHex() {
  var picker = gsContractEl("cf-embed-color");
  var hex = gsContractEl("cf-embed-color-hex");
  if (!picker || !hex) return;
  var value = hex.value.trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    picker.value = value.toLowerCase();
    hex.value = value.toUpperCase();
  }
}

function gsContractGetEmbedColor() {
  var picker = gsContractEl("cf-embed-color");
  if (picker && /^#[0-9A-Fa-f]{6}$/.test(picker.value)) return picker.value.toUpperCase();
  return "#0C1F31";
}

function gsContractHexToDiscordColor(hex) {
  var cleaned = (hex || "#0C1F31").replace("#", "");
  return parseInt(cleaned, 16);
}

function gsContractOpenModal(mode) {
  gsContractMode = mode === "embed" ? "embed" : "export";
  var overlay = gsContractEl("contractOverlay");
  if (!overlay) return;
  if (gsContractMode === "embed") gsContractClearEmbedLocalImage();
  gsContractApplyModalMode();
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
  gsContractShowStep("form");
}

function gsContractCloseModal() {
  var overlay = gsContractEl("contractOverlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

function gsContractSetImgPreview(src) {
  var preview = gsContractEl("cf-img-preview");
  if (!preview) return;
  if (src) {
    preview.src = src;
    preview.style.display = "block";
  } else {
    preview.src = "";
    preview.style.display = "none";
  }
}

function gsContractPrimeTemplate() {
  var img = new Image();
  img.src = GS_CONTRACT_TEMPLATE_URL;
}

function gsContractEnsureTemplateOverlay(root) {
  var overlay = root ? root.querySelector("#cr-template-overlay") : gsContractEl("cr-template-overlay");
  if (!overlay) return;
  if (overlay.getAttribute("src") !== GS_CONTRACT_TEMPLATE_URL) {
    overlay.setAttribute("src", GS_CONTRACT_TEMPLATE_URL);
  }
  overlay.setAttribute("crossorigin", "anonymous");
}

function gsContractWaitForImages(root) {
  var imgs = Array.prototype.slice.call((root || document).querySelectorAll("img"));
  if (!imgs.length) return Promise.resolve();

  return Promise.all(imgs.map(function(img) {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    return new Promise(function(resolve) {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    });
  }));
}

function gsContractWaitForFonts() {
  if (!document.fonts) return Promise.resolve();

  var loads = [
    document.fonts.load('16px "EB Garamond"'),
    document.fonts.load('700 16px "Cinzel"'),
    document.fonts.load('900 88px "Cinzel Black"'),
    document.fonts.load('700 16px "Cormorant Garamond"'),
    document.fonts.load('600 16px "Cormorant Garamond"')
  ];

  return Promise.all(loads.concat([document.fonts.ready])).catch(function() {
    return document.fonts.ready;
  }).then(function() {
    return new Promise(function(resolve) {
      requestAnimationFrame(function() {
        requestAnimationFrame(resolve);
      });
    });
  });
}

function gsContractCreateCaptureClone(render) {
  var clone = render.cloneNode(true);
  clone.id = "contract-render-capture";
  clone.classList.add("contract-render-surface");
  clone.style.position = "fixed";
  clone.style.top = "0";
  clone.style.left = "-10000px";
  clone.style.width = "900px";
  clone.style.height = "1271px";
  clone.style.margin = "0";
  clone.style.pointerEvents = "none";
  clone.style.zIndex = "-1";
  document.body.appendChild(clone);
  return clone;
}

function gsContractCaptureNode(node) {
  return html2canvas(node, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
    backgroundColor: "#d7c19a",
    logging: false,
    imageTimeout: 15000,
    width: 900,
    height: 1271
  });
}

function gsContractCanvasLooksBlank(canvas) {
  if (!canvas || !canvas.width || !canvas.height) return true;

  var ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return true;

  var bg = [215, 193, 154];
  var nearBg = 0;
  var samples = 0;

  for (var y = 40; y < canvas.height; y += 140) {
    for (var x = 40; x < canvas.width; x += 140) {
      var px = ctx.getImageData(x, y, 1, 1).data;
      samples += 1;
      if (
        Math.abs(px[0] - bg[0]) < 8 &&
        Math.abs(px[1] - bg[1]) < 8 &&
        Math.abs(px[2] - bg[2]) < 8 &&
        px[3] > 245
      ) {
        nearBg += 1;
      }
    }
  }

  return samples > 0 && nearBg / samples > 0.96;
}

function gsContractAbsoluteUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  var origin = window.location.origin || "";
  return origin + (path.charAt(0) === "/" ? path : "/" + path);
}

function gsContractFieldValue(formId) {
  var field = gsContractEl(formId);
  var value = field && field.value ? field.value.trim() : "";
  return value || "—";
}

function gsContractTruncate(value, max) {
  var text = (value || "").trim();
  if (!text) return "—";
  if (text.length <= max) return text;
  return text.slice(0, max - 1) + "…";
}

function gsContractResolvePublicImageUrl() {
  var urlField = gsContractEl("cf-img-url");
  var urlValue = urlField && urlField.value ? urlField.value.trim() : "";

  if (/^https?:\/\//i.test(urlValue)) return urlValue;
  if (gsContractMode !== "embed" && gsContractResolvedImgSrc && /^https?:\/\//i.test(gsContractResolvedImgSrc)) {
    return gsContractResolvedImgSrc;
  }
  return "";
}

function gsContractReadFormData() {
  return {
    tipo: gsContractFieldValue("cf-tipo"),
    rank: gsContractFieldValue("cf-rank"),
    alvo: gsContractFieldValue("cf-alvo"),
    descricao: gsContractFieldValue("cf-descricao"),
    dicas: gsContractFieldValue("cf-dicas"),
    participantes: gsContractFieldValue("cf-participantes"),
    tempo: gsContractFieldValue("cf-tempo"),
    recompensa: gsContractFieldValue("cf-recompensa"),
    reportar: gsContractFieldValue("cf-reportar"),
    embedColor: gsContractGetEmbedColor(),
    imageUrl: gsContractResolvePublicImageUrl()
  };
}

function gsContractBuildDiscordEmbed(data) {
  var embed = {
    title: "☩ P.A.Z — Contrato de Missão Abissal",
    color: gsContractHexToDiscordColor(data.embedColor),
    author: {
      name: "Quadro de Contratos Abissais",
      icon_url: GS_CONTRACT_EMBED_ICON_URL
    },
    fields: [
      { name: "Tipo de Trabalho", value: gsContractTruncate(data.tipo, 256), inline: true },
      { name: "Rank da Missão", value: data.rank !== "—" ? "**Rank " + data.rank + "**" : "—", inline: true },
      { name: "Alvo / Objetivo", value: gsContractTruncate(data.alvo, 1024), inline: false },
      { name: "Descrição da Missão", value: gsContractTruncate(data.descricao, 1024), inline: false },
      { name: "Dicas e Informações", value: gsContractTruncate(data.dicas, 1024), inline: false },
      { name: "Nº de Participantes", value: gsContractTruncate(data.participantes, 256), inline: true },
      { name: "Tempo Limite", value: gsContractTruncate(data.tempo, 256), inline: true },
      { name: "Recompensa", value: gsContractTruncate(data.recompensa, 1024), inline: false },
      { name: "Reportar À", value: gsContractTruncate(data.reportar, 256), inline: false }
    ],
    footer: {
      text: "P.A.Z — Predators of the Abyssal Zone · Cláusula Abissal: abandono resulta em caçada."
    },
    timestamp: new Date().toISOString()
  };

  if (data.imageUrl) {
    embed.image = { url: data.imageUrl };
  }

  return embed;
}

function gsContractBuildEmbedPayload(data) {
  return { embeds: [gsContractBuildDiscordEmbed(data)] };
}

function gsContractEscapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function gsContractFormatEmbedPreviewValue(value) {
  return gsContractEscapeHtml(value || "—").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function gsContractRenderEmbedPreview(payload, data) {
  var card = gsContractEl("contract-embed-card");
  var jsonField = gsContractEl("contract-embed-json");
  var note = gsContractEl("contract-embed-note");
  var wrap = gsContractEl("contract-preview-wrap");
  if (!card || !jsonField || !wrap) return;

  var embed = payload.embeds[0];
  var fieldsHtml = embed.fields.map(function(field) {
    var full = field.inline ? "" : " contract-embed-card__field--full";
    return (
      '<div class="contract-embed-card__field' + full + '">' +
        '<div class="contract-embed-card__field-name">' + gsContractEscapeHtml(field.name) + '</div>' +
        '<div class="contract-embed-card__field-value">' + gsContractFormatEmbedPreviewValue(field.value) + '</div>' +
      '</div>'
    );
  }).join("");

  var imageHtml = embed.image && embed.image.url
    ? '<img class="contract-embed-card__image" src="' + gsContractEscapeHtml(embed.image.url) + '" alt="Imagem do alvo" />'
    : "";

  card.innerHTML =
    '<div class="contract-embed-card__author">' +
      '<img src="' + gsContractEscapeHtml(embed.author.icon_url) + '" alt="" />' +
      '<div class="contract-embed-card__author-name">' + gsContractEscapeHtml(embed.author.name) + '</div>' +
    '</div>' +
    '<div class="contract-embed-card__title">' + gsContractEscapeHtml(embed.title) + '</div>' +
    '<div class="contract-embed-card__fields">' + fieldsHtml + '</div>' +
    imageHtml +
    '<div class="contract-embed-card__footer">' + gsContractEscapeHtml(embed.footer.text) + '</div>';

  card.style.borderLeftColor = data.embedColor || "#0C1F31";
  jsonField.value = JSON.stringify(payload, null, 2);
  gsContractEmbedPayload = payload;

  if (note) {
    note.hidden = true;
    note.textContent = "";
  }

  wrap.classList.add("is-embed-mode");
  wrap.classList.remove("is-frozen");
}

function gsContractCopyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }

  return new Promise(function(resolve, reject) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      resolve();
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(area);
    }
  });
}

function gsContractCopyEmbed() {
  var jsonField = gsContractEl("contract-embed-json");
  var text = jsonField && jsonField.value ? jsonField.value : (gsContractEmbedPayload ? JSON.stringify(gsContractEmbedPayload, null, 2) : "");
  if (!text) {
    alert("Gere a pré-visualização antes de copiar o embed.");
    return;
  }

  gsContractCopyText(text).then(function() {
    gsShowLoading("EMBED COPIADO");
    setTimeout(function() { gsShowLoading(""); }, 1800);
  }).catch(function() {
    alert("Não foi possível copiar automaticamente. Selecione e copie o JSON manualmente.");
  });
}

function gsContractFormatMarkdownInline(value) {
  var text = (value || "").trim();
  if (!text || text === "—") return "—";
  return text.replace(/`/g, "'");
}

function gsContractFormatMarkdownRank(rank) {
  if (!rank || rank === "—") return "—";
  if (/^rank\s+/i.test(rank)) return rank;
  return "Rank " + rank;
}

function gsContractMarkdownBlockValue(value) {
  var text = (value || "").trim();
  if (!text || text === "—") return "—";
  return text.replace(/\s+/g, " ").replace(/`/g, "'");
}

function gsContractMarkdownCodeLine(value) {
  return "> `" + gsContractFormatMarkdownInline(value) + "`";
}

function gsContractBuildDiscordMarkdown(data) {
  var descricao = gsContractMarkdownBlockValue(data.descricao === "—" ? "" : data.descricao);
  var dicas = gsContractMarkdownBlockValue(data.dicas === "—" ? "" : data.dicas);
  var imageValue = data.imageUrl || "—";

  return [
    "> -# Quadro de Contrato Abissal P.A.Z",
    "> ## Identificação da Missão",
    "> **Tipo de Trabalho**  ",
    gsContractMarkdownCodeLine(data.tipo),
    "> **Rank da Missão**  ",
    "> `" + gsContractFormatMarkdownRank(data.rank) + "`",
    "> **Alvo / Objetivo**  ",
    gsContractMarkdownCodeLine(data.alvo),
    "> ",
    "> ## Descrição da Missão",
    "> `" + descricao + "`",
    "> ",
    "> ## Informações Relevantes",
    "> `" + dicas + "`",
    "> ",
    "> ## Requisitos Operacionais",
    "> **Número de Participantes:** `" + gsContractFormatMarkdownInline(data.participantes) + "`  ",
    "> **Tempo Limite:** `" + gsContractFormatMarkdownInline(data.tempo) + "`  ",
    "> **Recompensa:** `" + gsContractFormatMarkdownInline(data.recompensa) + "`  ",
    "> **Responsável pelo Relatório:** `" + gsContractFormatMarkdownInline(data.reportar) + "`",
    "```yaml",
    "#Cláusula Abissal: ",
    GS_CONTRACT_MARKDOWN_CLAUSE,
    "```",
    "> ### Alvo: " + imageValue
  ].join("\n");
}

function gsContractRenderMarkdownBlock(value) {
  return '<div class="contract-md-field"><span class="contract-md-inline">' +
    gsContractEscapeHtml(gsContractMarkdownBlockValue(value === "—" ? "" : value)) +
  "</span></div>";
}

function gsContractRenderMarkdownPreviewCard(data) {
  var preview = gsContractEl("contract-markdown-preview");
  if (!preview) return;

  var imageValue = data.imageUrl || "—";
  var imageHtml = /^https?:\/\//i.test(imageValue)
    ? '<div class="contract-md-alvo">Alvo: <a href="' + gsContractEscapeHtml(imageValue) + '" target="_blank" rel="noopener noreferrer">' +
      gsContractEscapeHtml(imageValue) + '</a><img src="' + gsContractEscapeHtml(imageValue) + '" alt="Imagem do alvo" /></div>'
    : '<div class="contract-md-alvo">Alvo: ' + gsContractEscapeHtml(imageValue) + "</div>";

  preview.innerHTML =
    '<div class="contract-md-quote">' +
      '<div class="contract-md-kicker">Quadro de Contrato Abissal P.A.Z</div>' +
      '<div class="contract-md-section">Identificação da Missão</div>' +
      '<div class="contract-md-field"><strong>Tipo de Trabalho</strong><span class="contract-md-inline">' + gsContractEscapeHtml(gsContractFormatMarkdownInline(data.tipo)) + "</span></div>" +
      '<div class="contract-md-field"><strong>Rank da Missão</strong><span class="contract-md-inline">' + gsContractEscapeHtml(gsContractFormatMarkdownRank(data.rank)) + "</span></div>" +
      '<div class="contract-md-field"><strong>Alvo / Objetivo</strong><span class="contract-md-inline">' + gsContractEscapeHtml(gsContractFormatMarkdownInline(data.alvo)) + "</span></div>" +
    "</div>" +
    '<div class="contract-md-quote">' +
      '<div class="contract-md-section">Descrição da Missão</div>' +
      gsContractRenderMarkdownBlock(data.descricao) +
    "</div>" +
    '<div class="contract-md-quote">' +
      '<div class="contract-md-section">Informações Relevantes</div>' +
      gsContractRenderMarkdownBlock(data.dicas) +
    "</div>" +
    '<div class="contract-md-quote">' +
      '<div class="contract-md-section">Requisitos Operacionais</div>' +
      '<div class="contract-md-field"><strong>Número de Participantes:</strong> <span class="contract-md-inline">' + gsContractEscapeHtml(gsContractFormatMarkdownInline(data.participantes)) + "</span></div>" +
      '<div class="contract-md-field"><strong>Tempo Limite:</strong> <span class="contract-md-inline">' + gsContractEscapeHtml(gsContractFormatMarkdownInline(data.tempo)) + "</span></div>" +
      '<div class="contract-md-field"><strong>Recompensa:</strong> <span class="contract-md-inline">' + gsContractEscapeHtml(gsContractFormatMarkdownInline(data.recompensa)) + "</span></div>" +
      '<div class="contract-md-field"><strong>Responsável pelo Relatório:</strong> <span class="contract-md-inline">' + gsContractEscapeHtml(gsContractFormatMarkdownInline(data.reportar)) + "</span></div>" +
    "</div>" +
    '<div class="contract-md-clause">#Cláusula Abissal: \n' + gsContractEscapeHtml(GS_CONTRACT_MARKDOWN_CLAUSE) + "</div>" +
    imageHtml;
}

function gsContractRenderMarkdownPreview(data, markdown) {
  var field = gsContractEl("contract-markdown-output");
  if (field) field.value = markdown;
  gsContractMarkdownContent = markdown;
  gsContractRenderMarkdownPreviewCard(data);
}

function gsContractOpenMarkdownPreviewStep() {
  gsContractApplyModalMode();
  gsContractShowStep("markdown");

  return new Promise(function(resolve) {
    requestAnimationFrame(function() {
      var data = gsContractReadFormData();
      var markdown = gsContractBuildDiscordMarkdown(data);
      gsContractRenderMarkdownPreview(data, markdown);
      resolve(markdown);
    });
  });
}

function gsContractCopyMarkdown() {
  var field = gsContractEl("contract-markdown-output");
  var text = field && field.value ? field.value : (gsContractMarkdownContent || "");
  if (!text) {
    alert("Gere a pré-visualização antes de copiar o markdown.");
    return;
  }

  gsContractCopyText(text).then(function() {
    gsShowLoading("MARKDOWN COPIADO");
    setTimeout(function() { gsShowLoading(""); }, 1800);
  }).catch(function() {
    alert("Não foi possível copiar automaticamente. Selecione e copie o markdown manualmente.");
  });
}

function gsContractOpenEmbedPreviewStep() {
  var loading = gsContractEl("contract-loading");
  var wrap = gsContractEl("contract-preview-wrap");

  gsContractShowStep("preview");
  gsContractSetLivePreviewMode();
  gsContractPreviewCanvas = null;
  gsContractApplyModalMode();

  if (loading) loading.style.display = "block";

  return new Promise(function(resolve) {
    requestAnimationFrame(function() {
      var data = gsContractReadFormData();
      var payload = gsContractBuildEmbedPayload(data);
      gsContractRenderEmbedPreview(payload, data);
      if (loading) loading.style.display = "none";
      resolve(payload);
    });
  });
}

function gsContractSetLivePreviewMode() {
  var wrap = gsContractEl("contract-preview-wrap");
  var img = gsContractEl("contract-render-preview-image");
  if (wrap) {
    wrap.classList.remove("is-frozen");
    if (gsContractMode !== "embed") wrap.classList.remove("is-embed-mode");
  }
  if (img) img.removeAttribute("src");
}

function gsContractFreezePreviewWithCanvas(canvas) {
  var wrap = gsContractEl("contract-preview-wrap");
  var img = gsContractEl("contract-render-preview-image");
  if (!wrap || !img || !canvas) return;

  gsContractPreviewCanvas = canvas;
  img.src = canvas.toDataURL("image/png");
  wrap.classList.add("is-frozen");
}

function gsContractRenderSnapshot(render) {
  return gsContractWaitForImages(render).then(function() {
    return gsContractCaptureNode(render).then(function(canvas) {
      if (!gsContractCanvasLooksBlank(canvas)) return canvas;

      var clone = gsContractCreateCaptureClone(render);
      return gsContractWaitForImages(clone).then(function() {
        return gsContractCaptureNode(clone);
      }).finally(function() {
        if (clone.parentNode) clone.parentNode.removeChild(clone);
      });
    });
  });
}

function gsContractDownloadBlob(blob, fileName) {
  if (!blob || !blob.size) {
    alert("Erro ao gerar arquivo: imagem vazia. Tente novamente.");
    return;
  }
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
}

function gsContractSetPreviewText(contractId, formId) {
  var target = gsContractEl(contractId);
  var source = gsContractEl(formId);
  if (!target) return;
  target.textContent = (source && source.value) ? source.value : "—";
}

function gsContractSetPreviewParagraphs(targetId, value, paragraphStyle) {
  var target = gsContractEl(targetId);
  if (!target) return;
  target.innerHTML = "";

  var lines = (value || "").trim().split("\n").filter(function(line) {
    return line.trim();
  });

  lines.forEach(function(line) {
    var p = document.createElement("p");
    p.style.cssText = paragraphStyle;
    p.textContent = line.trim();
    target.appendChild(p);
  });
}

function gsContractSetPreviewTips(targetId, value) {
  var target = gsContractEl(targetId);
  if (!target) return;
  target.innerHTML = "";

  var paragraphStyle = "margin:0 0 5px;font-family:Cormorant Garamond,Georgia,serif;font-size:24px;font-weight:600;color:#091D30;line-height:1.18;";
  var lines = (value || "").trim().split("\n").filter(function(line) {
    return line.trim();
  });

  lines.forEach(function(line) {
    var p = document.createElement("p");
    p.style.cssText = paragraphStyle;
    p.textContent = line.trim();
    target.appendChild(p);
  });
}

function gsContractApplyTextFit(target, baseSize, mediumSize, minSize) {
  if (!target) return;
  var text = (target.textContent || "").trim();
  target.style.fontSize = baseSize;
  target.style.lineHeight = "1.08";

  if (text.length > 34) {
    target.style.fontSize = minSize;
    target.style.lineHeight = "1.16";
  } else if (text.length > 24) {
    target.style.fontSize = mediumSize;
    target.style.lineHeight = "1.12";
  }
}

function gsContractFitBlockItems(targetId, itemSelector, startSize, minSize, step, lineHeight) {
  var target = gsContractEl(targetId);
  if (!target) return;

  var items = Array.prototype.slice.call(target.querySelectorAll(itemSelector));
  if (!items.length) return;

  function apply(size) {
    items.forEach(function(item) {
      item.style.fontSize = size + "px";
      item.style.lineHeight = lineHeight;
    });
  }

  var current = startSize;
  apply(current);

  while (target.scrollHeight > target.clientHeight && current > minSize) {
    current -= step;
    apply(current);
  }
}

function gsContractBuildPreview() {
  gsContractEnsureTemplateOverlay();

  var rankVal = (gsContractEl("cf-rank") || {}).value || "";
  var rankEl = gsContractEl("cr-rank-letter");
  var rankStamp = gsContractEl("cr-rank-stamp");
  if (rankEl && rankStamp) {
    if (rankVal) {
      rankEl.textContent = rankVal;
      rankEl.style.fontSize = rankVal.length > 1 ? "84px" : "90px";
      rankEl.style.top = "0";
      rankEl.style.letterSpacing = rankVal.length > 1 ? "-0.04em" : "0";
      rankStamp.style.display = "flex";
    } else {
      rankStamp.style.display = "none";
    }
  }

  gsContractSetPreviewText("cr-tipo", "cf-tipo");
  gsContractSetPreviewText("cr-alvo", "cf-alvo");
  gsContractSetPreviewText("cr-participantes", "cf-participantes");
  gsContractSetPreviewText("cr-tempo", "cf-tempo");
  gsContractSetPreviewText("cr-recompensa", "cf-recompensa");
  gsContractSetPreviewText("cr-reportar", "cf-reportar");

  gsContractSetPreviewParagraphs(
    "cr-descricao",
    (gsContractEl("cf-descricao") || {}).value || "",
    "margin:0 0 5px;font-family:Cormorant Garamond,Georgia,serif;font-size:24px;font-weight:600;color:#091D30;line-height:1.18;"
  );
  gsContractSetPreviewTips(
    "cr-dicas",
    (gsContractEl("cf-dicas") || {}).value || ""
  );

  gsContractApplyTextFit(gsContractEl("cr-tipo"), "22px", "20px", "18px");
  gsContractApplyTextFit(gsContractEl("cr-alvo"), "22px", "20px", "18px");
  gsContractApplyTextFit(gsContractEl("cr-participantes"), "19px", "17px", "15px");
  gsContractApplyTextFit(gsContractEl("cr-tempo"), "19px", "17px", "15px");
  gsContractApplyTextFit(gsContractEl("cr-recompensa"), "21px", "18px", "16px");
  gsContractApplyTextFit(gsContractEl("cr-reportar"), "38px", "32px", "26px");

  var imgArea = gsContractEl("cr-alvo-img-area");
  if (imgArea) {
    imgArea.innerHTML = "";
    if (gsContractResolvedImgSrc) {
      var img = document.createElement("img");
      img.src = gsContractResolvedImgSrc;
      img.alt = "Alvo";
      if (gsContractResolvedImgSrc.indexOf("data:") !== 0) {
        img.crossOrigin = "anonymous";
      }
      imgArea.appendChild(img);
    }
  }

  gsContractBuildPromise = gsContractWaitForFonts().then(function() {
    gsContractFitBlockItems("cr-descricao", "p", 24, 16, 0.3, "1.18");
    gsContractFitBlockItems("cr-dicas", "p", 24, 16, 0.3, "1.18");
    return new Promise(function(resolve) {
      requestAnimationFrame(resolve);
    });
  });

  return gsContractBuildPromise;
}

function gsContractOpenPreviewStep() {
  gsContractApplyModalMode();

  if (gsContractMode === "embed") {
    gsContractPreviewPromise = gsContractOpenEmbedPreviewStep();
    return gsContractPreviewPromise;
  }

  var loading = gsContractEl("contract-loading");
  var render = gsContractEl("contract-render");
  var wrap = gsContractEl("contract-preview-wrap");

  gsContractShowStep("preview");
  gsContractSetLivePreviewMode();
  gsContractPreviewCanvas = null;
  gsContractEmbedPayload = null;
  if (wrap) wrap.classList.remove("is-embed-mode");

  if (!render) return Promise.resolve(null);
  if (loading) loading.style.display = "block";

  gsContractBuildPreview();
  gsContractPreviewPromise = (gsContractBuildPromise || Promise.resolve()).then(function() {
    return gsContractRenderSnapshot(render);
  }).then(function(canvas) {
    if (!canvas || !canvas.width || !canvas.height || gsContractCanvasLooksBlank(canvas)) {
      throw new Error("Canvas vazio.");
    }
    gsContractFreezePreviewWithCanvas(canvas);
    if (loading) loading.style.display = "none";
    return canvas;
  }).catch(function(err) {
    if (loading) loading.style.display = "none";
    console.error("Previa congelada falhou:", err);
    return null;
  });

  return gsContractPreviewPromise;
}

function gsContractCaptureAndDownload(format) {
  if (gsContractCaptureBusy) return;
  gsContractCaptureBusy = true;

  var loading = gsContractEl("contract-loading");
  var prevWrap = gsContractEl("contract-preview-wrap");
  if (loading) loading.style.display = "block";

  gsContractLoadLibs(format === "pdf", function() {
    var previewSource = gsContractPreviewCanvas
      ? Promise.resolve(gsContractPreviewCanvas)
      : (gsContractPreviewPromise || gsContractOpenPreviewStep());

    previewSource.then(function(canvas) {
      if (loading) loading.style.display = "none";
      if (prevWrap) prevWrap.style.opacity = "1";

      if (!canvas || !canvas.width || !canvas.height || gsContractCanvasLooksBlank(canvas)) {
        gsContractCaptureBusy = false;
        alert("Erro ao capturar: canvas vazio. Tente novamente.");
        return;
      }

      if (format === "png") {
        if (canvas.toBlob) {
          canvas.toBlob(function(blob) {
            gsContractDownloadBlob(blob, "contrato-paz-" + Date.now() + ".png");
            gsContractCaptureBusy = false;
          }, "image/png");
          return;
        }
        gsContractDownloadBlob(
          gsContractDataUrlToBlob(canvas.toDataURL("image/png")),
          "contrato-paz-" + Date.now() + ".png"
        );
        gsContractCaptureBusy = false;
        return;
      }

      if (!window.jspdf) {
        gsContractCaptureBusy = false;
        alert("jsPDF não carregou. Use PNG.");
        return;
      }
      var jsPDF = window.jspdf.jsPDF;
      var pxPerMm = 96 / 25.4;
      var wMm = (canvas.width / 2) / pxPerMm;
      var hMm = (canvas.height / 2) / pxPerMm;
      var pdf = new jsPDF({
        orientation: wMm > hMm ? "l" : "p",
        unit: "mm",
        format: [wMm, hMm]
      });
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, wMm, hMm);
      pdf.save("contrato-paz-" + Date.now() + ".pdf");
      gsContractCaptureBusy = false;
    }).catch(function(err) {
      gsContractCaptureBusy = false;
      if (loading) loading.style.display = "none";
      if (prevWrap) prevWrap.style.opacity = "1";
      console.error("Captura falhou:", err);
      alert("Erro ao capturar. Tente novamente.");
    });
  }, function() {
    gsContractCaptureBusy = false;
    if (loading) loading.style.display = "none";
    if (prevWrap) prevWrap.style.opacity = "1";
    alert("Falha ao carregar biblioteca de exportação. Verifique sua conexão.");
  });
}

function gsContractDataUrlToBlob(dataUrl) {
  var parts = dataUrl.split(",");
  var mime = parts[0].match(/:(.*?);/)[1];
  var binary = atob(parts[1]);
  var len = binary.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function gsContractResetState() {
  gsContractResolvedImgSrc = null;
  gsContractPreviewCanvas = null;
  gsContractPreviewPromise = null;
  gsContractEmbedPayload = null;
  gsContractMarkdownContent = null;
  gsContractSetLivePreviewMode();
  gsContractSetImgPreview(null);
  var urlField = gsContractEl("cf-img-url");
  var fileField = gsContractEl("cf-img-file");
  var loading = gsContractEl("contract-loading");
  var prevWrap = gsContractEl("contract-preview-wrap");
  var embedCard = gsContractEl("contract-embed-card");
  var embedJson = gsContractEl("contract-embed-json");
  var embedNote = gsContractEl("contract-embed-note");
  var markdownField = gsContractEl("contract-markdown-output");
  var markdownPreview = gsContractEl("contract-markdown-preview");
  var colorPicker = gsContractEl("cf-embed-color");
  var colorHex = gsContractEl("cf-embed-color-hex");
  if (urlField) urlField.value = "";
  if (fileField) fileField.value = "";
  if (colorPicker) colorPicker.value = "#0c1f31";
  if (colorHex) colorHex.value = "#0C1F31";
  if (loading) loading.style.display = "none";
  if (prevWrap) {
    prevWrap.style.opacity = "1";
    prevWrap.classList.remove("is-embed-mode");
  }
  if (embedCard) embedCard.innerHTML = "";
  if (embedJson) embedJson.value = "";
  if (markdownField) markdownField.value = "";
  if (markdownPreview) markdownPreview.innerHTML = "";
  if (embedNote) {
    embedNote.hidden = true;
    embedNote.textContent = "";
  }
  gsContractShowStep("form");
}

function gsContractBindElement(el, eventName, handler) {
  if (!el) return;
  var key = "gsBound" + eventName;
  if (el.dataset[key] === "1") return;
  el.dataset[key] = "1";
  el.addEventListener(eventName, handler);
}

function gsContractInitBindings() {
  return;
}

/* ---- Delegação de cliques (document-level) ---- */
document.addEventListener("click", function(e) {
  if (e.target.closest(".gs-logout-btn"))  { gsHandleLogout(); return; }
  if (e.target.closest(".gs-pdf-all"))     { gsExportPDF(); return; }
  if (e.target.closest(".gs-png-all"))     { gsExportPNG(); return; }
  var secPDF = e.target.closest(".gs-sec-pdf");
  if (secPDF) { gsExportSectionPDF(secPDF.dataset.section, secPDF.dataset.name); return; }
  var secPNG = e.target.closest(".gs-sec-png");
  if (secPNG) { gsExportSectionPNG(secPNG.dataset.section, secPNG.dataset.name); return; }
  if (e.target.closest("#gs-open-contract-export")) { gsContractOpenModal("export"); return; }
  if (e.target.closest("#gs-open-contract-embed"))   { gsContractOpenModal("embed"); return; }
  if (e.target.closest("#contractClose"))      { gsContractCloseModal(); return; }
  if (e.target.id === "contractOverlay")       { gsContractCloseModal(); return; }
  if (e.target.closest("#contract-go-preview")) {
    gsContractOpenPreviewStep();
    return;
  }
  if (e.target.closest("#contract-back-form")) { gsContractShowStep("form"); return; }
  if (e.target.closest("#contract-back-form-md")) { gsContractShowStep("form"); return; }
  if (e.target.closest("#contract-copy-embed"))  { gsContractCopyEmbed(); return; }
  if (e.target.closest("#contract-copy-markdown")) { gsContractCopyMarkdown(); return; }
  if (e.target.closest("#contract-dl-png"))    { gsContractCaptureAndDownload("png"); return; }
  if (e.target.closest("#contract-dl-pdf"))    { gsContractCaptureAndDownload("pdf"); return; }
  var stepBtn = e.target.closest(".contract-step-btn");
  if (stepBtn) {
    if (stepBtn.dataset.step === "preview") {
      gsContractOpenPreviewStep();
    } else if (stepBtn.dataset.step === "markdown") {
      gsContractOpenMarkdownPreviewStep();
    } else {
      gsContractShowStep("form");
    }
  }
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") gsContractCloseModal();
});

document.addEventListener("change", function(e) {
  if (e.target.matches("#cf-embed-color")) {
    gsContractSyncEmbedColorFromPicker();
    return;
  }
  if (!e.target.matches("#cf-img-file")) return;
  if (gsContractMode === "embed") {
    e.target.value = "";
    return;
  }
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    gsContractResolvedImgSrc = ev.target.result;
    gsContractSetImgPreview(ev.target.result);
    var urlField = gsContractEl("cf-img-url");
    if (urlField) urlField.value = "";
  };
  reader.readAsDataURL(file);
});

document.addEventListener("input", function(e) {
  if (e.target.matches("#cf-embed-color")) {
    gsContractSyncEmbedColorFromPicker();
    return;
  }
  if (e.target.matches("#cf-embed-color-hex")) {
    gsContractSyncEmbedColorFromHex();
    return;
  }
  if (!e.target.matches("#cf-img-url")) return;
  var url = e.target.value.trim();
  if (url) {
    gsContractResolvedImgSrc = url;
    gsContractSetImgPreview(url);
    var fileField = gsContractEl("cf-img-file");
    if (fileField) fileField.value = "";
  } else {
    gsContractResolvedImgSrc = null;
    gsContractSetImgPreview(null);
  }
});

/* ---- Init ---- */
function initGrandeSalao() {
  var f = document.getElementById("gs-login-form");
  if (f && !f.dataset.gsInit) { f.dataset.gsInit = "1"; f.addEventListener("submit", gsHandleLogin); }
  if (document.getElementById("contractOverlay")) {
    gsContractPrimeTemplate();
    gsContractEnsureTemplateOverlay();
    gsContractInitBindings();
    gsContractResetState();
  }
  gsIsAuthed() ? gsShowContent() : gsShowLogin();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("gs-login")) initGrandeSalao();
  });
} else {
  if (document.getElementById("gs-login")) initGrandeSalao();
}
window.addEventListener("paz:pageload", function() {
  if (document.getElementById("gs-login")) initGrandeSalao();
});

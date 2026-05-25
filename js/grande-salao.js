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
  ".gs-table th{background:#192d0c!important;color:#e8c878!important;font-family:'Cinzel',Georgia,serif!important}",
  ".gs-table td{color:#d8cba8!important;font-family:'Cormorant Garamond',Georgia,serif!important}",
  ".gs-table td:first-child{color:#e0d5b5!important;font-family:'Cinzel',Georgia,serif!important}",
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
  ".sal-fixed{color:#4ac0ff!important;font-weight:600!important}",
  ".sal-mult{color:#d4a840!important}",
  ".loja-cat{color:#a89878!important;font-style:italic!important}",
  ".loja-price{color:#d8cba8!important}",
  ".loja-rare{color:#c049d4!important;font-weight:600!important}",
  ".em-dash{color:#6a6a6a!important}"
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

/* ---- Delegação de cliques (document-level) ---- */
document.addEventListener("click", function(e) {
  if (e.target.closest(".gs-logout-btn"))  { gsHandleLogout(); return; }
  if (e.target.closest(".gs-pdf-all"))     { gsExportPDF(); return; }
  if (e.target.closest(".gs-png-all"))     { gsExportPNG(); return; }
  var secPDF = e.target.closest(".gs-sec-pdf");
  if (secPDF) { gsExportSectionPDF(secPDF.dataset.section, secPDF.dataset.name); return; }
  var secPNG = e.target.closest(".gs-sec-png");
  if (secPNG) { gsExportSectionPNG(secPNG.dataset.section, secPNG.dataset.name); return; }
});

/* ---- Init ---- */
function initGrandeSalao() {
  var f = document.getElementById("gs-login-form");
  if (f && !f.dataset.gsInit) { f.dataset.gsInit = "1"; f.addEventListener("submit", gsHandleLogin); }
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

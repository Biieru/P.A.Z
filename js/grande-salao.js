/* =========================================================
   grande-salao.js — Área Restrita P.A.Z
   
   SEGURANÇA: Login apenas visual/front-end.
   Para autenticação real, substitua gsVerify() por
   uma chamada à sua API de backend.
   ========================================================= */

/* ===========================================================
   CREDENCIAIS TEMPORÁRIAS — TROCAR POR AUTENTICAÇÃO REAL
   =========================================================== */
var GS_USER = "Teste123";
var GS_CODE = "Teste852.";
var GS_SESSION_KEY = "paz:grandeSalao";

/* ---- Auth ---- */
function gsVerify(user, code) {
  /* TODO: fetch('/api/auth', { method:'POST', body: JSON.stringify({user,code}) }) */
  return user === GS_USER && code === GS_CODE;
}
function gsIsAuthed() {
  try { return sessionStorage.getItem(GS_SESSION_KEY) === "1"; } catch { return false; }
}
function gsSetAuth(val) {
  try { val ? sessionStorage.setItem(GS_SESSION_KEY, "1") : sessionStorage.removeItem(GS_SESSION_KEY); } catch {}
}

/* ---- Views ---- */
function gsShowLogin(msg) {
  var login   = document.getElementById("gs-login");
  var content = document.getElementById("gs-content");
  var errEl   = document.getElementById("gs-error");
  if (login)   login.style.display   = "";        /* CSS flex toma conta */
  if (content) content.style.display = "none";
  if (errEl)   errEl.style.display   = msg ? "block" : "none";
  if (errEl && msg) errEl.textContent = msg;
}
function gsShowContent() {
  var login   = document.getElementById("gs-login");
  var content = document.getElementById("gs-content");
  if (login)   login.style.display   = "none";
  if (content) content.style.display = "block";
}

/* ---- Handlers ---- */
function gsHandleLogin(e) {
  e.preventDefault();
  var userEl = document.getElementById("gs-user-input");
  var codeEl = document.getElementById("gs-code-input");
  if (!userEl || !codeEl) return;
  if (gsVerify(userEl.value.trim(), codeEl.value.trim())) {
    gsSetAuth(true);
    gsShowContent();
  } else {
    gsShowLogin("Acesso negado. Apenas membros autorizados podem entrar no Grande Salão.");
  }
}
function gsHandleLogout() {
  gsSetAuth(false);
  var u = document.getElementById("gs-user-input");
  var c = document.getElementById("gs-code-input");
  if (u) u.value = "";
  if (c) c.value = "";
  gsShowLogin();
}

/* ---- CSS inline para popup de impressão ---- */
var GS_PRINT_CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap');",
  "*,*::before,*::after{box-sizing:border-box;print-color-adjust:exact;-webkit-print-color-adjust:exact;}",
  "body{background:#050810;color:#d8cba8;font-family:'Cormorant Garamond',serif;padding:24px;margin:0;}",
  ".gs-section{padding:0;margin:0;}",
  ".gs-section-header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:10px;}",
  ".gs-section__title{font-family:'Cinzel',serif;color:#e8c878;font-size:20px;margin:0;}",
  ".gs-section__desc{border-left:2px solid rgba(201,169,97,0.4);padding-left:10px;font-style:italic;color:#a89878;margin:0 0 12px;font-size:14px;line-height:1.6;}",
  ".gs-table-container{background:rgba(5,8,16,0.97);border:1px solid rgba(201,169,97,0.3);padding:14px;}",
  ".gs-table{width:100%;border-collapse:collapse;font-size:13px;}",
  ".gs-table th{background:rgba(20,40,10,0.95);color:#e8c878;padding:8px 10px;text-align:center;border:1px solid rgba(201,169,97,0.35);font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;white-space:nowrap;}",
  ".gs-table th:first-child{text-align:left;}",
  ".gs-table td{padding:7px 10px;border:1px solid rgba(201,169,97,0.15);color:#d8cba8;text-align:center;}",
  ".gs-table td:first-child{text-align:left;font-family:'Cinzel',serif;font-size:10.5px;letter-spacing:0.08em;color:#e0d5b5;white-space:nowrap;}",
  ".gs-table tbody tr{background:rgba(5,8,16,0.97);}",
  ".gs-table tbody tr:nth-child(even){background:rgba(8,17,30,0.97);}",
  ".diff-mf{color:#b0e0b0}.diff-f{color:#8fd48f}.diff-mef{color:#6fc46f}",
  ".diff-m{color:#c9a961}.diff-md{color:#f0b040}.diff-d{color:#e07830}",
  ".diff-di{color:#e05050}.diff-i{color:#c040d0}",
  ".sal-fixed{color:#4ac0ff;font-weight:600;text-align:right}",
  ".sal-mult{color:#c9a961;text-align:center}",
  ".loja-cat{color:#a89878;font-style:italic}.loja-price{text-align:right}",
  ".loja-rare{color:#c049d4;font-weight:600}.em-dash{color:#7a7a7a;font-style:italic}",
  ".gs-section-actions,.gs-section__note{display:none;}",
  ".gs-table-wrap{overflow:visible;}"
].join("\n");

/* ---- Imprimir seção individual ---- */
function gsPrintSection(sectionId) {
  var el = document.getElementById(sectionId);
  if (!el) return;
  var win = window.open("", "_blank", "width=960,height=700");
  if (!win) { alert("Permita pop-ups para exportar PDF."); return; }
  win.document.write("<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Grande Sal\u00e3o \u2014 P.A.Z</title><style>" + GS_PRINT_CSS + "</style></head><body>" + el.innerHTML + "</body></html>");
  win.document.close();
  win.focus();
  setTimeout(function() { win.print(); }, 600);
}

/* ---- Imprimir TODAS as tabelas ---- */
function gsExportPDF() {
  var el = document.getElementById("gs-tables-area");
  if (!el) { window.print(); return; }
  var win = window.open("", "_blank", "width=960,height=700");
  if (!win) { window.print(); return; }
  win.document.write("<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Grande Sal\u00e3o \u2014 P.A.Z</title><style>" + GS_PRINT_CSS + "</style></head><body>" + el.innerHTML + "</body></html>");
  win.document.close();
  win.focus();
  setTimeout(function() { win.print(); }, 600);
}

/* ---- PNG de uma seção ---- */
function gsExportSectionPNG(sectionId, fileName) {
  var el = document.getElementById(sectionId);
  if (!el) return;
  function doCapture() {
    html2canvas(el, { backgroundColor: "#050810", scale: 2, useCORS: true, logging: false }).then(function(canvas) {
      var a = document.createElement("a");
      a.download = "paz-" + (fileName || sectionId) + ".png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    });
  }
  if (typeof html2canvas !== "undefined") { doCapture(); return; }
  var s = document.createElement("script");
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
  s.onload = doCapture;
  s.onerror = function() { alert("Não foi possível carregar html2canvas. Verifique sua conexão."); };
  document.head.appendChild(s);
}

/* ---- PNG de TODAS as tabelas ---- */
function gsExportPNG() {
  gsExportSectionPNG("gs-tables-area", "grande-salao-completo");
}

/* ---- Delegação de cliques ---- */
document.addEventListener("click", function(e) {
  /* Botão login */
  if (e.target.closest("#gs-login-form button[type=submit]")) return; /* handled by form submit */

  /* Logout */
  if (e.target.closest(".gs-logout-btn")) { gsHandleLogout(); return; }

  /* PDF global */
  if (e.target.closest(".gs-pdf-all")) { gsExportPDF(); return; }

  /* PNG global */
  if (e.target.closest(".gs-png-all")) { gsExportPNG(); return; }

  /* PDF individual de seção */
  var pdfBtn = e.target.closest(".gs-sec-pdf");
  if (pdfBtn) { gsPrintSection(pdfBtn.dataset.section); return; }

  /* PNG individual de seção */
  var pngBtn = e.target.closest(".gs-sec-png");
  if (pngBtn) { gsExportSectionPNG(pngBtn.dataset.section, pngBtn.dataset.name); return; }
});

/* ---- Init ---- */
function initGrandeSalao() {
  var loginForm = document.getElementById("gs-login-form");
  if (loginForm && !loginForm.dataset.gsInit) {
    loginForm.dataset.gsInit = "1";
    loginForm.addEventListener("submit", gsHandleLogin);
  }
  if (gsIsAuthed()) gsShowContent(); else gsShowLogin();
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

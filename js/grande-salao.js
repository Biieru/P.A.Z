/* =========================================================
   grande-salao.js — Lógica da página restrita "Grande Salão"
   
   SEGURANÇA: Este login é apenas uma barreira visual/front-end.
   Para autenticação real no futuro, substitua a função gsVerify()
   por uma chamada à sua API de backend.
   ========================================================= */

/* ===========================================================
   CREDENCIAIS TEMPORÁRIAS — TROCAR POR AUTENTICAÇÃO REAL
   =========================================================== */
var GS_USER = "Teste123";
var GS_CODE = "Teste852.";
var GS_SESSION_KEY = "paz:grandeSalao";

/* ---- Verificar credenciais ---- */
function gsVerify(user, code) {
  /* TODO: substituir por fetch('/api/auth', { method:'POST', body: JSON.stringify({user,code}) }) */
  return user === GS_USER && code === GS_CODE;
}

function gsIsAuthed() {
  try { return sessionStorage.getItem(GS_SESSION_KEY) === "1"; } catch { return false; }
}

function gsSetAuth(val) {
  try { if (val) sessionStorage.setItem(GS_SESSION_KEY, "1"); else sessionStorage.removeItem(GS_SESSION_KEY); } catch {}
}

/* ---- Mostrar / ocultar views ---- */
function gsShowLogin(msg) {
  var login   = document.getElementById("gs-login");
  var content = document.getElementById("gs-content");
  var errEl   = document.getElementById("gs-error");
  if (login)   login.style.display   = "";
  if (content) content.style.display = "none";
  if (errEl && msg) { errEl.textContent = msg; errEl.style.display = ""; }
  else if (errEl)   { errEl.style.display = "none"; }
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
  var user = userEl.value.trim();
  var code = codeEl.value.trim();

  if (gsVerify(user, code)) {
    gsSetAuth(true);
    gsShowContent();
  } else {
    gsShowLogin("Acesso negado. Apenas membros autorizados podem entrar no Grande Salão.");
  }
}

function gsHandleLogout() {
  gsSetAuth(false);
  var userEl = document.getElementById("gs-user-input");
  var codeEl = document.getElementById("gs-code-input");
  if (userEl) userEl.value = "";
  if (codeEl) codeEl.value = "";
  gsShowLogin();
}

/* ---- Exportação PDF ---- */
function gsExportPDF() {
  window.print();
}

/* ---- Exportação PNG (lazy load html2canvas) ---- */
function gsExportPNG() {
  var target = document.getElementById("gs-tables-area");
  if (!target) { alert("Área de tabelas não encontrada."); return; }

  function doCapture() {
    html2canvas(target, { backgroundColor: "#050810", scale: 2 }).then(function(canvas) {
      var link = document.createElement("a");
      link.download = "grande-salao-paz.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }

  if (typeof html2canvas !== "undefined") { doCapture(); return; }

  var script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
  script.onload = doCapture;
  script.onerror = function() {
    alert("Não foi possível carregar html2canvas. Verifique sua conexão e tente novamente.");
  };
  document.head.appendChild(script);
}

/* ---- Inicializar ---- */
function initGrandeSalao() {
  var loginForm = document.getElementById("gs-login-form");
  var logoutBtns = document.querySelectorAll(".gs-logout-btn");
  var pdfBtns = document.querySelectorAll(".gs-pdf-btn");
  var pngBtns = document.querySelectorAll(".gs-png-btn");

  if (loginForm && !loginForm.dataset.gsInit) {
    loginForm.dataset.gsInit = "1";
    loginForm.addEventListener("submit", gsHandleLogin);
  }
  logoutBtns.forEach(function(btn) {
    if (!btn.dataset.gsInit) {
      btn.dataset.gsInit = "1";
      btn.addEventListener("click", gsHandleLogout);
    }
  });
  pdfBtns.forEach(function(btn) {
    if (!btn.dataset.gsInit) { btn.dataset.gsInit = "1"; btn.addEventListener("click", gsExportPDF); }
  });
  pngBtns.forEach(function(btn) {
    if (!btn.dataset.gsInit) { btn.dataset.gsInit = "1"; btn.addEventListener("click", gsExportPNG); }
  });

  if (gsIsAuthed()) gsShowContent(); else gsShowLogin();
}

/* ---- Boot ---- */
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

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
var GS_CONTRACT_TEMPLATE_URL = "/assets/images/template.png?v=20260526-04";
var gsContractResolvedImgSrc = null;
var gsContractCaptureBusy = false;
var gsContractBuildPromise = null;
var gsContractPreviewCanvas = null;
var gsContractPreviewPromise = null;

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
  if (panelForm) panelForm.classList.toggle("active", step === "form");
  if (panelPreview) panelPreview.classList.toggle("active", step === "preview");
}

function gsContractOpenModal() {
  var overlay = gsContractEl("contractOverlay");
  if (!overlay) return;
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

function gsContractSetLivePreviewMode() {
  var wrap = gsContractEl("contract-preview-wrap");
  var img = gsContractEl("contract-render-preview-image");
  if (wrap) wrap.classList.remove("is-frozen");
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
  var loading = gsContractEl("contract-loading");
  var render = gsContractEl("contract-render");

  gsContractShowStep("preview");
  gsContractSetLivePreviewMode();
  gsContractPreviewCanvas = null;

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
  gsContractSetLivePreviewMode();
  gsContractSetImgPreview(null);
  var urlField = gsContractEl("cf-img-url");
  var fileField = gsContractEl("cf-img-file");
  var loading = gsContractEl("contract-loading");
  var prevWrap = gsContractEl("contract-preview-wrap");
  if (urlField) urlField.value = "";
  if (fileField) fileField.value = "";
  if (loading) loading.style.display = "none";
  if (prevWrap) prevWrap.style.opacity = "1";
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
  if (e.target.closest("#gs-open-contract"))   { gsContractOpenModal(); return; }
  if (e.target.closest("#contractClose"))      { gsContractCloseModal(); return; }
  if (e.target.id === "contractOverlay")       { gsContractCloseModal(); return; }
  if (e.target.closest("#contract-go-preview")) {
    gsContractOpenPreviewStep();
    return;
  }
  if (e.target.closest("#contract-back-form")) { gsContractShowStep("form"); return; }
  if (e.target.closest("#contract-dl-png"))    { gsContractCaptureAndDownload("png"); return; }
  if (e.target.closest("#contract-dl-pdf"))    { gsContractCaptureAndDownload("pdf"); return; }
  var stepBtn = e.target.closest(".contract-step-btn");
  if (stepBtn) {
    if (stepBtn.dataset.step === "preview") {
      gsContractOpenPreviewStep();
    } else {
      gsContractShowStep("form");
    }
  }
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") gsContractCloseModal();
});

document.addEventListener("change", function(e) {
  if (!e.target.matches("#cf-img-file")) return;
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

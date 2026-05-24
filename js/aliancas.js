/* =========================================================
   aliancas.js — Página de Alianças da P.A.Z
   Estrutura de cada entrada em ALIANCAS_DATA:
   {
     id:       número único,
     name:     "Nome da Crew",
     image:    "/assets/images/aliancas/nome.png",
     discord:  "https://discord.gg/...",
     body:     "Descrição da crew e da aliança."
   }
   ========================================================= */

const ALIANCAS_DATA = [
  {
    id: 1,
    name: "The Voids",
    image: "/assets/images/Jolly-The-Voids-Crew.png",
    discord: "https://discord.gg/yuWtZN95Mx",
    body: "A The Voids surgiu para aqueles que desejam algo maior do que apenas uma tripulacao comum. Nao seguimos multidoes. Nao buscamos atencao desesperadamente. E muito menos dependemos de fama para crescer. Somos um grupo unido pela lealdade, respeito e ambicao de dominar os mares atraves da inteligencia, evolucao e parceria entre membros. Aqui, cada pessoa carrega seu proprio valor dentro do vazio.\n\nO QUE OFERECEMOS\n\u2726 Comunidade ativa diariamente\n\u2726 Membros unidos e parceiros\n\u2726 Staff organizada e presente\n\u2726 Eventos e objetivos internos\n\u2726 Crescimento coletivo constante\n\u2726 Ambiente focado em respeito e evolucao\n\nNOSSA VISAO\nAcreditamos que as maiores forcas surgem no silencio. Enquanto outros procuram guerras inuteis e reconhecimento momentaneo, nos fortalecemos nossas bases, nossos membros e nossa influencia. A The Voids nao e construida apenas por poder... mas pela uniao daqueles que permanecem firmes ate o fim.\n\nREQUISITOS\n\u2726 Ser ativo\n\u2726 Respeitar todos os membros\n\u2726 Ter maturidade\n\u2726 Saber agir em equipe\n\u2726 Demonstrar lealdade a tripulacao\n\nMENSAGEM FINAL\nSe deseja apenas mais uma crew... existem varias pelos mares. Mas se procura uma familia, aliados verdadeiros e um lugar onde sua presenca realmente importa... Entao atravesse o vazio."
  },
  {
    id: 2,
    name: "Black Pearl",
    image: "/assets/images/Jolly-Black-Pearl-Crew.png",
    discord: "https://discord.gg/yuWtZN95Mx",
    body: "Tripulacao criada com foco em desenvolvimento dos tripulantes, e na verdadeira pirataria. O que \"verdadeira pirataria\" quer dizer? Significa que a tripulacao se baseia nos piratas de antigas eras, sanguinarios e sem piedade alguma. Cada vez mais em busca de poder, riqueza, fama.\n\nA Tripulacao conta com:\n\u2937 Sistema de Divisoes, Comandantes e Generais\n\u2937 Grande Hierarquia\n\u2937 Servidor bem organizado e com um aspecto bonito\n\u2937 Sistema de Titulos!\n\u2937 Futura interacao com bots!\n\u2937 Eventos e Sorteios!\n\u2937 Vagas como comandante e tripulante em todas as divisoes"
  }
];

/* =========================================================
   Lógica de renderização — não editar abaixo
   ========================================================= */
function initAliancas() {
  const grid = document.getElementById("aliancasGrid");
  if (!grid) return;
  // Evitar dupla inicialização
  if (grid.dataset.initialized === "1") return;
  grid.dataset.initialized = "1";
  grid.innerHTML = "";

  if (!ALIANCAS_DATA.length) {
    grid.innerHTML = `
      <div class="vault-empty">
        Nenhuma aliança registrada ainda. Os pactos serão anunciados em breve.
      </div>`;
    return;
  }

  ALIANCAS_DATA.forEach(crew => {
    const card = document.createElement("article");
    card.className = "alliance-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", "Ver detalhes: " + crew.name);

    card.innerHTML = `
      <div class="alliance-card__img">
        <img src="${crew.image}" alt="Logo da ${crew.name}" loading="lazy" />
        <div class="alliance-card__overlay"><span>Ver Detalhes</span></div>
      </div>
      <div class="alliance-card__name">${crew.name}</div>`;

    card.addEventListener("click",  () => openAlliance(crew));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openAlliance(crew); }
    });
    grid.appendChild(card);
  });

  setupAliancasModal();
}

function openAlliance(crew) {
  const modal    = document.getElementById("aliancasModal");
  const imgEl    = document.getElementById("aliancasModalImg");
  const titleEl  = document.getElementById("aliancasModalTitle");
  const linkEl   = document.getElementById("aliancasModalDiscord");
  const bodyEl   = document.getElementById("aliancasModalBody");
  if (!modal) return;

  if (imgEl)   { imgEl.src = crew.image; imgEl.alt = "Logo da " + crew.name; }
  if (titleEl)  titleEl.textContent = crew.name;
  if (linkEl)  { linkEl.href = crew.discord; }
  if (bodyEl)   bodyEl.innerHTML = crew.body.split("\n\n").map(p => "<p>" + p.replace(/\n/g, "<br>") + "</p>").join("");

  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
  document.getElementById("aliancasModalClose")?.focus();
}

function closeAlliance() {
  const modal = document.getElementById("aliancasModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
}

let _aliancasModalSetup = false;
function setupAliancasModal() {
  if (_aliancasModalSetup) return;
  _aliancasModalSetup = false; // resetar para permitir re-setup em cada navegação SPA

  const modal    = document.getElementById("aliancasModal");
  const closeBtn = document.getElementById("aliancasModalClose");
  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", closeAlliance);
  modal.addEventListener("click", e => { if (e.target === modal) closeAlliance(); });

  document.addEventListener("keydown", function aliancasKey(e) {
    const m = document.getElementById("aliancasModal");
    if (!m) { document.removeEventListener("keydown", aliancasKey); return; }
    if (e.key === "Escape" && m.classList.contains("is-open")) closeAlliance();
  });
}

/* ---- Inicialização ---- */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("aliancasGrid")) initAliancas();
  });
} else {
  if (document.getElementById("aliancasGrid")) initAliancas();
}

window.addEventListener("paz:pageload", () => {
  const grid = document.getElementById("aliancasGrid");
  if (grid) { grid.dataset.initialized = ""; initAliancas(); }
});

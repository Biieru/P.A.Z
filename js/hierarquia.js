/* =========================================================
   hierarquia.js — Hierarquia da P.A.Z
   Usa delegação no document — imune a timing de SPA.
   Os listeners são registrados UMA VEZ na carga do script
   e funcionam para todo o ciclo de vida da página.
   ========================================================= */

var HIER_ROLES = {
  /* ======== DISCORD ======== */
  "dono-do-porto":     { cat: "Discord — Administração",       color: "#e8c878", desc: "Pessoa responsável pelo servidor e líder das gestões, aquele que organiza a maior parte das coisas e tem o maior poder de influência." },
  "administracao":     { cat: "Discord — Administração",       color: "#c9a961", desc: "Concedido àqueles que passam no formulário escolhendo o cargo administrativo. Auxiliam os Gerentes da Taberna a manterem a organização no servidor." },
  "gerente-da-taberna":{ cat: "Discord — Administração",       color: "#c9a961", desc: "Cargo fornecido àqueles de maior confiança do Dono do Porto. Realizam a gestão de áreas específicas do servidor e o mantém em estabilidade constante." },
  "big-news":          { cat: "Discord — Comunicação",         color: "#4ac0ff", desc: "Dedicado apenas aos que tem interesse no Big News da tripulação e se qualificaram no formulário do mesmo." },
  "guia-do-porto":     { cat: "Discord — Comunicação",         color: "#4ac0ff", desc: "Este cargo é dedicado especialmente às pessoas que se dedicam a ajudar as novas pessoas que adentram ao servidor, seja doando itens ou realizando qualquer tipo de ajuda a elas." },
  "artistas-oficiais": { cat: "Discord — Criação Visual",      color: "#c49fe0", desc: "Equipe de criação visual oficial da P.A.Z. Responsável por artes, identidade visual, material gráfico e conteúdo criativo da comunidade." },
  "vip":               { cat: "Discord — Títulos Especiais",   color: "#e0a82a", desc: "Cargo EXCLUSIVO de boosters que agrega em diversos benefícios dentro do servidor da tripulação." },
  "membro-paz":        { cat: "Discord — Identificação",       color: "#7eb8e8", desc: "Membros da tripulação, independentemente do cargo. Representa o acesso geral ao servidor como integrante oficial da P.A.Z." },
  "membro-alianca":    { cat: "Discord — Identificação",       color: "#8ab4d4", desc: "Menção aplicada aos membros de tripulações aliadas para identificação dos mesmos dentro do servidor da P.A.Z." },
  "tripulante":        { cat: "Discord / Tripulação",          color: "#2e6ea4", desc: "Pessoa que acabou de se unir à tripulação." },
  "naufrago":          { cat: "Discord / Tripulação",          color: "#4a6880", desc: "Aquele que se uniu ao servidor do Discord, mas ainda não é da tripulação." },
  /* ======== TRIPULAÇÃO ======== */
  "capitao-abissal":   { cat: "Tripulação — Comando",          color: "#e05050", desc: "O possuidor deste título é quem comanda a tripulação." },
  "executor-abissal":  { cat: "Tripulação — Comando",          color: "#d04040", desc: "Imediato / Oficial Executivo do bando." },
  "lider-aliado":      { cat: "Tripulação — Diplomacia",       color: "#8ab4d4", desc: "Título destinado aos líderes de tripulações aliadas à P.A.Z." },
  "abismo":            { cat: "Tripulação — Título Especial",  color: "#b06fd4", desc: "Título aplicado quando o membro realiza um feito catastrófico no jogo." },
  "lenda-do-abismo":   { cat: "Tripulação — Progressão",      color: "#c49fe0", desc: "Cargo oferecido aos membros que possuem maximizações e já possuem jogabilidade completa no jogo." },
  "cacador-abissal":   { cat: "Tripulação — Progressão",      color: "#7eb8e8", desc: "Disponibilizado para aqueles cujo estão no end-game, ou seja, já estão em um alto nível dentro do jogo." },
  "besta-abissal":     { cat: "Tripulação — Progressão",      color: "#6aaad8", desc: "Esse membro já possui renome nos servidores, porém ainda está procurando builds efetivas e decidindo como será seu personagem no jogo." },
  "predador":          { cat: "Tripulação — Progressão",      color: "#5696c8", desc: "Cargo atribuído àqueles que fazem conteúdo mid-game ou estão iniciando no jogo, porém apresentando avanço constante." },
  "marujo":            { cat: "Tripulação — Progressão",      color: "#4282b8", desc: "Cargo dado para os membros ativos dentro da tripulação e que demonstram esforço." }
};

/* Membros por cargo (sobrescreve/complementa HIER_ROLES) */
(function() {
  var m = HIER_ROLES;
  m["dono-do-porto"].members = [
    {handle:"@thalasio"},
    {handle:"@Azrael"}
  ];
  m["administracao"].members = [
    {handle:"@Tanso"},
    {handle:"@Skyzz"},
    {handle:"@Viny_ZeBATATa"}
  ];
  m["gerente-da-taberna"].members = [
    {handle:"@Dark_Foxy",    role:"Gestão do Server"},
    {handle:"@ifen_fd",      role:"Gestão de Eventos"},
    {handle:"@GUI$",     alt:"@guistpl2",   role:"Comércio"},
    {handle:"@Meruem_jk",    role:"General"}
  ];
  m["big-news"].members = [
    {handle:"@Greed", alt:"@Gureedo_Sama"}
  ];
  m["artistas-oficiais"].members = [
    {handle:"@Silva"},
    {handle:"@Tanso"},
    {handle:"@Tronza", alt:"@jafgjkj"},
    {handle:"@Lc_Midia", alt:"@lucaslk900fz"}
  ];
})();

function hierOpenModal(roleId, roleName) {
  var backdrop = document.getElementById("hierModal");
  var catEl    = document.getElementById("hierModalCat");
  var titleEl  = document.getElementById("hierModalTitle");
  var descEl   = document.getElementById("hierModalDesc");
  var closeBtn = document.getElementById("hierModalClose");
  if (!backdrop || !catEl || !titleEl || !descEl) return;
  var r = HIER_ROLES[roleId];
  if (!r) return;
  catEl.textContent   = r.cat;
  titleEl.textContent = roleName;
  titleEl.style.setProperty("--modal-nc", r.color);
  descEl.textContent  = r.desc;
  backdrop.classList.add("is-open");
  document.body.style.overflow = "hidden";
  if (closeBtn) closeBtn.focus();

  /* Membros */
  var membersSection = document.getElementById("hierModalMembers");
  var membersList    = document.getElementById("hierMembersList");
  if (membersSection && membersList) {
    if (r.members && r.members.length) {
      membersList.innerHTML = r.members.map(function(m) {
        var altHtml  = m.alt  ? '<span class="hier-member__alt">'  + m.alt  + '</span>' : '';
        var roleHtml = m.role ? '<span class="hier-member__role">' + m.role + '</span>' : '';
        return '<div class="hier-member"><span class="hier-member__handle">' + m.handle + '</span>' + altHtml + roleHtml + '</div>';
      }).join("");
      membersSection.style.display = "";
    } else {
      membersSection.style.display = "none";
    }
  }
}

function hierCloseModal() {
  var backdrop = document.getElementById("hierModal");
  if (!backdrop) return;
  backdrop.classList.remove("is-open");
  document.body.style.overflow = "";
  var ms = document.getElementById("hierModalMembers");
  if (ms) ms.style.display = "none";
}

/* --------------------------------------------------------
   Delegação no document — registrada uma única vez.
   Funciona mesmo após re-injeção via SPA.
   -------------------------------------------------------- */
document.addEventListener("click", function(e) {
  /* Clique em botão de cargo */
  var btn = e.target.closest("button[data-role]");
  if (btn && btn.closest(".org-tree")) {
    hierOpenModal(btn.dataset.role, btn.textContent.trim());
    return;
  }
  /* Fechar pelo X */
  if (e.target.closest("#hierModalClose")) {
    hierCloseModal();
    return;
  }
  /* Fechar pelo backdrop */
  var backdrop = document.getElementById("hierModal");
  if (backdrop && backdrop.classList.contains("is-open") && e.target === backdrop) {
    hierCloseModal();
  }
});

document.addEventListener("keydown", function(e) {
  if (e.key !== "Escape") return;
  var backdrop = document.getElementById("hierModal");
  if (backdrop && backdrop.classList.contains("is-open")) hierCloseModal();
});

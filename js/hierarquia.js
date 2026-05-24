/* =========================================================
   hierarquia.js — Hierarquia da P.A.Z
   Usa delegação no document — imune a timing de SPA.
   Os listeners são registrados UMA VEZ na carga do script
   e funcionam para todo o ciclo de vida da página.
   ========================================================= */

var HIER_ROLES = {
  "dono-do-porto":     { cat: "Discord — Administração",      color: "#e8c878", desc: "Administrador principal do servidor da P.A.Z. Responsável pela estrutura do Discord, organização dos canais, permissões, cargos, regras, segurança da comunidade e manutenção geral do ambiente digital do Porto." },
  "administracao":     { cat: "Discord — Administração",      color: "#c9a961", desc: "Equipe administrativa do servidor. Atua no suporte à organização interna, decisões operacionais, manutenção da ordem, ajustes estruturais e apoio direto ao Dono do Porto na gestão da comunidade." },
  "gerente-da-taberna":{ cat: "Discord — Administração",      color: "#c9a961", desc: "Equipe de moderação do servidor. Responsável por fiscalizar regras, orientar membros, mediar conflitos, manter os canais organizados e garantir que a convivência dentro da P.A.Z. permaneça saudável e funcional." },
  "big-news":          { cat: "Discord — Comunicação",        color: "#4ac0ff", desc: "Responsável pela comunicação informativa da comunidade. Atua na apuração, organização e divulgação de notícias, teorias, rumores, comunicados, novidades e conteúdos relevantes sobre Rell Seas, a P.A.Z. e os mares. É um cargo editorial, não militar. A função é informar, registrar e movimentar a comunidade com conteúdo confiável, estratégico e bem apresentado." },
  "guia-do-porto":     { cat: "Discord — Comunicação",        color: "#4ac0ff", desc: "Membro responsável por auxiliar novatos. Ajuda novos integrantes a entenderem o servidor, as regras, os canais, os cargos, o funcionamento da crew e os primeiros passos dentro da comunidade." },
  "vip":               { cat: "Discord — Títulos Especiais",  color: "#e0a82a", desc: "Cargo especial de prestígio dentro do servidor, destinado a boosters, apoiadores ou membros reconhecidos por contribuição direta à comunidade. Representa apoio, presença e valorização dentro do Porto da P.A.Z." },
  "tripulante":        { cat: "Discord / Tripulação",         color: "#2e6ea4", desc: "Membro oficialmente integrado à P.A.Z. Representa o primeiro nível real dentro da crew, já reconhecido como parte da tripulação e apto a participar das atividades internas." },
  "naufrago":          { cat: "Discord / Tripulação",         color: "#4a6880", desc: "Recém-chegado ao servidor ou interessado que ainda não foi oficialmente integrado à tripulação. Está em fase de observação, adaptação e possível recrutamento." },
  "ser-abissal":       { cat: "Tripulação — Comando",         color: "#e05050", desc: "Líder supremo da tripulação P.A.Z. Responsável pelo comando estratégico do bando, definição de objetivos, decisões de guerra, alianças, recrutamento de alto nível, posicionamento da crew e direção geral da tripulação nos mares." },
  "executor-abissal":  { cat: "Tripulação — Comando",         color: "#d04040", desc: "Imediato do Ser Abissal. Responsável por executar ordens estratégicas, coordenar membros, organizar ações da tripulação, apoiar decisões de liderança e manter a disciplina operacional do bando." },
  "lider-aliado":      { cat: "Tripulação — Diplomacia",      color: "#8ab4d4", desc: "Representante de uma tripulação aliada reconhecida pela P.A.Z. Atua como ponte diplomática entre grupos, facilitando comunicação, acordos, operações conjuntas e relações estratégicas entre crews." },
  "abismo":            { cat: "Tripulação — Título Especial", color: "#b06fd4", desc: "Título especial concedido a membros que realizarem um feito catastrófico, histórico ou extremamente marcante dentro do jogo. Não representa necessariamente uma posição de comando, mas sim uma marca de impacto dentro da história da P.A.Z." },
  "lenda-do-abismo":   { cat: "Tripulação — Progressão",     color: "#c49fe0", desc: "Membro de elite da tripulação, com praticamente tudo maximizado. Possui alto domínio do jogo, autonomia avançada e capacidade de explorar novos conteúdos rapidamente, servindo como referência de força e experiência dentro da crew." },
  "cacador-abissal":   { cat: "Tripulação — Progressão",     color: "#7eb8e8", desc: "Membro altamente avançado, com quase tudo maximizado. Entra nos servidores preparado para combate, domínio, confronto, exploração de conteúdo avançado e imposição de presença da P.A.Z. nos mares." },
  "veterano-abissal":  { cat: "Tripulação — Progressão",     color: "#6aaad8", desc: "Membro próximo do end-game, com renome nos servidores e busca ativa pelo set ideal. Já possui experiência sólida, presença reconhecida e capacidade de contribuir de forma consistente para os objetivos da tripulação." },
  "predador":          { cat: "Tripulação — Progressão",     color: "#5696c8", desc: "Membro de confiança em fase intermediária ou avançada de desenvolvimento. Participa de conteúdos mid-game, auxilia outros membros e demonstra comprometimento real com a evolução da P.A.Z." },
  "marujo":            { cat: "Tripulação — Progressão",     color: "#4282b8", desc: "Membro ativo que mostra esforço, presença e evolução constante. Ainda está em crescimento, mas já demonstra participação, interesse e potencial para subir na hierarquia da tripulação." },
  /* Com membros definidos */
  "artistas-oficiais": { cat: "Discord — Criação Visual", color: "#c49fe0", desc: "Equipe de criação visual oficial da P.A.Z. Responsável por artes, identidade visual, material gráfico e conteúdo criativo da comunidade.", members: [{handle:"@Silva"},{handle:"@Tanso"},{handle:"@Tronza",alt:"@jafgjkj"},{handle:"@Lc_Midia",alt:"@lucaslk900fz"}] }
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

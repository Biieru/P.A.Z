# P.A.Z — Predators of the Abyssal Zone

Site estático da crew P.A.Z, com estética dark fantasy pirata abissal.
HTML, CSS e JavaScript puros. Sem React, sem Tailwind, sem build step.

---

## Estrutura

```
paz-site/
├── index.html              # Home (P.A.Z, esquadrões, resumo)
├── pages/
│   ├── tripulacao.html
│   ├── esquadroes.html
│   ├── cacadas.html
│   ├── hierarquia.html
│   └── big-news.html
├── css/
│   ├── style.css           # Sistema visual principal
│   └── responsive.css      # Breakpoints (1100, 880, 560)
├── js/
│   └── main.js             # Transições e interações
├── assets/
│   ├── images/             # bg, logo, emblemas
│   └── audio/              # reservado p/ futuras trilhas
└── README.md
```

---

## Sistema visual

- **Tipografia:** Cinzel Decorative (display ornamentada), Cinzel (nav/títulos), Cormorant Garamond (corpo de texto).
- **Paleta:** preto abismal `#050810`, dourado patinado `#c9a961`, branco-osso `#e8dcc0`, brilho eldritch ciano-azul `#4ac0ff`.
- **Atmosfera:** camadas de vinheta, grão SVG sobreposto, fundo `bg-paz-fleet.png` desaturado com mistura radial.
- **Decoração:** cantos dourados ornamentais em cada card e botão, divisórias em gradiente dourado.

Todas as variáveis estão em `:root` em `css/style.css`. Para mudar a paleta inteira, edite ali.

---

## Transição entre páginas (águas abissais)

Implementada em CSS + JS, sem libs.

1. Ao clicar em qualquer link com `data-link`, o JS intercepta a navegação.
2. Quatro manchas SVG ancoradas nos cantos da viewport escalam de 0 → 2.2x, com `filter: url(#liquid-distort)` aplicando turbulência fractal e displacement map → arestas orgânicas, parecendo tinta/água viva.
3. Um sinal é gravado em `sessionStorage` (`paz:incoming`).
4. A nova página carrega já com as manchas em escala máxima cobrindo a tela; ao detectar o sinal, o JS as faz retraírem de volta aos cantos, revelando o destino.

**Tempo total:** ~900ms saindo + ~900ms entrando. Ajustável em:
- CSS: `--transition-out` / `--transition-in` em `:root`.
- JS: `TRANSITION_OUT_MS` / `TRANSITION_IN_MS` em `main.js`.

Respeita `prefers-reduced-motion`: usuários com essa preferência têm navegação direta, sem animação.

---

## Rodar localmente

Como é puro HTML estático, basta abrir `index.html` no navegador.
Porém, para evitar problemas de CORS com fontes/imagens, recomendado servir via servidor local:

```bash
# Python
python3 -m http.server 8080

# Node (se tiver npx)
npx serve .
```

Depois, acesse `http://localhost:8080`.

---

## Deploy no Render como Static Site

1. **Subir no GitHub:**
   ```bash
   cd paz-site
   git init
   git add .
   git commit -m "initial commit: P.A.Z static site"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/paz-site.git
   git push -u origin main
   ```

2. **No Render:**
   - Dashboard → **New +** → **Static Site**.
   - Conectar o repositório do GitHub.
   - Configurações:
     - **Build Command:** *(deixar vazio)*
     - **Publish Directory:** `.` *(o próprio root do repositório)*
   - Clicar em **Create Static Site**.

3. Pronto. O Render serve o site, gera HTTPS automático e refaz deploy a cada push na branch `main`.

> Se preferir branch separada para produção, mude a branch no Render para `production` (por exemplo) e faça push para essa branch quando quiser publicar.

---

## Próximos passos sugeridos

- Popular conteúdo real nas 5 páginas internas (Tripulação, Esquadrões, Caçadas, Hierarquia, Big News).
- Adicionar trilha sonora ambiente discreta em `assets/audio/` (controlada por toggle no canto inferior).
- Página dedicada a cada esquadrão, linkada a partir dos cards da Home.
- Sistema de "Wanted Posters" para inimigos rivais.
- Modal de "Alistar-se" com formulário (pode integrar com Discord webhook).

---

## Notas

- Os emblemas dos esquadrões usam um glow ciano radial atrás do PNG para integrar com o tema, sem precisar editar as imagens originais.
- O título `P.A.Z` usa gradiente de osso/ouro aplicado via `-webkit-background-clip: text`, com fallback de cor sólida em navegadores antigos.
- O cabeçalho `<svg class="svg-defs">` precisa estar presente em **todas as páginas** porque ele define o filtro `liquid-distort` usado pela transição. Já está incluído em cada arquivo.

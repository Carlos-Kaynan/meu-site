# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre o usuário e como trabalhar

- O usuário é **iniciante em programação** e está aprendendo frontend construindo este site.
- Ambiente: Windows, VS Code, PowerShell.
- **Responda sempre em português.**
- Explique de forma simples o que cada mudança faz e por quê — o objetivo é aprender, não só ter o código pronto.
- Para mudanças grandes, **mostre um plano antes de codar** e espere a aprovação.
- Quando uma etapa estiver funcionando, **lembre o usuário de fazer commit** (e push para o GitHub).

## Projeto

- `meu-site`: criado com Vite + React 19 + JavaScript (sem TypeScript) + ESLint.
- Repositório no GitHub, conta `Carlos-Kaynan`, branch `main`.
- Outro projeto do usuário: `Documents\trilha-a1` — site estático de aulas de inglês publicado no GitHub Pages (não faz parte deste repositório).

## Comandos

```powershell
npm install       # instala dependências
npm run dev       # servidor de desenvolvimento em http://localhost:5173/meu-site/ (com hot reload)
npm run build     # gera a versão de produção em dist/
npm run preview   # serve o build de dist/ localmente
npm run lint      # roda o ESLint no projeto
```

Não há framework de testes configurado.

## Publicação

- Publicado no GitHub Pages em https://carlos-kaynan.github.io/meu-site/ — cada push na `main` roda `.github/workflows/deploy.yml`, que faz o build e publica `dist/`.
- Por isso `vite.config.js` tem `base: '/meu-site/'`: sem isso, os caminhos de CSS/JS quebram no Pages.

## Trilhas do curso

- As trilhas e suas aulas ficam em `src/data/aulas.js` (array `trilhas`); a seção de aulas (`Trilha.jsx`) mostra uma aba por trilha.
- Trilha 1 (A1): projeto separado `trilha-a1`, linkado pelo GitHub Pages.
- Trilha 2 (A2) e Trilha 3 (B1): cópias de artifacts do Claude em `public/trilha-2/index.html` e `public/trilha-3/index.html` (HTML estático, fora do React). Fora do Claude, a correção por IA, a conversa e o caderno "Novas palavras" ficam desativados; o progresso usa `localStorage`.
- Ao copiar um artifact novo para `public/`: pôr `<title>`, `lang="pt-BR"` e as fontes dentro do `<head>` (o artifact vem com um invólucro próprio), adicionar `body{margin:0}`, fazer o logo `.brand` apontar para `../` e trocar frases que dizem "volte para conversar comigo".
- Cada dia em `Trilha.jsx` aponta para `<url da trilha>#dia-N` e abre **na mesma aba** (sem `target="_blank"`). As 3 páginas de trilha (`trilha-a1/index.html`, `public/trilha-2`, `public/trilha-3`) leem esse `#dia-N` no `init()` (`diaDoEndereco`) e abrem a aula direto, mesmo se o dia estiver bloqueado; `marcarDiaNoEndereco` (com `history.replaceState`) mantém o endereço igual ao dia na tela. No topo da aula, ao lado de "← Voltar para a trilha", há o link "🏠 Página principal" para `../#aulas` (Trilha 1: `https://carlos-kaynan.github.io/meu-site/#aulas`). Ao copiar um artifact novo de trilha, repetir essas três mudanças.
- O botão "📊 Acompanhar progresso" (abaixo da descrição da trilha e no fim da lista) aponta para a URL da trilha **sem** `#dia-N`, que abre a página inicial da trilha (dias estudados, sequência, revisão). O "Começar a Trilha" do fim da lista abre `#dia-1`.
- Aulas com o campo `bloco` (Trilha 3) aparecem agrupadas por bloco. O total de aulas e os níveis do banner são calculados de `trilhas` (`totalDeAulas`, `niveisDasTrilhas`).

## Contas (login)

- Firebase Authentication (e-mail e senha), pacote `firebase`. Código em `src/conta/`: `firebaseConfig.js` (config do projeto; enquanto tiver `COLE_AQUI`, `auth` fica `null` e as contas ficam desligadas), `firebase.js` (cria o `auth`), `sessao.js` (`useUsuario()`: `undefined` carregando, `null` sem login, objeto logado), `destino.js` (monta o endereço da aula pedida só para trilhas/dias que existem), `mensagens.js` (erros do Firebase em português).
- Páginas: `#/criar-conta` (e-mail, confirmar e-mail, senha, confirmar senha; ao criar, faz `signOut` e vai para o login), `#/entrar` (e-mail, senha, "Esqueci minha senha" com `sendPasswordResetEmail`), `#/aviso?trilha=a2&dia=5` (aula bloqueada). Os parâmetros `trilha` e `dia` passam de uma página para outra, e o login leva de volta para a aula pedida.
- Só o Dia 1 de cada trilha é livre. `Trilha.jsx` manda os outros dias para `#/aviso` quando não há login. As páginas das trilhas não usam o Firebase: `sessao.js` grava a marca `ingles-basico:login` no `localStorage` (mesmo endereço carlos-kaynan.github.io), e `openLesson` nas trilhas (`podeAbrirAula`) lê essa marca; sem ela, `location.replace` para o aviso. O bloqueio é só no navegador (as páginas continuam públicas).
- Progresso na conta (Firestore): as trilhas já tinham um caminho "db" (vindo dos artifacts: `db.doc('progress/state').get/set`, `db.collection('checkins')...`). `public/conta/nuvem.js` (módulo, Firebase 13.3.0 pelo CDN gstatic) cria esse db no Firestore em `usuarios/{uid}/trilhas/{a1|a2|b1}/...` e o entrega via `window.claude.use('db')` (definido num `<script>` no `<head>` de cada trilha, com `window.TRILHA_DA_PAGINA`; sem login ou se a nuvem não responder em 10 s, entrega null). A config do Firebase está duplicada em `nuvem.js` e `src/conta/firebaseConfig.js`: mantenha iguais. A Trilha 1 carrega `https://carlos-kaynan.github.io/meu-site/conta/nuvem.js`, então publique o meu-site antes do trilha-a1.
- Nas trilhas: carregar junta nuvem + navegador (`mergeProgress`, `mergeCards`, `mergeWordLists`), mas o navegador só entra se a marca `ingles-basico:dono-progresso` for vazia (estudou sem login) ou do mesmo aluno (`localDoAluno`); salvar grava sempre no navegador e, com login, também na conta; depois de juntar, salva na conta e marca o dono. Ao clicar em Sair, `apagarProgressoDoNavegador()` (em `sessao.js`) apaga as chaves `trilhaA1_`, `trilhaA2_`, `trilhaB1_` e o dono.
- Regras de segurança em `firestore.rules` (coladas no console: Firestore Database → Regras): cada aluno só lê e grava `usuarios/{o próprio uid}/...`.
- Testes locais com o emulador do Firebase. Só login: não precisa de Java. Com Firestore: precisa de Java 21 (um JRE portátil numa pasta temporária basta, com `JAVA_HOME`). Comando: `npx firebase emulators:start --only auth,firestore --project demo-ingles` (com `firebase.json` configurando as portas 9099 e 8080 e as regras `firestore.rules`) e rodar o site com `VITE_EMULADOR=sim`. O site grava a marca `ingles-basico:emulador` para o `nuvem.js` também usar o emulador. No build normal o código do emulador some.

## Estrutura

- `index.html` é o ponto de entrada; carrega `src/main.jsx`, que monta `<App />` (de `src/App.jsx`) na div `#root`.
- Navegação sem biblioteca: `App.jsx` lê `window.location.hash`. `#/dialogos` e `#/dialogos/N` abrem `src/pages/Dialogos.jsx`; qualquer outro hash (inclusive âncoras como `#aulas`) mostra a página inicial.
- Diálogos: textos em `src/data/dialogos.js` (cada fala aponta para a pessoa pelo índice `quem`); o áudio usa a voz do navegador via `src/utils/falar.js` (`falarDialogo` toca em sequência e devolve uma função para parar).
- Estilos globais em `src/index.css`; estilos do componente App em `src/App.css`.
- Imagens importadas pelo código ficam em `src/assets/`; arquivos servidos direto pela raiz do site ficam em `public/`.
- ESLint (`eslint.config.js`, flat config): regras recomendadas de JS + `react-hooks` + `react-refresh` (componentes exportados de arquivos `.jsx` devem ser só componentes, para o hot reload funcionar).

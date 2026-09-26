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
- Trilha 2 (A2): cópia de um artifact do Claude em `public/trilha-2/index.html` (HTML estático, fora do React). Fora do Claude, a correção por IA, a conversa e o caderno "Novas palavras" ficam desativados; o progresso usa `localStorage`.

## Estrutura

- `index.html` é o ponto de entrada; carrega `src/main.jsx`, que monta `<App />` (de `src/App.jsx`) na div `#root`.
- Navegação sem biblioteca: `App.jsx` lê `window.location.hash`. `#/dialogos` e `#/dialogos/N` abrem `src/pages/Dialogos.jsx`; qualquer outro hash (inclusive âncoras como `#aulas`) mostra a página inicial.
- Diálogos: textos em `src/data/dialogos.js` (cada fala aponta para a pessoa pelo índice `quem`); o áudio usa a voz do navegador via `src/utils/falar.js` (`falarDialogo` toca em sequência e devolve uma função para parar).
- Estilos globais em `src/index.css`; estilos do componente App em `src/App.css`.
- Imagens importadas pelo código ficam em `src/assets/`; arquivos servidos direto pela raiz do site ficam em `public/`.
- ESLint (`eslint.config.js`, flat config): regras recomendadas de JS + `react-hooks` + `react-refresh` (componentes exportados de arquivos `.jsx` devem ser só componentes, para o hot reload funcionar).

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // O GitHub Pages publica o site em https://carlos-kaynan.github.io/meu-site-curso-ingles/
  // (o nome do repositório no GitHub). Se o repositório mudar de nome, mude aqui também.
  base: '/meu-site-curso-ingles/',
})

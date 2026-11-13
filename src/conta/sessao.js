import { useSyncExternalStore } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

// Chave que as páginas das trilhas (HTML puro, fora do React) leem para saber se há alguém logado.
// Funciona porque a página principal e as trilhas estão no mesmo endereço (carlos-kaynan.github.io)
// e por isso dividem o mesmo localStorage.
export const CHAVE_LOGIN = 'ingles-basico:login'

// Quem está logado agora:
//   undefined → ainda carregando (o Firebase está verificando)
//   null      → ninguém logado
//   objeto    → o usuário do Firebase (tem .email)
let usuarioAtual = auth ? undefined : null
const ouvintes = new Set()

export function guardarMarcaParaAsTrilhas(usuario) {
  try {
    if (usuario) localStorage.setItem(CHAVE_LOGIN, JSON.stringify({ email: usuario.email }))
    else localStorage.removeItem(CHAVE_LOGIN)
  } catch {
    // navegador sem localStorage: as trilhas vão pedir login, mas o site continua funcionando
  }
}

// Ao clicar em Sair, o progresso das trilhas sai deste navegador (continua salvo na conta).
// Assim, num computador compartilhado, a próxima pessoa não vê o progresso de quem saiu.
const PREFIXOS_DO_PROGRESSO = ['trilhaA1_', 'trilhaA2_', 'trilhaB1_']
export function apagarProgressoDoNavegador() {
  try {
    const chaves = Object.keys(localStorage)
    chaves
      .filter((chave) => PREFIXOS_DO_PROGRESSO.some((prefixo) => chave.startsWith(prefixo)))
      .forEach((chave) => localStorage.removeItem(chave))
    localStorage.removeItem('ingles-basico:dono-progresso')
  } catch {
    // sem localStorage: não há nada para apagar
  }
}

// O Firebase avisa sempre que alguém entra ou sai (e também logo ao abrir o site).
if (auth) {
  onAuthStateChanged(auth, (usuario) => {
    usuarioAtual = usuario
    guardarMarcaParaAsTrilhas(usuario)
    ouvintes.forEach((avisar) => avisar())
  })
}

function inscrever(avisar) {
  ouvintes.add(avisar)
  return () => ouvintes.delete(avisar)
}

// Hook para os componentes: devolve o usuário e redesenha a tela quando ele muda.
export function useUsuario() {
  return useSyncExternalStore(inscrever, () => usuarioAtual)
}

import { useSyncExternalStore } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

// Chave que as páginas das trilhas (HTML puro, fora do React) leem para saber se há alguém logado.
// Funciona porque o meu-site e as trilhas estão no mesmo endereço (carlos-kaynan.github.io)
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

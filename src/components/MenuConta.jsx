import { signOut } from 'firebase/auth'
import { auth } from '../conta/firebase'
import { apagarProgressoDoNavegador, useUsuario } from '../conta/sessao'

// Parte do menu do topo: "Entrar / Criar conta" ou "e-mail + Sair".
function MenuConta() {
  const usuario = useUsuario()

  // undefined = o Firebase ainda está verificando; não mostra nada para não "piscar" o botão errado
  if (usuario === undefined) return null

  if (usuario) {
    async function sair() {
      await signOut(auth)
      apagarProgressoDoNavegador()
      window.location.hash = '#/'
    }
    return (
      <div className="menu-conta">
        <span className="menu-usuario" title={usuario.email}>
          👤 {usuario.email.split('@')[0]}
        </span>
        <button type="button" className="botao botao-contorno botao-pequeno" onClick={sair}>
          Sair
        </button>
      </div>
    )
  }

  return (
    <div className="menu-conta">
      <a className="menu-entrar" href="#/entrar">
        Entrar
      </a>
      <a className="botao botao-branco botao-pequeno" href="#/criar-conta">
        Criar conta
      </a>
    </div>
  )
}

export default MenuConta

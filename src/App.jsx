import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import PalavraDoDia from './components/PalavraDoDia'
import ConversaDoDia from './components/ConversaDoDia'
import Trilha from './components/Trilha'
import MenuConta from './components/MenuConta'
import Dialogos from './pages/Dialogos'
import CriarConta from './pages/CriarConta'
import Entrar from './pages/Entrar'
import Aviso from './pages/Aviso'
import './App.css'

// Descobre qual página mostrar olhando o endereço depois do "#".
// "#/dialogos" → lista de diálogos · "#/dialogos/5" → diálogo 5
// "#/entrar", "#/criar-conta", "#/aviso" → páginas de conta · resto → página inicial
// O que vem depois do "?" (ex.: "#/aviso?trilha=a2&dia=5") vira "parametros".
function lerRota(hash) {
  const [caminho, busca = ''] = hash.split('?')
  const parametros = new URLSearchParams(busca)
  const encontrado = caminho.match(/^#\/dialogos(?:\/(\d+))?$/)
  if (encontrado) {
    return { pagina: 'dialogos', numero: encontrado[1] ? Number(encontrado[1]) : null }
  }
  if (caminho === '#/entrar') return { pagina: 'entrar', parametros }
  if (caminho === '#/criar-conta') return { pagina: 'criar-conta', parametros }
  if (caminho === '#/aviso') return { pagina: 'aviso', parametros }
  return { pagina: 'inicio' }
}

function PaginaAtual({ rota }) {
  if (rota.pagina === 'dialogos') return <Dialogos numero={rota.numero} />
  if (rota.pagina === 'entrar') return <Entrar key={rota.parametros.toString()} parametros={rota.parametros} />
  if (rota.pagina === 'criar-conta') return <CriarConta parametros={rota.parametros} />
  if (rota.pagina === 'aviso') return <Aviso parametros={rota.parametros} />
  return (
    <>
      <Hero />
      <PalavraDoDia />
      <ConversaDoDia />
      <Trilha />
    </>
  )
}

function App() {
  const [hash, setHash] = useState(window.location.hash)

  // useEffect roda DEPOIS que a tela aparece. Aqui ele "escuta" as mudanças de endereço.
  useEffect(() => {
    const aoMudarEndereco = () => setHash(window.location.hash)
    window.addEventListener('hashchange', aoMudarEndereco)
    return () => window.removeEventListener('hashchange', aoMudarEndereco) // limpeza
  }, [])

  // Ao trocar de página, vai para o topo. Links como "#aulas" rolam até a seção.
  useEffect(() => {
    if (hash.startsWith('#/') || hash === '') {
      window.scrollTo(0, 0)
    } else {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    }
  }, [hash])

  const rota = lerRota(hash)

  return (
    <>
      <header className="topo">
        <a className="marca" href="#/">
          📚 Inglês Básico
        </a>
        <nav className="menu">
          <a href="#aulas">Aulas</a>
          <a href="#palavra">Palavra do dia</a>
          <a className="botao botao-principal botao-pequeno menu-dialogos" href="#/dialogos">
            💬 Diálogos
          </a>
          <MenuConta />
        </nav>
      </header>

      <main>
        <PaginaAtual rota={rota} />
      </main>

      <footer className="rodape">
        <p>Inglês Básico · feito por Carlos Kaynan</p>
      </footer>
    </>
  )
}

export default App

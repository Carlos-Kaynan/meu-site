import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import PalavraDoDia from './components/PalavraDoDia'
import Trilha from './components/Trilha'
import Dialogos from './pages/Dialogos'
import { TRILHA_URL } from './data/aulas'
import './App.css'

// Descobre qual página mostrar olhando o endereço depois do "#".
// "#/dialogos" → lista de diálogos · "#/dialogos/5" → diálogo 5 · resto → página inicial
function lerRota(hash) {
  const encontrado = hash.match(/^#\/dialogos(?:\/(\d+))?/)
  if (encontrado) {
    return { pagina: 'dialogos', numero: encontrado[1] ? Number(encontrado[1]) : null }
  }
  return { pagina: 'inicio' }
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
          <a className="botao botao-principal botao-pequeno" href="#/dialogos">
            💬 Diálogos
          </a>
          <a
            className="botao botao-principal botao-pequeno menu-comecar"
            href={TRILHA_URL}
            target="_blank"
            rel="noreferrer"
          >
            Começar
          </a>
        </nav>
      </header>

      <main>
        {rota.pagina === 'dialogos' ? (
          <Dialogos numero={rota.numero} />
        ) : (
          <>
            <Hero />
            <PalavraDoDia />
            <Trilha />
          </>
        )}
      </main>

      <footer className="rodape">
        <p>Inglês Básico · feito por Carlos Kaynan</p>
      </footer>
    </>
  )
}

export default App

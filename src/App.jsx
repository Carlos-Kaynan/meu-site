import Hero from './components/Hero'
import PalavraDoDia from './components/PalavraDoDia'
import Trilha from './components/Trilha'
import { TRILHA_URL } from './data/aulas'
import './App.css'

function App() {
  return (
    <>
      <header className="topo">
        <a className="marca" href="#">
          📚 Inglês Básico
        </a>
        <nav className="menu">
          <a href="#aulas">Aulas</a>
          <a href="#palavra">Palavra do dia</a>
          <a className="botao botao-principal botao-pequeno" href={TRILHA_URL} target="_blank" rel="noreferrer">
            Começar
          </a>
        </nav>
      </header>

      <main>
        <Hero />
        <PalavraDoDia />
        <Trilha />
      </main>

      <footer className="rodape">
        <p>Inglês Básico · feito por Carlos Kaynan</p>
      </footer>
    </>
  )
}

export default App

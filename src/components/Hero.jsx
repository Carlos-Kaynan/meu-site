import CenaEUA from './CenaEUA'
import { TRILHA_URL } from '../data/aulas'

const etiquetas = [
  { texto: 'Curso gratuito', cor: 'vermelho' },
  { texto: 'On-line', cor: 'dourado' },
  { texto: '12 aulas', cor: 'branco' },
  { texto: 'Nível A1', cor: 'celeste' },
]

function Hero() {
  return (
    <section className="hero">
      <div className="hero-texto">
        <p className="hero-sobre">Curso de inglês para iniciantes</p>
        <h1>
          Inglês <span>Básico</span>
        </h1>
        <p className="hero-subtitulo">passo a passo, sem dificuldades</p>

        <ul className="etiquetas">
          {etiquetas.map((e) => (
            <li key={e.texto} className={`etiqueta ${e.cor}`}>
              {e.texto}
            </li>
          ))}
        </ul>

        <div className="hero-botoes">
          <a className="botao botao-principal" href={TRILHA_URL} target="_blank" rel="noreferrer">
            Começar a Trilha 1 →
          </a>
          <a className="botao botao-contorno" href="#aulas">
            Ver as 12 aulas
          </a>
        </div>

        <p className="hero-nota">* Estude no computador ou no celular, no seu ritmo.</p>
      </div>

      <CenaEUA />
    </section>
  )
}

export default Hero

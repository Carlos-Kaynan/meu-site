import { useState } from 'react'
import { aulas, TRILHA_URL } from '../data/aulas'

const filtros = [
  { id: 'todas', nome: 'Todas' },
  { id: 'aulas', nome: '📓 Aulas' },
  { id: 'revisoes', nome: '🔁 Revisões' },
]

function Trilha() {
  const [filtro, setFiltro] = useState('todas')

  // .filter() cria uma lista nova só com os itens que passam no teste
  const aulasVisiveis = aulas.filter((aula) => {
    if (filtro === 'aulas') return !aula.revisao
    if (filtro === 'revisoes') return aula.revisao
    return true
  })

  return (
    <section className="faixa-branca" id="aulas">
      <div className="container">
        <p className="sobretitulo">Trilha 1 · Inglês do zero</p>
        <h2>12 aulas, uma por dia</h2>
        <p className="trilha-intro">
          Cada aula tem vocabulário com áudio, gramática, diálogo, escrita, fala e um quiz. Os dias 6
          e 12 são para revisar o que você já aprendeu.
        </p>

        <div className="filtros" role="group" aria-label="Filtrar aulas">
          {filtros.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`filtro ${filtro === f.id ? 'ativo' : ''}`}
              aria-pressed={filtro === f.id}
              onClick={() => setFiltro(f.id)}
            >
              {f.nome}
            </button>
          ))}
        </div>

        <ol className="aulas">
          {aulasVisiveis.map((aula) => (
            <li key={aula.dia}>
              <a
                className={`aula ${aula.revisao ? 'revisao' : ''}`}
                href={TRILHA_URL}
                target="_blank"
                rel="noreferrer"
              >
                <span className="aula-dia">Dia {aula.dia}</span>
                <span className="aula-icone">{aula.icone}</span>
                <span className="aula-titulo">{aula.titulo}</span>
              </a>
            </li>
          ))}
        </ol>

        <div className="trilha-fim">
          <a className="botao botao-principal" href={TRILHA_URL} target="_blank" rel="noreferrer">
            Começar a Trilha 1 →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Trilha

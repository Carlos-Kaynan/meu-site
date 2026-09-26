import { useState } from 'react'
import { trilhas } from '../data/aulas'

const filtros = [
  { id: 'todas', nome: 'Todas' },
  { id: 'aulas', nome: '📓 Aulas' },
  { id: 'revisoes', nome: '🔁 Revisões' },
]

// Mostra as aulas de UMA trilha. A trilha chega como "prop", vinda do componente pai.
function ListaDeAulas({ trilha }) {
  const [filtro, setFiltro] = useState('todas')

  // .filter() cria uma lista nova só com os itens que passam no teste
  const aulasVisiveis = trilha.aulas.filter((aula) => {
    if (filtro === 'aulas') return !aula.revisao
    if (filtro === 'revisoes') return aula.revisao
    return true
  })

  return (
    <div role="tabpanel" id={`painel-${trilha.id}`} aria-labelledby={`aba-${trilha.id}`}>
      <p className="sobretitulo">
        {trilha.nome} · {trilha.titulo}
      </p>
      <h2>{trilha.aulas.length} aulas, uma por dia</h2>
      <p className="trilha-intro">{trilha.descricao}</p>

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
              href={trilha.url}
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
        <a className="botao botao-principal" href={trilha.url} target="_blank" rel="noreferrer">
          Começar a {trilha.nome} →
        </a>
      </div>
    </div>
  )
}

function Trilha() {
  // Guarda qual aba está aberta: 'a1' ou 'a2'
  const [trilhaAtiva, setTrilhaAtiva] = useState(trilhas[0].id)
  const trilha = trilhas.find((t) => t.id === trilhaAtiva)

  return (
    <section className="faixa-branca" id="aulas">
      <div className="container">
        <p className="abas-titulo">Escolha sua trilha 👇</p>
        <div className="abas" role="tablist" aria-label="Escolha a trilha">
          {trilhas.map((t) => (
            <button
              key={t.id}
              id={`aba-${t.id}`}
              type="button"
              role="tab"
              aria-selected={t.id === trilhaAtiva}
              aria-controls={`painel-${t.id}`}
              className={`aba ${t.id === trilhaAtiva ? 'ativa' : ''}`}
              onClick={() => setTrilhaAtiva(t.id)}
            >
              <span className="aba-icone">{t.icone}</span>
              <span className="aba-texto">
                <span className="aba-nome">{t.nome}</span>
                <span className="aba-detalhes">
                  <span className="aba-nivel">Nível {t.nivel}</span>
                  <span className="aba-qtd">{t.aulas.length} aulas</span>
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* A "key" faz o React recriar a lista ao trocar de aba, então o filtro volta para "Todas" */}
        <ListaDeAulas key={trilha.id} trilha={trilha} />
      </div>
    </section>
  )
}

export default Trilha

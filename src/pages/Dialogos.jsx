import { useState } from 'react'
import Dialogo from '../components/Dialogo'
import { categorias, dialogos, niveis } from '../data/dialogos'

// Categorias na ordem em que aparecem pela primeira vez nos diálogos
const categoriasUsadas = [...new Set(dialogos.map((d) => d.categoria))]

function ListaDeDialogos() {
  const [filtro, setFiltro] = useState('todas')

  const visiveis = dialogos.filter((d) => filtro === 'todas' || d.categoria === filtro)

  return (
    <>
      <p className="sobretitulo">Leia · Ouça · Repita</p>
      <h1 className="pagina-titulo">💬 Diálogos</h1>
      <p className="pagina-intro">
        Conversas do dia a dia, da família, do trabalho, da escola e do trânsito, com a tradução ao lado.
        Comece pelo 1 e vá subindo: cada diálogo é um pouquinho mais difícil que o anterior. Ouça o
        diálogo todo e depois repita cada fala em voz alta.
      </p>

      <div className="filtros" role="group" aria-label="Filtrar por tema">
        <button
          type="button"
          className={`filtro ${filtro === 'todas' ? 'ativo' : ''}`}
          aria-pressed={filtro === 'todas'}
          onClick={() => setFiltro('todas')}
        >
          Todos
        </button>
        {categoriasUsadas.map((id) => (
          <button
            key={id}
            type="button"
            className={`filtro ${filtro === id ? 'ativo' : ''}`}
            aria-pressed={filtro === id}
            onClick={() => setFiltro(id)}
          >
            {categorias[id].icone} {categorias[id].nome}
          </button>
        ))}
      </div>

      {/* Object.entries transforma o objeto "niveis" numa lista de pares [id, dados] */}
      {Object.entries(niveis).map(([idNivel, nivel]) => {
        const doNivel = visiveis.filter((d) => d.nivel === idNivel)
        if (doNivel.length === 0) return null
        return (
          <section key={idNivel} className="grupo-nivel" aria-labelledby={`nivel-${idNivel}`}>
            <h2 id={`nivel-${idNivel}`}>
              {nivel.emoji} {nivel.nome}
              <span className="grupo-descricao">{nivel.descricao}</span>
            </h2>
            <ol className="dialogos-lista">
              {doNivel.map((d) => (
                <li key={d.numero}>
                  <a className={`dialogo-cartao borda-${d.nivel}`} href={`#/dialogos/${d.numero}`}>
                    <span className="dialogo-numero pequeno">{d.numero}</span>
                    <span className="cartao-textos">
                      <span className="cartao-titulo">{d.titulo}</span>
                      <span className="cartao-en" lang="en">
                        {d.tituloEn}
                      </span>
                      <span className="cartao-meta">
                        {categorias[d.categoria].icone} {categorias[d.categoria].nome} · 👥 {d.pessoas.length} ·{' '}
                        {d.falas.length} falas
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )
      })}
    </>
  )
}

function Dialogos({ numero }) {
  const indice = dialogos.findIndex((d) => d.numero === numero)
  const dialogo = dialogos[indice]

  return (
    <div className="pagina-dialogos">
      <div className="container">
        {numero == null ? (
          <>
            <a className="voltar" href="#/">
              ← Página inicial
            </a>
            <ListaDeDialogos />
          </>
        ) : (
          <>
            <a className="voltar" href="#/dialogos">
              ← Todos os diálogos
            </a>
            {dialogo ? (
              // key: ao trocar de diálogo, o React cria um componente novo (o áudio para e tudo recomeça)
              <Dialogo
                key={dialogo.numero}
                dialogo={dialogo}
                anterior={dialogos[indice - 1]?.numero}
                proximo={dialogos[indice + 1]?.numero}
              />
            ) : (
              <p className="pagina-intro">Diálogo não encontrado.</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Dialogos

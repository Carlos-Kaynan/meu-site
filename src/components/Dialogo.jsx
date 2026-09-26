import { useEffect, useRef, useState } from 'react'
import { categorias, niveis } from '../data/dialogos'
import { audioDisponivel, falarDialogo, falarFala } from '../utils/falar'

function Dialogo({ dialogo, anterior, proximo }) {
  const [tocando, setTocando] = useState(false)
  const [falaAtiva, setFalaAtiva] = useState(null) // número da fala que está tocando
  const [devagar, setDevagar] = useState(false)
  const [mostrarTraducao, setMostrarTraducao] = useState(true)

  // useRef guarda um valor que NÃO redesenha a tela quando muda.
  // Aqui guardamos a função que para o áudio.
  const pararAudio = useRef(null)

  function parar() {
    pararAudio.current?.()
    pararAudio.current = null
    setTocando(false)
    setFalaAtiva(null)
  }

  function ouvirTudo() {
    if (tocando) {
      parar()
      return
    }
    setTocando(true)
    pararAudio.current = falarDialogo(dialogo.falas, {
      devagar,
      aoComecarFala: (i) => {
        setFalaAtiva(i)
        document.getElementById(`fala-${i}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      },
      aoTerminar: () => {
        pararAudio.current = null
        setTocando(false)
        setFalaAtiva(null)
      },
    })
  }

  function ouvirUmaFala(fala) {
    parar()
    falarFala(fala.en, fala.quem, devagar)
  }

  // Quando a pessoa sai da página (o componente "desmonta"), o áudio para.
  useEffect(() => {
    const referencia = pararAudio
    return () => referencia.current?.()
  }, [])

  const categoria = categorias[dialogo.categoria]
  const nivel = niveis[dialogo.nivel]

  return (
    <article className="dialogo">
      <header className="dialogo-cabecalho">
        <span className="dialogo-numero">{dialogo.numero}</span>
        <div>
          <h1>{dialogo.titulo}</h1>
          <p className="dialogo-titulo-en">{dialogo.tituloEn}</p>
        </div>
      </header>

      <div className="dialogo-meta">
        <span className={`nivel nivel-${dialogo.nivel}`}>
          {nivel.emoji} {nivel.nome}
        </span>
        <span className="meta-item">
          {categoria.icone} {categoria.nome}
        </span>
        <span className="meta-item">👥 {dialogo.pessoas.map((p) => p.nome).join(', ')}</span>
      </div>

      <p className="dialogo-contexto">📍 {dialogo.contexto}</p>

      <div className="dialogo-controles">
        <button type="button" className="botao botao-principal" onClick={ouvirTudo} disabled={!audioDisponivel}>
          {tocando ? '⏸ Parar' : '▶ Ouvir o diálogo todo'}
        </button>
        <button
          type="button"
          className={`filtro ${devagar ? 'ativo' : ''}`}
          aria-pressed={devagar}
          onClick={() => setDevagar(!devagar)}
        >
          🐢 Devagar
        </button>
        <button
          type="button"
          className={`filtro ${mostrarTraducao ? 'ativo' : ''}`}
          aria-pressed={mostrarTraducao}
          onClick={() => setMostrarTraducao(!mostrarTraducao)}
        >
          🔤 Mostrar tradução
        </button>
      </div>
      {!audioDisponivel && <p className="aviso">Seu navegador não tem leitura em voz alta. Tente pelo Chrome ou Edge.</p>}

      <ol className={`falas ${mostrarTraducao ? '' : 'sem-traducao'}`}>
        {dialogo.falas.map((fala, i) => {
          const pessoa = dialogo.pessoas[fala.quem]
          return (
            <li key={i} id={`fala-${i}`} className={`fala ${falaAtiva === i ? 'ativa' : ''}`}>
              <div className="fala-en">
                <span className={`avatar pessoa-${fala.quem}`} aria-hidden="true">
                  {pessoa.nome.replace(/^(Mr|Mrs)\. /, '')[0]}
                </span>
                <div className="fala-texto">
                  <span className="fala-quem">
                    {pessoa.nome}
                    {pessoa.papel && <span className="fala-papel"> · {pessoa.papel}</span>}
                  </span>
                  <span lang="en">{fala.en}</span>
                </div>
                <button
                  type="button"
                  className="fala-ouvir"
                  onClick={() => ouvirUmaFala(fala)}
                  aria-label={`Ouvir: ${fala.en}`}
                  disabled={!audioDisponivel}
                >
                  🔊
                </button>
              </div>
              {mostrarTraducao && <p className="fala-pt">{fala.pt}</p>}
            </li>
          )
        })}
      </ol>

      <nav className="dialogo-navegacao" aria-label="Outros diálogos">
        {anterior ? (
          <a className="botao botao-contorno" href={`#/dialogos/${anterior}`}>
            ← Diálogo {anterior}
          </a>
        ) : (
          <span />
        )}
        {proximo && (
          <a className="botao botao-principal" href={`#/dialogos/${proximo}`}>
            Diálogo {proximo} →
          </a>
        )}
      </nav>
    </article>
  )
}

export default Dialogo

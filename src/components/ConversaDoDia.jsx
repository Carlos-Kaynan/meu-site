import { useEffect, useRef, useState } from 'react'
import { categorias, dialogos, niveis } from '../data/dialogos'
import { audioDisponivel, falarDialogo } from '../utils/falar'
import { diaDoAno } from '../utils/diaDoAno'

const FALAS_NO_TRECHO = 4

// Escolhe um diálogo diferente para cada dia do ano
function indiceDeHoje() {
  return diaDoAno() % dialogos.length
}

function ConversaDoDia() {
  const [indice, setIndice] = useState(indiceDeHoje)
  const [tocando, setTocando] = useState(false)
  const [falaAtiva, setFalaAtiva] = useState(null)
  const pararAudio = useRef(null)

  const dialogo = dialogos[indice]
  // .slice(0, 4) pega só as 4 primeiras falas: é um "trecho" do diálogo
  const trecho = dialogo.falas.slice(0, FALAS_NO_TRECHO)
  const nivel = niveis[dialogo.nivel]
  const categoria = categorias[dialogo.categoria]

  function parar() {
    pararAudio.current?.()
    pararAudio.current = null
    setTocando(false)
    setFalaAtiva(null)
  }

  function ouvirTrecho() {
    if (tocando) {
      parar()
      return
    }
    setTocando(true)
    pararAudio.current = falarDialogo(trecho, {
      aoComecarFala: setFalaAtiva,
      aoTerminar: () => {
        pararAudio.current = null
        setTocando(false)
        setFalaAtiva(null)
      },
    })
  }

  function outraConversa() {
    parar()
    setIndice((atual) => (atual + 1) % dialogos.length)
  }

  // Se a pessoa sair da página inicial, o áudio para
  useEffect(() => {
    const referencia = pararAudio
    return () => referencia.current?.()
  }, [])

  return (
    <section className="faixa-azul" id="conversa">
      <div className="container conversa">
        <div className="conversa-texto">
          <h2>Conversa do dia</h2>
          <p>
            Um trecho de um dos nossos {dialogos.length} diálogos. Ouça, leia a tradução e depois abra a conversa
            completa para praticar até o fim.
          </p>
          <a className="botao botao-principal" href="#/dialogos">
            Ver todos os diálogos →
          </a>
        </div>

        <div>
          <div className="conversa-cartao">
            <div className="conversa-topo">
              <span className="conversa-numero">{dialogo.numero}</span>
              <div>
                <p className="conversa-titulo">{dialogo.titulo}</p>
                <p className="conversa-titulo-en" lang="en">
                  {dialogo.tituloEn}
                </p>
              </div>
            </div>
            <p className="conversa-etiquetas">
              <span className={`nivel nivel-${dialogo.nivel}`}>
                {nivel.emoji} {nivel.nome}
              </span>
              <span className="conversa-categoria">
                {categoria.icone} {categoria.nome}
              </span>
            </p>

            <ol className="conversa-falas">
              {trecho.map((fala, i) => (
                <li key={i} className={falaAtiva === i ? 'ativa' : ''}>
                  <span className={`avatar pessoa-${fala.quem}`} aria-hidden="true">
                    {dialogo.pessoas[fala.quem].nome.replace(/^(Mr|Mrs)\. /, '')[0]}
                  </span>
                  <span>
                    <span className="conversa-en" lang="en">
                      {fala.en}
                    </span>
                    <span className="conversa-pt">{fala.pt}</span>
                  </span>
                </li>
              ))}
            </ol>
            {dialogo.falas.length > FALAS_NO_TRECHO && (
              <p className="conversa-continua">
                … e mais {dialogo.falas.length - FALAS_NO_TRECHO} falas no diálogo completo
              </p>
            )}
          </div>

          <div className="palavra-botoes">
            <button type="button" className="botao botao-branco" onClick={ouvirTrecho} disabled={!audioDisponivel}>
              {tocando ? '⏸ Parar' : '▶ Ouvir o trecho'}
            </button>
            <a className="botao botao-branco" href={`#/dialogos/${dialogo.numero}`}>
              📖 Ler completo
            </a>
            <button type="button" className="botao botao-contorno" onClick={outraConversa}>
              Outra conversa →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConversaDoDia

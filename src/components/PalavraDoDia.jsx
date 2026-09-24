import { useState } from 'react'
import { palavras } from '../data/aulas'
import { falar } from '../utils/falar'

// Escolhe uma palavra diferente para cada dia do ano
function indiceDeHoje() {
  const hoje = new Date()
  const inicioDoAno = new Date(hoje.getFullYear(), 0, 0)
  const diaDoAno = Math.floor((hoje - inicioDoAno) / 86400000)
  return diaDoAno % palavras.length
}

function PalavraDoDia() {
  // useState guarda valores que, quando mudam, fazem o React redesenhar a tela
  const [indice, setIndice] = useState(indiceDeHoje)
  const [virado, setVirado] = useState(false)

  const palavra = palavras[indice]

  function proximaPalavra() {
    setVirado(false)
    setIndice((atual) => (atual + 1) % palavras.length)
  }

  return (
    <section className="faixa-vermelha" id="palavra">
      <div className="container palavra">
        <div className="palavra-texto">
          <h2>Palavra do dia</h2>
          <p>
            Clique no cartão para ver a tradução. Depois, ouça a pronúncia e repita em voz alta!
          </p>
        </div>

        <div>
          <button
            type="button"
            className={`cartao ${virado ? 'virado' : ''}`}
            onClick={() => setVirado(!virado)}
            aria-label={virado ? 'Mostrar a palavra em inglês' : 'Mostrar a tradução'}
          >
            <span className="cartao-interno">
              <span className="face frente">
                <span className="cartao-dica">English</span>
                <span className="cartao-palavra">{palavra.en}</span>
                <span className="cartao-dica">toque para virar</span>
              </span>
              <span className="face verso">
                <span className="cartao-dica">Português</span>
                <span className="cartao-palavra">{palavra.pt}</span>
                <span className="cartao-exemplo">“{palavra.exemplo}”</span>
              </span>
            </span>
          </button>

          <div className="palavra-botoes">
            <button type="button" className="botao botao-branco" onClick={() => falar(palavra.en)}>
              🔊 Ouvir
            </button>
            <button type="button" className="botao botao-branco" onClick={() => falar(palavra.exemplo)}>
              💬 Ouvir a frase
            </button>
            <button type="button" className="botao botao-contorno" onClick={proximaPalavra}>
              Outra palavra →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PalavraDoDia

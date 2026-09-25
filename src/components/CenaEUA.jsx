// Cena do lado direito do banner: bandeira dos EUA ao fundo e, na frente, a Estátua
// da Liberdade, um castelo de conto de fadas e o letreiro de Hollywood.
// O desenho veio do projeto curso-py-site (BannerEUA.jsx), sem os textos do Curso_PY.
import minhaFoto from '../assets/minha-foto.png'
import { falar } from '../utils/falar'

const AZUL = '#3C3B6E'
const VERMELHO = '#B22234'
const PATINA = '#82B5A6' // o verde da Estátua da Liberdade
const PATINA_ESCURA = '#5F9586'

// Objetos que "flutuam" na cena. Clicar fala a palavra em inglês.
const figurinhas = [
  { emoji: '📚', en: 'books', classe: 'f1' },
  { emoji: '🎓', en: 'university', classe: 'f2' },
  { emoji: '☕', en: 'tea', classe: 'f3' },
  { emoji: '☂️', en: 'umbrella', classe: 'f4' },
  { emoji: '✏️', en: 'pencil', classe: 'f5' },
]

// Pontos de uma estrela de 5 pontas com centro (cx, cy) e raio r.
function pontosEstrela(cx, cy, r) {
  return Array.from({ length: 10 }, (_, i) => {
    const raio = i % 2 === 0 ? r : r * 0.382
    const angulo = (Math.PI / 5) * i - Math.PI / 2
    return `${(cx + raio * Math.cos(angulo)).toFixed(2)},${(cy + raio * Math.sin(angulo)).toFixed(2)}`
  }).join(' ')
}

// Medidas oficiais da bandeira (proporção 19 x 10): 13 listras e 50 estrelas
// em 9 fileiras que alternam 6 e 5 estrelas.
const ALTURA_LISTRA = 100 / 13
const estrelas = Array.from({ length: 9 }, (_, linha) => {
  const colunas = linha % 2 === 0 ? [1, 3, 5, 7, 9, 11] : [2, 4, 6, 8, 10]
  return colunas.map((coluna) => pontosEstrela(6.33 * coluna, 5.385 * (linha + 1), 3.08))
}).flat()

function BandeiraEUA() {
  return (
    <svg className="cena-bandeira" viewBox="0 0 190 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {Array.from({ length: 13 }, (_, i) => (
        <rect key={i} x="0" y={i * ALTURA_LISTRA} width="190" height={ALTURA_LISTRA + 0.1} fill={i % 2 === 0 ? VERMELHO : '#fff'} />
      ))}
      <rect x="0" y="0" width="76" height={ALTURA_LISTRA * 7} fill={AZUL} />
      {estrelas.map((pontos, i) => (
        <polygon key={i} points={pontos} fill="#fff" />
      ))}
    </svg>
  )
}

// Os 7 raios da coroa da estátua, em volta da cabeça (centro 185,108).
const raiosCoroa = [-160, -133, -108, -90, -72, -47, -20].map((graus) => {
  const ponto = (g, r) => {
    const a = (g * Math.PI) / 180
    return `${(185 + r * Math.cos(a)).toFixed(1)},${(108 + r * Math.sin(a)).toFixed(1)}`
  }
  return `${ponto(graus - 9, 11)} ${ponto(graus + 9, 11)} ${ponto(graus, 27)}`
})

function EstatuaDaLiberdade() {
  return (
    <g>
      {/* Base e pedestal */}
      <rect x="90" y="296" width="190" height="24" fill="#A79F8F" />
      <polygon points="130,296 240,296 228,215 142,215" fill="#D6CEBD" />
      <rect x="136" y="207" width="98" height="10" fill="#C4BBA8" />
      <rect x="176" y="240" width="18" height="26" rx="2" fill="#B3AA97" />
      {/* Manto */}
      <polygon points="158,207 212,207 204,128 166,128" fill={PATINA} />
      <ellipse cx="185" cy="128" rx="21" ry="8" fill={PATINA} />
      <path d="M175,136 L170,205 M190,136 L192,205 M200,140 L206,205" stroke={PATINA_ESCURA} strokeWidth="2" />
      {/* Braço levantado e tocha */}
      <line x1="170" y1="126" x2="150" y2="52" stroke={PATINA} strokeWidth="10" strokeLinecap="round" />
      <rect x="141" y="34" width="18" height="8" rx="2" fill="#C9A227" />
      <path d="M150,4 C161,16 161,27 150,34 C139,27 139,16 150,4 Z" fill="#F4B400" />
      <path d="M150,14 C155,20 155,27 150,31 C145,27 145,20 150,14 Z" fill="#FFE08A" />
      {/* Braço com a tábua */}
      <line x1="203" y1="130" x2="208" y2="150" stroke={PATINA} strokeWidth="8" strokeLinecap="round" />
      <rect x="200" y="140" width="13" height="26" rx="2" fill="#6FA393" transform="rotate(-12 206 153)" />
      {/* Cabeça e coroa */}
      {raiosCoroa.map((pontos, i) => (
        <polygon key={i} points={pontos} fill={PATINA} />
      ))}
      <circle cx="185" cy="108" r="12" fill={PATINA} />
    </g>
  )
}

// Uma torre com telhado pontudo e bandeirinha vermelha no topo.
function Torre({ x, y, largura, alturaTelhado }) {
  const meio = x + largura / 2
  const topo = y - alturaTelhado
  return (
    <g>
      <rect x={x} y={y} width={largura} height={320 - y} fill="#EEF2FB" />
      <polygon points={`${x - 4},${y} ${meio},${topo} ${x + largura + 4},${y}`} fill={AZUL} />
      <line x1={meio} y1={topo} x2={meio} y2={topo - 14} stroke={AZUL} strokeWidth="1.5" />
      <polygon points={`${meio},${topo - 14} ${meio + 12},${topo - 10} ${meio},${topo - 6}`} fill={VERMELHO} />
      <rect x={meio - 3} y={y + 14} width="6" height="10" rx="3" fill={AZUL} opacity="0.7" />
    </g>
  )
}

function Castelo() {
  return (
    <g>
      <Torre x={418} y={212} largura={24} alturaTelhado={40} />
      <Torre x={578} y={212} largura={24} alturaTelhado={40} />
      {/* Corpo do castelo com ameias */}
      <rect x="440" y="200" width="140" height="120" fill="#E2E8F7" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={442 + i * 16} y="191" width="9" height="10" fill="#E2E8F7" />
      ))}
      <Torre x={446} y={160} largura={26} alturaTelhado={50} />
      <Torre x={548} y={160} largura={26} alturaTelhado={50} />
      <Torre x={490} y={122} largura={40} alturaTelhado={72} />
      {/* Portão e janelas */}
      <path d="M494,320 V286 A16,16 0 0 1 526,286 V320 Z" fill={AZUL} />
      {[458, 552].map((x) => (
        <rect key={x} x={x} y="236" width="10" height="16" rx="5" fill={AZUL} opacity="0.7" />
      ))}
    </g>
  )
}

function LetreiroHollywood() {
  return (
    <g>
      <path d="M590,320 C650,215 730,168 830,166 C910,165 960,152 1000,148 L1000,320 Z" fill="#4A4988" />
      <text
        x="805"
        y="232"
        textAnchor="middle"
        fontFamily="'Bebas Neue', sans-serif"
        fontSize="46"
        letterSpacing="7"
        fill="#fff"
        transform="rotate(-5 805 232)"
      >
        HOLLYWOOD
      </text>
      <path d="M540,320 C620,270 690,250 770,246 C850,242 910,256 1000,238 L1000,320 Z" fill="#2B2A63" />
    </g>
  )
}

function Horizonte() {
  return (
    <svg className="cena-horizonte" viewBox="0 0 1000 320" aria-hidden="true">
      <LetreiroHollywood />
      <Castelo />
      <EstatuaDaLiberdade />
      <rect x="0" y="312" width="1000" height="8" fill="#1F1E4D" />
    </svg>
  )
}

function CenaEUA() {
  return (
    <div className="cena">
      <BandeiraEUA />
      <div className="cena-brilho" />
      <div className="cena-escurecer" />

      <button
        type="button"
        className="foto"
        onClick={() => falar("Hello! Let's learn English together!")}
        aria-label="Ouvir: Hello! Let's learn English together!"
      >
        <img src={minhaFoto} alt="Foto de Carlos Kaynan" />
      </button>

      {figurinhas.map((f) => (
        <button
          key={f.en}
          type="button"
          className={`figurinha ${f.classe}`}
          onClick={() => falar(f.en)}
          aria-label={`Ouvir a palavra ${f.en}`}
        >
          <span className="emoji">{f.emoji}</span>
          <span className="rotulo">{f.en}</span>
        </button>
      ))}

      <Horizonte />
    </div>
  )
}

export default CenaEUA

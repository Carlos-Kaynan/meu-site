import minhaFoto from '../assets/minha-foto.png'
import { falar } from '../utils/falar'

// Objetos que "flutuam" em volta da foto. Clicar fala a palavra em inglês.
const figurinhas = [
  { emoji: '📚', en: 'books', classe: 'f1' },
  { emoji: '🎓', en: 'university', classe: 'f2' },
  { emoji: '☕', en: 'tea', classe: 'f3' },
  { emoji: '☂️', en: 'umbrella', classe: 'f4' },
  { emoji: '✏️', en: 'pencil', classe: 'f5' },
]

// Bandeirinhas penduradas num varal curvo. Calculamos a posição de cada uma.
const TOTAL_BANDEIRINHAS = 14
const cores = ['#C8102E', '#FFFFFF', '#012169']
const bandeirinhas = Array.from({ length: TOTAL_BANDEIRINHAS }, (_, i) => {
  const t = (i + 0.5) / TOTAL_BANDEIRINHAS
  const x = 600 * t
  const y = 8 + 64 * t * (1 - t) // acompanha a curva do varal
  return { x, y, cor: cores[i % cores.length] }
})

function BandeiraReinoUnido() {
  return (
    <svg className="cena-bandeira" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <clipPath id="uk-s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="uk-t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#uk-s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

function Varal() {
  return (
    <svg className="cena-varal" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,8 Q300,40 600,8" stroke="#F3E9D2" strokeWidth="1.5" fill="none" />
      {bandeirinhas.map((b, i) => (
        <polygon
          key={i}
          className="bandeirinha"
          style={{ animationDelay: `${i * 0.15}s` }}
          points={`${b.x - 11},${b.y} ${b.x + 11},${b.y} ${b.x},${b.y + 24}`}
          fill={b.cor}
          stroke="#0a1433"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  )
}

function Horizonte() {
  const creme = '#F3E9D2'
  const escuro = '#0a1433'
  return (
    <svg className="cena-horizonte" viewBox="0 0 600 170" aria-hidden="true">
      {/* Big Ben */}
      <polygon points="40,52 62,8 84,52" fill={creme} />
      <rect x="44" y="52" width="36" height="118" fill={creme} />
      <rect x="40" y="52" width="44" height="40" fill={creme} />
      <circle cx="62" cy="72" r="14" fill="#fff" stroke={escuro} strokeWidth="2" />
      <path d="M62,72 v-9 M62,72 h7" stroke={escuro} strokeWidth="2" strokeLinecap="round" />
      <rect x="52" y="100" width="6" height="14" fill={escuro} opacity=".5" />
      <rect x="66" y="100" width="6" height="14" fill={escuro} opacity=".5" />
      {/* Parlamento */}
      <rect x="84" y="112" width="110" height="58" fill={creme} opacity=".9" />
      {[92, 112, 132, 152, 172].map((x) => (
        <rect key={x} x={x} y="124" width="8" height="18" fill={escuro} opacity=".45" />
      ))}
      {/* London Eye */}
      <g stroke="#fff" opacity=".85" fill="none">
        <circle cx="320" cy="92" r="62" strokeWidth="3" />
        {[0, 30, 60, 90, 120, 150].map((a) => (
          <line
            key={a}
            x1={320 + 62 * Math.cos((a * Math.PI) / 180)}
            y1={92 + 62 * Math.sin((a * Math.PI) / 180)}
            x2={320 - 62 * Math.cos((a * Math.PI) / 180)}
            y2={92 - 62 * Math.sin((a * Math.PI) / 180)}
            strokeWidth="1"
          />
        ))}
        <path d="M320,92 L292,170 M320,92 L348,170" strokeWidth="3" />
      </g>
      {/* Universidade */}
      <polygon points="430,98 510,62 590,98" fill={creme} />
      <rect x="438" y="98" width="144" height="10" fill={creme} />
      {[446, 470, 494, 518, 542, 566].map((x) => (
        <rect key={x} x={x} y="108" width="10" height="50" fill={creme} />
      ))}
      <rect x="432" y="158" width="156" height="12" fill={creme} />
      <circle cx="510" cy="84" r="7" fill={escuro} opacity=".5" />
    </svg>
  )
}

function Onibus() {
  return (
    <svg className="cena-onibus" viewBox="0 0 120 74" aria-hidden="true">
      <rect x="2" y="4" width="116" height="58" rx="8" fill="#C8102E" stroke="#fff" strokeWidth="2" />
      {[10, 30, 50, 70, 90].map((x) => (
        <rect key={`c${x}`} x={x} y="10" width="16" height="13" rx="2" fill="#dbe7ff" />
      ))}
      <rect x="2" y="27" width="116" height="3" fill="#F3E9D2" />
      {[10, 30, 50, 70].map((x) => (
        <rect key={`b${x}`} x={x} y="34" width="16" height="13" rx="2" fill="#dbe7ff" />
      ))}
      <rect x="92" y="34" width="18" height="24" rx="2" fill="#0a1433" opacity=".6" />
      <circle cx="26" cy="63" r="9" fill="#111" />
      <circle cx="26" cy="63" r="3.5" fill="#bbb" />
      <circle cx="94" cy="63" r="9" fill="#111" />
      <circle cx="94" cy="63" r="3.5" fill="#bbb" />
    </svg>
  )
}

function LondonScene() {
  return (
    <div className="cena">
      <BandeiraReinoUnido />
      <div className="cena-sombra" />
      <Varal />

      <button
        type="button"
        className="foto"
        onClick={() => falar("Hello! Let's learn English together!")}
        aria-label="Ouvir: Hello! Let's learn English together!"
      >
        <span className="foto-moldura">
          <img src={minhaFoto} alt="Foto de Carlos Kaynan" />
        </span>
        <span className="balao">Hello! 👋</span>
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
      <Onibus />
    </div>
  )
}

export default LondonScene

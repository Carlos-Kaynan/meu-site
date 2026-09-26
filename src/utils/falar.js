const temVoz = typeof window !== 'undefined' && 'speechSynthesis' in window

// Usa a voz do próprio navegador para ler um texto em inglês britânico.
export function falar(texto) {
  if (!temVoz) return
  const fala = new SpeechSynthesisUtterance(texto)
  fala.lang = 'en-GB'
  fala.rate = 0.9
  window.speechSynthesis.cancel() // para qualquer fala anterior
  window.speechSynthesis.speak(fala)
}

// ---------- Diálogos: uma voz diferente para cada pessoa ----------

// As vozes em inglês instaladas no computador/celular. O navegador carrega a
// lista aos poucos, por isso atualizamos quando ele avisa "voiceschanged".
let vozesEmIngles = []
function carregarVozes() {
  vozesEmIngles = window.speechSynthesis.getVoices().filter((v) => v.lang?.toLowerCase().startsWith('en'))
}
if (temVoz) {
  carregarVozes()
  window.speechSynthesis.addEventListener?.('voiceschanged', carregarVozes)
}

// Se não houver uma voz para cada pessoa, mudamos o tom (pitch) para diferenciar.
const TONS = [1, 0.75, 1.3, 0.9]

function criarFala(texto, pessoa, devagar) {
  const fala = new SpeechSynthesisUtterance(texto)
  fala.lang = 'en-US'
  if (vozesEmIngles.length > 0) {
    const voz = vozesEmIngles[pessoa % vozesEmIngles.length]
    fala.voice = voz
    fala.lang = voz.lang
  }
  fala.pitch = vozesEmIngles.length > pessoa ? 1 : TONS[pessoa % TONS.length]
  fala.rate = devagar ? 0.7 : 0.95
  return fala
}

// Lê uma única fala com a voz da pessoa que a diz.
export function falarFala(texto, pessoa = 0, devagar = false) {
  if (!temVoz) return
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(criarFala(texto, pessoa, devagar))
}

// Lê o diálogo inteiro, uma fala depois da outra.
// aoComecarFala(i) avisa qual fala está tocando; aoTerminar() avisa o fim.
// Devolve uma função que PARA o áudio.
export function falarDialogo(falas, { devagar = false, aoComecarFala, aoTerminar } = {}) {
  if (!temVoz) {
    aoTerminar?.()
    return () => {}
  }

  let parado = false
  let falaAtual = null // guardamos a fala atual para o navegador não "esquecer" dela no meio

  function tocar(i) {
    if (parado) return
    if (i >= falas.length) {
      aoTerminar?.()
      return
    }
    falaAtual = criarFala(falas[i].en, falas[i].quem, devagar)
    falaAtual.onend = () => setTimeout(() => tocar(i + 1), 350) // pequena pausa entre as falas
    aoComecarFala?.(i)
    window.speechSynthesis.speak(falaAtual)
  }

  window.speechSynthesis.cancel()
  tocar(0)

  return () => {
    parado = true
    falaAtual = null
    window.speechSynthesis.cancel()
  }
}

export const audioDisponivel = temVoz

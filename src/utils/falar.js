// Usa a voz do próprio navegador para ler um texto em inglês britânico.
export function falar(texto) {
  if (!('speechSynthesis' in window)) return
  const fala = new SpeechSynthesisUtterance(texto)
  fala.lang = 'en-GB'
  fala.rate = 0.9
  window.speechSynthesis.cancel() // para qualquer fala anterior
  window.speechSynthesis.speak(fala)
}

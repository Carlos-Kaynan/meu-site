import { trilhas } from '../data/aulas'

export function buscarTrilha(trilhaId) {
  return trilhas.find((trilha) => trilha.id === trilhaId) ?? null
}

// Endereço da aula pedida (ex.: Trilha 2, Dia 5 → ".../trilha-2/index.html#dia-5").
// Só aceita trilhas e dias que existem: assim ninguém monta um link que mande o aluno,
// depois do login, para um site estranho.
export function enderecoDaAula(trilhaId, dia) {
  const trilha = buscarTrilha(trilhaId)
  const numero = Number(dia)
  if (!trilha || !Number.isInteger(numero) || numero < 1 || numero > trilha.aulas.length) return null
  return `${trilha.url}#dia-${numero}`
}

// "?trilha=a2&dia=5" para repassar a aula pedida entre as páginas aviso → criar conta → entrar.
export function parametrosDoDestino(trilhaId, dia) {
  if (!enderecoDaAula(trilhaId, dia)) return ''
  return `trilha=${encodeURIComponent(trilhaId)}&dia=${encodeURIComponent(dia)}`
}

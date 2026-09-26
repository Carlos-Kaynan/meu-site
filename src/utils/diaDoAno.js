// Número do dia no ano (1 a 366). Serve para escolher um item diferente a cada dia.
export function diaDoAno() {
  const hoje = new Date()
  const inicioDoAno = new Date(hoje.getFullYear(), 0, 0)
  return Math.floor((hoje - inicioDoAno) / 86400000)
}

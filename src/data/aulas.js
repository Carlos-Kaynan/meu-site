// Endereço do curso publicado no GitHub Pages (projeto trilha-a1)
export const TRILHA_URL = 'https://carlos-kaynan.github.io/trilha-a1/'

// As trilhas do curso. Em cada aula, "revisao: true" marca os dias só de revisão.
export const trilhas = [
  {
    id: 'a1',
    nome: 'Trilha 1',
    icone: '📓',
    nivel: 'A1',
    titulo: 'Inglês do zero',
    url: TRILHA_URL,
    descricao:
      'Cada aula tem vocabulário com áudio, gramática, diálogo, escrita, fala e um quiz. Os dias 6 e 12 são para revisar o que você já aprendeu.',
    aulas: [
      { dia: 1, icone: '👋', titulo: 'Saudações & Verb To Be' },
      { dia: 2, icone: '🌍', titulo: 'To Be negativo & países' },
      { dia: 3, icone: '👨‍👩‍👧', titulo: 'Possessivos & Família' },
      { dia: 4, icone: '🎒', titulo: 'a/an, this/that & objetos' },
      { dia: 5, icone: '🔢', titulo: 'Números & idade' },
      { dia: 6, icone: '🔁', titulo: 'Dia de Revisão 1', revisao: true },
      { dia: 7, icone: '⏰', titulo: 'Present Simple & rotina' },
      { dia: 8, icone: '📅', titulo: 'Horas & dias da semana' },
      { dia: 9, icone: '🏠', titulo: 'There is/are & casa' },
      { dia: 10, icone: '👩‍🏫', titulo: "Can/Can't & profissões" },
      { dia: 11, icone: '🍎', titulo: 'Comida & preposições de lugar' },
      { dia: 12, icone: '🏁', titulo: 'Dia de Revisão 2 · Checkpoint', revisao: true },
    ],
  },
  {
    id: 'a2',
    nome: 'Trilha 2',
    icone: '🗺️',
    nivel: 'A2',
    titulo: 'Do básico ao pré-intermediário',
    // Fica na pasta public/trilha-2 deste site. BASE_URL é o "/meu-site/" do vite.config.js
    url: `${import.meta.env.BASE_URL}trilha-2/index.html`,
    descricao:
      'O próximo passo depois do A1: falar do passado, do que está acontecendo agora e dos seus planos; comparar, viajar, ir ao médico e contar suas experiências. Os dias 7 e 14 são para revisar.',
    aulas: [
      { dia: 1, icone: '🕰️', titulo: 'Passado: was/were e verbos regulares' },
      { dia: 2, icone: '🧩', titulo: 'Passado: verbos irregulares' },
      { dia: 3, icone: '❓', titulo: "Passado: perguntas e negativas (did/didn't)" },
      { dia: 4, icone: '🏃', titulo: 'Present Continuous — agora vs. rotina' },
      { dia: 5, icone: '🔮', titulo: 'Futuro: going to e will' },
      { dia: 6, icone: '⚖️', titulo: 'Comparativos, superlativos e descrever pessoas' },
      { dia: 7, icone: '🔁', titulo: 'Revisão 1 · Checkpoint', revisao: true },
      { dia: 8, icone: '🛒', titulo: 'Quantidade, compras e restaurante' },
      { dia: 9, icone: '💼', titulo: 'Should, have to e must — trabalho e regras' },
      { dia: 10, icone: '✈️', titulo: 'Viagem, direções e transporte' },
      { dia: 11, icone: '🩺', titulo: 'Saúde e corpo — no médico' },
      { dia: 12, icone: '🌎', titulo: 'Present Perfect — experiências de vida' },
      { dia: 13, icone: '💌', titulo: 'Convites, planos e first conditional' },
      { dia: 14, icone: '🎓', titulo: 'Revisão 2 · Checkpoint final A2', revisao: true },
    ],
  },
]

// Palavras do cartão "Palavra do dia"
export const palavras = [
  { en: 'book', pt: 'livro', exemplo: 'I read a book every night.' },
  { en: 'university', pt: 'universidade', exemplo: 'She studies at a university in London.' },
  { en: 'teacher', pt: 'professor(a)', exemplo: 'My teacher is very kind.' },
  { en: 'notebook', pt: 'caderno', exemplo: 'Write the new words in your notebook.' },
  { en: 'library', pt: 'biblioteca', exemplo: 'The library is open today.' },
  { en: 'bus', pt: 'ônibus', exemplo: 'The red bus goes to the city centre.' },
  { en: 'friend', pt: 'amigo(a)', exemplo: 'This is my friend, Anna.' },
  { en: 'rain', pt: 'chuva', exemplo: 'There is a lot of rain in London.' },
  { en: 'tea', pt: 'chá', exemplo: 'Would you like a cup of tea?' },
  { en: 'learn', pt: 'aprender', exemplo: 'I learn English every day.' },
]

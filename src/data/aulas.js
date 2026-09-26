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
  {
    id: 'b1',
    nome: 'Trilha 3',
    icone: '🧗',
    nivel: 'B1',
    titulo: 'Threshold — o limiar da independência',
    // Fica na pasta public/trilha-3 deste site
    url: `${import.meta.env.BASE_URL}trilha-3/index.html`,
    descricao:
      '30 aulas em 5 blocos: narrar o passado, opinar e levantar hipóteses, inglês profissional, fluência natural e precisão. Toda aula tem um texto para ler e a "armadilha de brasileiro" daquele tema. Os dias 6, 12, 18, 24 e 30 fecham cada bloco com revisão.',
    // Aqui cada aula também diz a qual "bloco" pertence, para a lista aparecer separada
    aulas: [
      { dia: 1, bloco: 'Bloco 1 · Narrar o passado', icone: '🎬', titulo: 'Past Continuous — cenário e interrupção' },
      { dia: 2, bloco: 'Bloco 1 · Narrar o passado', icone: '🧸', titulo: 'Used to, would e be used to' },
      { dia: 3, bloco: 'Bloco 1 · Narrar o passado', icone: '⏪', titulo: 'Past Perfect — o passado antes do passado' },
      { dia: 4, bloco: 'Bloco 1 · Narrar o passado', icone: '⏳', titulo: 'Present Perfect Continuous · for e since' },
      { dia: 5, bloco: 'Bloco 1 · Narrar o passado', icone: '🔗', titulo: 'Conectar ideias e contar histórias' },
      { dia: 6, bloco: 'Bloco 1 · Narrar o passado', icone: '🔁', titulo: 'Revisão · Bloco 1', revisao: true },
      { dia: 7, bloco: 'Bloco 2 · Opinar e hipotetizar', icone: '💭', titulo: 'Second Conditional — hipóteses' },
      { dia: 8, bloco: 'Bloco 2 · Opinar e hipotetizar', icone: '😔', titulo: 'Third Conditional e I wish — arrependimento' },
      { dia: 9, bloco: 'Bloco 2 · Opinar e hipotetizar', icone: '🕵️', titulo: "Modais de dedução — must, might, can't" },
      { dia: 10, bloco: 'Bloco 2 · Opinar e hipotetizar', icone: '🗣️', titulo: 'Opinar, concordar e discordar' },
      { dia: 11, bloco: 'Bloco 2 · Opinar e hipotetizar', icone: '⚖️', titulo: 'Conectivos de argumentação' },
      { dia: 12, bloco: 'Bloco 2 · Opinar e hipotetizar', icone: '🔁', titulo: 'Revisão · Bloco 2', revisao: true },
      { dia: 13, bloco: 'Bloco 3 · Inglês profissional', icone: '⚙️', titulo: 'Voz passiva — processos e sistemas' },
      { dia: 14, bloco: 'Bloco 3 · Inglês profissional', icone: '💬', titulo: 'Discurso indireto — relatar conversas' },
      { dia: 15, bloco: 'Bloco 3 · Inglês profissional', icone: '🔍', titulo: 'Relative clauses — dar detalhes' },
      { dia: 16, bloco: 'Bloco 3 · Inglês profissional', icone: '📧', titulo: 'Reuniões e e-mails profissionais' },
      { dia: 17, bloco: 'Bloco 3 · Inglês profissional', icone: '🧑‍💻', titulo: 'Inglês técnico e falsos amigos' },
      { dia: 18, bloco: 'Bloco 3 · Inglês profissional', icone: '🔁', titulo: 'Revisão · Bloco 3', revisao: true },
      { dia: 19, bloco: 'Bloco 4 · Fluência natural', icone: '🧩', titulo: 'Phrasal verbs I — get, take, put, go' },
      { dia: 20, bloco: 'Bloco 4 · Fluência natural', icone: '🔄', titulo: 'Phrasal verbs II — come, look, turn, run' },
      { dia: 21, bloco: 'Bloco 4 · Fluência natural', icone: '🤝', titulo: 'Collocations — as combinações certas' },
      { dia: 22, bloco: 'Bloco 4 · Fluência natural', icone: '😄', titulo: 'Expressões do dia a dia' },
      { dia: 23, bloco: 'Bloco 4 · Fluência natural', icone: '🎙️', titulo: 'Soar natural — reagir e ganhar tempo' },
      { dia: 24, bloco: 'Bloco 4 · Fluência natural', icone: '🔁', titulo: 'Revisão · Bloco 4', revisao: true },
      { dia: 25, bloco: 'Bloco 5 · Precisão', icone: '🔀', titulo: 'Gerúndio ou infinitivo?' },
      { dia: 26, bloco: 'Bloco 5 · Precisão', icone: '🅰️', titulo: 'Artigos — a, an, the e o artigo zero' },
      { dia: 27, bloco: 'Bloco 5 · Precisão', icone: '📌', titulo: 'Preposições dependentes' },
      { dia: 28, bloco: 'Bloco 5 · Precisão', icone: '🚫', titulo: 'Some, any, every, no — e a dupla negativa' },
      { dia: 29, bloco: 'Bloco 5 · Precisão', icone: '✍️', titulo: 'Escrita: e-mail, mensagem e texto de opinião' },
      { dia: 30, bloco: 'Bloco 5 · Precisão', icone: '🏆', titulo: 'Checkpoint final B1', revisao: true },
    ],
  },
]

// Totais usados no banner (calculados, para não ficarem desatualizados)
// .reduce() percorre a lista somando: começa em 0 e soma as aulas de cada trilha
export const totalDeAulas = trilhas.reduce((soma, t) => soma + t.aulas.length, 0)
export const niveisDasTrilhas = trilhas.map((t) => t.nivel) // ['A1', 'A2', 'B1']

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

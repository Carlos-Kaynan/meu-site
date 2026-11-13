// O Firebase devolve erros com códigos em inglês (ex.: "auth/email-already-in-use").
// Aqui cada código vira uma mensagem simples em português.
const mensagens = {
  'auth/email-already-in-use': 'Já existe uma conta com este e-mail. Tente entrar.',
  'auth/invalid-email': 'Este e-mail não parece válido. Confira se está escrito certo.',
  'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/wrong-password': 'E-mail ou senha incorretos.',
  'auth/user-not-found': 'E-mail ou senha incorretos.',
  'auth/missing-password': 'Digite a sua senha.',
  'auth/too-many-requests': 'Muitas tentativas seguidas. Espere alguns minutos e tente de novo.',
  'auth/network-request-failed': 'Sem conexão com a internet. Confira sua conexão e tente de novo.',
}

export function mensagemDeErro(erro) {
  return mensagens[erro?.code] ?? 'Algo deu errado. Tente de novo em instantes.'
}

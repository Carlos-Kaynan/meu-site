import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { firebaseConfig } from './firebaseConfig'

// O emulador é um "Firebase de mentirinha" que roda no computador, só para testes.
// Ele só é usado quando o site é rodado com VITE_EMULADOR=sim (nunca no site publicado).
const usarEmulador = import.meta.env.VITE_EMULADOR === 'sim'

// As páginas das trilhas (public/conta/nuvem.js) leem esta marca para usar o emulador também.
try {
  if (usarEmulador) localStorage.setItem('ingles-basico:emulador', 'sim')
  else localStorage.removeItem('ingles-basico:emulador')
} catch {
  // sem localStorage: sem problema
}

// Enquanto a configuração não for colada em firebaseConfig.js, as contas ficam desligadas.
export const firebaseConfigurado = !firebaseConfig.apiKey.startsWith('COLE_')

function iniciarAuth() {
  if (usarEmulador) {
    const app = initializeApp({ apiKey: 'chave-de-teste', projectId: 'demo-ingles' })
    const auth = getAuth(app)
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
    return auth
  }
  if (!firebaseConfigurado) return null
  return getAuth(initializeApp(firebaseConfig))
}

// "auth" é o objeto que faz login, cadastro e logout. Fica null se as contas estiverem desligadas.
export const auth = iniciarAuth()

// E-mails do Firebase (como o de "esqueci minha senha") em português.
if (auth) auth.languageCode = 'pt-BR'

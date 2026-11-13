// Ponte entre as páginas das trilhas e o Firestore (banco de dados do Firebase).
//
// As trilhas vieram dos artifacts do Claude e já sabem salvar o progresso num "db"
// (db.doc('progress/state').get() / .set(...), db.collection('checkins')...).
// Este arquivo cria esse "db" usando o Firestore, dentro da pasta do aluno logado:
//
//   usuarios / {id do aluno} / trilhas / {a1, a2 ou b1} / progress / state
//                                                       / srs / allcards
//                                                       / vocab / newwords
//                                                       / checkins / {data}
//
// Cada trilha carrega este arquivo com <script type="module"> e, antes dele, define
// window.TRILHA_DA_PAGINA e window.entregarDbDaConta (veja o <head> da trilha).
// Sem login, entregamos null e a trilha continua salvando só no navegador.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js'
import { connectAuthEmulator, getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js'
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js'

// Mantenha igual a src/conta/firebaseConfig.js (o React usa aquele; as trilhas usam este).
const firebaseConfig = {
  apiKey: 'AIzaSyDhRSvYboa1Ur4NkWejy_5VZ1L3jXiEbrk',
  authDomain: 'ingles-curso-d37b3.firebaseapp.com',
  projectId: 'ingles-curso-d37b3',
  appId: '1:222056958146:web:8a1e9f71ac5ffd6239935b',
}

// Nos testes no computador, o site grava esta marca para usarmos o emulador (Firebase de mentirinha).
function usarEmulador() {
  try {
    return ['localhost', '127.0.0.1'].includes(location.hostname) && localStorage.getItem('ingles-basico:emulador') === 'sim'
  } catch {
    return false
  }
}

const emulador = usarEmulador()
const app = initializeApp(emulador ? { apiKey: 'chave-de-teste', projectId: 'demo-ingles' } : firebaseConfig)
const auth = getAuth(app)
const banco = getFirestore(app)
if (emulador) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
  connectFirestoreEmulator(banco, '127.0.0.1', 8080)
}

// O Firestore não aceita valores "undefined"; esta cópia via JSON tira eles.
const limpar = (dados) => JSON.parse(JSON.stringify(dados))

// Embrulha um documento do Firestore no formato que as trilhas esperam (snap.exists, snap.data()).
function embrulharDocumento(referencia) {
  return {
    get: () => getDoc(referencia).then((snap) => ({ id: snap.id, exists: snap.exists(), data: () => snap.data() })),
    set: (dados) => setDoc(referencia, limpar(dados)),
  }
}

function criarDb(uid, trilha) {
  const pasta = `usuarios/${uid}/trilhas/${trilha}`
  return {
    uid,
    doc: (caminho) => embrulharDocumento(doc(banco, `${pasta}/${caminho}`)),
    collection: (nome) => ({
      doc: (id) => embrulharDocumento(doc(banco, `${pasta}/${nome}/${id}`)),
      where: (campo, operador, valores) => ({
        get: () =>
          getDocs(query(collection(banco, `${pasta}/${nome}`), where(campo, operador, valores))).then((resultado) => ({
            docs: resultado.docs.map((d) => ({ id: d.id, data: () => d.data() })),
          })),
      }),
    }),
  }
}

// Espera o Firebase dizer se há alguém logado (ele lembra do login feito na página principal).
const pararDeOuvir = onAuthStateChanged(auth, (usuario) => {
  pararDeOuvir()
  const trilha = window.TRILHA_DA_PAGINA
  window.entregarDbDaConta?.(usuario && trilha ? criarDb(usuario.uid, trilha) : null)
})

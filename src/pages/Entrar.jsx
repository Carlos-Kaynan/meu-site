import { useState } from 'react'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import CartaoConta from '../components/CartaoConta'
import { enderecoDaAula, parametrosDoDestino } from '../conta/destino'
import { auth } from '../conta/firebase'
import { mensagemDeErro } from '../conta/mensagens'
import { guardarMarcaParaAsTrilhas, useUsuario } from '../conta/sessao'

function Entrar({ parametros }) {
  const usuario = useUsuario()
  const trilhaId = parametros.get('trilha')
  const dia = parametros.get('dia')
  const destino = parametrosDoDestino(trilhaId, dia)
  const aulaPedida = enderecoDaAula(trilhaId, dia)

  const [email, setEmail] = useState(parametros.get('email') ?? '')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState(parametros.get('conta') === 'criada' ? 'Conta criada! Agora entre com seu e-mail e senha.' : '')
  const [enviando, setEnviando] = useState(false)

  async function entrar(evento) {
    evento.preventDefault()
    setErro('')
    setAviso('')
    if (!email.trim() || !senha) {
      setErro('Digite seu e-mail e sua senha.')
      return
    }
    setEnviando(true)
    try {
      const resultado = await signInWithEmailAndPassword(auth, email.trim(), senha)
      // Grava a marca já, antes de mudar de página, para a trilha encontrar o login.
      guardarMarcaParaAsTrilhas(resultado.user)
      // Veio de uma aula bloqueada? Volta para ela. Senão, vai para a lista de aulas.
      window.location.href = aulaPedida ?? '#aulas'
    } catch (e) {
      setErro(mensagemDeErro(e))
      setEnviando(false)
    }
  }

  async function esqueciMinhaSenha() {
    setErro('')
    setAviso('')
    if (!email.trim()) {
      setErro('Digite seu e-mail no campo acima e clique de novo em "Esqueci minha senha".')
      return
    }
    try {
      await sendPasswordResetEmail(auth, email.trim())
      // Por segurança, o Firebase não conta se o e-mail tem conta ou não. A mensagem segue a mesma ideia.
      setAviso(
        `Se existir uma conta com ${email.trim()}, enviamos um e-mail com um link para criar uma senha nova. Confira também a caixa de spam.`,
      )
    } catch (e) {
      setErro(mensagemDeErro(e))
    }
  }

  if (usuario) {
    return (
      <CartaoConta icone="✅" titulo="Você já está conectado">
        <p className="conta-texto">
          Você entrou como <strong>{usuario.email}</strong>.
        </p>
        <a className="botao botao-principal conta-botao" href={aulaPedida ?? '#aulas'}>
          {aulaPedida ? `Abrir o Dia ${dia}` : 'Ir para as aulas'}
        </a>
      </CartaoConta>
    )
  }

  return (
    <CartaoConta icone="🔑" titulo="Entrar">
      {aviso && (
        <p className="conta-mensagem conta-mensagem-ok" role="status">
          {aviso}
        </p>
      )}

      <form className="conta-formulario" onSubmit={entrar} noValidate>
        <label className="campo">
          <span>E-mail</span>
          <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="campo">
          <span>Senha</span>
          <input
            type={mostrarSenha ? 'text' : 'password'}
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <div className="conta-linha">
          <label className="campo-marcar">
            <input type="checkbox" checked={mostrarSenha} onChange={(e) => setMostrarSenha(e.target.checked)} />
            Mostrar senha
          </label>
          <button type="button" className="link-botao" onClick={esqueciMinhaSenha}>
            Esqueci minha senha
          </button>
        </div>

        {erro && (
          <p className="conta-mensagem conta-mensagem-erro" role="alert">
            {erro}
          </p>
        )}

        <button type="submit" className="botao botao-principal conta-botao" disabled={enviando}>
          {enviando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>

      <p className="conta-rodape">
        Ainda não tem conta? <a href={`#/criar-conta${destino ? '?' + destino : ''}`}>Criar conta grátis</a>
      </p>
    </CartaoConta>
  )
}

export default Entrar

import { useState } from 'react'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import CartaoConta from '../components/CartaoConta'
import { parametrosDoDestino } from '../conta/destino'
import { auth } from '../conta/firebase'
import { mensagemDeErro } from '../conta/mensagens'
import { useUsuario } from '../conta/sessao'

// Confere o formulário antes de mandar para o Firebase. Devolve a mensagem de erro, ou '' se estiver tudo certo.
function conferirFormulario({ email, confirmarEmail, senha, confirmarSenha }) {
  if (!email.trim() || !confirmarEmail.trim() || !senha || !confirmarSenha) return 'Preencha todos os campos.'
  if (email.trim().toLowerCase() !== confirmarEmail.trim().toLowerCase()) return 'Os dois e-mails não são iguais.'
  if (senha.length < 6) return 'A senha precisa ter pelo menos 6 caracteres.'
  if (senha !== confirmarSenha) return 'As duas senhas não são iguais.'
  return ''
}

function CriarConta({ parametros }) {
  const usuario = useUsuario()
  const destino = parametrosDoDestino(parametros.get('trilha'), parametros.get('dia'))
  // Um objeto só para os 4 campos do formulário
  const [campos, setCampos] = useState({ email: '', confirmarEmail: '', senha: '', confirmarSenha: '' })
  const [mostrarSenhas, setMostrarSenhas] = useState(false)
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  // Atualiza só o campo que mudou: [evento.target.name] usa o "name" do input como chave
  function aoDigitar(evento) {
    setCampos({ ...campos, [evento.target.name]: evento.target.value })
  }

  async function criar(evento) {
    evento.preventDefault() // impede o formulário de recarregar a página
    const problema = conferirFormulario(campos)
    setErro(problema)
    if (problema) return

    setEnviando(true)
    try {
      const email = campos.email.trim()
      await createUserWithEmailAndPassword(auth, email, campos.senha)
      // O Firebase já entra na conta nova sozinho; saímos para a pessoa fazer o login, como foi pedido.
      await signOut(auth)
      window.location.hash = `#/entrar?conta=criada&email=${encodeURIComponent(email)}${destino ? '&' + destino : ''}`
    } catch (e) {
      setErro(mensagemDeErro(e))
      setEnviando(false)
    }
  }

  if (usuario) {
    return (
      <CartaoConta icone="✅" titulo="Você já está conectado">
        <p className="conta-texto">
          Você entrou como <strong>{usuario.email}</strong>. Para criar outra conta, saia primeiro.
        </p>
        <a className="botao botao-principal conta-botao" href="#aulas">
          Ir para as aulas
        </a>
      </CartaoConta>
    )
  }

  const tipoSenha = mostrarSenhas ? 'text' : 'password'

  return (
    <CartaoConta icone="📝" titulo="Criar conta">
      <p className="conta-texto">É grátis. Com a conta você libera todas as aulas das trilhas.</p>

      <form className="conta-formulario" onSubmit={criar} noValidate>
        <label className="campo">
          <span>E-mail</span>
          <input type="email" name="email" autoComplete="email" value={campos.email} onChange={aoDigitar} />
        </label>
        <label className="campo">
          <span>Confirmar e-mail</span>
          <input type="email" name="confirmarEmail" autoComplete="off" value={campos.confirmarEmail} onChange={aoDigitar} />
        </label>
        <label className="campo">
          <span>Senha (mínimo 6 caracteres)</span>
          <input type={tipoSenha} name="senha" autoComplete="new-password" value={campos.senha} onChange={aoDigitar} />
        </label>
        <label className="campo">
          <span>Confirmar senha</span>
          <input
            type={tipoSenha}
            name="confirmarSenha"
            autoComplete="new-password"
            value={campos.confirmarSenha}
            onChange={aoDigitar}
          />
        </label>
        <label className="campo-marcar">
          <input type="checkbox" checked={mostrarSenhas} onChange={(e) => setMostrarSenhas(e.target.checked)} />
          Mostrar senhas
        </label>

        {erro && (
          <p className="conta-mensagem conta-mensagem-erro" role="alert">
            {erro}
          </p>
        )}

        <button type="submit" className="botao botao-principal conta-botao" disabled={enviando}>
          {enviando ? 'Criando…' : 'Criar conta'}
        </button>
      </form>

      <p className="conta-rodape">
        Já tem conta? <a href={`#/entrar${destino ? '?' + destino : ''}`}>Entrar</a>
      </p>
    </CartaoConta>
  )
}

export default CriarConta

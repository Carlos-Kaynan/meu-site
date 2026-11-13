import CartaoConta from '../components/CartaoConta'
import { buscarTrilha, enderecoDaAula, parametrosDoDestino } from '../conta/destino'
import { useUsuario } from '../conta/sessao'

// Aparece quando alguém sem conta tenta abrir uma aula que não é a Aula 1.
function Aviso({ parametros }) {
  const usuario = useUsuario()
  const trilhaId = parametros.get('trilha')
  const dia = parametros.get('dia')
  const trilha = buscarTrilha(trilhaId)
  const aulaPedida = enderecoDaAula(trilhaId, dia)
  const destino = parametrosDoDestino(trilhaId, dia)
  const complemento = destino ? '?' + destino : ''

  // Já entrou (por exemplo, em outra aba)? Então pode ir direto para a aula.
  if (usuario && aulaPedida) {
    return (
      <CartaoConta icone="✅" titulo="Tudo certo!">
        <p className="conta-texto">
          Você está conectado como <strong>{usuario.email}</strong>.
        </p>
        <a className="botao botao-principal conta-botao" href={aulaPedida}>
          Abrir o Dia {dia} →
        </a>
      </CartaoConta>
    )
  }

  return (
    <CartaoConta icone="🔒" titulo="Esta aula é para quem tem conta">
      <p className="conta-texto">
        {trilha && aulaPedida ? (
          <>
            Para fazer o <strong>Dia {dia}</strong> da <strong>{trilha.nome}</strong>, crie uma conta grátis. Leva menos de
            um minuto!
          </>
        ) : (
          <>Para fazer esta aula, crie uma conta grátis. Leva menos de um minuto!</>
        )}
      </p>
      <p className="conta-texto">
        Quer experimentar antes? A <strong>Aula 1</strong> de cada trilha é liberada para você fazer como teste, sem
        cadastro.
      </p>

      <div className="conta-botoes">
        <a className="botao botao-principal conta-botao" href={`#/criar-conta${complemento}`}>
          Criar conta grátis
        </a>
        <a className="botao botao-contorno conta-botao" href={`#/entrar${complemento}`}>
          Já tenho conta · Entrar
        </a>
        {trilha && (
          <a className="conta-link-teste" href={`${trilha.url}#dia-1`}>
            Fazer a Aula 1 da {trilha.nome} como teste →
          </a>
        )}
      </div>
    </CartaoConta>
  )
}

export default Aviso

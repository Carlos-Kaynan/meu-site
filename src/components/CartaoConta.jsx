import { auth } from '../conta/firebase'

// Molde das páginas de conta (Criar conta, Entrar, Aviso): um cartão no meio da tela.
function CartaoConta({ icone, titulo, children }) {
  return (
    <div className="pagina-conta">
      <div className="conta-cartao">
        <p className="conta-icone" aria-hidden="true">
          {icone}
        </p>
        <h1 className="conta-titulo">{titulo}</h1>
        {auth ? (
          children
        ) : (
          <p className="conta-mensagem conta-mensagem-erro">
            As contas ainda estão sendo configuradas. Volte em breve! Enquanto isso, a Aula 1 de cada trilha está
            liberada.
          </p>
        )}
      </div>
    </div>
  )
}

export default CartaoConta


import { Container } from "./styles";
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from "../../hooks/useTransactionsContext";



export function Summary(){
  const {transactions} = useTransactions()
  
//  const totalDepositos = transactions.reduce((acc, transaction) => {
  //  if(transaction.type === 'deposito'){
 //     return acc + transaction.amount
 //   }
 //   return acc
 // }, 0)

  const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposito'){
        acc.depositos += transaction.amount
        acc.total += transaction.amount
    } else{
        acc.retiradas += transaction.amount
        acc.total -= transaction.amount
    }
    return acc
  }, {
    depositos: 0,
    retiradas: 0,
    total: 0
  })
  
  return(
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(summary.depositos)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(summary.retiradas)}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(summary.total)}</strong>
      </div>
      
    </Container>
    
  )
}
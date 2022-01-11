import Modal from 'react-modal'
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { FormEvent,  useState } from 'react';
import { useTransactions } from '../../hooks/useTransactionsContext';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
  const {createTransaction} = useTransactions()
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category,setCategory] = useState('');
  const [ type, setType ] = useState('deposito');

  async function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault();
    await createTransaction({ 
      title, 
      amount, 
      category,
      type,
    })
    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposito')
    onRequestClose()
  }

  return(
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close">
          <img src={closeImg} alt="Close" />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
          <h2 >Cadastrar transação</h2>
          <input 
            placeholder="Título"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <input 
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={event => setAmount(Number(event.target.value))}
          />

          <TransactionTypeContainer>
            <RadioBox 
              type="button"
              onClick={() => {setType('deposito')}}
              isActive={type === 'deposito'}
              activeColor="green"
            >
              <img src={incomeImg} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>
            <RadioBox 
              type="button"
              onClick={() => {setType('retirada')}}
              isActive={type === 'retirada'}
              activeColor="red"
            >
              <img src={outcomeImg} alt="Retirada" />
              <span>Retirada</span>
            </RadioBox>

          </TransactionTypeContainer>

          <input 
            placeholder="Categoria"
            value={category}
            onChange={event => setCategory(event.target.value)}
          />
          <button type="submit">Cadastrar</button>

        </Container>
      </Modal>
  )
}
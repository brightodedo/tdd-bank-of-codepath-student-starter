import * as React from "react"
import axios from "axios"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"

export default function Home(props) {
  async function getTransactions() {
    const responseData = await axios
    .get("http://localhost:3001/bank/transactions")
    .then( (response) => {
      return response.data.transactions
    })
    .catch ((err) => {
      props.setError(err)
    })
    props.setTransactions(responseData)
  }

  async function getTransfers() {
    const responseData = await axios
    .get("http://localhost:3001/bank/transfers")
    .then( (response) => {
      return response.data.transfers
    })
    .catch ((err) => {
      props.setError(err)
    })
    props.setTransfers(responseData)
  }

  //useEffect hook 
  React.useEffect( async () => {
    props.setIsLoading(true)
    getTransactions()
    getTransfers()
    props.setIsLoading(false)
  }, [])

  const filteredTransactions = props.filterInputValue ? props.transactions.filter((element)=>{
      return (element.description.toLowerCase().includes(props.filterInputValue.toLowerCase())) 
    }):props.transactions

    const handleOnSubmitNewTransaction = (event) =>{
      handleOnCreateTransaction()
    }

    const handleOnCreateTransaction = async() => {
      props.setIsCreating(true)
      axios.post("http://localhost:3001/bank/transactions", {transaction: props.newTransactionForm})
      .then((response) => {
        props.setTransactions(currentTransactions => [...currentTransactions, response.data.transaction])
        props.setNewTransactionForm({category: "", description : "", amount : 0})
        props.setIsCreating(false)
      })
      .catch( (err) => {
        props.setError(err)
        props.setIsCreating(false)
      })
    }
  return (
    <div className="home">
      <AddTransaction isCreating={props.isCreating} setIsCreating={props.setIsCreating} form={props.newTransactionForm} setForm={props.setNewTransactionForm} 
      handleOnSubmit={handleOnSubmitNewTransaction}/>
      {props.isLoading ? <h1> Loading... </h1> : <BankActivity transactions={filteredTransactions} transfers={props.transfers}/>}
      {props.error ? (<h2>{props.error}</h2>) : ""}
    </div>
  )
}

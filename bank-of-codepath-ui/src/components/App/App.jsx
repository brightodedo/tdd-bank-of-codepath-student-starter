import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import "./App.css"
import {BrowserRouter, Routes, Route,} from "react-router-dom"
import TransactionalDetail from "../TransactionDetail/TransactionDetail"

export default function App() {
  //isLoading state variable
  const [isLoading, setIsLoading] = React.useState(false)

  //transactions state variable
  const [transactions, setTransactions] = React.useState()

  //transfers state variable
  const [transfers, setTransfers] = React.useState()

  //error state variable 
  const [error, setError] = React.useState("")

  //filterInputValue state variable 
  const [filterInputValue, setFilterInputValue] = React.useState("")

  //newTransactionForm state variable
  const [newTransactionForm, setNewTransactionForm] = React.useState({category: "", description : "", amount : 0})

  //isCreating state variable
  const [isCreating, setIsCreating] = React.useState(false)

  return (
    <div className="app">
      <BrowserRouter> 
      <Navbar filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue}/>
      <main>
        <Routes>
          <Route path="/" element={<Home transactions={transactions} setTransactions={setTransactions} transfers={transfers} setTransfers={setTransfers} 
          error={error} setError={setError} isLoading={isLoading} setIsLoading={setIsLoading} filterInputValue={filterInputValue} isCreating={isCreating}
          setIsCreating={setIsCreating} newTransactionForm={newTransactionForm} setNewTransactionForm={setNewTransactionForm}/>}></Route>
          <Route path="/transactions/:transactionId" element={<TransactionalDetail />}></Route>
        </Routes>
      </main>
      </BrowserRouter>
      
    </div>
  )
}

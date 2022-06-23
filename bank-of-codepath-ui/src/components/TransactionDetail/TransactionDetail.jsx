import * as React from "react"
import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"
import {useParams} from "react-router-dom"
import axios from "axios"

export default function TransactionDetail() {
  //hasFetched state variable
  const [hasFetched, setHasFetched] = React.useState(false)

  //transaction state variable
  const [transaction, setTransaction] = React.useState({})

  //isLoading state variable
  const [isLoading, setIsLoading] = React.useState()

  //error state variable
  const [error, setError] = React.useState()

  const {transactionId} = useParams();

  React.useEffect(async function fetchTransactionById(){
    setIsLoading(true)
    setHasFetched(false)
    axios.get(`http://localhost:3001/bank/transactions/${transactionId}`)
    .then((response) => {
      console.log(response.data)
      setTransaction(response.data)
    })
    .catch( (err) => {
      setError(err)
    })
    .then(() => {
      setIsLoading(false)
      setHasFetched(false)
    })
  }, [transactionId])
  return (
    <div className="transaction-detail">
      <TransactionCard />
    </div>
  )
}

export function TransactionCard({ transaction = {}, transactionId = null }) {
  return (
    <div className="transaction-card card">
      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        <p className="category"></p>
      </div>

      <div className="card-content">
        <p className="description"></p>
      </div>

      <div className="card-footer">
        <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction.amount)}</p>
        <p className="date">{formatDate(transaction.postedAt)}</p>
      </div>
    </div>
  )
}

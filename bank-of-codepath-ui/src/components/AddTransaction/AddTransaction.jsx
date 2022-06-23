import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction(props) {
  //handleOnFormFieldChange function declaration 
  const handleOnFormFieldChange = (event) =>{
    props.setForm({...props.form , [event.target.name] : event.target.value})
  }
  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm handleOnFormFieldChange={handleOnFormFieldChange} handleOnSubmit={props.handleOnSubmit} form={props.form} isCreating={props.isCreating}/>
    </div>
  )
}

export function AddTransactionForm(props) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input name="description" value={props.form ? props.form.description : ""} onChange={props.handleOnFormFieldChange}/>
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category" value={props.form ? props.form.category : ""} onChange={props.handleOnFormFieldChange}/>
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input name="amount" value={props.form ? props.form.amount : 0} type="number" onChange={props.handleOnFormFieldChange}/>
        </div>

        <button className="btn add-transaction" type="submit" onClick={props.handleOnSubmit} onChange={props.handleOnFormFieldChange}>
          Add
        </button>
      </div>
    </div>
  )
}

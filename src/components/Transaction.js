import React from "react";

function Transaction(props) {
  let t = props.transaction;
  const deleteTransaction = props.deleteTransaction;
  let tcolor;
  t.amount > 0 ? (tcolor = "green") : (tcolor = "red");
  return (
    <div className={tcolor}>
      <span className="fields"> Amount : {t.amount} </span>
      <span className="fields"> Vendor : {t.vendor} </span>
      <span className="fields"> Category : {t.category} </span>
      <span className="fields"> Date : {t.date} </span>
      <button className="remove" onClick={e => deleteTransaction(e, t)}>
        Remove Transaction
      </button>
    </div>
  );
}
export default Transaction;

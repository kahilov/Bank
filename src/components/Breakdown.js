import React, { useState } from "react";

function Breakdown(props) {
  const category = props.match.params.category;
  const transactions = props.state.transactions;
  let filteredTransactions = transactions.filter(t => t.category === category);
  filteredTransactions.forEach(t => (t.date = t.date.slice(0, 10)));
  const [date, setDate] = useState("");
  filteredTransactions =
    date === ""
      ? filteredTransactions
      : filteredTransactions.filter(t => t.date === date);
  return (
    <div>
      <div className="header">Your {category} Transactions</div>
      <div className="header">Select Date Of Transactions</div>
      <select onChange={e => setDate(e.target.value)}>
        <option>Select Date</option>
        {filteredTransactions.map(t => (
          <option value={t.date}>{t.date}</option>
        ))}
      </select>
      {filteredTransactions.map(t =>
        t.amount > 0 ? (
          <div className={"green"}>
            <span> Amount : {t.amount}</span>
            <span> Vendor : {t.vendor}</span>
            <span> Date : {t.date}</span>
          </div>
        ) : (
          <div className={"red"}>
            <span> Amount : {t.amount}</span>
            <span> Vendor : {t.vendor}</span>
            <span> Date : {t.date}</span>
          </div>
        )
      )}
    </div>
  );
}
export default Breakdown;

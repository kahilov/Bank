import React, { Component } from "react";
import { Link } from "react-router-dom";
import Transaction from "./Transaction";

class Transactions extends Component {
  constructor() {
    super();
    this.state = {
      date: ""
    };
  }
  handleDate(e) {
    let date = e.target.value;
    this.setState({ date: date });
  }

  render() {
    let transactions = this.props.transactions;
    let balance = this.props.balance;
    let date = this.state.date;
    transactions =
      date === "" ? transactions : transactions.filter(t => t.date === date);
    return (
      <div>
        <div className="header">Your Transactions</div>
        <div className="header">Select Date Of Transactions</div>
        <select onChange={e => this.handleDate(e)}>
          <option>Select Date</option>
          {transactions.forEach(t => (t.date = t.date.slice(0, 10)))}
          {transactions.map(t => (
            <option value={t.date}>{t.date}</option>
          ))}
        </select>
        {transactions.map(t => (
          <div>
            <Transaction
              deleteTransaction={this.props.deleteTransaction}
              transaction={t}
            />
            <Link to={`/transactions/${t.category}`}>
              <button className="breakdown">
                See All Transactions In this Category
              </button>
            </Link>
          </div>
        ))}
        <div className="balance"> Your Balance : {balance}</div>
      </div>
    );
  }
}

export default Transactions;

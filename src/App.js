import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Transactions from "./components/Transactions";
import Operations from "./components/Operations";
import axios from "axios";
import Breakdown from "./components/Breakdown";
const transactionRoute = "http://localhost:4000/transaction";
const transactionsRoute = "http://localhost:4000/transactions";
const minBalance = 500;

class App extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      balance: Number
    };
  }

  async componentDidMount() {
    await this.getData();
    this.manageBalance();
  }

  async getData() {
    let transactions = await axios.get(transactionsRoute);
    let data = [...transactions.data];
    this.setState({ transactions: data });
  }

  manageExpenses = async transaction => {
    await axios.post(transactionRoute, transaction);
    await this.getData();
    this.manageBalance();
  };

  deleteTransaction = async (e, transaction) => {
    await axios.delete(transactionRoute,{data:transaction});
    await this.getData();
    this.manageBalance();
  };

  manageBalance = () => {
    let transactionsArr = [...this.state.transactions];
    let balance = 0;
    transactionsArr.forEach(t => (balance += t.amount));
    if (balance < minBalance) {
      this.displayAlert();
    } else {
      this.setState({ balance: balance });
    }
  };

  displayAlert() {
    return true;
  }

  render() {
    let transactions = this.state.transactions;
    let balance = this.state.balance;
    let state = this.state;
    return (
      <Router>
        <div className="App">
          <div className="main-links">
            <Link className="main-links" to="/transactions">
              Transactions
            </Link>
            <Link className="main-links" to="/operations">
              Operations
            </Link>
          </div>
          <Route
            path="/transactions"
            exact
            render={() => (
              <Transactions
                deleteTransaction={this.deleteTransaction}
                transactions={transactions}
                balance={balance}
              />
            )}
          />
          <Route
            path="/transactions/:category"
            exact
            render={({ match }) => <Breakdown match={match} state={state} />}
          />
          <Route
            path="/operations"
            exact
            render={() => (
              <Operations
                manageBalance={this.manageBalance}
                transactions={transactions}
                manageExpenses={this.manageExpenses}
                state={state}
                handleChange={this.handleChange}
                balance={balance}
                displayAlert= {this.displayAlert}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;

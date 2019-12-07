import React, { Component } from "react";
import DatePicker from "./DatePicker";
import Snackbars from "./Snackbars";
class Operations extends Component {
  constructor() {
    super();
    this.state = {
      dateInput: "",
      amountInput: "",
      vendorInput: "",
      categoryInput: ""
    };
  }
  
  componentDidMount() {
    this.handleDate(this.formatDate());
  }

  formatDate = () => {
    const date = new Date();
    let day = date.getDate();
    day = day < 10 ? "0" + day : day;
    let month = date.getMonth();
    month = month < 10 ? "0" + month : month;
    const year = date.getFullYear();
    const defaultDate = year + "-" + month + "-" + day;
    return defaultDate;
  };

  handleDate = date => {
    this.setState({ dateInput: date });
  };

  manageExpenses = (e, withdraw) => {
    let states = this.state;
    if (withdraw === "withdraw") {
      states.amountInput = -states.amountInput;
    }
    const transaction = {
      date: states.dateInput,
      amount: states.amountInput,
      vendor: states.vendorInput,
      category: states.categoryInput
    };
    this.props.manageExpenses(transaction);
    this.cleanState();
  };

  cleanState() {
    this.setState({ amountInput: "" });
    this.setState({ vendorInput: "" });
    this.setState({ categoryInput: "" });
  }

  handleChange = e => {
    const target = e.target;
    let value =
      target.type === "number" ? parseInt(target.value) : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    let state = this.state;
    let balance = this.props.balance;
    let displayAlert = this.props.displayAlert;
    return (
      <div className="operations">
        <div className="header">
          Please Input : Date, Amount, Vendor And Category
        </div>
        <DatePicker
          formatDate={this.formatDate}
          handleDate={this.handleDate}
          state={state}
        />
        Amount:
        <input
          name="amountInput"
          type="number"
          className="input"
          value={state.amountInput}
          onChange={this.handleChange}
        ></input>
        Vendor:
        <input
          name="vendorInput"
          type="text"
          className="input"
          value={state.vendorInput}
          onChange={this.handleChange}
        ></input>
        Category:
        <input
          type="text"
          name="categoryInput"
          value={state.categoryInput}
          className="input"
          onChange={this.handleChange}
        ></input>
        <Snackbars
          displayAlert={displayAlert}
          balance={balance}
          manageExpenses={this.manageExpenses}
          input={state}
        />
        <div className="balance"> Your Balance : {balance}</div>
      </div>
    );
  }
}

export default Operations;

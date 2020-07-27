import React, { Component } from "react";

import axios from "axios";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', displayNumber: [] };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitEven = this.handleSubmitEven.bind(this);
    this.handleSubmitOdd = this.handleSubmitOdd.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmitEven(event) {
    axios.post(`http://localhost:3011/numList/even`,{ "test" : this.state.value})
    .then(res => {
      const displayNumber= res.data;
      console.log(displayNumber);
      this.setState({displayNumber:res.data});
    });
    event.preventDefault();
  }

  handleSubmitOdd(event) {
    axios.post(`http://localhost:3011/numList/odd`, { "test" : this.state.value})
    .then(res => {
      const displayNumber= res.data;
      console.log(displayNumber);
      this.setState({displayNumber:res.data});
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter Number:
          <input type="number" value={this.state.value} onChange={this.handleChange} />
        </label>
        &nbsp;&nbsp;
        <button onClick={this.handleSubmitEven}>
            Even Number
        </button>
        &nbsp;&nbsp;
        <button onClick={this.handleSubmitOdd}>
            Odd Number
        </button>
        {/* <input type="submit" value="Submit" /> */}
        {this.state.displayNumber.map((value,index)=>{return <h4 key={index}>{value}</h4>})}
      </form>
    );
  }
}
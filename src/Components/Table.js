import React, { Component } from "react";

class Table extends Component {
  state = {
    responses: [],
  };
  componentDidMount() {
    this.setState({ responses: JSON.parse(localStorage.getItem("feedbacks")) || [] });
  }
  render() {
    const columns = ["Name", "Email", "Phone", "Service", "Beverage", "Cleanliness", "Overall"];
    return (
      <div className="tableWrapper">
        <h1>All Feedbacks for Aromatic Bar</h1>
        <div className="table">
          <div className="header">
            {columns.map((col, ind) => (
              <div key={ind}>{col}</div>
            ))}
          </div>

          {this.state.responses.map((res, i) => {
            return (
              <div className="content" key={i}>
                <div>{res.name}</div>
                <div>{res.email}</div>
                <div>+91-{res.phone}</div>
                <div>{res.answers.service}</div>
                <div>{res.answers.beverage}</div>
                <div>{res.answers.cleanliness}</div>
                <div>{res.answers.overall}</div>
              </div>
            );
          })}
          <p className="mobile">Please open this page on a bigger screen.</p>
        </div>
      </div>
    );
  }
}

export default Table;

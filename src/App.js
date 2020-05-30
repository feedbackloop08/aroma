import React, { Component } from "react";
import "./App.css";
import FormHeader from "./Components/FormHeader";
import Form from "./Components/Form";
import Table from "./Components/Table";

class App extends Component {
  state = {
    active: "form",
  };
  render() {
    const activeTab = this.state.active === "form";
    const form = (
      <React.Fragment>
        <FormHeader />
        <Form />
      </React.Fragment>
    );
    const table = <Table />;
    return (
      <div className="wrapper">
        <div className="appbar">
          <div
            className={activeTab ? "active" : ""}
            onClick={() => {
              this.setState({ active: "form" });
            }}
          >
            Form
          </div>
          <div
            className={!activeTab ? "active" : ""}
            onClick={() => this.setState({ active: "table" })}
          >
            Table
          </div>
        </div>
        <div className="container">{this.state.active === "form" ? form : table}</div>
      </div>
    );
  }
}

export default App;

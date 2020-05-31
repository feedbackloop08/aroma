import React, { Component } from "react";

class Form extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    error: {
      nameErr: false,
      nameMsg: "",
      emailErr: false,
      emailMsg: "",
      phoneErr: false,
      phoneMsg: "",
    },
    answers: { service: "", beverage: "", cleanliness: "", overall: "" },
    dialog: false,
    msg: "",
  };

  openDialog(msg) {
    this.setState({ dialog: true, msg: msg });
  }

  resetForm() {
    this.setState({ name: "", phone: "", email: "" });
    document.getElementById("feedback-form").reset();
    this.openDialog("Thank you for completing the information.");
  }
  handleFieldChange = (e) => {
    Object.assign(this.state.error, { nameErr: false, emailErr: false, phoneErr: false });
    const field = e.target.name;
    if (field === "name") {
      this.setState({ name: e.target.value });
    } else if (field === "phone") {
      this.setState({ phone: e.target.value });
    } else {
      this.setState({ email: e.target.value });
    }
  };

  optionSelection = (e) => {
    const answers = {};
    answers[e.target.name] = e.target.value;
    Object.assign(this.state.answers, answers);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const error = {};

    if (!/^([A-Z]|[a-z]){1,}$/.test(this.state.name)) {
      error.nameErr = true;
      error.nameMsg =
        this.state.name === ""
          ? "This is a mandatory field"
          : "do not use special characters or numbers";
    }
    if (!/^\d{10}$/.test(this.state.phone)) {
      error.phoneErr = true;
      error.phoneMsg = this.state.phone === "" ? "This is a mandatory field" : "must be 10 digits";
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
      error.emailErr = true;
      error.emailMsg = this.state.email === "" ? "This is a mandatory field" : "invalid email";
    }

    this.setState({ error: error });
    if (JSON.stringify(error) !== "{}") {
      return;
    } else {
      for (let key in this.state.answers) {
        if (this.state.answers[key] === "")
          return this.openDialog("All the questions are mandatory.");
      }
      const records = JSON.parse(localStorage.getItem("feedbacks")) || [];
      const currentRecord = { ...this.state };
      delete currentRecord["error"];
      delete currentRecord["dialog"];
      delete currentRecord["msg"];
      records.push(currentRecord);
      localStorage.setItem("feedbacks", JSON.stringify(records));
      this.openDialog("Thank you for completing the information.");
      this.resetForm();
    }
  };

  render() {
    const options = ["Excellent", "Good", "Fair", "Bad"];
    const questions = [
      {
        question: " 1. Please rate the quality of the service you received from your host.",
        type: "service",
      },
      {
        question: "2. Please rate the quality of your beverage.",
        type: "beverage",
      },
      {
        question: "3. Was our restaurant clean?",
        type: "cleanliness",
      },
      {
        question: "4. Please rate your overall dining experience.",
        type: "overall",
      },
    ];

    const dialog = this.state.dialog ? (
      <div className="dialogWrapper">
        <div className="dialog">
          <p>{this.state.msg}</p>
          <button onClick={() => this.setState({ dialog: false })}>Ok</button>
        </div>
      </div>
    ) : (
      ""
    );

    return (
      <form className="form-wrapper" onSubmit={this.handleSubmit} id="feedback-form">
        <div className="input-wrapper">
          <label>Your Name </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleFieldChange}
            className={this.state.error.nameErr ? "error" : "normal"}
          />
          {this.state.error.nameErr ? <small>Error: {this.state.error.nameMsg}</small> : ""}
        </div>
        <div className="input-wrapper">
          <label>Email address</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleFieldChange}
            className={this.state.error.emailErr ? "error" : "normal"}
          />
          {this.state.error.emailErr ? <small>Error: {this.state.error.emailMsg}</small> : ""}
        </div>
        <div className="input-wrapper">
          <label>Phone number </label>
          <input
            type="number"
            name="phone"
            value={this.state.phone}
            onChange={this.handleFieldChange}
            className={this.state.error.phoneErr ? "error" : "normal"}
          />
          {this.state.error.phoneErr ? <small>Error: {this.state.error.phoneMsg}</small> : ""}
        </div>
        {questions.map((que, ind) => {
          return (
            <div className="feedback" key={ind}>
              <p>{que.question}</p>
              <div className="options" onChange={(e) => this.optionSelection(e)}>
                {options.map((opt, i) => {
                  return (
                    <label key={i}>
                      <input type="radio" name={que.type} value={opt} className="radio-btn" />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="actions">
          <button type="submit">Submit</button>
        </div>

        {dialog}
      </form>
    );
  }
}

export default Form;

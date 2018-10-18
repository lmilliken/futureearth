import React, { Component } from "react";

class RatingRadio extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleRadio(e.target.name, e.target.value);
  }

  render() {
    return (
      <td>
        <input
          className="form-radio"
          type="radio"
          id={this.props.name}
          name={this.props.name}
          value={this.props.score}
          onClick={this.handleClick}
          required
        />
      </td>
    );
  }
}
export default RatingRadio;

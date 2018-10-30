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
    // console.log("props of radio:", this.props);
    return (
      <td>
        <input
          className="form-radio"
          type="radio"
          id={this.props.name}
          name={this.props.name}
          value={this.props.score}
          onChange={this.handleClick}
          checked={this.props.checked}
        />
      </td>
    );
  }
}
export default RatingRadio;

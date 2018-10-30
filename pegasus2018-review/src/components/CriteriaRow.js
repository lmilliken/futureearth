import React, { Component } from "react";
import RatingRadio from "./RatingRadio";
class CriteriaRow extends Component {
  constructor(props) {
    super(props);

    this.handleRadio = this.handleRadio.bind(this);
  }

  handleRadio(name, value) {
    console.log("clicked in Criteria Row");
    // this.props.handleRadio(name, value);
  }

  render() {
    const scale = [10, 8, 6, 4, 2];
    // console.log("criteria row props:", this.props);
    const radiobuttons = scale.map(score => {
      return (
        <RatingRadio
          checked={this.props.scoreValue == score}
          key={score}
          handleRadio={this.handleRadio}
          score={score}
          {...this.props}
        />
      );
    });

    return (
      <tr>
        <td>{this.props.text}</td>
        {radiobuttons}
      </tr>
    );
  }
}
export default CriteriaRow;

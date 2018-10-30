import React, { Component } from "react";

class RecommendationRow extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleRadio(e.target.name, e.target.value);
  }

  render() {
    // console.log("recommendation score: ", this.props.scoreRec);
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Recommendation</th>
            <th>Highly recommend</th>
            <th>Recommend</th>
            <th>Do not recommend</th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd">
            <td>Would you recommend this proposal for funding?</td>
            <td>
              <input
                type="radio"
                id="recommendation"
                name="recommendation"
                value="3"
                className="form-radio"
                checked={this.props.scoreRec == 3}
                onChange={this.handleClick}
              />
            </td>
            <td>
              <input
                type="radio"
                id="recommendation"
                name="recommendation"
                value="1"
                className="form-radio"
                checked={this.props.scoreRec == 1}
                onChange={this.handleClick}
              />
            </td>
            <td>
              <input
                type="radio"
                id="recommendation"
                name="recommendation"
                value="0"
                className="form-radio"
                checked={this.props.scoreRec == 0}
                onChange={this.handleClick}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
export default RecommendationRow;

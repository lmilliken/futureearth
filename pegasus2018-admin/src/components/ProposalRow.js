import React, { Component } from "react";

class ProposalRow extends Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick() {
    console.log("id", this);
    this.props.ahandleRowClick();
  }

  render() {
    return (
      <tr onClick={this.handleRowClick}>
        <td className="text-left">{this.props.title}</td>
        <td className="text-left">
          {this.props.investigators[0].lastName},{" "}
          {this.props.investigators[0].firstName}
        </td>
        <td className="text-left">{this.props.investigators[0].countryWork}</td>
        <td className="text-left">
          {this.props.investigators[0].countryCitizenship}
        </td>
        <td className="text-left"> </td>
        <td />
      </tr>
    );
  }
}

export default ProposalRow;

import React, { Component } from "react";

class ProposalRow extends Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick() {
    this.props.ahandleRowClick();
  }

  render() {
    let tags;

    if (this.props.tags) {
      tags = this.props.tags.join(", ");
    }

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
        <td className="text-left" style={tagSize}>
          {tags}
        </td>
        <td className="text-left">{this.props.notes} </td>
        <td />
      </tr>
    );
  }
}
const tagSize = {
  fontSize: "x-small"
};
export default ProposalRow;

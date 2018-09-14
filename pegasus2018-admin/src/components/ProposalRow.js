import React, { Component } from "react";

class ProposalRow extends Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick() {
    // this.setState({
    //   selected: this.state.data.id,
    //   displayModal: true
    // });
    console.log("row clicked");
  }

  render() {
    return (
      <tr onClick={this.handleRowClick}>
        <td className="text-left">{this.props.props.title}</td>
        <td className="text-left">
          {this.props.props.investigators[0].lastName},{" "}
          {this.props.props.investigators[0].firstName}
        </td>
        <td className="text-left">
          {this.props.props.investigators[0].countryWork}
        </td>
        <td className="text-left">
          {this.props.props.investigators[0].countryCitizenship}
        </td>
        <td className="text-left"> </td>
        <td />
      </tr>
    );
  }
}

export default ProposalRow;

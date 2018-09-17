import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

class ProposalModal extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleClose() {
    console.log("id", this);
    this.props.handleModalClose();
  }

  handleSave() {
    console.log("id", this);
    this.props.handleModalSave();
  }

  render() {
    let investigators = this.props.investigators.map(inv => {
      return (
        <div>
          <p>
            <strong>
              {inv.firstName} {inv.lastName}
            </strong>
            <br />
            {inv.institution}
            <br />
            {inv.countryWork} (work)
            <br />
            {inv.countryCitizenship} (citizenship)
            <br />
          </p>
        </div>
      );
    });
    return (
      <Modal.Dialog>
        {/* <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header> */}

        <Modal.Body
          style={{
            textAlign: "left"
          }}
        >
          <p
            style={{
              fontWeight: "bold"
            }}
          >
            <center>{this.props.title}</center>
          </p>
          {investigators}
          <a target="_blank" href={this.props.linkToProposal}>
            Proposal
          </a>
          <br />
          <a target="_blank" href={this.props.linkToBudget}>
            Budget
          </a>
          <br />
          <div class="form-group">
            <label for="notes">Notes:</label>
            <textarea class="form-control" rows="3" id="notes" />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
          <Button onClick={this.handleSave} bsStyle="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default ProposalModal;

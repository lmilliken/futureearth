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
    // let investigators = this.props.investigators.map(inv => {
    //   return (
    // <div>
    //   <p>
    //     <strong>
    //       {inv.firstName} {inv.lastName}
    //     </strong>
    //     <br />
    //     {inv.institution}
    //     <br />
    //     {inv.countryWork} (work)
    //     <br />
    //     {inv.countryCitizenship} (citizenship)
    //     <br />
    //   </p>
    // </div>
    //   );
    // });

    const lead = this.props.investigators[0];

    let reviewers = this.props.reviewers.map(rev => {
      return (
        <div className="checkbox">
          <label>
            <input type="checkbox" value={rev.hlKey} />
            {rev.lastName}, {rev.firstName}
          </label>
        </div>
      );
    });
    return (
      <Modal.Dialog style={modalDialog} bsSize="large">
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={modalBody}>
          <div>
            <p>
              <strong>
                {lead.firstName} {lead.lastName}
              </strong>
              <br />
              {lead.institution}
              <br />
              {lead.countryWork} (work)
              <br />
              {lead.countryCitizenship} (citizenship)
              <br />
            </p>
          </div>
          <center>
            <a target="_blank" href={this.props.linkToProposal}>
              Proposal
            </a>{" "}
            -{" "}
            <a target="_blank" href={this.props.linkToBudget}>
              Budget
            </a>
          </center>
          <hr />
          <br />
          <div className="form-group">
            <div class="row">
              <div class="col-md-6">Assigned Reviewers</div>
              <div class="col-md-6">
                Available Reviewers
                <div class="row align-items-center">
                  <div class="col-md-3">
                    <Button onClick={this.handleClose}>&lt;&lt;Add</Button>
                  </div>
                  <div class="col-md-9 border rounded" style={reviewersDiv}>
                    {reviewers}
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">Tags</div>
              <div class="col-md-6">
                <label for="notes">Notes:</label>
                <textarea className="form-control" rows="4" id="notes" />
              </div>
            </div>
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

const modalBody = {
  height: "auto",
  maxHeight: "500px",
  overflow: "auto",
  textAlign: "left"
};

const modalDialog = {
  overflowY: "initial !important"
};

const reviewersDiv = {
  height: "150px",
  overflowY: "scroll",
  float: "right"
};
export default ProposalModal;

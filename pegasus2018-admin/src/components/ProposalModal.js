import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

class ProposalModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.getAvailableReviewers = this.getAvailableReviewers.bind(this);
  }

  handleCheckbox(id, first, last, something) {
    console.log("checkbox: ", id, first, last, something);

    let updatedReviewers = this.state.assignedReviewers
      ? this.state.assignedReviewers.concat(id)
      : [id];
    this.setState(
      {
        assignedReviewers: updatedReviewers
      },
      () => {
        console.log("assigned", this.state.assignedReviewers);
      }
    );
  }

  componentWillMount() {
    console.log("Proposal Modal state:", this.state);
    console.log("available reviewers: ", this.getAvailableReviewers());
    this.setState({
      availableReviewers: this.getAvailableReviewers()
    });
  }
  addReviewer() {}

  getAvailableReviewers() {
    console.log("reviewersAll", this.props.reviewersAll);
    return this.props.reviewersAll.filter(rev => {
      if (this.state.assignedReviewers) {
        return !this.state.assignedReviewers.includes(rev);
      } else return rev;
    });
  }
  removeReviewer() {
    console.log("removed");
    return false;
  }

  addTag() {}

  removeTag() {}

  updateNote() {}

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

    let currentReviewers = this.state.assignedReviewers
      ? this.state.assignedReviewers.map(rev => {
          let thisReviewer = this.state.reviewersAll.find(
            aReviewer => aReviewer._id === rev
          );
          console.log("thisReviewer: ", thisReviewer);
          // console.log("rev ", rev);
          // console.log("assigned in Current", this.state.assignedReviewers);
          return (
            <div key={rev}>
              {thisReviewer.lastName}, {thisReviewer.firstName}{" "}
              <a href="#" onClick={this.removeReviewer}>
                X
              </a>
            </div>
          );
        })
      : null;

    // let availReviewers = this.props.reviewersAll.filter(rev => {
    //   if (this.state.assignedReviewers) {
    //     return !this.state.assignedReviewers.includes(rev);
    //   } else return rev;
    // });
    // console.log("lxm:", availReviewers);
    let availableReviewers = this.state.reviewersAll.map(rev => {
      return (
        <div className="checkbox" key={rev._id}>
          <label>
            <input
              type="checkbox"
              value={rev._id}
              onChange={this.handleCheckbox.bind(
                this,
                rev._id,
                rev.firstName,
                rev.lastName
              )}
            />
            {rev.lastName}, {rev.firstName}
          </label>
        </div>
      );
    });
    return (
      <Modal.Dialog style={modalDialog} bsSize="large">
        <Modal.Header>
          <Modal.Title>
            {this.props.title} {this.props._id}
          </Modal.Title>
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
            <div className="row">
              <div className="col-md-6">
                <div>Assigned Reviewers</div>
                {currentReviewers}
              </div>
              <div className="col-md-6">
                <div>Available Reviewers</div>
                <div className="border rounded" style={availableReviewersStyle}>
                  {availableReviewers}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">Tags</div>
              <div className="col-md-6">
                <label htmlFor="notes">Notes:</label>
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

const availableReviewersStyle = {
  height: "150px",
  overflowY: "scroll"
};
export default ProposalModal;

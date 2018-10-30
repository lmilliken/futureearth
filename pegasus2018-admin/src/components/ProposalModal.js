import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

class ProposalModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.addReviewer = this.addReviewer.bind(this);
    this.removeReviewer = this.removeReviewer.bind(this);
    this.getAvailableReviewers = this.getAvailableReviewers.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
  }

  handleSave() {
    console.log("id", this);
    this.props.handleModalSave(
      this.state.assignedReviewers,
      this.state.tags,
      this.state.notes
    );
  }

  updateNotes(event) {
    this.setState({
      notes: event.target.value
    });
  }
  //arrays: look up new removing/insert methods, new spread operator methods
  //create each tag as its own component with its own state
  toggleTag(event) {
    const tag = event.target.value;
    if (this.state.tags) {
      const tagArray = this.state.tags;
      if (tagArray.includes(tag)) {
        const index = tagArray.indexOf(tag);
        tagArray.splice(index, 1);
        this.setState({
          tags: tagArray
        });
      } else {
        this.setState({
          tags: tagArray.concat(tag)
        });
      }
    } else {
      this.setState({
        tags: [tag]
      });
    }
  }
  removeReviewer(id) {
    let updatedReviewers = this.state.assignedReviewers;
    this.setState(
      {
        assignedReviewers: updatedReviewers.filter(assigned => assigned !== id)
      },
      () => {
        this.setState(
          {
            availableReviewers: this.getAvailableReviewers()
          },
          () => {
            console.log(this.state);
          }
        );
      }
    );
    return false;
  }

  addReviewer(id) {
    let updatedReviewers = this.state.assignedReviewers
      ? this.state.assignedReviewers.concat(id)
      : [id];

    this.setState(
      {
        assignedReviewers: updatedReviewers
      },
      () => {
        this.setState({
          availableReviewers: this.getAvailableReviewers()
        });
      }
    );
  }

  componentWillMount() {
    this.setState({
      availableReviewers: this.getAvailableReviewers()
    });
  }

  getAvailableReviewers() {
    return this.props.reviewersAll.filter(rev => {
      if (this.state.assignedReviewers) {
        return !this.state.assignedReviewers.includes(rev._id);
      } else return rev;
    });
  }

  handleClose() {
    console.log("id", this);
    this.props.handleModalClose();
  }

  render() {
    console.log("props ", this.props);
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
          return (
            <div key={rev}>
              {" "}
              {thisReviewer.lastName}, {thisReviewer.firstName}{" "}
              {/* <a href="#" onClick={this.removeReviewer.bind(this, rev)}>
                X
              </a> */}
              <span
                className="glyphicon glyphicon-remove"
                style={deleteStyle}
                aria-hidden="true"
                onClick={this.removeReviewer.bind(this, rev)}
              />
            </div>
          );
        })
      : null;

    let availableReviewers = this.state.availableReviewers.map(rev => {
      return (
        <div className="checkbox" key={rev._id}>
          {/* <span
            className="glyphicon glyphicon-plus"
            style={deleteStyle}
            aria-hidden="true"
            onClick={this.removeReviewer.bind(this, rev)}
          /> */}
          <label>
            <input
              type="checkbox"
              value={rev._id}
              onChange={this.addReviewer.bind(this, rev._id)}
            />
            {rev.lastName}, {rev.firstName}
          </label>
        </div>
      );
    });

    const allTags = [
      "Consumption & Production",
      "Decarbonisation",
      "Finance & Economics",
      "Health",
      "Natural Assets",
      "Ocean",
      "Risk",
      "Urban",
      "WEF Nexus"
    ];

    console.log("state: ", this.state);

    const tags = allTags.map(tag => {
      return (
        <div id="tag" key={tag}>
          <label>
            <input
              type="checkbox"
              value={tag}
              checked={this.state.tags ? this.state.tags.includes(tag) : false}
              onChange={this.toggleTag}
            />
            {tag}
          </label>
        </div>
      );
    });

    return (
      <Modal
        style={modalDialog}
        bsSize="large"
        onHide={this.handleClose}
        show="true"
      >
        <Modal.Header closeButton>
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
            <a target="_blank" href={this.props.proposalLink}>
              Proposal
            </a>{" "}
            -{" "}
            <a target="_blank" href={this.props.budgetLink}>
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
              <div className="col-md-6">
                Tags
                {tags}
              </div>
              <div className="col-md-6">
                <label htmlFor="notes">Notes:</label>
                <textarea
                  className="form-control"
                  rows="4"
                  id="notes"
                  onChange={this.updateNotes}
                  value={this.state.notes}
                />
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
      </Modal>
    );
  }
}

const modalBody = {
  height: "auto",
  maxHeight: "500px",
  overflow: "auto",
  textAlign: "left"
};

const deleteStyle = {
  color: "silver",
  cursor: "pointer"
};

const modalDialog = {
  overflowY: "initial !important"
};

const availableReviewersStyle = {
  height: "150px",
  overflowY: "scroll"
};
export default ProposalModal;

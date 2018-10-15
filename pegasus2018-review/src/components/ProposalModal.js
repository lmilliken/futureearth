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

  componentWillMount() {}

  getAvailableReviewers() {
    return this.props.reviewersAll.filter(rev => {
      if (this.state.assignedReviewers) {
        return !this.state.assignedReviewers.includes(rev.HLContactKey);
      } else return rev;
    });
  }

  handleClose() {
    console.log("id", this);
    this.props.handleModalClose();
  }

  render() {
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
          this is the modal body
          <center>
            <a target="_blank" href={this.props.linkToProposal}>
              Proposal
            </a>{" "}
            -{" "}
            <a target="_blank" href={this.props.linkToBudget}>
              Budget
            </a>
          </center>
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="">Ratings</th>
                <th class="">Excellent</th>
                <th class="">Very Good</th>
                <th class="">Good</th>
                <th class="">Fair</th>
                <th class="">Poor</th>
              </tr>
            </thead>
            <tbody>
              <tr class="odd">
                <td class="">
                  The technical excellence and feasibility of planning and
                  executing the Research Plan within the proposed budget and
                  time constraints (50%)
                </td>
                <td class="">
                  <input
                    required
                    type="radio"
                    id="technical-execellence-feasbility"
                    name="technical-execellence-feasbility"
                    value="10"
                    class="form-radio"
                  />
                </td>

                <td class="">
                  <input
                    type="radio"
                    id="technical-execellence-feasbility"
                    name="technical-execellence-feasbility"
                    value="8"
                    class="form-radio"
                  />
                </td>

                <td class="">
                  <input
                    type="radio"
                    id="technical-execellence-feasbility"
                    name="technical-execellence-feasbility"
                    value="6"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="technical-execellence-feasbility"
                    name="technical-execellence-feasbility"
                    value="4"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="technical-execellence-feasbility"
                    name="technical-execellence-feasbility"
                    value="2"
                    class="form-radio"
                  />
                </td>
              </tr>
            </tbody>
          </table>
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

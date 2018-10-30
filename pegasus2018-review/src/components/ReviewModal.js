import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";

import CriteriaRow from "./CriteriaRow";
import RecommendationRow from "./RecommendationRow";

import temp from "./../tempKeys";

class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProposal: this.props.proposal,
      selectedReview: this.props.review
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.updateComments = this.updateComments.bind(this);
  }

  updateComments(e) {
    let tempSelectedReview = { ...this.state.selectedReview };
    tempSelectedReview.comments = e.target.value;
    this.setState({ selectedReview: tempSelectedReview }, () => {
      // console.log("new commends: ", this.state.selectedReview.comments);
    });
  }

  handleRadio(name, value) {
    console.log("getting called", name, value);
    let tempSelectedReview = { ...this.state.selectedReview };
    tempSelectedReview[name] = value;
    this.setState({ selectedReview: tempSelectedReview }, () => {
      // console.log("new state: ", this.state.selectedReview);
    });
  }

  getCookieValue(cookieName) {
    var b = document.cookie.match(
      "(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]+)"
    );
    return b ? b.pop() : null;
  }

  handleSave(event) {
    event.preventDefault();
    console.log("save", this.state);
    // this.props.handleModalSave(
    //   this.state.assignedReviewers,
    //   this.state.tags,
    //   this.state.notes
    // );

    console.log(
      "url: ",
      `http://localhost:8081/reviewers/addReview/${
        this.state.selectedReview._id
      }`
    );
    axios({
      method: "POST",
      url: `http://localhost:8081/reviewers/addReview/${
        this.state.selectedReview._id
      }`,
      headers: {
        HLAuthToken: this.getCookieValue("HLAuthToken") || temp.token
      },
      data: this.state.selectedReview
    })
      .then(res => this.props.handleModalSave())
      .catch(err => {
        console.log(err);
      });
  }

  updateNotes(event) {
    this.setState({
      notes: event.target.value
    });
  }

  componentWillMount() {
    let tempSelectedReview = { ...this.state.selectedReview };
    tempSelectedReview.idProposal = this.state.selectedProposal._id;
    this.setState({ selectedReview: tempSelectedReview });
  }

  getAvailableReviewers() {
    return this.props.reviewersAll.filter(rev => {
      if (this.state.assignedReviewers) {
        return !this.state.assignedReviewers.includes(rev.HLContactKey);
      } else return rev;
    });
  }

  handleClose() {
    this.props.handleModalClose();
  }

  render() {
    console.log("modal state: ", this.state.selectedProposal);
    const criteria = [
      {
        name: "scoreTheme",
        text:
          "Extent to which the research focuses on one or more of the Thematic Areas"
      },
      {
        name: "scoreImpact",
        text:
          "Direct path to impacting policy or practice and broad applicability of results"
      },
      {
        name: "scoreMission",
        text:
          "Clear and intriguing science questions, and relation to the Future Earth mission"
      },
      {
        name: "scoreDiversity",
        text: "Diversity in sectors, disciplines and members of working groups."
      },
      {
        name: "scoreCost",
        text:
          "Cost-effective use of Future Earth funding and leveraging of other funds."
      }
    ];

    const criteriaRows = criteria.map(aCriterion => {
      // console.log(aCriterion.name, this.state.selectedReview[aCriterion.name]);
      return (
        <CriteriaRow
          scoreValue={this.state.selectedReview[aCriterion.name]}
          key={aCriterion.name}
          handleRadio={this.handleRadio}
          {...aCriterion}
        />
      );
    });

    return (
      <Modal
        style={modalDialog}
        bsSize="lg"
        onHide={this.handleClose}
        show="true"
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.handleSave}>
          <Modal.Body style={modalBody}>
            this is the modal body
            <center>
              <a
                target="_blank"
                href={this.state.selectedProposal.proposalLink}
              >
                Proposal
              </a>{" "}
              -{" "}
              <a target="_blank" href={this.state.selectedProposal.budgetLink}>
                Budget
              </a>
            </center>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Criteria</th>
                  <th>Excellent</th>
                  <th>Very Good</th>
                  <th>Good</th>
                  <th>Fair</th>
                  <th>Poor</th>
                </tr>
              </thead>
              <tbody>{criteriaRows}</tbody>
            </table>
            <RecommendationRow
              handleRadio={this.handleRadio}
              scoreRec={this.state.selectedReview.recommendation}
            />
            <label>Additional comments:</label>
            <textarea
              name="comments"
              className="form-control"
              rows="3"
              onChange={this.updateComments}
              value={this.state.selectedReview.comments}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button className="btn btn-primary" bsStyle="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
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

const modalDialog = {
  overflowY: "initial !important"
};

const gridContainerStyle = {
  display: "grid",
  gridRowGap: "5px",
  gridColumGap: "5px",
  gridTemplateColumns: "30% 50px 50px 50px 50px"
};

const gridItemStyle = {
  border: "5px solid red"
};

export default ReviewModal;

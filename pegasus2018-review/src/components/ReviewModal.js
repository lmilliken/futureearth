import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";

import CriteriaRow from "./CriteriaRow";
import RecommendationRow from "./RecommendationRow";

class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProposal: this.props,
      selectedReview: {}
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
    this.setState({ selectedReview: tempSelectedReview });
  }

  handleRadio(name, value) {
    let tempSelectedReview = { ...this.state.selectedReview };
    tempSelectedReview[name] = value;
    this.setState({ selectedReview: tempSelectedReview });
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
    axios({
      method: "POST",
      url: "http://localhost:8081/reviewers/addReview",
      headers: {
        HLAuthToken:
          this.getCookieValue("HLAuthToken") ||
          "8FeaXCM0MWDFIO3TRHX5+d81h2TX2qB93Hl+2BWqa+UQ+Ww1xjHwo2eZOaIG5KZPxySUydkGQIgauKBrOHhmEb+RusZM89wHlR6SiU1QH8N5pHyDrD7QhACUD/ryC+Wa"
      },
      data: this.state.selectedReview
    })
      .then(res => console.log(res))
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
    tempSelectedReview.idProposal = this.props._id;
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
      return (
        <CriteriaRow
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
              <a target="_blank" href={this.props.linkToProposal}>
                Proposal
              </a>{" "}
              -{" "}
              <a target="_blank" href={this.props.linkToBudget}>
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
            <RecommendationRow handleRadio={this.handleRadio} />
            <label>Additional comments:</label>
            <textarea
              name="comments"
              class="form-control"
              rows="3"
              onChange={this.updateComments}
              value={this.state.comments}
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

import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import CriteriaRow from "./CriteriaRow";
import RecommendationRow from "./RecommendationRow";

class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProposal: this.props
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  }

  handleRadio(name, value) {
    console.log("in proposal modal", name, value);
    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
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

  componentWillMount() {
    console.log("state of modal: ", this.state);
  }

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
    console.log("state: ", this.state);

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
      return <CriteriaRow handleRadio={this.handleRadio} {...aCriterion} />;
    });

    console.log("critiera rows: ", criteriaRows);

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
                <th class="">Criteria</th>
                <th class="">Excellent</th>
                <th class="">Very Good</th>
                <th class="">Good</th>
                <th class="">Fair</th>
                <th class="">Poor</th>
              </tr>
            </thead>
            <tbody>{criteriaRows}</tbody>
          </table>
          <RecommendationRow />
          <label>Additional comments:</label>
          <textarea name="comments" class="form-control" rows="3" />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
          <Button
            onClick={this.handleSave}
            className="btn btn-primary"
            bsStyle="primary"
          >
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

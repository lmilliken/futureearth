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
    this.handleRadio = this.handleRadio.bind(this);
  }

  handleRadio(event) {
    const criteria = event.target.name;
    const value = event.target.value;
    this.setState({ [criteria]: value }, () => {
      console.log("state equals 4?: ", this.state.scoreTheme == 4);
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
    console.log("state: ", this.state);
    //html grid
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
          <table class="table table-striped">
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
            <tbody>
              <tr class="odd">
                <td class="">
                  Extent to which the research focuses on one or more of the
                  Thematic Areas
                </td>
                <td class="">
                  <input
                    required
                    type="radio"
                    id="scoreTheme"
                    name="scoreTheme"
                    value="10"
                    class="form-radio"
                    checked={this.state.scoreTheme == 10}
                    onChange={this.handleRadio}
                  />
                </td>

                <td class="">
                  <input
                    type="radio"
                    id="scoreTheme"
                    name="scoreTheme"
                    value="8"
                    class="form-radio"
                    checked={this.state.scoreTheme == 8}
                    onChange={this.handleRadio}
                  />
                </td>

                <td class="">
                  <input
                    type="radio"
                    id="scoreTheme"
                    name="scoreTheme"
                    value="6"
                    class="form-radio"
                    checked={this.state.scoreTheme == 6}
                    onChange={this.handleRadio}
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreTheme"
                    name="scoreTheme"
                    value="4"
                    class="form-radio"
                    checked={this.state.scoreTheme == 4}
                    onChange={this.handleRadio}
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreTheme"
                    name="scoreTheme"
                    value="2"
                    class="form-radio"
                    checked={this.state.scoreTheme == 2}
                    onChange={this.handleRadio}
                  />
                </td>
              </tr>
              <tr class="even">
                <td class="">
                  Direct path to impacting policy or practice and broad
                  applicability of results
                </td>
                <td class="">
                  <input
                    required
                    type="radio"
                    id="scoreImpact"
                    name="scoreImpact"
                    value="10"
                    class="form-radio"
                  />
                </td>

                <td class="">
                  <input
                    type="radio"
                    id="scoreImpact"
                    name="scoreImpact"
                    value="8"
                    class="form-radio"
                  />
                </td>

                <td class="">
                  <input
                    type="radio"
                    id="scoreImpact"
                    name="scoreImpact"
                    value="6"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreImpact"
                    name="scoreImpact"
                    value="4"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreImpact"
                    name="scoreImpact"
                    value="2"
                    class="form-radio"
                  />
                </td>
              </tr>

              <tr class="odd">
                <td class="">
                  Clear and intriguing science questions, and relation to the
                  Future Earth mission
                </td>
                <td class="">
                  <input
                    required
                    type="radio"
                    id="scoreMission"
                    name="scoreMission"
                    value="10"
                    class="form-radio"
                  />
                </td>

                <td class="">
                  <input
                    type="radio"
                    id="scoreMission"
                    name="scoreMission"
                    value="8"
                    class="form-radio"
                  />
                </td>

                <td class="">
                  <input
                    type="radio"
                    id="scoreMission"
                    name="scoreMission"
                    value="6"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreMission"
                    name="scoreMission"
                    value="4"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreMission"
                    name="scoreMission"
                    value="2"
                    class="form-radio"
                  />
                </td>
              </tr>

              <tr class="even">
                <td class="">
                  Diversity in sectors, disciplines and members of working
                  groups.
                </td>
                <td class="">
                  <input
                    required
                    type="radio"
                    id="scoreCost"
                    name="scoreCost"
                    value="10"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreCost"
                    name="scoreCost"
                    value="8"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreCost"
                    name="scoreCost"
                    value="6"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreCost"
                    name="scoreCost"
                    value="4"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreCost"
                    name="scoreCost"
                    value="2"
                    class="form-radio"
                  />
                </td>
              </tr>

              <tr class="even">
                <td class="">
                  Cost-effective use of Future Earth funding and leveraging of
                  other funds.
                </td>
                <td class="">
                  <input
                    required
                    type="radio"
                    id="scoreCost"
                    name="scoreCost"
                    value="10"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreCost"
                    name="scoreCost"
                    value="8"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreCost"
                    name="scoreCost"
                    value="6"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreCost"
                    name="scoreCost"
                    value="4"
                    class="form-radio"
                  />
                </td>
                <td class="">
                  <input
                    type="radio"
                    id="scoreCost"
                    name="scoreCost"
                    value="2"
                    class="form-radio"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="">Recommendation</th>
                <th class="">Highly recommend</th>
                <th class="">Recommend</th>
                <th class="">Do not recommend</th>
              </tr>
            </thead>
            <tbody>
              <tr class="odd">
                <td class="">Would you recommend this proposal for funding?</td>
                <td class="">
                  <input
                    required
                    type="radio"
                    id="recommendation"
                    name="recommendation"
                    value="3"
                    class="form-radio"
                  />
                </td>

                <td class="">
                  <input
                    type="radio"
                    id="recommendation"
                    name="recommendation"
                    value="1"
                    class="form-radio"
                  />
                </td>

                <td class="">
                  <input
                    type="radio"
                    id="recommendation"
                    name="recommendation"
                    value="0"
                    class="form-radio"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <label>Additional comments:</label>
          <textarea name="comments" class="form-control" rows="3" />
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

const modalDialog = {
  overflowY: "initial !important"
};

export default ProposalModal;

import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    // this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick() {
    this.props.ahandleRowClick();
  }

  render() {
    return (
      <div className="card" style={styles}>
        <div className="card-body">
          <h5 className="card-title">{this.props.INST_SHORT}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {this.props.INST_NAME}
          </h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href={this.props.LINK} target="_blank" className="card-link">
            Website
          </a>
        </div>
      </div>
    );
  }
}

const styles = {
  // width: "100%",
  margin: "10px",
  textAlign: "left",
  top: "0",
  overflow: "hidden",
  // position: "absolute",
  animation:
    "slide-in-bottom 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s 1 normal both running",
  border: "1px solid 	#DCDCDC",
  borderRadius: "5px",
  padding: "10px"
};
export default Card;

import React, { Component } from "react";

class ThemeFilter extends Component {
  constructor(props) {
    super(props);
    // this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick() {
    this.props.ahandleRowClick();
  }

  render() {
    const themes = {
      K_CP: "Consumption & Production",
      K_DECARB: "Decarbonisation",
      K_FE: "What is FE?",
      K_FWE: "Food-Water-Energy",
      K_HEALTH: "Health",
      K_NA: "Natural Assets",
      K_OCEAN: "Ocean",
      K_RISK: "Risk",
      K_URBAN: "Urban"
    };
    return (
      <div className="card col-lg-3 col-md-6" style={styles}>
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
  // width: "18rem",
  margin: "10px",
  textAlign: "left"
};
export default ThemeFilter;

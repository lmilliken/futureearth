import React, { Component } from "react";

class Card extends Component {
  // constructor(props) {
  //   // super(props);
  //   // this.handleRowClick = this.handleRowClick.bind(this);
  // }

  // handleRowClick() {
  //   this.props.ahandleRowClick();
  // }

  render() {
    const themes = [
      {
        value: this.props.K_CP,
        key: "K_CP",
        label: "Consumption & Production"
      },
      { value: this.props.K_DECARB, key: "K_DECARB", label: "Decarbonisation" },
      { value: this.props.K_FE, key: "K_FE", label: "Finance & Economics" },
      { value: this.props.K_FWE, key: "K_FWE", label: "Food-Water-Energy" },
      { value: this.props.K_HEALTH, key: "K_HEALTH", label: "Health" },
      { value: this.props.K_NA, key: "K_NA", label: "Natural Assets" },
      { value: this.props.K_OCEAN, key: "K_OCEAN", label: "Ocean" },
      { value: this.props.K_RISK, key: "K_RISK", label: "Risk" },
      { value: this.props.K_URBAN, key: "K_URBAN", label: "Urban" }
    ];

    let themesList = [];
    themes.filter(item => item.value === 1).map(item => {
      themesList.push(item.label);
    });
    console.log(themesList.join(", "));

    return (
      <div className="card" style={styles}>
        <div className="card-body">
          <h2 style={titleStyle} className="card-title">
            {this.props.INST_SHORT}
          </h2>
          <h3 className="card-subtitle mb-2 text-muted">
            {this.props.INST_NAME}
          </h3>
          <p className="card-text">
            <strong>Lead: </strong>
            {this.props.LEAD_INST}
            <br />
            <strong>Keywords: </strong>
            {this.props.KEYWORDS}
            <br />
            <strong>Themes: </strong>
            {themesList.join(", ")}
          </p>
          <a href={this.props.LINK} target="_blank" className="card-link">
            Website
          </a>
        </div>
      </div>
    );
  }
}

const titleStyle = {
  // width: "100%",
  marginTop: "5px"
};

const styles = {
  // width: "100%",
  margin: "10px",
  textAlign: "left",
  top: "0",
  overflow: "hidden",
  // position: "absolute",
  animation:
    "slide-in-bottom 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s 1 normal both running",
  border: "1px solid 	rgba(0, 158, 225, .2)",
  borderRadius: "5px",
  padding: "10px",
  boxShadow: "0px 0px 4px rgba(0, 158, 225, .75)"
};
export default Card;

import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Select from "react-select";
import Card from "./components/Card";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      keywords: [],
      selectedTheme: [],
      selectedLead: []
    };
    this.handleThemes = this.handleThemes.bind(this);
    this.handleLeads = this.handleLeads.bind(this);
    this.search = this.search.bind(this);
  }

  search() {
    console.log("search clicked");
    console.log(this.state.selectedTheme), console.log(this.state.selectedLead);
  }

  handleLeads = selectedLead => {
    this.setState({ selectedLead });
    console.log(`Option selected:`, selectedLead);
  };

  handleThemes = selectedTheme => {
    this.setState({ selectedTheme });
    console.log(`Option selected:`, selectedTheme);
  };

  async componentWillMount() {
    // const data = await this.getInstitutions();
    // console.log(data);
    // // this.getInstitutions();
    // this.setState({ institutions: data });
  }

  getInstitutions() {
    return axios
      .get("https://fe-server.herokuapp.com/mtl-consortium")
      .then(res => res.data)
      .catch(err => console.log(err));
  }
  render() {
    // let cards = this.state.institutions.map(member => {
    //   return <Card {...member} key={member._id} />;
    // });

    console.log("state", this.state);
    const themeOptions = [
      { value: "K_CP", label: "Consumption & Production" },
      { value: "K_DECARB", label: "Decarbonisation" },
      { value: "K_FE", label: "What is FE?" },
      { value: "K_FWE", label: "Food-Water-Energy" },
      { value: "K_HEALTH", label: "Health" },
      { value: "K_NA", label: "Natural Assets" },
      { value: "K_OCEAN", label: "Ocean" },
      { value: "K_RISK", label: "Risk" },
      { value: "K_URBAN", label: "Urban" }
    ];

    const leadOptions = [
      {
        value: "École de technologie supérieure",
        label: "École de technologie supérieure"
      },
      {
        value: "École polytechnique de Montréal",
        label: "École polytechnique de Montréal"
      },
      { value: "HEC Montréal", label: "HEC Montréal" },
      { value: "Université Laval", label: "Université Laval" },
      { value: "Université de Montréal", label: "Université de Montréal" },
      { value: "Université de Sherbrooke", label: "Université de Sherbrooke" },
      { value: "Université du Québec", label: "Université du Québec" },
      {
        value: "Université du Québec à Chicoutimi",
        label: "Université du Québec à Chicoutimi"
      },
      {
        value: "Université du Québec à Montréal",
        label: "Université du Québec à Montréal"
      },
      {
        value: "Université du Québec en Abitibi-Témiscamingue",
        label: "Université du Québec en Abitibi-Témiscamingue"
      },
      { value: "McGill Universit", label: "McGill University" },
      { value: "Concordia University", label: "Concordia University" },
      { value: "INRS", label: "INRS" },
      {
        value: "Université du Québec à Rimouski",
        label: "Université du Québec à Rimouski"
      }
    ];
    // console.log(Object.keys(themes));
    // Object.keys(themes).map(function(key, index) {
    //   console.log(key + ": " + themes[key]);
    // });

    // console.log("themese ", themesSelect);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Keywords"
              aria-describedby="basic-addon2"
            />
          </div>
          <div className="col-md-4">
            <Select
              // value={selectedOption}
              onChange={this.handleThemes}
              isMulti={true}
              options={themeOptions}
              placeholder="Themes"
            />
          </div>

          <div className="col-md-4">
            <Select
              // value={selectedOption}
              onChange={this.handleLeads}
              isMulti={true}
              options={leadOptions}
              placeholder="Lead Institutions"
            />
          </div>
          <div className="col-md-1">
            <button className="btn btn-primary" disabled onClick={this.search}>
              Search
            </button>
          </div>
        </div>

        <div className="gridContainer" style={constainerStyle}>
          {/* {cards} */}
        </div>
        <div>Search for institutions.</div>
      </div>
    );
  }
}

const constainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
  gridGap: "15px"
};

export default App;

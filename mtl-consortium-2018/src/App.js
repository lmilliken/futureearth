import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Card from "./components/Card";
import Select from "react-select";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { institutions: [1, 2, 3] };
    // this.handleAdd = this.handleAdd.bind(this);
  }

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

    // console.log(Object.keys(themes));
    // Object.keys(themes).map(function(key, index) {
    //   console.log(key + ": " + themes[key]);
    // });

    // console.log("themese ", themesSelect);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              class="form-control"
              placeholder="We want a search box for keywords, right?"
              aria-describedby="basic-addon2"
            />
            <button className="btn">Clear Filters</button>
          </div>
          <div className="col-md-4">
            <Select
              // value={selectedOption}
              // onChange={this.handleChange}
              isMulti={true}
              options={themeOptions}
              placeholder="Themes"
            />
          </div>

          <div className="col-md-4">
            <div>Lead Institutions</div>
          </div>
        </div>

        <div className="gridContainer" style={constainerStyle}>
          {/* {cards} */}
        </div>
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

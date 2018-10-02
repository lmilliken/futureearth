import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Card from "./components/Card";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { institutions: [1, 2, 3] };
    // this.handleAdd = this.handleAdd.bind(this);
  }

  async componentWillMount() {
    const data = await this.getInstitutions();
    console.log(data);
    // this.getInstitutions();
    this.setState({ institutions: data });
  }

  getInstitutions() {
    return axios
      .get("http://localhost:8081/mtl-consortium")
      .then(res => res.data)
      .catch(err => console.log(err));
  }
  render() {
    let cards = this.state.institutions.map(member => {
      return <Card {...member} key={member._id} />;
    });

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

    console.log(Object.keys(themes));
    Object.keys(themes).map(function(key, index) {
      console.log(key + ": " + themes[key]);
    });

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
            <div>Themes</div>
            {Object.keys(themes).map(function(key) {
              return (
                <div>
                  {/* Key: {key}, Value: {themes[key]} */}
                  <label>
                    <input
                      type="checkbox"
                      value={key}
                      // checked={
                      //   this.state.tags ? this.state.tags.includes(tag) : false
                      // }
                      // onChange={this.toggleTag}
                    />
                    {themes[key]}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            <div>Lead Institutions</div>
          </div>
        </div>

        <div className="row justify-content-center">{cards}</div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { statusOK: true };
    this.getAssignedReviews = this.getAssignedReviews.bind(this);
  }

  async componentWillMount() {
    const data = await this.getAssignedReviews();

    console.log({ data });
  }

  async getAssignedReviews() {
    // let HLAuthToken = this.getCookieValue("HLAuthToken");
    // if (!HLAuthToken) {
    //   return this.setState({
    //     statusOK: false,
    //     statusMessage: "Error: User has no HLAuthToken.  Please contact Laurel."
    //   });
    // }

    console.log("token: ", this.getCookieValue("HLAuthToken"));

    const options = {
      method: "GET",
      url: "http://localhost:8081/reviewers/assigned",
      headers: {
        HLAuthToken:
          this.getCookieValue("HLAuthToken") ||
          "8FeaXCM0MWDFIO3TRHX5+d81h2TX2qB93Hl+2BWqa+UQ+Ww1xjHwo2eZOaIG5KZPxySUydkGQIgauKBrOHhmEb+RusZM89wHjS4ZzTgGD1Wsk+Vg3zm1vmL7Is2UnMU8"
      }
    };

    return axios(options)
      .then(res => res)
      .catch(err => {
        console.log("there is an error", err.response);
        let errorMessage = err;
        if (err.response) {
          errorMessage = err.response.statusText;
        }
        this.setState({
          statusOK: false,
          statusMessage: errorMessage
        });
      });
  }

  getCookieValue(cookieName) {
    var b = document.cookie.match(
      "(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]+)"
    );
    return b ? b.pop() : null;
  }

  render() {
    if (this.state.statusOK === false) {
      return <p className="error-message">{this.state.statusMessage}</p>;
    } else {
      return <div className="App" />;
    }
  }
}

export default App;

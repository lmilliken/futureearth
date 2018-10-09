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
    // let HLAuthToken =
    //   this.getCookieValue("HLAuthToken") ||
    //   "8FeaXCM0MWDFIO3TRHX5+d81h2TX2qB93Hl+2BWqa+XtyE/karGt7d6jRRNt3z3Wg4yVAJJ7iP9NvJdXtP2X44C7QPv15gHoyqZpXAQbOjmKcA/tMxuZjpiZqFpEAbBm";
    // if (!HLAuthToken) {
    //   return this.setState({
    //     statusOK: false,
    //     statusMessage: "Error: User has no HLAuthToken.  Please contact Laurel."
    //   });
    // }

    // console.log({ HLAuthToken });

    const options = {
      method: "GET",
      url: "https://pegasus2018-server.herokuapp.com/reviewers/assigned",
      headers: {
        HLAuthToken: this.getCookieValue("HLAuthToken") //|| "8FeaXCM0MWDFIO3TRHX5+d81h2TX2qB93Hl+2BWqa+XtyE/karGt7d6jRRNt3z3Wg4yVAJJ7iP9NvJdXtP2X44C7QPv15gHoyqZpXAQbOjmKcA/tMxuZjh32XkdZkiaP"
      }
    };

    return axios(options)
      .then(res => res)
      .catch(err => {
        console.log("there is an error", err),
          this.setState({ statusOK: false });
      });
  }

  // async checkAuthUser() {
  //   // why is process.env.HL_KEY not working?

  //   var authOptions = {
  //     method: "GET",
  //     url: "https://api.connectedcommunity.org/api/v2.0/Contacts/GetWhoAmI",
  //     withCredentials: true,
  //     headers: {
  //       HLIAMKey: keys.HL_KEY,
  //       HLAuthToken:
  //         this.getCookieValue("HLAuthToken") ||
  //         "8FeaXCM0MWDFIO3TRHX5+d81h2TX2qB93Hl+2BWqa+XtyE/karGt7d6jRRNt3z3Wg4yVAJJ7iP9NvJdXtP2X44C7QPv15gHoZiz7OR16CMUhgqBezqMYzuAYjgYqxG7K"
  //     }
  //   };

  //   console.log({ authOptions });

  //   return axios(authOptions)
  //     .then(res => res)
  //     .catch(err => {
  //       console.log("there is an error", err),
  //         this.setState({ statusOK: false });
  //     });
  // }

  getCookieValue(cookieName) {
    var b = document.cookie.match(
      "(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]+)"
    );
    return b ? b.pop() : null;
  }

  render() {
    if (this.state.statusOK === false) {
      return <p>{this.state.statusMessage}</p>;
    } else {
      return <div className="App" />;
    }
  }
}

export default App;

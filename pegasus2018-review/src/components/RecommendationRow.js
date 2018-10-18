import React, { Component } from "react";

class RecommendationRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
    );
  }
}
export default RecommendationRow;

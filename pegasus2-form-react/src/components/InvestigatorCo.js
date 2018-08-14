import React, { Component } from 'react';
import Investigator from './Investigator';



class InvestigatorCo extends Component {
  render() {
    return (
        <div class="container applicant-co border border-light">
                <Investigator firstName={this.props.firstName} lastName={this.props.lastName} email={this.props.email} institution={this.props.institution} countryCitizenship={this.props.countryCitizenship} countryWork={this.props.countryWork} handleChange={this.props.handleChange}/>
                <center><button type="button" onClick={this.props.remove} class="btn btn-outline-danger">Remove</button></center>
            </div>
    );
  }
}

export default InvestigatorCo;
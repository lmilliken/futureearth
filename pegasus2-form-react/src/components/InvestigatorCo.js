import React, { Component } from 'react';
import Investigator from './Investigator';



class InvestigatorCo extends Component {
    
removeCo(index){
    this.props.remove(index)
}

  render() {
    return (
        <div class="container applicant-co border border-light" style={divStyle}>
                <Investigator key={this.props.key} index={this.props.index} infirstName={this.props.firstName} lastName={this.props.lastName} email={this.props.email} institution={this.props.institution} countryCitizenship={this.props.countryCitizenship} countryWork={this.props.countryWork} handleChange={this.props.handleChange}/>
                <center><button type="button" onClick={this.removeCo.bind(this, this.props.index)} class="btn btn-outline-danger">Remove</button></center>
            </div>
    );
  }
}

const divStyle = {
    paddingBottom: '10px',
    margin: '15px',
    border: '1px solid 	#DCDCDC',
    borderRadius: '5px'
  };

export default InvestigatorCo;
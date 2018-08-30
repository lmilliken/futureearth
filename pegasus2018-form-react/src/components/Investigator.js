import React, { Component } from 'react';

import SelectCountry from './SelectCountry'


class Investigator extends Component {
    handleChange(index, event){
        // console.log("index in investigator", index)
        // console.log("event name", event.target.name)
        // console.log("event value", event.target.value)
        var field = event.target.name;
        var value = event.target.value;
        this.props.handleChange(index, field, value)
       }
  
  render() {
    return (
        <div className="container applicant">
                <div className="form-row">
                    <div className="form-group col-md-6">        
                        <label htmlFor="firstName">First Name</label>
                        <input className="form-control" type="text" name="firstName" id="firstName" onChange={this.handleChange.bind(this, this.props.index)}/>
                    </div>  
                    <div className="form-group col-md-6">        
                        <label htmlFor="lastName">Last Name</label>
                        <input className="form-control" type="text" name="lastName"  id="lastName" onChange={this.handleChange.bind(this, this.props.index)}/>
                    </div>  
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">        
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="text" name="email"  id="email" onChange={this.handleChange.bind(this, this.props.index)}/>
                    </div>  
                    <div className="form-group col-md-6">        
                        <label htmlFor="institution">Institution</label>
                        <input className="form-control" type="text" name="institution" id="institution" onChange={this.handleChange.bind(this, this.props.index)}/>
                    </div>
                </div>
                <div className="form-row">    
                    <div className="form-group col-md-6">
                        <label htmlFor="countryCitizenship">Country of Citizenship</label>
                        <SelectCountry name="countryCitizenship" onChange={this.handleChange.bind(this, this.props.index)}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="countryWork">Country of Work</label>
                        <SelectCountry name="countryWork" onChange={this.handleChange.bind(this, this.props.index)}/>
                    </div>
                </div>
            </div>
    );
  }
}

export default Investigator;
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
        <div class="container applicant">
                <div class="form-row">
                    <div class="form-group col-md-6">        
                        <label for="firstName">First Name</label>
                        <input class="form-control" type="text" name="firstName" id="firstName" ref="firstName" onChange={this.handleChange.bind(this, this.props.index)}/>
                    </div>  
                    <div class="form-group col-md-6">        
                        <label for="lastName">Last Name</label>
                        <input class="form-control" type="text" name="lastName"  id="lastName" onChange={this.handleChange.bind(this, this.props.index)}/>
                    </div>  
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">        
                        <label for="email">Email</label>
                        <input class="form-control" type="text" name="email"  id="email" onChange={this.handleChange.bind(this, this.props.index)}/>
                    </div>  
                    <div class="form-group col-md-6">        
                        <label for="institution">Institution</label>
                        <input class="form-control" type="text" name="institution" id="institution" onChange={this.handleChange.bind(this, this.props.index)}/>
                    </div>
                </div>
                <div class="form-row">    
                    <div class="form-group col-md-6">
                        <label for="countryCitizenship" onChange={this.props.handleChange}>Country of Citizenship</label>
                        <SelectCountry name="countryCitizenship" onChange={this.handleChange.bind(this, this.props.index)}/>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="countryWork">Country of Work</label>
                        <SelectCountry name="countryWork" onChange={this.handleChange.bind(this, this.props.index)}/>
                    </div>
                </div>
            </div>
    );
  }
}

export default Investigator;
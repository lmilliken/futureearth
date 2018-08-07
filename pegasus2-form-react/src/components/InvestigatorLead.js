import React, { Component } from 'react';

import SelectCountry from './SelectCountry'


class InvestigatorLead extends Component {
  render() {
    return (
        <div class="container applicant">
                <div class="form-row">
                    <div class="form-group col-md-6">        
                        <label for="firstName">First Name</label>
                        <input class="form-control" type="text" name="firstName" id="firstName"/>
                    </div>  
                    <div class="form-group col-md-6">        
                        <label for="lastName">Last Name</label>
                        <input class="form-control" type="text" name="lastName"  id="lastName"/>
                    </div>  
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">        
                        <label for="email">Email</label>
                        <input required class="form-control" type="text" name="email"  id="email"/>
                    </div>  
                    <div class="form-group col-md-6">        
                        <label for="institution">Institution</label>
                        <input class="form-control" type="text" name="Institution" id="institution"/>
                    </div>
                </div>
                <div class="form-row">    
                    <div class="form-group col-md-6">
                        <label for="countryCitizenship">Country of Citizenship</label>
                        <SelectCountry name="countryCitizenship"/>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="countryWork">Country of Work</label>
                        <SelectCountry name="countryWork"/>
                    </div>
                </div>
            </div>
    );
  }
}

export default InvestigatorLead;
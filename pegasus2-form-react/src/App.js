import React, { Component } from 'react';

import InvestigatorLead from './components/InvestigatorLead';
import InvestigatorCo from './components/InvestigatorCo';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'


class App extends Component {
  render() {
    return (
      <div className="App container">
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"/>
        </head>
      <form>
         <div class="container form-row">
                    <div class="form-group col-md-12">        
                        <label for="proposalTitle">Full Title of Proposal</label>
                        <input class="form-control" type="text" name="proposalTitle" id="proposalTitle"/>
                    </div>  
         </div>
        
          <h4>Lead Principal Investigator</h4>
          <InvestigatorLead/>

          <h4>Co-Investigator(s)</h4>
          <InvestigatorCo/> 
          <InvestigatorCo/>
          <center><button type="button" class="btn btn-outline-primary">Add a Co-Investigator</button></center>
          <h4>File Uploads</h4>
          <div class="form-group">
              <label for="uploadProposal">Upload your proposal.</label>
              <input id="uploadProposal" type="file" name="uploadProposal"/>
          </div>

          <div class="form-group">
                  <label for="uploadBudget">Upload your budget.</label>
                  <input id="uploadBudget" type="file" name="uploadBudget"/>
          </div>


          <center>
          <input type="checkbox" name="checkbox" value="check" id="agree" /> By submitting this form, I agree to the Oxford comma way of life.
          <br/>
            <button type="submit" class="btn btn-primary">Submit</button></center>
      </form>
        
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

import Investigator from './components/Investigator';
import InvestigatorCo from './components/InvestigatorCo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      investigatorLead: {
        firstName: '',
        lastName: '',
        email: '',
        institution: '',
        countryCitizenship: '',
        countryWork: ''
      },
      InvestigatorCo: [
        {
          firstName: '',
          lastName: '',
          email: '',
          institution: '',
          countryCitizenship: '',
          countryWork: ''
        },
        {
          firstName: '',
          lastName: '',
          email: '',
          institution: '',
          countryCitizenship: '',
          countryWork: ''
        },
      ]
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleLeadChange = this.handleLeadChange.bind(this)
    this.handleCoChange = this.handleCoChange.bind(this)
  }

  handleAdd(){
    var coInvestigators = this.state.InvestigatorCo
        coInvestigators.push({
            firstName: '',
            lastName: '',
            email: '',
            institution: '',
            countryCitizenship: '',
            countryWork: ''
          })
    this.setState({
      InvestigatorCo: coInvestigators
      })
  };

  handleLeadChange(event){
    console.log(event.target.name)
    var prop = event.target.name
    var value = event.target.value
    console.log('event name', prop)
   // this.setState({investigatorLead: {prop: value}}, console.log("lead", this.state.investigatorLead))

    var newLead = {...this.state.investigatorLead, [prop]: value };
    this.setState({investigatorLead: newLead}, ()=>{console.log(this.state.investigatorLead)})
  }

  handleCoChange(event){
   console.log("changed co investigor",   event.target.value)
  }

  handleRemove(index){
    console.log('index', index)
    var coInvestigators = this.state.InvestigatorCo
    coInvestigators.splice(index,1)

    this.setState(
      {InvestigatorCo: coInvestigators}
    )
  }

  handleTitle(event){
    this.setState({ title: event.target.value }, ()=>{console.log(this.state)})
  }

  render() {

    var investigator = () =>{
      var lead = this.state.investigatorLead
      return <Investigator firstName={lead.firstName} lastName={lead.lastName} email={lead.email} institution={lead.institution} countryCitizenship={lead.countryCitizenship} countryWork={lead.countryWork} handleChange={this.handleLeadChange} />}
    
    var coInvestigators = this.state.InvestigatorCo.map(
      (item, index)=>{return <InvestigatorCo key={index} index={index} firstName={item.firstName} lastName={item.lastName} email={item.email} institution={item.institution} countryCitizenship={item.countryCitizenship} countryWork={item.countryWork} handleChange={this.handleCoChange} remove={this.handleRemove}/>}
    );
    var lead = this.state.investigatorLead

    return (
      <div className="App container">
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"/>
        </head>
      <form>
         <div class="container form-row">
                    <div class="form-group col-md-12">        
                        <label for="proposalTitle">Full Title of Proposal:</label>
                        <input class="form-control" type="text" name="title" id="proposalTitle" onChange={this.handleTitle}/>
                    </div>  
         </div>
        
          <h4>Lead Principal Investigator</h4>
          <div id='investigator-lead'>
             <Investigator firstName={lead.firstName} lastName={lead.lastName} email={lead.email} institution={lead.institution} countryCitizenship={lead.countryCitizenship} countryWork={lead.countryWork} handleChange={this.handleLeadChange} />
          </div> 

          <h4>Co-Investigator(s)</h4>
          <div id='investigators-list'>
            {coInvestigators}
          </div> 
          <center><button type="button" class="btn btn-outline-primary" onClick={this.handleAdd}>Add a Co-Investigator</button></center>

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
          <input type="checkbox" name="checkbox" value="check" id="agree" /> By submitting this form, I agree to research, innovation, sustainability, and the Oxford comma.
          <br/>
            <button type="submit" class="btn btn-primary">Submit</button></center>
      </form>
        
      </div>
    );
  }
}

export default App;

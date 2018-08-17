import React, { Component } from 'react';

import Investigator from './components/Investigator';
import InvestigatorCo from './components/InvestigatorCo';
const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      investigatorLead: [{
        firstName: '',
        lastName: '',
        email: '',
        institution: '',
        countryCitizenship: '',
        countryWork: ''
      }],
      investigatorCo: [
        {
          key: uuidv1(),
          firstName: '',
          lastName: '',
          email: '',
          institution: '',
          countryCitizenship: '',
          countryWork: ''
        },
        {
          key: uuidv1(),
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
    var coInvestigators = this.state.investigatorCo
        coInvestigators.push({
            key: uuidv1(),
            firstName: '',
            lastName: '',
            email: '',
            institution: '',
            countryCitizenship: '',
            countryWork: ''
          })
    this.setState({
      investigatorCo: coInvestigators
      }, ()=>{console.log("new state: ", this.state)})
  };

  handleLeadChange(_, field, value){
    var newLead = this.state.investigatorLead.slice()
    newLead[0][field] = value
    this.setState({investigatorLead: newLead}, ()=>{console.log("updated state: ", this.state)})
  }

  handleCoChange(index, field, value){
  console.log("handle co change at index: ", index)  
  console.log("handle co change at field: ", field)  
  console.log("handle co change at value: ", value)  
    var tempArray = this.state.investigatorCo
    tempArray[index][field] = value
    this.setState({investigatorCo: tempArray}, ()=>{console.log("updated state: ", this.state)} )
  }

  handleRemove(index){
    console.log('index', index)
    var coInvestigators = this.state.investigatorCo.slice()
    coInvestigators.splice(index,1)
    console.log("new co investigators: ", coInvestigators)

    this.setState(
      {investigatorCo: coInvestigators}
      ,()=>{console.log("updateded state after remove: ", this.state)}
    )
  }

  handleTitle(event){
    this.setState({ title: event.target.value }, ()=>{console.log(this.state)})
  }

  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    console.log("data", data)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:8081/submit', true);
    //xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);

    // fetch('http://localhost:8080/submit', {
    //   method: 'POST',
    //   body: data,
    // }).then((res)=>console.log('response from server: ', res));
  }

  render() {

    //this is not working
    // var investigator = () =>{
    //   var lead = this.state.investigatorLead
    //   return <Investigator firstName={lead.firstName} lastName={lead.lastName} email={lead.email} institution={lead.institution} countryCitizenship={lead.countryCitizenship} countryWork={lead.countryWork} handleChange={this.handleLeadChange} />}
    
    var coInvestigators = this.state.investigatorCo.map(
      (item, index)=>{return <InvestigatorCo key={item.key} index={index} firstName={item.firstName} lastName={item.lastName} email={item.email} institution={item.institution} countryCitizenship={item.countryCitizenship} countryWork={item.countryWork} handleChange={this.handleCoChange} remove={this.handleRemove}/>}
    );
    var lead = this.state.investigatorLead[0]

    return (
      <div className="App container">
        <head>
        {/* <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"/> "https://rocky-harbor-45956.herokuapp.com/submit"  "http://localhost:8081/submit"*/}
        </head>

        
      <form enctype="multipart/form-data" action="http://localhost:8081/submit" method="POST">
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
                  <input id="uploadBudget" type="file" name="uploadBudget" accept=".pdf"/>
          </div>


          <center>
          <input type="checkbox" name="checkbox" value="check" id="agree" /> By submitting this form I agree to research, innovation, sustainability, and the Oxford comma.
          <br/>
            <button type="submit" class="btn btn-primary" style={submitStyle}>Submit</button></center>
      </form>
        
      </div>
    );
  }
}

const submitStyle = {
  margin: '15px'
};

export default App;

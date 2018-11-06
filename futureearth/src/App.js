import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/home';
import PegasusAdmin from './components/2018/pegasus/pegasus-admin';
import PegasusForm from './components/2018/pegasus/form/pegasus-form';
import Error from './components/error';
import Navigation from './components/navigation';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/pegasus-admin-2018" component={PegasusAdmin} />
            <Route path="/pegasus-form-2018" component={PegasusForm} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import React, {Component} from 'react';
import './asset/assets/css/App.css';
import Home from './Components/Home';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
   
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            path="/"
            render={(props) => (
              <Home  {...props} />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/style.css'; // Import CSS -> ADDED IN THIS STEP

import Seasons from './components/iplSeasons'

export default class App extends Component {
  
  render() {
    return ( <div>
      <Seasons />
    </div>);
  }
}

render( <App /> , document.getElementById('app'));
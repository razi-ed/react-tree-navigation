import React, { Component } from 'react';
import { render } from 'react-dom';
const renderChart = require('./renderChart.js')
export default class SeasonData extends Component {
constructor(props){
  super(props)
  this.clicky= this.clicky.bind(this)
  // renderChart.chart= renderChart.bind(this)
}
clicky(name){
console.log('clicked',name)
}
  render() {
    return ( 
            <ul>
              <li>Teams Wins</li>
              <li>Batsmen Statistics</li>
              <li>Bowlers Statistics</li>
            </ul>
            );
    }
  
  
  }

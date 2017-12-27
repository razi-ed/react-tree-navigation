import React, { Component } from 'react';
import { render } from 'react-dom';

export default class SeasonData extends Component {
constructor(props){
  super(props)
  this.clicky= this.clicky.bind(this)
}
clicky(name){
console.log('clicked',name)
}
  render() {
    return ( 
            <ul>
              <li onClick={()=>{this.clicky(this.props.year)}}>Teams Wins</li>
              <li>Batsmen Statistics</li>
              <li>Bowlers Statistics</li>
            </ul>
            );
    }
  
  
  }

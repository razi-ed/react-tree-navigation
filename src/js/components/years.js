import React, { Component } from 'react';
import { render } from 'react-dom';
import SeasonData from "./seasonData";

export default class Year extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seasons: [],
      isLoading: false,
      isClicked:false,
      error: null
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('http://localhost:4756/seasons')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Cannot fetch data from source...!');
        }
      })
      .then(data => {
        data = data.sort((a, b) => a - b);
        this.setState({ seasons: data, isLoading: false });

      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render(){
    const { seasons, isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <div className="circle loader"></div>
    }
    return(
      seasons.map(season => <li key={season} onClick={() => { this.setState({ isClicked: !this.state.isClicked})}}> {season}
        {this.state.isClicked && <SeasonData year ={season}/>}
    </li>)
    );
}
}

module.exports = Year;
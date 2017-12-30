import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/style.css';

var tree = {
  title: "IPL statistics",
  childNodes: []
};

fetch('http://localhost:4756/seasons')
  .then(res => res.json())
  .then(data => {
    let seasons = data.sort((a, b) => a - b);
    let seasonData = seasons.map(season => {
      let team = fetch(`http://localhost:4756/${season}/teams`).then(res => res.json())
      let batting = fetch(`http://localhost:4756/${season}/batting`).then(res => res.json())
      let bowling = fetch(`http://localhost:4756/${season}/bowling`).then(res => res.json())
      const prList = [team, batting, bowling];
      return Promise.all(prList)
    })
    tree.childNodes = seasonData.map((data, index) => {
      let template = {};
      template['title'] = seasons[index];
      template['childNodes'] = [{ title: "Most Wins by Teams", childNodes: [] },
        { title: "Top Batsmen by runs", childNodes: [] },
        { title: "Top Bowlers by wickets", childNodes: [] }
      ];
      const team=0,batsman=1,bowler=2;
      data.then(allData => {
        template.childNodes[team].childNodes = allData[team].map(winsData => { return { title: winsData.team, childNodes: [{ title: winsData.wins + " wins" }] } });
        template.childNodes[batsman].childNodes = allData[batsman].map(runsData => { return { title: runsData.batsman, childNodes: [{ title: runsData.runs + " runs" }] } });
        template.childNodes[bowler].childNodes = allData[bowler].map(wicketsData => { return { title: wicketsData.bowler, childNodes: [{ title: wicketsData.wickets + " wickets" }] } });
      })
      return template;
    })
  })

class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    var childNodes;
    var classObj;

    if (this.props.node.childNodes != null) {
      childNodes = this.props.node.childNodes.map(function(node, index) {
        return <li key = { index } > < TreeNode node = { node }
        /></li >
      });

      classObj = {
        togglable: true,
        "togglable-down": this.state.visible,
        "togglable-up": !this.state.visible
      };
    }


    var style;
    if (!this.state.visible) {
      style = { display: "none" };
    }

    return ( 
      <div >
      <h5 onClick = { this.toggle }
      className = { classNames(classObj) } > { this.props.node.title } </h5> 
      <ul style = { style } > { childNodes } </ul> 
      </div >
    );
  }
}

render( <TreeNode node = { tree }/>,document.getElementById("tree") );
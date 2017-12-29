import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/style.css'; // Import CSS -> ADDED IN THIS STEP
import './tree'

var tree = {
  title: "IPL statistics",
  childNodes: []
};

fetch('http://localhost:4756/seasons')
  .then(res =>  res.json())
  .then(data => {
    let seasons = data.sort((a, b) => a - b);
    tree.childNodes = seasons.map(e => {
      var obj = {
        'title': e,
        'childNodes': nodesList
      };
      return obj;
    });
  })
  .catch(error => console.error(error));




const nodesList = [{ title: "Most Wins by Teams", childNodes: [{ title: "5 teams" }] },
{ title: "Top Batsmen by runs", childNodes: [{ title: "5" }] },
{ title: "Top Bowlers by wickets", childNodes: [{ title: "5" }] }];




class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.toggle = this.toggle.bind(this)
  }
  
  toggle() {
    this.setState({visible: !this.state.visible});
  }
  
  render() {
  	var childNodes;
    var classObj;

    if (this.props.node.childNodes != null) {
      childNodes = this.props.node.childNodes.map(function(node, index) {
        return <li key={index}><TreeNode node={node} /></li>
      });

      classObj = {
        togglable: true,
        "togglable-down": this.state.visible,
        "togglable-up": !this.state.visible
      };
    }


    var style;
    if (!this.state.visible) {
      style = {display: "none"};
    }

    return (
      <div>
        <h5 onClick={this.toggle} className={classNames(classObj)}>
          {this.props.node.title}
        </h5>
        <ul style={style}>
          {childNodes}
        </ul>
      </div>
    );
  }
}



render(
  <TreeNode node={tree} />,
  document.getElementById("tree")
);

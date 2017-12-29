let fetch = require('node-fetch');



const nodeGetter = () => {
    var tree = {
      title: "IPL statistics",
      childNodes: []
    };

    const nodesList = [{ title: "Most Wins by Teams", childNodes: [{ title: "5 teams" }] },
      { title: "Top Batsmen by runs", childNodes: [{ title: "5" }] },
      { title: "Top Bowlers by wickets", childNodes: [{ title: "5" }] }
    ];

    fetch('http://localhost:4756/seasons')
      .then(res => res.json())
      .then(data => {
        var obj = {
          'title': e,
          'childNodes': nodesList
        };
        let seasons = data.sort((a, b) => a - b);
        tree.childNodes = seasons.map(e => {

          return obj;
        })

      })
  }
  //console.log(tree.childNodes);
  //   Promise.resolve(tree.childNodes)
  // })

// .catch(error => console.error(error));

async function someFunc(x) {
  let nodes = await nodeGetter;
  let node = await nodes.json()
  let seasons = node.sort((a, b) => a - b);
  tree.childNodes = seasons.map(e => {
    var obj = {
      'title': e,
      'childNodes': nodesList
    };
    return obj;
  });

  console.log(tree.childNodes, x);
}
someFunc("razi");


let team = fetch(`http://localhost:4756/${year}/teams`).then(res => res.json())
let batting = fetch(`http://localhost:4756/${year}/batting`).then(res => res.json())
let bowling = fetch(`http://localhost:4756/${year}/bowling`).then(res => res.json())
const prList = [team, batting, bowling]
Promise.all(prList).then(result => {
  console.log("from promiseALL")
  nodes[0]['childNodes'] = result[0].map(e => {
    return { title: e.team, childNode: [{ title: `Total Wins: ${e.wins}` }] }
  })
  nodesList[1]['childNodes'] = result[1].map(e => {
    return { title: e.batsman, childNode: [{ title: `Total Runs: ${e.runs}` }] }
  })
  nodesList[2]['childNodes'] = result[2].map(e => {
    return { title: e.bowler, childNode: [{ title: `Total Wickets: ${e.wickets}` }] }
  })
})
let fetch = require('node-fetch');

var tree = {
  title: "IPL statistics",
  childNodes: []
};

const nodeGetter = fetch('http://localhost:4756/seasons')
  .then(res => res.json())
  .then(data => {
    let seasons = data.sort((a, b) => a - b);

    var tree = {
      title: "IPL statistics",
      childNodes: 1
    };

    let nodes = seasons.map((e, i) => {
      const nodesList = [{ title: "Most Wins by Teams", childNodes: [] },
        { title: "Top Batsmen by runs", childNodes: 1 },
        { title: "Top Bowlers by wickets", childNodes: 1 }
      ];
      console.log(nodes);

      var obj = {
        'title': e,
        'childNodes': nodesList
      };
      return obj;
    })
    return tree;
  })

// const dataGetter = nodes => {
//   nodes.forEach(season => {
//     let team = fetch(`http://localhost:4756/${season['title']}/teams`).then(res => res.json())
//     let batting = fetch(`http://localhost:4756/${season['title']}/batting`).then(res => res.json())
//     let bowling = fetch(`http://localhost:4756/${season['title']}/bowling`).then(res => res.json())
//     const prList = [team, batting, bowling]
//     Promise.all(prList)
//       .then(result => {
//         let temp = nodes
//         console.log(nodes.childNodes)
//         result[0].forEach(e => {
//           let teamData = "Total Wins" + e.wins
//           let data = { title: e.team, childNode: [{ title: teamData }] };
//           nodes.childNodes[0]['childNodes'].push(data)
//         })
//         nodes.childNodes[1]['childNodes'] = result[1].map((e, i) => {
//           console.log(e, i)
//           return { title: e.batsman, childNode: [{ title: `Total Runs: ${e.runs}` }] }
//         })
//         nodes.childNodes[2]['childNodes'] = result[2].map(e => {
//           return { title: e.bowler, childNode: [{ title: `Total Wickets: ${e.wickets}` }] }
//         })
//       })
//   })
//   return nodes;
// }

async function someFunc() {
  try {
    let nodes = await nodeGetter;
    nodes['childNodes'].forEach(season => {
        let team = fetch(`http://localhost:4756/${season['title']}/teams`).then(res => res.json())
        let batting = fetch(`http://localhost:4756/${season['title']}/batting`).then(res => res.json())
        let bowling = fetch(`http://localhost:4756/${season['title']}/bowling`).then(res => res.json())
        const prList = [team, batting, bowling]
        Promise.all(prList)
          .then(result => {
            // console.log(nodes.childNodes[0]);
            nodes.childNodes[0]['childNodes'] = result[0].map(e => {
              return { title: e.team, childNode: [{ title: `Total Wins: ${e.wins}` }] }
            })
            nodes.childNodes[1]['childNodes'] = result[1].map(e => {
              return { title: e.batsman, childNode: [{ title: `Total Runs: ${e.runs}` }] }
            })
            nodes.childNodes[2]['childNodes'] = result[2].map(e => {
              return { title: e.bowler, childNode: [{ title: `Total Wickets: ${e.wickets}` }] }
            })
          })
      })
      // console.log(nodes.childNodes[0].childNodes[0].childNodes);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("someFunc execution completed");

  }
}
someFunc();
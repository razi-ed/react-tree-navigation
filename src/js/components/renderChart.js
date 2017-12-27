const renderChart = (year, category) => {
  let source = ``
  fetch(source)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Cannot fetch data from source...!');
      }
    })
    .then(data => {
      let chart = Highcharts.chart('chart', {

        title: {
          text: `Statistics of IPL season ${year}.`
        },

        subtitle: {
          text: subt[id[1]] + ' statistics.'
        },

        xAxis: {
          categories: Object.keys(data[id[0]][id[1]][id[2]])
        },

        series: [{
          type: 'column',
          colorByPoint: true,
          data: Object.values(data[id[0]][id[1]][id[2]]),
          showInLegend: false
        }]

      }); /*  closing of HighCharts  */

    })
    .catch(error => this.setState({ error, isLoading: false }));

}
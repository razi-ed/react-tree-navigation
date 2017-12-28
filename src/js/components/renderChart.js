const renderChart = function(year, category) {
  console.log(year, category);
  let source = `http://localhost:4756/${year}/${category}`;
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
          categories: data['names']
        },

        series: [{
          type: 'column',
          colorByPoint: true,
          data: data['data'],
          showInLegend: false
        }]

      }); /*  closing of HighCharts  */

    })
    .catch(error => this.setState({ error, isLoading: false }));

}


module.exports = renderChart
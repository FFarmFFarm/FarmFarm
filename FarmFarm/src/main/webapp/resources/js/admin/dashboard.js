const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
        }
      }
    }
  };


  var context = document.getElementById('sellChart').getContext('2d');
  var sellChart = new Chart(context, config);


  //todo: 값 갖고오기
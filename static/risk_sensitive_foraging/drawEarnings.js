function drawEarnings(target, s, b, mls, maxx, showx, showb, xLabel) {
  var bLabel = b.toString();
  var bLabelIndent = b < 10 ? -6 : -12;

  $(function () {

    Highcharts.chart('chart-earnings', {
      credits:    { enabled: false },
      exporting:  { enabled: false },
      tooltip:    { enabled: false },
      title:      { text: null },
      legend:     { enabled: false },
      chart: {
        type: 'bar',
        margin: [20, 50, 25, 124],
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0
      },
      xAxis: {
        visible: true,
        offset: -5,
        categories: [ xLabel, ''],
        tickWidth: 0,
        lineColor: 'transparent',
        gridLineWidth: 0,
        lineThickness: 0,
        gridLineWidth: 0,
        min: 0,
        max: 0,
        labels: {
          style: { fontSize: '20px' },
          y: 6
        }
      },
      yAxis: {
        visible: showb,
        width: maxx * 20,
        min: -.001,
        max: maxx - .10,
        startOnTick: false,
        labels: {
          enabled: false,
          style: {
              fontSize: '4px'
           }
        },
        title: { text: null },
        gridLineWidth: 1,
        tickInterval: 1,
        minTickInterval: 0,
        tickPosition: 'inside',
        tickColor: 'transparent',
        tickWidth: 1,
        lineThickness: 0,
        plotLines: [{
          color: 'rgb(97,169,176)',
          value: b - .01,
          width: 3,
          dashStyle: 'ShortDot',
          zIndex: 4,
          label: {
            text: bLabel,
            rotation: 0,
            x: bLabelIndent,
            y: 62,
            style: {
              color: 'rgb(97,169,176)',
              fontSize: '18px',
              fontWeight: 'bold',
            }
          }
        }]
      },
      plotOptions: {
        series: {
          visible: showx,
          stacking: 'normal',
          borderColor: '#303030',
          borderWidth: 2,
          animation: false,
          states: { hover: { enabled: false } },
          dataLabels: {
            enabled: true,
            align: 'right',
            verticalAlign: 'bottom',
            crop: false,
            overflow: 'none',
            y: -10,
            x: 13,
            style: {
              textOutline: 0,
              fontSize: '18px',
              lineHeight: 1,
              color: 'rgb(112,112,112)'
            },
          }, 
        },
        area: {
          dataLabels: {
            enabled: true,
            crop: false,
            overflow: 'none'
          }
        },
      },
      series: [
      {
        data: [ mls ],
        color: 'rgba(250,250,250,.1)',
        dataLabels: { enabled: false },
      },
      {
        data: [ s ],
        color: s < b ? 'rgb(207,216,220)' : 'rgb(141, 230, 230)',
      },
      ]
    });
  });
}

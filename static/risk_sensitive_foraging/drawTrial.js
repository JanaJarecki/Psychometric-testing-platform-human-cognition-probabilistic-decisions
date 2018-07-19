  function drawTrial(target, show, trial, tLabel) {
    trial = JSON.parse("[" +trial + "]");

    $(function () {
      Highcharts.chart(target, {
        credits:    { enabled: false },
        exporting:  { enabled: false },
        tooltip:    { enabled: false },
        title:      { text: null },
        legend:     { enabled: false },
        chart: {
          type: 'scatter',
          margin: [0, 0, 18, 70],
          spacingTop: 0,
          spacingBottom: 0,
          spacingLeft: 0,
          spacingRight: 0 },
        xAxis: {
          visible: show,
          min: -.5,
          max: 4.5,
          lineColor: 'transparent',
          tickLength: 0,
          tickInterval: 1,
          labels: {
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'black'},
            y: -11,
            formatter() {
              return this.value + 1
            }
          }
        },
        yAxis: {
          visible: true,
          title: {
              text: tLabel,
              rotation: 0,
              style: { fontSize: '20px' },
              x: -16,
              y: 8
            },
          tickWidth: 0,
          lineColor: 'transparent',
          gridLineWidth: 0,
          lineThickness: 0,
          gridLineWidth: 0,
          labels: { enabled: false }
        },
        plotOptions: {
          scatter: {
            marker: {
              radius: 10,
              lineWidth: 0,
              lineColor: 'black',
              symbol: 'circle',
            }
          },
          series: {
            visible: show,
            allowPointSelect: false,
            animation: false,
            states: {
              hover: { enabled: false }
            }
          }
        },
        series: [{
            color: 'transparent',
            data: [1, 1, 1, 1, 1]
          },
          {
            data: trial,
            color: 'rgb(207,216,220)'
          },
          {
            data: trial.slice(0,-1),
            color: 'rgba(56,56,56,.6)'
          }
          ],
        });
    });
}


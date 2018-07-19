  function drawAction(target, x, p, showx, showp, xLabel, title) {
    $(function () {
    Highcharts.chart(target, {
      credits:    { enabled: false },
      exporting:  { enabled: false },
      tooltip:    { enabled: false },
      hover:      { mode: null },
      title:      {
        text: title,
        align: 'left',
        y: 14,
        x: 4,
        style: {
          fontWeight: 100,
          fontSize: '.8rem',
          color: 'grey',
          }
        },
      chart: {
        backgroundColor: 'rgba(255,255,255,0.002)',
        type: 'bar',
        margin: [20, -30, -50, -30],
        spacingTop: 0,
        spacingBottom: 10,
        spacingLeft: 0,
        spacingRight: 0,
        events: {
          click: function() {
            return false;
          }
        }
      },
      xAxis: {
        visible: false,
        categories: ['', ''],
      },
      yAxis: {
        visible: false,
        min: -.01,
        max: 100.01
      },
      plotOptions: {
        series: {
          enableMouseTracking: false,
          events: {
            legendItemClick: function() {
              return false;
            }
          },
          states: {
            hover: { enabled: false }
          },
          animation: false,
          stack: 'b',
          borderColor: null,
          borderWidth: 0,
          dataLabels: {
            y: 4,
            x: 0,
            enabled: true,
            color: 'black',
            align: 'center',
            crop: false,
            overflow: 'none',
            style: {
              textOutline: 'none',
              fontSize: '16px'
            },
            format: '{point.percentage} %',
          }
        },
        bar: {
          stacking: 'percent',
          pointWidth: 28
        }
      },
      legend: {
        enabled: showp,
        align: 'right',
        verticalAlign: 'top',
        y: 15,
        x: 5,
        layout: 'horizontal',
        squareSymbol: true,
        symbolHeight: 28,
        symbolRadius: 15,
        symbolBorder: 0,
        reversed: true,
        width: 270,
        height: 100,
        itemWidth: 130,
        useHTML: true,
        itemStyle: {
          fontSize: '24px',
          lineHeight: '20px',
          fontWeight: '300',
        },
        itemHiddenStyle: {
          color: '#666666',
        },
        labelFormat: "&thinsp; +" + " {name} ", /* + xLabel,*/
        itemDistance: 20,
        floating: false,        
      },
      series: [
      {
        visible: showx,
        name: [x[0]],
        data: [p[0]],
        color: 'rgb(230,230,230)',
      },
      {
        visible: showx,
        name: [x[1]],
        data: [p[1]],
        color: 'rgb(140,140,140)',
      }
      ],
      colors: ['rgb(230,230,230)', 'rgb(140,140,140)']
    });
  })
  };
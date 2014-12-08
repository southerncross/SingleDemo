jQuery(function($) {

  $(window).load(function() {
    // TODO
  });

  $(document).ready(function() {
    var buildings = [
      {type: 'wuA', pos: [
        {x: 38, y: 161},
        {x: 162, y: 161},
        {x: 122, y: 434},
        {x: 215, y: 434},
        {x: 241, y: 161},
        {x: 365, y: 161},
        {x: 438, y: 161},
        {x: 562, y: 161},
        {x: 40, y: 244},
        {x: 164, y: 244},
        {x: 243, y: 244},
        {x: 367, y: 244},
        {x: 440, y: 244},
        {x: 564, y: 244},
        {x: 39, y: 327},
        {x: 163, y: 327},
        {x: 242, y: 327},
        {x: 366, y: 327},
        {x: 439, y: 327},
        {x: 563, y: 327},
        {x: 392, y: 433},
        {x: 485, y: 433},
        {x: 123, y: 517},
        {x: 216, y: 517},
        {x: 393, y: 517},
        {x: 486, y: 517},
      ]},
      {type: 'chenA', pos: [
        {x: 69, y: 161},
        {x: 131, y: 161},
        {x: 272, y: 161},
        {x: 334, y: 161},
        {x: 469, y: 161},
        {x: 531, y: 161},
        {x: 71, y: 244},
        {x: 133, y: 244},
        {x: 274, y: 244},
        {x: 336, y: 244},
        {x: 471, y: 244},
        {x: 533, y: 244},
        {x: 70, y: 327},
        {x: 132, y: 327},
        {x: 273, y: 327},
        {x: 335, y: 327},
        {x: 470, y: 327},
        {x: 532, y: 327}
      ]},
      {type: 'chenB', pos: [
        {x: 100, y: 161},
        {x: 153, y: 434},
        {x: 184, y: 434},
        {x: 303, y: 161},
        {x: 500, y: 161},
        {x: 102, y: 244},
        {x: 305, y: 244},
        {x: 502, y: 244},
        {x: 101, y: 327},
        {x: 304, y: 327},
        {x: 501, y: 327},
        {x: 423, y: 433},
        {x: 454, y: 433},
        {x: 154, y: 517},
        {x: 185, y: 517},
        {x: 424, y: 517},
        {x: 455, y: 517}
      ]},
      {type: 'ziA', pos: [
        {x: 91, y: 434},
        {x: 246, y: 434},
        {x: 361, y: 433},
        {x: 516, y: 433},
        {x: 92, y: 517},
        {x: 247, y: 517},
        {x: 362, y: 516},
        {x: 517, y: 516}
      ]}
    ];

    $('.img-type').tooltip({
      title: '点击可查看大图'
    });

    // Draw pie chart & histogram
    $('#nv-wu-A').click(function(event) {
      $('html, body').animate({
        scrollTop: $("#type-wu-A").offset().top - 50
      }, 500);
    });

    var location2color = {
      "E'": '#1f77b4',
      "E''": '#ff7f0e',
      F: '#2ca02c',
      G: '#d62728',
      "G'": '#9467bd'
    };

    //drawPieChart('#svg-test');
    graph.drawHistogram('#svg-test-histogram', '../data/histogram.csv', 800, 600, {
      title: {y: 'haha'}
    });

    graph.drawPieChart('#svg-test-piechart', '../data/piechart.csv', 600, 400, {
      eventHandler: function(d) {
        var transferName = function(name) {
          return {"E'": 'Ec', "E''": 'Ecc', F: 'F', G: 'G', "G'": 'Gc'}[name];
        };
        graph.drawHistogram('#svg-test-histogram', '../data/' + transferName(d.data.key) + '.csv', 800, 600, {color: d.data.color});
        graph.drawLocation('#svg-test-location', '../images/svg/' + transferName(d.data.key) + '.svg', {filter: 'wuA'});
        $('#svg-test-location-des').html(d.data.key + '地块');
      }
    });

    d3.select('#svg-test-piechart svg').selectAll('.slice').on('click', function() {
      console.log('haha');
    });

    graph.drawLocation('#svg-test-location', '../images/svg/Ecc.svg', {filter: 'wuA'});
  });
});

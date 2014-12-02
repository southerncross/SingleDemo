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


    //drawPieChart('#svg-test');
    graph.drawHistogram('#svg-test-histogram', '../data/histogram.csv', 600, 400, {title: {y: 'haha'}});
    graph.drawPieChart('#svg-test-piechart', '../data/piechart.csv', 600, 400);

    function drawPieChart(id) {
      var svg = d3.select(id)
            .append('svg')
            .style({
              width: 960,
              height: 500
            })
            .append('g');

      svg.append('g').attr('class', 'slices');
      svg.append('g').attr('class', 'labels');
      svg.append('g').attr('class', 'lines');

      var width = 960,
          height = 500,
          radius = Math.min(width, height) / 2;

      var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {return d.value;});

      var arc = d3.svg.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.4);

      var outerArc = d3.svg.arc()
            .outerRadius(radius * 0.9)
            .innerRadius(radius * 0.9);

      svg.attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')');

      var key = function(d) {return d.data.label;};

      var color = d3.scale.ordinal()
            .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      function randomData() {
        var labels = color.domain();
        return labels.map(function(label) {
          return {label: label, value: Math.random()};
        });
      }

      change(randomData());

      function change(data) {
        // pie
        var slice = d3.select('.slices').selectAll('path.slice')
              .data(pie(data), key);

        slice.enter()
          .insert('path')
          .style('fill', function(d) {return color(d.data.label);})
          .attr('class', 'slice');

        slice.transition().duration(1000)
          .attrTween('d', function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
              return arc(interpolate(t));
            };
          });

        slice.style({
          'stroke-width': '2px'
        });

        slice.exit()
          .remove();

        // text-labels
        var text = d3.select('.labels').selectAll('text')
              .data(pie(data), key);

        text.enter()
          .append('text')
          .attr('dy', '.35em')
          .text(function(d) {
            return d.data.label;
          });

        function midAngle(d) {
          return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        text.transition().duration(1000)
          .attrTween('transform', function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
              var d2 = interpolate(t);
              var pos = outerArc.centroid(d2);
              pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
              return 'translate(' + pos + ')';
            };
          })
          .styleTween('text-anchor', function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
              var d2 = interpolate(t);
              return midAngle(d2) < Math.PI ? 'start': 'end';
            };
          });

        text.exit()
          .remove();

        // polylines
        var polyline = d3.select('.lines').selectAll('polyline')
              .data(pie(data), key);

        polyline.enter()
          .append('polyline');

        polyline.transition().duration(1000)
          .attrTween('points', function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
              var d2 = interpolate(t);
              var pos = outerArc.centroid(d2);
              pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
              return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };
          });

        polyline.style({
          opacity: '.3',
          stroke: 'black',
          'stroke-width': '2px',
          fill: 'none'
        });

        polyline.exit()
          .remove();
      }
    }
  });
});

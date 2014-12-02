!function() {
  var graph = {};

  /**
   * option: filter - Indicates which type can be filtered, filtered type will be colored, others will not.
   */
  graph.drawLocation = function(id, svgUrl, option) {
    d3.xml(svgUrl, 'image/svg+xml', function(error, xml) {
      if (error)
        console.log(error); return;
      $(id).append(xml.documentElement);
      d3.selectAll('#svg-test rect').each(function(d) {
        d3.select(this).attr('class') === option.filter || d3.select(this).attr('fill', '#ffffff');
      });
    });
  };

  /**
   * option: title - {x, y} - Indicates the legend of x axis and axis.
   */
  graph.drawHistogram = function(id, csvUrl, width, height, option) {
    var margin = option.hasOwnProperty('margin') ? option.margin : {};
    margin.left = margin.left || 40;
    margin.right = margin.right || 20;
    margin.top = margin.top || 40;
    margin.bottom = margin.bottom || 20;
    var title = option.hasOwnProperty('title') ? option.title : {};
    title.x = title.x || '';
    title.y = title.y || '';

    var x = d3.scale.ordinal()
          .rangeRoundBands([0, width - margin.left - margin.right], .1);

    var y = d3.scale.linear()
          .range([height - margin.top - margin.bottom, 0]);

    var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

    var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left');

    var svg = d3.select(id).append('svg')
          .attr({
            'width': width,
            'height': height
          })
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.tsv(csvUrl, function(d) {
      d.value = +d.value;
      return d;
    }, function(error, data) {
      x.domain(data.map(function(d) {return d.key;}));
      y.domain([0, d3.max(data, function(d) {return d.value;})]);

      svg.append('g')
        .attr({
          class: 'x axis',
          transform: 'translate(0,' + (height - margin.bottom - margin.top) + ')'
        })
        .call(xAxis);

      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr({
          transform: 'rotate(-90)',
          y: 6,
          dy: '.71em'
        })
        .text(title.y);

      svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr({
          class: 'bar',
          x: function(d) {return x(d.key);},
          width: x.rangeBand(),
          y: function(d) {return y(d.value);},
          height: function(d) {return height - margin.bottom - margin.top - y(d.value);}
        })
        .style('fill', 'orange')
        .on('mouseout', function() {d3.select(this).style('fill', 'orange');})
        .on('mouseover', function() {d3.select(this).style('fill', 'orangered');});

      svg.selectAll('.axis path, line')
        .style({
          fill: 'none',
          stroke: '#000',
          'shape-rendering': 'crispEdges'
        });
      svg.selectAll('.x.axis path')
        .style({
          display: 'none'
        });
    });
  };

  graph.drawPieChart = function(id, csvUrl, width, height, option) {
    var svg = {};
    if (d3.select(id).selectAll('svg').empty()) {
      svg = d3.select(id)
        .append('svg')
        .attr({
          width: width,
          height: height
        })
        .append('g');

      svg.append('g').attr('class', 'slices');
      svg.append('g').attr('class', 'labels');
      svg.append('g').attr('class', 'lines');
      svg.attr({
        transform: 'translate(' + width / 2 + ', ' + height / 2 + ')'
      });
    }
    else
      svg = d3.select(id).selectAll('svg')[0];

    var radius = Math.min(width, height) / 2;

    var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) {return d.value;});

    var arc = d3.svg.arc()
          .outerRadius(radius * 0.8)
          .innerRadius(radius * 0.4);

    var outerArc = d3.svg.arc()
          .outerRadius(radius * 0.9)
          .innerRadius(radius * 0.9);

    d3.tsv(csvUrl, function(d) {
      d.value = +d.value;
      return d;
    }, function(error, data) {
      // slices
      var slice = d3.select('.slices')
            .selectAll('path.slice')
            .data(pie(data), function(d) {return d.data.key;});

      slice.enter()
        .insert('path')
        .style('fill', function(d) {return d.data.color;})
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
            .data(pie(data), function(d) {return d.data.key;});

      text.enter()
        .append('text')
        .attr('dy', '.35em')
        .text(function(d) {
          return d.data.key;
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
            .data(pie(data), function(d) {return d.data.key;});

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
    });
  };

  if (typeof define === "function" && define.amd) define(graph); else if (typeof module === "object" && module.exports) module.exports = graph;
  this.graph = graph;
  return graph;
}();

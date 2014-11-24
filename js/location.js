jQuery(function($) {

  $(window).load(function() {
    // TODO
  });

  $(document).ready(function() {
    var typeInfo = {
      wuA: {name: '午-A', detail: '2室1厅1卫', color: '#00bb00'},
      chenA: {name: '辰-A', detail: '2室2厅1卫', color: '#46a3ff'},
      chenB: {name: '辰-B', detail: '3室2厅2卫', color: '#ffdc35'},
      ziA: {name: '子-A', detail: '4室3厅2卫', color: '#ff7575'}
    };

    drawMap();
    drawLocation('#svg-location');
    var freqData=[
      {id:'E1',freq:{wuA:40, chenA:60, chenB:40, ziA: 20}}
      ,{id:'E2',freq:{wuA:40, chenA:60, chenB:40, ziA: 30}}
      ,{id:'E3',freq:{wuA:40, chenA:60, chenB:40, ziA: 30}}
      ,{id:'E4',freq:{wuA:40, chenA:60, chenB:40, ziA: 30}}
      ,{id:'E5',freq:{wuA:60, chenA:60, chenB:40, ziA: 10}}
      ,{id:'E6',freq:{wuA:60, chenA:60, chenB:40, ziA: 10}}
      ,{id:'E7',freq:{wuA:60, chenA:60, chenB:40, ziA: 10}}
      ,{id:'E8',freq:{wuA:60, chenA:60, chenB:40, ziA: 10}}
      ,{id:'E9',freq:{wuA:60, chenA:30, chenB:20, ziA: 20}}
      ,{id:'E10',freq:{wuA:60, chenA:30, chenB:20, ziA: 20}}
      ,{id:'E11',freq:{wuA:20, chenA:30, chenB:20, ziA: 40}}
      ,{id:'E12',freq:{wuA:20, chenA:30, chenB:20, ziA: 40}}
      ,{id:'E13',freq:{wuA:20, chenA:30, chenB:20, ziA: 40}}
      ,{id:'E14',freq:{wuA:20, chenA:30, chenB:20, ziA: 40}}
    ];
    drawType('#svg-type', freqData);

    function drawLocation(id) {
      var width = 640,
          height = 600;
      var svg = Snap(width, height);

      svg.paper.rect(13, 138, 610, 437)
        .attr({
          fill: "#ffffff",
          stroke: "#000000",
          'stroke-width': 2
        });

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

      var title = {title: "E'地块", x: 310, y: 31};

      var legend = [
        {type: 'wuA', x: 210, y: 67},
        {type: 'chenB', x: 466, y: 67},
        {type: 'chenA', x: 466, y: 107},
        {type: 'ziA', x: 210, y: 107}
      ];



      var buildingWidth = 31;
      var buildingHeight = 32;
      // Method 'forEach' is only valid in Firefox and Chrome
      buildings.forEach(function(info) {
        info.pos.forEach(function(d) {
          svg.paper.rect(d.x, d.y, buildingWidth, buildingHeight)
            .attr({
              fill: typeInfo[info.type].color,
              stroke: 'black',
              'stroke-width': 2
            })
            .mouseout(function() {
              this.attr({
                width: buildingWidth,
                height: buildingHeight
              });
            })
            .mouseover(function() {
              this.attr({
                width: buildingWidth + 4,
                height: buildingHeight + 4
              });
            })
            .click(function(){
              $('#modal-' + info.type).modal('show');
            });
        });
      });

      svg.paper.text(title.x, title.y, title.title)
        .attr({
          'text-anchor': "middle",
          'font-size': 24
        });

      legend.forEach(function(lg) {
        svg.paper.rect(lg.x - 50, lg.y - 20, 30, 30)
          .attr({
            fill: typeInfo[lg.type].color,
            stroke: 'black',
            'stroke-width': 2
          });
        svg.paper.text(lg.x, lg.y, typeInfo[lg.type].name + '(' + typeInfo[lg.type].detail + ')');
      });

      $(id).append(svg.node);
    }

    function drawMap() {
      var width = 550;
      var height = 500;
      var svg = Snap(width, height);

      svg.paper.image('../images/demonstrate/map.jpg', 0, 0, width, height);

      // E' location
      svg.paper.path('M 50 280 l 120 -10 l 5 80 l -120 10 Z').attr({
        stroke: '#ee3a8c',
        strokeWidth: '5',
        'fill-opacity': 0
      });
      // mask layer
      svg.paper.path('M 50 280 l 120 -10 l 5 80 l -120 10 Z').attr({
        fill: '#ee3a8c',
        opacity: 0
      }).mouseover(function() {
        this.animate({
          opacity: 1
        }, 200);
      }).mouseout(function() {
        this.animate({
          opacity: 0
        }, 200);
      }).click(function() {
        $('html, body').animate({scrollTop: $('#location-Ec').offset().top - 50}, 200);
      });

      // E'' location
      svg.paper.path('M 100 367 l 75 -6 l 5 65 l -80 15 Z').attr({
        stroke: '#0080ff',
        strokeWidth: '5',
        'fill-opacity': 0
      });
      // mask layer
      svg.paper.path('M 100 367 l 75 -6 l 5 65 l -80 15 Z').attr({
        fill: '#0080ff',
        opacity: 0
      }).mouseover(function() {
        this.animate({
          opacity: 1
        }, 200);
      }).mouseout(function() {
        this.animate({
          opacity: 0
        }, 200);
      });

      // F location
      svg.paper.path('M 285 172 l 85 -6 l 5 75 l -87 8 Z').attr({
        stroke: '#ffd306',
        strokeWidth: '5',
        'fill-opacity': 0
      });
      // mask layer
      svg.paper.path('M 285 172 l 85 -6 l 5 75 l -87 8 Z').attr({
        fill: '#ffd306',
        opacity: 0
      }).mouseover(function() {
        this.animate({
          opacity: 1
        }, 200);
      }).mouseout(function() {
        this.animate({
          opacity: 0
        }, 200);
      });

      // G location
      svg.paper.path('M 380 145 l 40 -7 h 23 l 55 95 l -110 8 Z').attr({
        stroke: '#82d900',
        strokeWidth: '5',
        'fill-opacity': 0
      });
      // mask layer
      svg.paper.path('M 380 145 l 40 -7 h 23 l 55 95 l -110 8 Z').attr({
        fill: '#82d900',
        opacity: 0
      }).mouseover(function() {
        this.animate({
          opacity: 1
        }, 200);
      }).mouseout(function() {
        this.animate({
          opacity: 0
        }, 200);
      });

      // G location
      svg.paper.path('M 395 255 l 105 -7 l 15 5 l 20 50 l 10 40 l -5 10 l -135 30 l -5 -5 Z').attr({
        stroke: '#8600ff',
        strokeWidth: '5',
        'fill-opacity': 0
      });
      // mask layer
      svg.paper.path('M 395 255 l 105 -7 l 15 5 l 20 50 l 10 40 l -5 10 l -135 30 l -5 -5 Z').attr({
        fill: '#8600ff',
        opacity: 0
      }).mouseover(function() {
        this.animate({
          opacity: 1
        }, 200);
      }).mouseout(function() {
        this.animate({
          opacity: 0
        }, 200);
      });

      $('#svg-map').append(svg.node);
    }

    function drawType(id, fData){
      var barColor = 'steelblue';

      // compute total for each state.
      fData.forEach(function(d) {
        d.total=d.freq.wuA + d.freq.chenA + d.freq.chenB + d.freq.ziA;
      });

      // function to handle histogram.
      function histoGram(fD) {
        var hG={};
        var hGDim = {t: 60, r: 0, b: 30, l: 0};
        hGDim.w = 500 - hGDim.l - hGDim.r,
        hGDim.h = 300 - hGDim.t - hGDim.b;

        //create svg for histogram.
        var hGsvg = d3.select(id).append("svg")
              .attr("width", hGDim.w + hGDim.l + hGDim.r)
              .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
              .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")")
              .style();;

        // create function for x-axis mapping.
        var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
              .domain(fD.map(function(d) {return d[0];}));

        // Add x-axis to the histogram svg.
        hGsvg.append("g").attr("class", "x axis")
          .attr("transform", "translate(0," + hGDim.h + ")")
          .call(d3.svg.axis().scale(x).orient("bottom"));

        // Create function for y-axis map.
        var y = d3.scale.linear().range([hGDim.h, 0])
              .domain([0, d3.max(fD, function(d) {return d[1];})]);

        // Create bars for histogram to contain rectangles and freq labels.
        var bars = hGsvg.selectAll(".bar").data(fD).enter()
              .append("g").attr("class", "bar");

        // Create the rectangles.
        bars.append("rect")
          .attr("x", function(d) {return x(d[0]);})
          .attr("y", function(d) {return y(d[1]);})
          .attr("width", x.rangeBand())
          .attr("height", function(d) {return hGDim.h - y(d[1]);})
          .attr('fill',barColor)
          .on("mouseover",mouseover) // mouseover is defined below.
          .on("mouseout",mouseout); // mouseout is defined below.

        // Create the frequency labels above the rectangles.
        bars.append("text").text(function(d) {return d3.format(",")(d[1]);})
          .attr("x", function(d) {return x(d[0]) + x.rangeBand() / 2;})
          .attr("y", function(d) {return y(d[1]) - 5;})
          .attr("text-anchor", "middle");

        function mouseover(d) {  // utility function to be called on mouseover.
          // Filter for selected state.
          var st = fData.filter(function(s) {return s.id == d[0];})[0],
              nD = d3.keys(st.freq).map(function(s) {return {type:s, freq:st.freq[s]};});

          // call update functions of pie-chart and legend.
          pC.update(nD);
          leg.update(nD);
        }

        function mouseout(d){    // utility function to be called on mouseout.
          // reset the pie-chart and legend.
          pC.update(tF);
          leg.update(tF);
        }

        // create function to update the bars. This will be used by pie-chart.
        hG.update = function(nD, color) {
          // update the domain of the y-axis map to reflect change in frequencies.
          y.domain([0, d3.max(nD, function(d) {return d[1];})]);

          // Attach the new data to the bars.
          var bars = hGsvg.selectAll(".bar").data(nD);

          // transition the height and color of rectangles.
          bars.select("rect").transition().duration(500)
            .attr("y", function(d) {return y(d[1]); })
            .attr("height", function(d) { return hGDim.h - y(d[1]); })
            .attr("fill", color);

          // transition the frequency labels location and change value.
          bars.select("text").transition().duration(500)
            .text(function(d){ return d3.format(",")(d[1]);})
            .attr("y", function(d) {return y(d[1])-5; });
        };

        return hG;
      }

      // function to handle pieChart.
      function pieChart(pD){
        var pC ={},    pieDim ={w:250, h: 250};
        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

        // create svg for pie chart.
        var piesvg = d3.select(id).append("svg")
              .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
              .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

        // create function to draw the arcs of the pie slices.
        var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

        // create a function to compute the pie slice angles.
        var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

        // Draw the pie slices.
        piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
          .each(function(d) { this._current = d; })
          .style("fill", function(d) { return typeInfo[d.data.type].color; })
          .on("mouseover",mouseover).on("mouseout",mouseout);

        // create function to update pie-chart. This will be used by histogram.
        pC.update = function(nD){
          piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
            .attrTween("d", arcTween);
        };
        // Utility function to be called on mouseover a pie slice.
        function mouseover(d){
          // call the update function of histogram with new data.
          hG.update(fData.map(function(v){
            return [v.id,v.freq[d.data.type]];}),typeInfo[d.data.type].color);
        }
        //Utility function to be called on mouseout a pie slice.
        function mouseout(d){
          // call the update function of histogram with all data.
          hG.update(fData.map(function(v){
            return [v.id,v.total];}), barColor);
        }
        // Animating the pie-slice requiring a custom function which specifies
        // how the intermediate paths should be drawn.
        function arcTween(a) {
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function(t) { return arc(i(t));    };
        }
        return pC;
      }

      // function to handle legend.
      function legend(lD){
        var leg = {};

        // create table for legend.
        var legend = d3.select(id).append("table").attr('class','legend');

        // create one row per segment.
        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

        // create the first column for each segment.
        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
          .attr("width", '16').attr("height", '16')
          .attr("fill",function(d){ return typeInfo[d.type].color; });

        // create the second column for each segment.
        tr.append("td").text(function(d){ return typeInfo[d.type].name;});

        // create the third column for each segment.
        tr.append("td").attr("class",'legendFreq')
          .text(function(d){ return d3.format(",")(d.freq);});

        // create the fourth column for each segment.
        tr.append("td").attr("class",'legendPerc')
          .text(function(d){ return getLegend(d,lD);});

        // Utility function to be used to update the legend.
        leg.update = function(nD){
          // update the data attached to the row elements.
          var l = legend.select("tbody").selectAll("tr").data(nD);

          // update the frequencies.
          l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});

          // update the percentage column.
          l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});
        };

        function getLegend(d,aD){ // Utility function to compute percentage.
          return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
        }

        return leg;
      }

      // calculate total frequency by segment for all state.
      var tF = ['wuA','chenA','chenB', 'ziA'].map(function(d){
        return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))};
      });

      // calculate total frequency by state for all segment.
      var sF = fData.map(function(d){return [d.id, d.total];});

      var hG = histoGram(sF), // create the histogram.
          pC = pieChart(tF), // create the pie-chart.
          leg= legend(tF);  // create the legend.
    }

    function histogram(id, data) {
      var margin = margin = {top: 20, right: 40, bottom: 30, left: 20},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom,
          barWidth = Math.floor(width / 19) - 1;

      var x = d3.scale().linear().range([barWidth / 2, width - barWidth / 2]);
      var y = d3.scale().linear().range([height, 0]);
      var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .tickSize(-width)
            .tickFormat(function(d) {
              return Math.round(d / 100) + "百套";
            });
      var svg = d3.select('#svg-test').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.down)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      var freq = svg.append('g');
      freq.select('rect')
        .data(data)
        .enter()
        .append('rect');
    }
  });
});

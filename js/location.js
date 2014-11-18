jQuery(function($) {

  $(window).load(function() {
    // TODO
  });

  $(document).ready(function() {

    drawMap();


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
        $('html, body').animate({scrollTop: $('#location-Ec').offset().top}, 200);
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

  });
});

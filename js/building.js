jQuery(function($) {

  $(window).load(function() {
    // TODO
  });

  $(document).ready(function() {
    $('#index').show();
    $('#content').hide();

    $('a[id^="index"]').click(function() {
      var target = $(this).attr('id').substr(6); // 截取元素id中"index-"后面的部分
      $('div[id^="content"]').hide();
      $('#content-' + target).show();
      $('#content').show();
      $('#index').hide();
    });

    drawLocation();
    drawDetail();

    function drawLocation() {
      var path = 'h 50 v 20 h -10 v -2 h -40 Z';
      var ec = [
        {x: 10, y: 30},
        {x: 100, y: 30},
        {x: 190, y: 30},
        {x: 10, y: 100},
        {x: 100, y: 100},
        {x: 190, y: 100},
        {x: 10, y: 170},
        {x: 100, y: 170},
        {x: 190, y: 170}
      ];
      var width = 300;
      var height = 250;
      var offsetX = 20;
      var offsetY = 40;
      var svg = Snap(width, height);

      svg.paper.rect(0, 0, width, height).attr({
        stroke: '#000',
        strokeWidth: 2,
        'stroke-dasharray': "5 , 5",
        fill: '#fff'
      });
      svg.paper.text(130, 20, "E'地块");
      for (var id in ec) {
        svg.paper.text(ec[id].x + offsetX, ec[id].y - 10 + offsetY, 'E' + (Number(id) + 1));
        var b = svg.paper.path('M ' + (Number(ec[id].x) + offsetX) + ' ' + (Number(ec[id].y) + offsetY) + ' ' + path).attr({
	  stroke: '#000',
	  strokeWidth: 1
        });
        if (id == 0)
	  b.attr({fill: '#bada55'});
        else
	  b.attr({fill: '#ffffff'});
      }

      $('#svg-location-e1').append(svg.node);
    }

    function drawDetail() {
      var width = 800;
      var height = 500;
      var offsetX = 0;
      var offsetY = 0;
      var svg = Snap(width, height);
      var i;

      svg.paper.rect(0, 0, width, height).attr({
        stroke: '#000',
        strokeWidth: 2,
        'stroke-dasharray': "5 , 5",
        fill: '#fff'
      });
      svg.paper.text(400, 30, 'E1');
      svg.paper.path('M 50 70 l 50 -30 h 600 l 50 30 h -700 Z').attr({
        stroke: '#000',
        strokeWidth: 2,
        fill: '#fff'
      });
      svg.paper.path('M 75 70 h 650 v 300 h -650 Z').attr({
        stroke: '#000',
        strokeWidth: 2,
        fill: '#fff'
      });
      for (i = 0; i < 4; i++)
        svg.paper.text(150 + 160 * i, 390, (Number(i) + 1) + '单元');
      for (i = 0; i < 6; i++) {
        svg.paper.text(20, 100 + 50 * i, (6 - Number(i)) + '层');
        // 1
        svg.paper.rect(80, 80 + 50 * i, 60, 30).attr({
          fill: '#eec900'
        });
        svg.paper.text(90, 100 + 50 * i, '1-' + (6 - Number(i)) + '01');
        svg.paper.rect(78, 78 + 50 * i, 64, 34).attr({
          stroke: 'red',
          strokeWidth: 2,
          fill: '#eec900',
          'fill-opacity': 0,
          'stroke-opacity': 0
        }).mouseout(function() {
          this.animate({'stroke-opacity': 0}, 200);
        }).mouseover(function() {
          this.animate({'stroke-opacity': 1}, 200);
        }).click(function() {
        });
        svg.paper.rect(150, 80 + 50 * i, 60, 30).attr({
          fill: '#63b8ff'
        });
        svg.paper.text(160, 100 + 50 * i, '1-' + (6 - Number(i)) + '02');
        svg.paper.rect(148, 78 + 50 * i, 64, 34).attr({
          stroke: 'red',
          strokeWidth: 2,
          fill: '#eec900',
          'fill-opacity': 0,
          'stroke-opacity': 0
        }).mouseout(function() {
          this.animate({'stroke-opacity': 0}, 200);
        }).mouseover(function() {
          this.animate({'stroke-opacity': 1}, 200);
        }).click(function() {
        });
        // 2
        svg.paper.rect(240, 80 + 50 * i, 70, 30).attr({
          fill: '#ee3a8c'
        });
        svg.paper.text(250, 100 + 50 * i, '2-' + (6 - Number(i)) + '01');
        svg.paper.rect(238, 78 + 50 * i, 74, 34).attr({
          stroke: 'red',
          strokeWidth: 2,
          fill: '#eec900',
          'fill-opacity': 0,
          'stroke-opacity': 0
        }).mouseout(function() {
          this.animate({'stroke-opacity': 0}, 200);
        }).mouseover(function() {
          this.animate({'stroke-opacity': 1}, 200);
        }).click(function() {
        });
        svg.paper.rect(320, 80 + 50 * i, 70, 30).attr({
          fill: '#66cd00'
        });
        svg.paper.text(330, 100 + 50 * i, '2-' + (6 - Number(i)) + '02');
        svg.paper.rect(318, 78 + 50 * i, 74, 34).attr({
          stroke: 'red',
          strokeWidth: 2,
          fill: '#eec900',
          'fill-opacity': 0,
          'stroke-opacity': 0
        }).mouseout(function() {
          this.animate({'stroke-opacity': 0}, 200);
        }).mouseover(function() {
          this.animate({'stroke-opacity': 1}, 200);
        }).click(function() {
        });
        // 3
        svg.paper.rect(410, 80 + 50 * i, 70, 30).attr({
          fill: '#66cd00'
        });
        svg.paper.text(420, 100 + 50 * i, '3-' + (6 - Number(i)) + '01');
        svg.paper.rect(408, 78 + 50 * i, 74, 34).attr({
          stroke: 'red',
          strokeWidth: 2,
          fill: '#eec900',
          'fill-opacity': 0,
          'stroke-opacity': 0
        }).mouseout(function() {
          this.animate({'stroke-opacity': 0}, 200);
        }).mouseover(function() {
          this.animate({'stroke-opacity': 1}, 200);
        }).click(function() {
        });
        svg.paper.rect(490, 80 + 50 * i, 70, 30).attr({
          fill: '#ee3a8c'
        });
        svg.paper.text(500, 100 + 50 * i, '3-' + (6 - Number(i)) + '02');
        svg.paper.rect(488, 78 + 50 * i, 74, 34).attr({
          stroke: 'red',
          strokeWidth: 2,
          fill: '#eec900',
          'fill-opacity': 0,
          'stroke-opacity': 0
        }).mouseout(function() {
          this.animate({'stroke-opacity': 0}, 200);
        }).mouseover(function() {
          this.animate({'stroke-opacity': 1}, 200);
        }).click(function() {
        });
        // 4
        svg.paper.rect(580, 80 + 50 * i, 60, 30).attr({
          fill: '#63b8ff'
        });
        svg.paper.text(590, 100 + 50 * i, '4-' + (6 - Number(i)) + '01');
        svg.paper.rect(578, 78 + 50 * i, 64, 34).attr({
          stroke: 'red',
          strokeWidth: 2,
          fill: '#eec900',
          'fill-opacity': 0,
          'stroke-opacity': 0
        }).mouseout(function() {
          this.animate({'stroke-opacity': 0}, 200);
        }).mouseover(function() {
          this.animate({'stroke-opacity': 1}, 200);
        }).click(function() {
        });
        svg.paper.rect(650, 80 + 50 * i, 60, 30).attr({
          fill: '#eec900'
        });
        svg.paper.text(660, 100 + 50 * i, '4-' + (6 - Number(i)) + '02');
        svg.paper.rect(648, 78 + 50 * i, 64, 34).attr({
          stroke: 'red',
          strokeWidth: 2,
          fill: '#eec900',
          'fill-opacity': 0,
          'stroke-opacity': 0
        }).mouseout(function() {
          this.animate({'stroke-opacity': 0}, 200);
        }).mouseover(function() {
          this.animate({'stroke-opacity': 1}, 200);
        }).click(function() {
        });
      }

      svg.paper.rect(120, 420, 30, 30).attr({
        fill: '#66cd00'
      });
      svg.paper.text(80, 470, '午A(两室一厅一卫)');
      svg.paper.rect(300, 420, 30, 30).attr({
        fill: '#63b8ff'
      });
      svg.paper.text(260, 470, '辰A(两室两厅一卫)');
      svg.paper.rect(480, 420, 30, 30).attr({
        fill: '#ee3a8c'
      });
      svg.paper.text(440, 470, '辰B(三室两厅两卫)');
      svg.paper.rect(660, 420, 30, 30).attr({
        fill: '#eec900'
      });
      svg.paper.text(620, 470, '子A(四室三厅两卫)');

      $('#svg-detail-e1').append(svg.node);
    }

  });
});

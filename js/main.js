jQuery(function($) {

  $(window).load(function() {
    // TODO
  });

  $(document).ready(function() {
    // pin
    //$(".pinned").pin({containerSelector: ".container", minWidth: 940});
    //$(".pinned").pin();

    //smooth scroll
    $('.nav-tabs > li').click(function(event) {
      event.preventDefault();
      var target = $(this).find('>a').prop('hash');
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 500);
    });
    $('.section-content-nav').click(function(event) {
      event.preventDefault();
      var target = $(this).find('>a').prop('hash');
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 500);
    });
    $('#back-top').click(function(event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: '0px'
      }, 500);
    });

    // headroom.js
    new Headroom(document.querySelector('#top-nav'), {
      "tolerance": 0,
      "offset": 0,
      "classes": {
        "initial": "animated",
        "pinned": "slideInDown",
        "unpinned": "slideOutUp"
      }
    }).init();
    new Headroom(document.querySelector('#back-top'), {
      "tolerance": 0,
      "offset": 0,
      "classes": {
        "initial": "animated",
        "pinned": "slideInUp",
        "unpinned": "slideOutDown"
      }
    }).init();

    // nav-bar
    $('.main-nav a').on('click', function(e) {
      e.preventDefault();
      $('section').removeClass('active');
      $('.nav li').removeClass('active');
      $(this).parent('li').addClass('active');
      var id = $(this).attr('href');
      $(id).addClass('active');
    });

    $('.section-nav').on('click', function(e) {
      e.preventDefault();
      $('section').removeClass('active');
      var id = $(this).attr('href');
      $(id).addClass('active');
    });

    // Query
    $('.query-btn').on('click', function(e) {
      var queryType = [];
      var queryLocation = [];
      var queryArea = [];
      var queryBuilding = [];

      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).removeClass('btn-success');
      }
      else {
        $(this).addClass('active');
        $(this).addClass('btn-success');
      }

      $('.query-btn.active').each(function() {
        var button = $(this);
        var div = button.closest('div');

        if (div.hasClass('query-area')) {
          queryArea.push(button.html());
        }
        else if (div.hasClass('query-location')) {
          queryLocation.push(button.html());
        }
        else if (div.hasClass('query-type')) {
          queryType.push(button.html());
        }
        else if (div.hasClass('query-building')) {
          queryBuilding.push(button.html());
        }
      });

      var showData = [];
      var showDataWithArea = [];
      var showDataWithLocation = [];
      var showDataWithType = [];
      var showDataWithBuilding = [];
      var a, l, t, b;
      for (i in queryData) {
        a = l = t = b = true;
        if (queryType.length > 0 && !arrayExist(queryData[i]['type'], queryType))
          t = false;
        if (queryLocation.length > 0 && !arrayExist(queryData[i]['location'], queryLocation))
          l = false;
        if (queryArea.length > 0 && !arrayExist(queryData[i]['area'], queryArea))
          a = false;
        if (queryBuilding.length > 0 && !arrayExist(queryData[i]['building'], queryBuilding))
          b = false;
        a && l && t && b && showData.push(queryData[i]);
        l && t && b && showDataWithArea.push(queryData[i]);
        a && t && b && showDataWithLocation.push(queryData[i]);
        a && l && b && showDataWithType.push(queryData[i]);
        a && l && t && showDataWithBuilding.push(queryData[i]);
      }

      var queryTable = $('#query-table');
      queryTable.empty();
      for (i in showData) {
        queryTable.append("<tr><td>" + showData[i]['type'] + "</td><td>" + showData[i]['location'] + "</td><td>" + showData[i]['area'] + "</td><td>" + showData[i]['building'] + "</td><td>" + showData[i]['unit'] + "</td><td>" + showData[i]['room'] + "</td><td>" + showData[i]['description'] + "</td><td>关注</td></tr>");
      }

      $('.query-btn').each(function() {
        var button = $(this);
        var div = button.closest('div');

        if (button.hasClass('active'))
          return;
        button.removeClass('disabled');
        button.removeClass('btn-danger');
        if (div.hasClass('query-type') && !mapExist('type', button.html(), showDataWithType)) {
          button.addClass('disabled');
           button.addClass('btn-danger');
        }
        else if (div.hasClass('query-location') && !mapExist('location', button.html(), showDataWithLocation)) {
          button.addClass('disabled');
          button.addClass('btn-danger');
        }
        else if (div.hasClass('query-area') && !mapExist('area', button.html(), showDataWithArea)) {
          button.addClass('disabled');
          button.addClass('btn-danger');
        }
        else if (div.hasClass('query-building') && !mapExist('building', button.html(), showDataWithBuilding)) {
          button.addClass('disabled');
          button.addClass('btn-danger');
        }
      });
    });
  });
});

function arrayExist(tag, array) {
  return existp(tag, array, function(e) {return e;});
}

function mapExist(key, value, map) {
  var res = existp(value, map, function(item) {return item[key];});
  console.log(key + ' ' + value + ' ' + res);
  return res;
  //return existp(value, map, function(item) {return item[key];});
}

function existp(tag, set, getEle) {
  var i;
  for (i in set)
    if (getEle(set[i]) === tag)
      return true;
  return false;
}

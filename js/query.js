jQuery(function($) {

  $(window).load(function() {
    // TODO
  });

  $(document).ready(function() {
    refresh();

    $('.query-btn').on('click', function(e) {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      }
      else {
        $(this).addClass('active');
      }
      refresh();
    });
  });
});

function refresh() {
  // Filters
  var fTp = [];
  var fLc = [];
  var fAr = [];
  var fBld = [];
  var i;

  // Fill out filters
  $('.query-btn.active').each(function() {
    var button = $(this);
    var td = button.closest('td');

    if (td.hasClass('query-area')) {
      fAr.push(button.html());
    }
    else if (td.hasClass('query-location')) {
      fLc.push(button.html());
    }
    else if (td.hasClass('query-type')) {
      fTp.push(button.html());
    }
    else if (td.hasClass('query-building')) {
      fBld.push(button.html());
    }
  });

  // Filter data
  var showData = [];
  var showDataWithAllArea = [];
  var showDataWithAllLocation = [];
  var showDataWithAllType = [];
  var showDataWithAllBuilding = [];
  var a, l, t, b;
  for (i in queryData) {  // queryData comes from data.js
    a = l = t = b = true;
    if (fTp.length > 0 && !arrayExist(queryData[i]['type'], fTp))
      t = false;
    if (fLc.length > 0 && !arrayExist(queryData[i]['location'], fLc))
      l = false;
    if (fAr.length > 0 && !arrayExist(queryData[i]['area'], fAr))
      a = false;
    if (fBld.length > 0 && !arrayExist(queryData[i]['building'], fBld))
      b = false;
    if (fTp.length > 0 || fAr.length > 0 || fLc.length > 0 || fBld.length > 0)
      a && l && t && b && showData.push(queryData[i]);
    l && t && b && showDataWithAllArea.push(queryData[i]);
    a && t && b && showDataWithAllLocation.push(queryData[i]);
    a && l && b && showDataWithAllType.push(queryData[i]);
    a && l && t && showDataWithAllBuilding.push(queryData[i]);
  }

  // Update table
  var queryTable = $('#query-table');
  queryTable.empty();
  for (i in showData) {
    queryTable.append("<tr><td>" + showData[i]['type'] + "</td><td>" + showData[i]['location'] + "</td><td>" + showData[i]['area'] + "</td><td>" + showData[i]['building'] + "</td><td>" + showData[i]['unit'] + "</td><td>" + showData[i]['room'] + "</td><td>" + showData[i]['description'] + "</td><td>关注</td></tr>");
  }

  // Update status of buttons
  $('.query-btn').each(function() {
    var button = $(this);
    var td = button.closest('td');

    if (button.hasClass('active'))
      return;
    button.removeClass('disabled');
    button.removeClass('btn-default');
    button.removeClass('btn-primary');
    if (td.hasClass('query-type') && !mapExist('type', button.html(), showDataWithAllType)) {
      button.addClass('disabled');
      button.addClass('btn-default');
    }
    else if (td.hasClass('query-location') && !mapExist('location', button.html(), showDataWithAllLocation)) {
      button.addClass('disabled');
      button.addClass('btn-default');
    }
    else if (td.hasClass('query-area') && !mapExist('area', button.html(), showDataWithAllArea)) {
      button.addClass('disabled');
      button.addClass('btn-default');
    }
    else if (td.hasClass('query-building') && !mapExist('building', button.html(), showDataWithAllBuilding)) {
      button.addClass('disabled');
      button.addClass('btn-default');
    }
    else {
      button.addClass('btn-primary');
    }
  });
}

function arrayExist(tag, array) {
  return existp(tag, array, function(e) {return e;});
}

function mapExist(key, value, map) {
  var res = existp(value, map, function(item) {return item[key];});
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

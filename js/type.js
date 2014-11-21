jQuery(function($) {

  $(window).load(function() {
    // TODO
  });

  $(document).ready(function() {
    $('.img-type').tooltip({
      title: '点击可查看大图'
    });

    // Draw pie chart & histogram
    var freqData=[
    {State:'AL',freq:{low:4786, mid:1319, high:249}},
    {State:'AZ',freq:{low:1101, mid:412, high:674}},
    {State:'CT',freq:{low:932, mid:2149, high:418}},
    {State:'DE',freq:{low:832, mid:1152, high:1862}},
    {State:'FL',freq:{low:4481, mid:3304, high:948}},
    {State:'GA',freq:{low:1619, mid:167, high:1063}},
    {State:'IA',freq:{low:1819, mid:247, high:1203}},
    {State:'IL',freq:{low:4498, mid:3852, high:942}},
    {State:'IN',freq:{low:797, mid:1849, high:1534}},
    {State:'KS',freq:{low:162, mid:379, high:471}}
    ];
    dashboard('#dashboard',freqData);

    var typeFreqData = [
    {location: "E'", freq: {E1: 70, E2: 70, E3: 70, E4: 70, E5: 70, E6: 70, E7: 70, E8: 70, E9: 70, E10: 70, E11: 70, E12: 70, E13: 40, E14: 40, E15: 40, E16: 40}},
    {location: "E''", freq: {E17: 50, E18: 50, E19: 50, E20: 50, E21: 50, E22: 50}},
    {location: "F", freq: {F1: 70, F2: 70, F3: 70, F4: 40, F5: 40, F6: 40, F7: 40, F8: 40, F9: 50, F10: 50, F11: 50, F12: 50}},
    {location: "G", freq: {G1: 70, G2: 70, G3: 70, G4: 70, G5: 50, G6: 50, G7: 50, G8: 50}}
    ];

    $('#nv-wu-A').click(function(event) {
      $('html, body').animate({
        scrollTop: $("#type-wu-A").offset().top - 50
      }, 500);
    });
  });
});

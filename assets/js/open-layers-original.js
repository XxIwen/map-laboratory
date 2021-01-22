var MAP_ORIGIN = {
  $map: $("#MAP"),
  map: null,
  view: null,
};

$(document).ready(function () {
  MAP_ORIGIN.init();
});

MAP_ORIGIN.init = function () {
  this.initMap();
  this.initEvent();
};

MAP_ORIGIN.initMap = function () {
  var tileLayer = new ol.layer.Tile({ source: new ol.source.OSM() });
  MAP_ORIGIN.view = new ol.View({
    center: ol.proj.fromLonLat([37.41, 8.82]),
    zoom: 4,
  });
  MAP_ORIGIN.map = new ol.Map({
    target: "MAP",
    layers: [tileLayer],
    view: this.view,
  });
};

MAP_ORIGIN.initEvent = function () {};

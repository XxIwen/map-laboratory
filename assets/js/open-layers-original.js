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
    // center: ol.proj.fromLonLat([37.41, 8.82]),
    center: ol.proj.fromLonLat([103.838665, 1.3]),
    zoom: 11,
  });
  MAP_ORIGIN.map = new ol.Map({
    target: MAP_ORIGIN.$map[0],
    layers: [tileLayer],
    view: this.view,
  });
};

MAP_ORIGIN.initEvent = function () {};

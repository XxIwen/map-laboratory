var WFS_FILTER = {
  $map: $("#MAP"),
  map: null,
  view: null,
};

$(document).ready(function () {
  WFS_FILTER.init();
});

WFS_FILTER.init = function () {
  this.initMap();
  this.initEvent();
};

WFS_FILTER.initMap = function () {
  var tileLayer = new ol.layer.Tile({ source: new ol.source.OSM() });
  WFS_FILTER.view = new ol.View({
    center: ol.proj.fromLonLat([37.41, 8.82]),
    zoom: 4,
  });
  WFS_FILTER.map = new ol.Map({
    target: "MAP",
    layers: [tileLayer],
    view: this.view,
  });
};

WFS_FILTER.initEvent = function () {};

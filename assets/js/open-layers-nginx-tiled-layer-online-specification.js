/**
 * Use ol.source.XYZ to load map tiles of Tiled Map from Nginx Server
 * This Tiled Map Service is specification from Online Map;
 * 
 *
 * Tile Layer Parameters:
 * minZoom: 10
 * maxZoom: 17
 * projection: "EPSG:3857"
 * tileSize: 256
 * origins: []
 * resolutions: []
 * sizes: []
 * tileMatrixOrigins: []
 *
 * **/

var NGINX_TILE_LAYER = {
  $map: $("#MAP"),
  map: null,
  view: null,
  serverAddress: "http://localhost:3400",
};

$(document).ready(function () {
  NGINX_TILE_LAYER.init();
});

NGINX_TILE_LAYER.init = function () {
  this.initMap();
  // this.initEvent();
};

NGINX_TILE_LAYER.initMap = function () {

  var tileLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      attributions: "Copyright:© 2021 Bai",
      url: NGINX_TILE_LAYER.serverAddress + "/tile/{z}/{x}/{y}",
      maxZoom: 18,
      minZoom: 10,
      projection: "EPSG:3857",
      tilePixelRatio: 1,
      tileSize: [256, 256],
      tileLoadFunction: function (tile, src) {
        var basicTileURL = src.match(/\S+tile\//g); // array
        var xyz = (src.match(/\d+\/\d+\/\d+/g) || []).join("").split("/");
        const _xyz = xyz.slice();
        _xyz[0] = 'L' + NGINX_TILE_LAYER.toTransformFilePath(Number(xyz[0]), 2, 10);
        _xyz[1] = 'R' + NGINX_TILE_LAYER.toTransformFilePath(Number(xyz[2]), 8, 16);
        _xyz[2] = 'C' + NGINX_TILE_LAYER.toTransformFilePath(Number(xyz[1]), 8, 16);

        basicTileURL.push(_xyz.join("/"));
        var url = basicTileURL.join("") + ".png";
        tile.getImage().src = url;
      },
    }),
  });

  var tileLayerOSM = new ol.layer.Tile({ source: new ol.source.OSM() });

  this.view = new ol.View({
    center: ol.proj.fromLonLat([103.838665, 1.35]),
    minZoom: 10,
    maxZoom: 18,
    zoom: 10,
    projection: "EPSG:3857",
  });
  this.map = new ol.Map({
    target: NGINX_TILE_LAYER.$map[0],
    layers: [tileLayerOSM, tileLayer],
    view: this.view,
  });
};

NGINX_TILE_LAYER.toTransformFilePath = function(num, len, radix) {
  var str = num.toString(radix || 10);
  while (str.length < len) {
    str = "0" + str;
  }
  return str;
}

// NGINX_TILE_LAYER.initEvent = function () {};

/**
 * Use ol.source.XYZ to load map tiles of Tiled Map Service from ArcGIS Server
 * This Tiled Map Service is specification from Online Map;
 * 
 *
 * Tile Layer Parameters:
 * minZoom: 10
 * maxZoom: 18
 * projection: "EPSG:3857"
 * tileSize: 256
 * origins: []
 * resolutions: []
 * sizes: []
 * tileMatrixOrigins: []
 *
 * **/

var ARCGIS_TILE_LAYER = {
  $map: $("#MAP"),
  map: null,
  view: null,
  arcgisServices: {
    buildingWFS:
      "",
    tiledMapSG:
      "",
  },
};

$(document).ready(function () {
  ARCGIS_TILE_LAYER.init();
});

ARCGIS_TILE_LAYER.init = function () {
  this.initMap();
  // this.initEvent();
};

ARCGIS_TILE_LAYER.initMap = function () {

  var tileLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      attributions: "Copyright:© 2021 ESRI",
      url: ARCGIS_TILE_LAYER.arcgisServices.tiledMapSG + "/tile/{z}/{x}/{y}",
      maxZoom: 18,
      minZoom: 10,
      projection: "EPSG:3857",
      tilePixelRatio: 1,
      tileSize: [256, 256],
      tileLoadFunction: function (tile, src) {
        var basicTileURL = src.match(/\S+tile\//g); // array
        var xyz = (src.match(/\d+\/\d+\/\d+/g) || []).join("").split("/");
        const xyzCP = xyz.slice();
        xyzCP[1] = Number(xyz[2]);
        xyzCP[2] = Number(xyz[1]);

        basicTileURL.push(xyzCP.join("/"));
        var url = basicTileURL.join("");
        tile.getImage().src = url;
      },
    }),
  });

  var tileLayerOSM = new ol.layer.Tile({ source: new ol.source.OSM() });

  this.view = new ol.View({
    center: ol.proj.fromLonLat([103.838665, 1.35]),
    minZoom: 10,
    maxZoom: 18,
    zoom: 15,
    projection: "EPSG:3857",
  });
  this.map = new ol.Map({
    target: ARCGIS_TILE_LAYER.$map[0],
    layers: [tileLayerOSM, tileLayer],
    view: this.view,
  });
};

// ARCGIS_TILE_LAYER.initEvent = function () {};

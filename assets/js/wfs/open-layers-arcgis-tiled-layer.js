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
  // var vectorSource = new ol.source.Vector({
  //   format: new ol.format.GeoJSON(),
  //   url: function (extent) {
  //     return (
  //       ARCGIS_TILE_LAYER.arcgisServices.buildingWFS +
  //       "?service=WFS&" +
  //       "version=1.1.0&request=GetFeature&" +
  //       "outputFormat=application/json&srsname=EPSG:4326&" +
  //       "bbox=" +
  //       extent.join(",") +
  //       ",EPSG:4326"
  //     );
  //   },
  //   strategy: ol.loadingstrategy.bbox,
  // });

  // var vector = new ol.layer.Vector({
  //   source: vectorSource,
  //   style: new ol.style.Style({
  //     stroke: new ol.style.Stroke({
  //       color: "rgba(0, 0, 255, 1.0)",
  //       width: 2,
  //     }),
  //   }),
  // });

  var ivhTileGrid = new ol.tilegrid.TileGrid({
    minZoom: 0,
    // extent: [103.5643, 1.1212, 104.4106, 1.4917],
    // origin: [-400, 399.9999999999998],
    origins: [
      [103.5643, 1.1212],
      [103.5643, 1.1212],
      [103.5643, 1.1212],
      [103.5643, 1.1212],
      [103.5643, 1.1212],
      [103.5643, 1.1212],
      [103.5643, 1.1212],
      [103.5643, 1.1212],
      [103.5643, 1.1212],
    ],
    resolutions: [
      0.00118973050291514,
      0.00059486525145757,
      0.000297432625728785,
      0.00015228550437313792,
      0.00007614275218656896,
      0.00003807137609328448,
      0.00001903568804664224,
      0.00000951784402332112,
      0.00000475892201166056,
    ],
    sizes: [
      [4, 2],
      [7, 4],
      [12, 6],
      [23, 10],
      [45, 20],
      [99, 39],
      [175, 77],
      [348, 153],
      [696, 305],
    ],
    // sizes: [
    //   [2, 4],
    //   [4, 7],
    //   [6, 12],
    //   [10, 23],
    //   [20, 45],
    //   [39, 88],
    //   [77, 175],
    //   [153, 348],
    //   [305, 696],
    // ],
    // sizes: [
    //   [1310, 1657],
    //   [2620, 3313],
    //   [5239, 6625],
    //   [10232, 12939],
    //   [20464, 25878],
    //   [40927, 51755],
    //   [81853, 103509],
    //   [163706, 207017],
    //   [327411, 414034],
    // ],
    tileSize: [256, 256],
  });

  var tileMatrixOrigins = [
    [1653, 1308],
    [3306, 2616],
    [6613, 5233],
    [12916, 10222],
    [25833, 20444],
    [51667, 40888],
    [103334, 81776],
    [206669, 163553],
    [413338, 327106],
  ];

  var tileLayer = new ol.layer.Tile({
    // source: new ol.source.TileArcGISRest({
    //   url: ARCGIS_TILE_LAYER.arcgisServices.tiledMapSG,
    // }),
    source: new ol.source.XYZ({
      attributions: "Copyright:© 2021 ESRI, IVH-Cloud",
      url: ARCGIS_TILE_LAYER.arcgisServices.tiledMapSG + "/tile/{z}/{x}/{y}",
      maxZoom: 8,
      minZoom: 0,
      projection: "EPSG:4326",
      tilePixelRatio: 1,
      tileSize: [256, 256],
      tileGrid: ivhTileGrid,
      tileLoadFunction: function (tile, src) {
        var basicTileURL = src.match(/\S+tile\//g); // array
        var xyz = (src.match(/\d+\/\d+\/\d+/g) || []).join("").split("/");
        var level = xyz[0];
        const xyzCP = xyz.slice();
        xyzCP[1] = Number(tileMatrixOrigins[level][1]) + Number(xyz[2]);
        xyzCP[2] = Number(tileMatrixOrigins[level][0]) + Number(xyz[1]);

        basicTileURL.push(xyzCP.join("/"));
        var url = basicTileURL.join("");
        tile.getImage().src = url;
      },
    }),
  });

  // var tileLayerWMS = new ol.layer.Tile({
  //   source: new ol.source.TileWMS({
  //     url: "https://ahocevar.com/geoserver/wms",
  //     params: {
  //       LAYERS: "ne:NE1_HR_LC_SR_W_DR",
  //       TILED: true,
  //     },
  //   }),
  // });
  var tileLayerOSM = new ol.layer.Tile({ source: new ol.source.OSM() });

  this.view = new ol.View({
    center: [103.838665, 1.3],
    // center: ol.proj.fromLonLat([103.838665, 1.3]),
    zoom: 11,
    projection: "EPSG:4326",
  });
  this.map = new ol.Map({
    controls: ol.control.defaults().extend([
      new ol.control.ScaleLine({
        units: "degrees",
      }),
    ]),
    target: ARCGIS_TILE_LAYER.$map[0],
    layers: [tileLayerOSM, tileLayer],
    view: this.view,
  });

  console.log({ tileLayer: tileLayer, view: this.view, map: this.map });
};

// ARCGIS_TILE_LAYER.initEvent = function () {};

mapboxgl.accessToken = 'pk.eyJ1IjoibWV0aGhlYWQiLCJhIjoiY2tmeWptMTl1MDc1ODMybnl0cG53d3EzeSJ9.I940A8p4RTwGYKw1mCalWg';
var layerIDs = []; // Will contain a list used to filter against.
var filterInput = document.getElementById('filter-input');
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/methhead/ckgp69wdx2g9u19pjy1qx2kqg', // stylesheet location
  center: [5.457278, 51.446996], // starting position [lng, lat]
  zoom: 16 // starting zoom
});

mapboxgl.accessToken = 'pk.eyJ1IjoibWV0aGhlYWQiLCJhIjoiY2tmeWptMTl1MDc1ODMybnl0cG53d3EzeSJ9.I940A8p4RTwGYKw1mCalWg';
var layerIDs = []; // Will contain a list used to filter against.
var filterInput = document.getElementById('filter-input');
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/methhead/ckgp69wdx2g9u19pjy1qx2kqg', // stylesheet location
  center: [5.457278, 51.446996], // starting position [lng, lat]
  zoom: 16 // starting zoom
});

var places = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        'description': 'Strijp-S',
        "marker": "parking",
        "places-total": 50,
        "places-used": 26
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          5.45746922492981,
          51.445281374259274
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        'description': 'Limbeek-Noord',
        "marker": "parking",
        "places-total": 65,
        "places-used": 59
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          5.452394485473633,
          51.44891220207161
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        'description': 'Kastanjelaan',
        "marker": "parking",
        "places-total": 45,
        "places-used": 21
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          5.4595184326171875,
          51.4443385153992
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        'description': 'Beukenlaan',
        "marker": "parking",
        "places-total": 35,
        "places-used": 8
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          5.460162162780762,
          51.44744786979256
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        'description': 'Sparrenstraat',
        "marker": "parking",
        "places-total": 30,
        "places-used": 15
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          5.4545992612838745,
          51.448367261983854
        ]
      }
    }
  ]
};

map.on('load', function () {
  map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', function (error, image) {
    if (error) throw error;
    map.addImage('custom-marker', image);

    map.addSource('places', {
      'type': 'geojson',
      'data': places
    });

    places.features.forEach(function (marker) {
      var ocupied = marker.properties['places-used'];
      var max = marker.properties['places-total'];

      var per = (ocupied / max) * 100;

      var el = document.createElement('div');
      el.className = 'filter_marker';
      el.dataset.percentage = per;

      if (per < 25) {

        el.id = 'groen';
        //el.innerHTML = '<h1 class="percentage">' + per + '</p>';
        el.style.backgroundImage = 'url(assets/mark1.png';

        el.style.width = '80px';
        el.style.height = '80px';

      } else if (per > 25 && per < 50) {

        el.id = 'geel';
        //el.innerHTML = '<h1 class="percentage">' + per + '</p>';
        el.style.backgroundImage =
          'url(assets/mark2.png';

        el.style.width = '80px';
        el.style.height = '80px';

      } else if (per > 50 && per < 75) {

        el.id = 'oranje';
        //el.innerHTML = '<h1 class="percentage">' + per + '</p>';
        el.style.backgroundImage =
          'url(assets/mark3.png';

        el.style.width = '80px';
        el.style.height = '80px';

      } else {

        el.id = 'rood';
        //el.innerHTML = '<h1 class="percentage">' + per + '</p>';
        el.style.backgroundImage =
          'url(assets/mark4.png';

        el.style.width = '80px';
        el.style.height = '80px';

      }
      //var popUpFeatureData = marker;
      let generatedHTML = generateHTML(marker, checkboxState(marker.properties.description));
      //var coordinates = places.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.

      let popup = new mapboxgl.Popup({ className: 'pop-ups' })
        .setHTML(generatedHTML)
        .addTo(map);
        
        popup.on('open', function(){
         
          document.getElementById('animate' + marker.properties.description).classList.add("transform");
          document.getElementById('dataNumber').classList.add("transform");
          setTimeout(function(){
            document.getElementById('animate' + marker.properties.description).style.width = 100 - per + "%";
            document.getElementById('dataNumber').style.left = per + "%";
          }, 20);
          

        });

        popup.on('close', function(){
          if(map.loaded()){
            
          }
        });
      
        
      new mapboxgl.Marker(el)

        .setLngLat(marker.geometry.coordinates)
        .setPopup(popup)
        .addTo(map)
    });
    
   
    

    map.on('click', places, function (e) {

    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
      map.getCanvas().style.cursor = '';
    });
  });
});

function filterwaarde() {
  var back = document.getElementsByClassName()

}
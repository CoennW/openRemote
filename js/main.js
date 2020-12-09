var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}







mapboxgl.accessToken = 'pk.eyJ1IjoibWV0aGhlYWQiLCJhIjoiY2tmeWptMTl1MDc1ODMybnl0cG53d3EzeSJ9.I940A8p4RTwGYKw1mCalWg';


function showMarkers(minValue, maxValue) {
$(".filter_marker").hide().filter(function() {
    var value = parseInt($(this).data("percentage"), 10);
    return value >= minValue && value <= maxValue;
}).show();
}

$(function() {
var options = {
    range: true,
    min: 0,
    max: 100,
    values: [0, 100],
    slide: function(event, ui) {
        var min = ui.values[0],
            max = ui.values[1];

        $("#amount").val("%" + min + " - %" + max);
        showMarkers(min, max);
    }
}, min, max;

$("#slider-range").slider(options);

min = $("#slider-range").slider("values", 0);
max = $("#slider-range").slider("values", 1);

$("#amount").val("%" + min + " - %" + max);

showMarkers(min, max);
});

///////////html and data for popup///////////////
let compareTheseAssets = [];

let generateHTML = (description, checked) => {
  let popupHTML = '<div class="popup-inner">'+
    '            <div class="popup-title">'+
    '                <img src="https://via.placeholder.com/50" alt="">'+
    '                <h2>'+ description +'</h2>'+
    '            </div>'+
    '            <div class="popup-bar">'+
    '                <div class="bar-container">'+
    '                    <div class="bar-inner"></div>'+
    '                  </div>'+
    '            </div>'+
    '            <div class="popup-list">'+
    '                <div class="column" id=column1>'+
    '                    <p>Humidity</p>'+
    '                    <p>Temperature</p>'+
    '                    <p>Manufacturer</p>'+
    '                </div>'+
    '                <div class="column" id=column2>'+
    '                    <p>30</p>'+
    '                    <p>16</p>'+
    '                    <p>Intermo</p>'+
    '                </div>'+
    '            </div> '+
    '            <div class="popup-actions">'+
    '                <div class="compare-container">'+
    '                    <label for="compare">Compare</label>'+
    '                    <input type="checkbox" id="compareCheck" defaultChecked="false" ' + checked + ' name="compare" onclick="compareThisMarker(this, \''+ description + '\')">'+
    '                    <a href="#">View Asset --></a>'+
    '                </div>'+
    '                '+
    ''                +
    '                '+
    '            </div>'+
    '        </div>'+
    '';
        return popupHTML;
  };

var places = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        'description': 'korvel',
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
        'description': 'korvel',
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
        'description': 'korvel',
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
        'description': 'korvel',
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
        'description': 'korvel',
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

var layerIDs = []; // Will contain a list used to filter against.
var filterInput = document.getElementById('filter-input');
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/methhead/ckgp69wdx2g9u19pjy1qx2kqg', // stylesheet location
  center: [5.457278, 51.446996], // starting position [lng, lat]
  zoom: 16 // starting zoom
});


map.on('load', function () {
    map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',function (error, image) {
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

                                    if (per < 25 ){

                                        el.id = 'groen';
                                        el.innerHTML = '<h1 class="percentage">' + per + '</p>';
                                        el.style.backgroundImage = 'url(assets/mark1.png';

                                        el.style.width = '80px';
                                        el.style.height = '80px';

                                    } else if(per > 25 && per < 50) {

                                        el.id = 'geel';
                                        el.innerHTML = '<h1 class="percentage">' + per + '</p>';
                                        el.style.backgroundImage =
                                        'url(assets/mark2.png';

                                        el.style.width = '80px';
                                        el.style.height = '80px';

                                    } else if (per > 50 && per < 75) {

                                        el.id = 'oranje';
                                        el.innerHTML = '<h1 class="percentage">' + per + '</p>';
                                        el.style.backgroundImage =
                                        'url(assets/mark3.png';

                                        el.style.width = '80px';
                                        el.style.height = '80px';

                                    } else{

                                        el.id = 'rood';
                                        el.innerHTML = '<h1 class="percentage">' + per + '</p>';
                                        el.style.backgroundImage =
                                        'url(assets/mark4.png';

                                        el.style.width = '80px';
                                        el.style.height = '80px';

                                    }
                                    

                                    


                                    var description = places.features[0].properties.description;
                            
                                    generatedHTML = generateHTML(description, checkboxState(description));
                                    var coordinates = places.features[0].geometry.coordinates.slice();
                                     
                                    // Ensure that if the map is zoomed out such that multiple
                                    // copies of the feature are visible, the popup appears
                                    // over the copy being pointed to.
                                    
                                    let popup =  new mapboxgl.Popup({className: 'pop-ups'})
                                    .setLngLat(coordinates)
                                    .setHTML(generatedHTML)
                                    .addTo(map);

                                    

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



//////Custom Functions///////

/////Add description to array to stay 'active'
function updateCompareArray(update, description) {
  if (update) {
    compareTheseAssets.push(description);
    console.log(compareTheseAssets);
  } else {
    const index = compareTheseAssets.indexOf(description)
    if (index > -1) {
      compareTheseAssets.splice(index, 1)
    }
    console.log(compareTheseAssets);
  }
};

//////Make compare function visible and handle buttons//////
let compareThisMarker = (checkbox, description) => {
  let compareContainer = document.getElementsByClassName('compare-buttons')[0];
  let compareButtonHTML = '<button class="compare-button asset-button" id="' + description + '">' +
    description +
    '</button>';
  if (checkbox.checked) {
    updateCompareArray(true, description);
    document.getElementById('masterCompareBtn').insertAdjacentHTML("beforebegin",
      compareButtonHTML);
    compareContainer.style.opacity = 1;
    document.getElementById('masterCompareBtn').style.cursor = "pointer";
  } else {
    updateCompareArray(false, description);

    document.getElementById(description).remove();
    if (compareTheseAssets.length == 0) {
      compareContainer.style.opacity = 0.15;
      document.getElementById('masterCompareBtn').style.cursor = "not-allowed";
    }
  }
}

///CHECK the state when popup appears and check it if data says so 
let checkboxState = (description) => {
  if (compareTheseAssets.indexOf(description) !== -1) {
    return 'checked';
  } else {
    return '';
  }
}
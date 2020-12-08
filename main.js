let compareTheseAssets = [];

///////////Init MAP BOX//////////
mapboxgl.accessToken = 'pk.eyJ1IjoibWljcm9taXplIiwiYSI6ImNrZzZhdzhqMzBqM28ycnIwbjl0a2UwaXcifQ.9akSdMIN5QFyZEKn7GWdgQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [5.45495, 51.450631],
    zoom: 16
});

//////Onload/////////////
map.on('load', function () {
//////Load Data///////////
map.addSource('places', {
    'type': 'geojson',
    'data': {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
                'properties': {
                    'description':
                    'Korvel',
                    'icon': 'rocket',
                    'DOM': "HTML"
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [ 5.45495, 51.450631]
                }
            },
            {
            'type': 'Feature',
                'properties': {
                    'description':
                    'Strijp-S',
                    'icon': 'airport',
                    'DOM': "HTML"
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [ 5.45460, 51.450610]
                }
            },
            {
            'type': 'Feature',
                'properties': {
                    'description':
                    'Coen',
                    'icon': 'bicycle',
                    'DOM': "HTML"
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [ 5.45560, 51.450410]
                }
            }
        ]
    }
});

///////////Add layer with Markers///////////////
map.addLayer({
    'id': 'places',
    'type': 'symbol',
    'source': 'places',
    'layout': {
    'icon-image': '{icon}-15',
    'icon-allow-overlap': true
    }
});

////HTML for custom Pop-Up
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
    
//object with assets to compare


// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'places', function (e) {
var description = e.features[0].properties.description;

generatedHTML = generateHTML(description, checkboxState(description));
var coordinates = e.features[0].geometry.coordinates.slice();


// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}

new mapboxgl.Popup({className: 'pop-ups'})
.setLngLat(coordinates)
.setHTML(generatedHTML)
.addTo(map);
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

//////Custom Functions///////
function updateCompareArray (update, description) {
    if(update) {
        compareTheseAssets.push(description);
        console.log(compareTheseAssets);
    } else {
        const index = compareTheseAssets.indexOf(description)
        if (index > -1) { compareTheseAssets.splice(index, 1) }
        console.log(compareTheseAssets);
    }
};

//////Make compare function visible and handle buttons//////
let compareThisMarker = (checkbox, description) => {
    let compareContainer = document.getElementsByClassName('compare-buttons')[0]; 
    let compareButtonHTML = '<button class="compare-button asset-button" id="'+description+'">'+
                            description + 
                            '</button>';
    if(checkbox.checked){
        updateCompareArray(true, description);
        document.getElementById('masterCompareBtn').insertAdjacentHTML("beforebegin", 
            compareButtonHTML); 
            compareContainer.style.opacity = 1; 
            document.getElementById('masterCompareBtn').style.cursor = "pointer";
    } else { 
        updateCompareArray(false, description);
        
        document.getElementById(description).remove();
        if(compareTheseAssets.length == 0){
            compareContainer.style.opacity  = 0.15; 
            document.getElementById('masterCompareBtn').style.cursor = "not-allowed";
        }
    }
}

let checkboxState = (description) => {
    if(compareTheseAssets.indexOf(description) !== -1) {
        return 'checked';
    } else {
        return '';
    }
}

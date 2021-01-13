function fetchJSON(url) {
  return fetch(url)
    .then(function(response) {
      return response.json();
    });
}

var places = fetchJSON('./json/parking.geojson')
            .then(function(places) {

              map.on('load', function () {

                  places.features.forEach(function (marker) {

                    var soort = marker.properties['asset'];
                    var ocupied = marker.properties['places_used'];
                    var max = marker.properties['places_total'];
                    let x;
                    var per = (ocupied / max) * 100;

                    var el = document.createElement('div');
                    el.className = 'filter_marker';
                    el.dataset.percentage = per;

                    if (per < 25) {

                      el.id = 'groen';
                      //el.innerHTML = '<h1 class="percentage">' + per + '</p>';
                        el.style.backgroundImage = 'url(assets/'+ soort + '1.png';
                        x = 'assets/'+ soort + '1.png';
                      el.style.width = '80px';
                      el.style.height = '80px';

                    } else if (per > 25 && per < 50) {

                      el.id = 'geel';
                      //el.innerHTML = '<h1 class="percentage">' + per + '</p>';
                  el.style.backgroundImage = 'url(assets/'+ soort + '2.png';
                      x = 'assets/'+ soort + '2.png';
                      el.style.width = '80px';
                      el.style.height = '80px';

                    } else if (per > 50 && per < 75) {

                      el.id = 'oranje';
                      //el.innerHTML = '<h1 class="percentage">' + per + '</p>';
                  el.style.backgroundImage = 'url(assets/'+ soort + '3.png';
                      x = 'assets/'+ soort + '3.png';
                      el.style.width = '80px';
                      el.style.height = '80px';

                    } else {

                      el.id = 'rood';
                      //el.innerHTML = '<h1 class="percentage">' + per + '</p>';
                      el.style.backgroundImage = 'url(assets/'+ soort + '4.png';
                      x = 'assets/'+ soort + '4.png';
                      el.style.width = '80px';
                      el.style.height = '80px';

                    }
                    
                    
                    //var popUpFeatureData = marker;
                    let generatedHTML = generateHTML(marker, checkboxState(marker.properties.description), x);
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




                    new mapboxgl.Marker(el)

                      .setLngLat(marker.geometry.coordinates)
                      .setPopup(popup)
                      .addTo(map)
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

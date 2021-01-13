function fetchJSON(url) {
  return fetch(url)
    .then(function(response) {
      return response.json();
    });
}

var places = fetchJSON('./json/ozon.geojson')
            .then(function(places) {

              map.on('load', function () {

                  places.features.forEach(function (marker) {

                    var soort = marker.properties['asset'];
                    var ozonlevel = marker.properties['level'];
                    var maxozon = 120;
                    let x;
                        var per = (ozonlevel / maxozon) * 100;

                    var el = document.createElement('div');
                    el.className = 'filter_marker';


                    if (ozonlevel < 50) {

                      el.id = 'groen';
                      //el.innerHTML = '<h1 class="percentage">' + per + '</p>';
                        el.style.backgroundImage = 'url(assets/'+ soort + '1.png';
                      x = 'assets/'+ soort + '1.png';
                      el.style.width = '80px';
                      el.style.height = '80px';

                    } else if (ozonlevel > 50 && ozonlevel < 70) {

                      el.id = 'geel';
                      //el.innerHTML = '<h1 class="percentage">' + per + '</p>';
                  el.style.backgroundImage = 'url(assets/'+ soort + '2.png';
                  x = 'assets/'+ soort + '2.png';
                      el.style.width = '80px';
                      el.style.height = '80px';

                    } else if (ozonlevel > 70 && ozonlevel < 80) {

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

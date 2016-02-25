function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map($('#map')[0], {
    zoom: 10,
    center: {lat: 37.76, lng: -122.42},
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false
  });
  directionsDisplay.setMap(map);

  var onChangeHandler = function(event) {
    event.preventDefault();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  $('#search').click(onChangeHandler);
  $('#search-form').submit(onChangeHandler);

  var radius = 5;
  var blueCircle = {
    path: 'M -' + (0/2) + ', -' + (0/2) + ' m -' + radius + ', 0 a ' + radius + ',' + radius + ' 0 1,0 ' + (2*radius) + ',0 a ' + radius + ',' + radius + ' 0 1,0 -' + (2*radius) + ',0',
    fillColor: '#4285f4',
    fillOpacity: 1,
    scale: 1.2,
    strokeColor: 'white',
    strokeWeight: 2
  };

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };

  //     map.setCenter(pos);
  //     map.setZoom(20);
  //     var marker = new google.maps.Marker({
  //       position: pos,
  //       icon: blueCircle,
  //       map: map
  //     });
  //   }, function() {
  //     // handleLocationError(true, infoWindow, map.getCenter());
  //   });
  // } else {
  //   // handleLocationError(false, infoWindow, map.getCenter());
  // }

  var startInput = $('#start')[0];
  var endInput = $('#end')[0];

  var startAC = new google.maps.places.Autocomplete(startInput);
  var endAC = new google.maps.places.Autocomplete(endInput);
  startAC.bindTo('bounds', map);
  endAC.bindTo('bounds', map);
}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: $('#start').val(),
    destination: $('#end').val(),
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      // console.log(response);
      var distance = response.routes[0].legs[0].distance;
      var duration = response.routes[0].legs[0].duration;
      getFareEstimate(response.routes[0].legs[0].start_location.lat(),
                      response.routes[0].legs[0].start_location.lng(),
                      response.routes[0].legs[0].end_location.lat(),
                      response.routes[0].legs[0].end_location.lng()
                    );
      directionsDisplay.setDirections(response);
    } else {
      console.log('Directions request failed due to ' + status);
    }
  });
}
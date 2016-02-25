var SERVER_TOKEN = 'O8ENYIg16poyg1lysoEPrN1VAqcL1vWadlCVDbfv'

function getFareEstimate(startLat,startLng,endLat,endLng) {
  $.ajax({
    url: 'https://api.uber.com/v1/estimates/price',
    type: 'GET',
    headers: {
      Authorization: 'Token ' + SERVER_TOKEN
    },
    data: {
      start_latitude: startLat.toFixed(6),
      start_longitude: startLng.toFixed(6),
      end_latitude: endLat.toFixed(6),
      end_longitude: endLng.toFixed(6)
    },
    success: function(data) {
      // console.log(data.prices);
      data.prices.forEach(function(d) {
        console.log(d.localized_display_name + ": " + d.estimate);
      });
    }
  });
}
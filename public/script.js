// Check for geolocation support
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(sendLocationToServer, showError);
} else {
  alert("Geolokasi tidak didukung oleh perangkat Anda.");
}

// Function to send latitude and longitude to the server
function sendLocationToServer(pos) {
  const latitude = pos.coords.latitude;
  const longitude = pos.coords.longitude;

  // Create an object with the data to be sent
  const locationData = {
    latitude: latitude,
    longitude: longitude,
  };

  // Send a POST request to the server
  fetch('/server', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(locationData),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Location data sent to the server.');
      } else {
        console.error('Failed to send location data to the server.');
      }
    })
    .catch((error) => {
      console.error('Error sending location data:', error);
    });

  // Display latitude and longitude on the webpage
  const latitudeElement = document.getElementById('latitude');
  const longitudeElement = document.getElementById('longitude');
  latitudeElement.textContent = latitude;
  longitudeElement.textContent = longitude;

  // Hide the splash screen and show the content
  const splashScreen = document.getElementById('splash-screen');
  const content = document.getElementById('content');
  splashScreen.style.display = 'none';
  content.style.display = 'block';
}

// Function to handle geolocation errors
function showError(error) {
  alert(`Error: ${error.message}`);
}

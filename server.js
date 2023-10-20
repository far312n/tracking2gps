const express = require('express');
const requestIp = require('request-ip');
const fs = require('fs');
const app = express();
const port = 3000;
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

app.use(express.json());
app.use(express.static('public'));

// Define a route to handle geolocation data and save it to a text file
app.post('/server', (req, res) => {
  const clientIp = requestIp.getClientIp(req)
  const { latitude, longitude } = req.body;
  const data = `Latitude: ${latitude}, Longitude: ${longitude}, Maps: http://maps.google.com/maps?z=12&t=m&q=loc:${latitude}+${longitude}\n`;

  // Append data to a text file
  // fs.appendFile('my-location.txt', data, (err) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).send('Error saving location data to file');
  //   } else {
  //     console.log('Location data saved to file.');
  //     res.status(200).send('Location data saved to file.');
  //   }
  // });

  s3.putObject({
      Body: JSON.stringify({key:"value"}),
      Bucket: "cyclic-inquisitive-elk-bonnet-ap-northeast-1",
      Key: "my-location.txt",
  }).promise()
});

port == process.env.port || port

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

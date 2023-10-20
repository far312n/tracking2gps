const express = require('express');
const requestIp = require('request-ip');
const fs = require('fs');
const app = express();
const port = 3000;
const AWS = require("aws-sdk");
const s3 = new AWS.S3()
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.static('public'));
// curl -i https://some-app.cyclic.app/myFile.txt
app.get('*', async (req,res) => {
  let filename = req.path.slice(1)

  try {
    let s3File = await s3.getObject({
      Bucket: process.env.BUCKET,
      Key: filename,
    }).promise()

    res.set('Content-type', s3File.ContentType)
    res.send(s3File.Body.toString()).end()
  } catch (error) {
    if (error.code === 'NoSuchKey') {
      console.log(`No such key ${filename}`)
      res.sendStatus(404).end()
    } else {
      console.log(error)
      res.sendStatus(500).end()
    }
  }
})


// curl -i -XPUT --data '{"k1":"value 1", "k2": "value 2"}' -H 'Content-type: application/json' https://some-app.cyclic.app/myFile.txt
app.put('*', async (req,res) => {
  let filename = req.path.slice(1)

  console.log(typeof req.body)

  await s3.putObject({
    Body: JSON.stringify(req.body),
    Bucket: process.env.BUCKET,
    Key: filename,
  }).promise()

  res.set('Content-type', 'text/plain')
  res.send('ok').end()
})

// curl -i -XDELETE https://some-app.cyclic.app/myFile.txt
app.delete('*', async (req,res) => {
  let filename = req.path.slice(1)

  await s3.deleteObject({
    Bucket: process.env.BUCKET,
    Key: filename,
  }).promise()

  res.set('Content-type', 'text/plain')
  res.send('ok').end()
})

// /////////////////////////////////////////////////////////////////////////////
// Catch all handler for all other request.
app.use('*', (req,res) => {
  res.sendStatus(404).end()
})

// Define a route to handle geolocation data and save it to a text file
app.post('/server', (req, res) => {
  const clientIp = requestIp.getClientIp(req)
  const { latitude, longitude } = req.body;
  const data = `Latitude: ${latitude}, Longitude: ${longitude}, Maps: http://maps.google.com/maps?z=12&t=m&q=loc:${latitude}+${longitude}\n`;

  // Append data to a text file
  fs.appendFile('my-location.txt', data, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving location data to file');
    } else {
      console.log('Location data saved to file.');
      res.status(200).send('Location data saved to file.');
    }
  });
});

port == process.env.port || port

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

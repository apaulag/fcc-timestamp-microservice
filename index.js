const express = require('express');
const app = express();

// used for remote testing
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// if no timestamp provided, defaults to current time
app.get("/api", (req, res) => {
  const timestamp = Date.now();
  res.redirect(`/api/${timestamp}`)
});

// endpoint to process timestamp
app.get("/api/:timestamp", (req, res) => {
  const timestamp = Date.parse(req.params.timestamp) || new Number(req.params.timestamp);
  if (isNaN(timestamp)) {
    res.status(400).json({'error': 'Invalid Date'})
  } else {
    const date = new Date(timestamp);
    res.json({
      'unix': date.valueOf(),
      'utc': date.toUTCString(),
    });
  }
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

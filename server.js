const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  
const bluEth = require('./utils/bluEth');

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/tappy",
  {
    useMongoClient: true
  }
);

require("./routes/api-routes")(app);

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
    bluEth.ble();
});

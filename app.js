const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const { stringify } = require("querystring");

const app = express();
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: "true" }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const fName = req.body.Fname;
  const lName = req.body.Lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };
  const jsonData = stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/ee58b0d8b3";

  const option = {
    method: "POST",
    auth: "hackur777:d891263c028e75dfbfc890bdf29c37b1-us8"
  }

  const request = https.request(url, option, function (response) {
    response.on("data", function (data) {  
      console.log(JSON.parse(data));
    });
  })

  request.write();
  request.end();
});

app.listen(3000, function () {
  console.log("This server is running on 3000");
});

// list id
// 

// api key
// 

// api url
// 
// "https://$API_SERVER.api.mailchimp.com/3.0/lists/$list_id/members/$subscriber_hash"
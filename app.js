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

app.post("/success", function (req, res) {
  res.redirect("/");
});
app.post("/failure", function (req, res) {
  res.redirect("/");
});



app.post("/", function (req, res) {
  const fName = req.body.Fname;
  const lName = req.body.Lname;
  const email = req.body.emailId;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  console.log(jsonData);
  const url = "https://us8.api.mailchimp.com/3.0/lists/ee58b0d8b3";

  const option = {
    method: "POST",
    auth: "rohit4100:010404c78701dbdd9d0839d755d1b699-us8"
  }

  const request = https.request(url, option, function (response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  })

  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("This server is running on 3000");
});

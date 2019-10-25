var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

require("dotenv").config();
const sgMail = require("@sendgrid/mail");
var fs = require("fs");
var template = fs.readFileSync("./Email.html", "utf-8");

var app = express();

// template

app.use(express.json());
//app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.get("/", (req, res) => {
  console.log("serving html");
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.post("/send", (req, res) => {
  console.log(req.body);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: req.body.email,
    from: "SendMail@mailapp.com",
    subject: "Reset Password",
    html: template
  };
  sgMail.send(msg, err => {
    if (!err) console.log("message sent");
    else console.log("message not sent");
  });
  res.send();
});

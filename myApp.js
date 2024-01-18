let express = require("express");
let app = express();
let absolutePath = __dirname + "/views/index.html";
let bodyParser = require("body-parser");
// const mySecret = process.env['MESSAGE_STYLE'];

// #2
// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });

// #8
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  },
);

// #7
app.get("/json", (req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// #3
app.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

// #4
app.use("/public", express.static(__dirname + "/public"));

// #10
app.use(bodyParser.urlencoded({ extended: false }));

// #5
app.get("/json", function (req, res) {
  if (process.env["MESSAGE_STYLE"] === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

// #1
console.log("Hello World");

// #9
app.get("/:word/echo", function (req, res) {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

// #11 and #12
app
  .route("/name")
  .get((req, res) => {
    res.json({ name: req.query.first + " " + req.query.last });
  })
  .post((req, res) => {
    res.json({ name: req.body.first + " " + req.body.last });
  });

module.exports = app;

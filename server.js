const express         = require("express");
const path            = require("path");
const mustsacheExpress = require("mustache-express");
const morgan          = require("morgan");
const routes          = require("./routes/index");
const bodyParser      = require("body-parser");
const epressValidator = require("express-validator");
const session         = require("express-session");

const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("views engine", "mustache");
app.set("layout", "layout");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(morgan("dev"));
app.use(session());

app.use(routes);

app.listen(3000, function(){
  console.log("App is Mobbinbobbin on localhost:3000");
})

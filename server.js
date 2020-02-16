// GRAB THE PACKAGES/VARIABLES WE NEED
// ==================================================
var express = require("express");
var app = express();
var ig = require("instagram-node").instagram();
const PORT = process.env.PORT || 5000;
// CONFIGURE THE APP
// ==================================================
// tell node where to look for site resources
app.use(express.static(__dirname + "/public"));
// set the view engine to ejs
app.set("view engine", "ejs");
// configure instagram app with your access token
// we'll get to this soon
// SET THE ROUTES
// ===================================================
// home page route - our profile's images
// home page route - popular images
app.get("/", function(req, res) {
  // use the instagram package to get popular media
  ig.user_self_media_recent(function(
    err,
    medias,
    pagination,
    remaining,
    limit
  ) {
    ig.user("2095860555", function(err, result, remaining, limit) {
      // render the home page and pass in the popular images
      res.render("pages/index", { grams: medias, user: result });
    });
  });
});

// configure instagram app with your access_token
ig.use({
  // get access token here: http://instagram.pixelunion.net/
  access_token: process.env.ACCESS_TOKEN
});

// START THE SERVER
// ==================================================
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// Load dependencies for file uploading to DO
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint("nyc3.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

// Image upload middleware
// Change bucket property to your Space name
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "1410",
    acl: "public-read",
    key: function(request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    }
  })
}).array("upload", 1);

module.exports = {
  index(req, res) {
    console.log("backend hit");
    upload(req, res, function(error) {
      if (error) {
        console.log(error);
        return res.redirect("/error");
      }
      console.log("File uploaded successfully.");
      res.redirect("/success");
    });
  }
};
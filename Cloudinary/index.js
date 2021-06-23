
  const express = require("express");
  const app = express();
  const cloudinary = require("cloudinary").v2;
  const bodyParser = require('body-parser');
  const multer = require("multer")
  
  // body parser configuration
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const fileUpload = require('express-fileupload');
  app.use(fileUpload({
    createParentPath: false
    }));

  // cloudinary configuration
  cloudinary.config({
    cloud_name: "shivanshguptacloud",
    api_key: "543595831799215",
    api_secret: "sPKtDhrbnaBTcIqrVdMtKIqj6Lc"
  });
  app.listen(3000,()=>{
      console.log("Server is running")
  })
  app.get("/", (request, response) => {
    response.sendFile(__dirname+"/index.html")
 
  });
  
  // image upload API
  app.post("/image-upload", (req,res) => {
var file = req.files.file
var uploadPath = __dirname + '/images/' + file.name;
file.mv(uploadPath, function(err) {
    if (err)
    return res.status(500).send(err);
    
    res.send('File uploaded!');
    });
    


// collected image from a user
    console.log(req.files.file)
    const data = {
      image: req.files.file,
    }

    // upload image here
    cloudinary.uploader.upload(uploadPath)
    .then((result) => {
        res.status(200).send({
        message: "success",
        result,
      });
    }).catch((error) => {
        res.status(500).send({
        message: "failure",
        error,
      });
    });

});

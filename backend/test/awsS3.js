const AWS = require("aws-sdk");
const { log } = require("console");
// name of your bucket here
const soundwavevs = "soundwavevs";

const multer = require("multer");
const path = require("path");

//  make sure to set environment variables in production for:
//  AWS_ACCESS_KEY_ID
//  AWS_SECRET_ACCESS_KEY
//  and aws will automatically use those environment variables

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// --------------------------- Public UPLOAD ------------------------

const singlePublicFileUpload = async (file) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require("path");
  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: soundwavevs,
    Key,
    Body: buffer,
    ACL: "public-read",
  };
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Location;
};

const multiplePublicFileUpload = async (files) => {
  return await Promise.all(
    files.map((file) => {
      return singlePublicFileUpload(file);
    })
  );
};

// --------------------------- Prviate UPLOAD ------------------------

const singlePrivateFileUpload = async (file) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require("path");
  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: soundwavevs,
    Key,
    Body: buffer,
  };
  const result = await s3.upload(uploadParams).promise();

  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Key;
};

const multiplePrivateFileUpload = async (files) => {
  return await Promise.all(
    files.map((file) => {
      return singlePrivateFileUpload(file);
    })
  );
};

const retrievePrivateFile = (key) => {
  let fileUrl;
  if (key) {
    fileUrl = s3.getSignedUrl("getObject", {
      Bucket: soundwavevs,
      Key: key,
    });
  }
  return fileUrl || key;
};

// --------------------------- Storage ------------------------

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);

  },
});

const singleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).single(nameOfKey);

const multipleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).array(nameOfKey);


const imageStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, 'images')); // Destination directory for storing image files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Filename for the image file
  },
  limits: {
    fieldSize: 1024 * 1024 * 5 // Increase the field size limit to 5 MB (adjust as needed)
  }
});


const imageUpload = (nameOfKey) => multer({ storage: imageStorage }).single(nameOfKey);

module.exports = {
  s3,
  singlePublicFileUpload,
  multiplePublicFileUpload,
  singlePrivateFileUpload,
  multiplePrivateFileUpload,
  retrievePrivateFile,
  singleMulterUpload,
  multipleMulterUpload,
  imageUpload
};

const User = require("../model/user");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const mimeTypes = require("mimetypes");
exports.authenticate = (req, res, next) => {
  const token = req.header("x-auth");
  User.findByToken(token)
    .then((user) => {
      if (!user) return res.status(400).json("Unauthorized");
      req.user = user;
      req.token = token;
      next();
    })
    .catch(() => res.status(401).json({ message: "invalid token" }));
};

exports.adminAuth = (req, res, next) => {
  const token = req.header("x-auth");
  User.findByToken(token)
    .then((user) => {
      if (!user && user.role !== "ADMIN")
        return res.status(400).json("Unauthorized");
      req.user = user;
      req.token = token;
      next();
    })
    .catch(() => res.status(401).json({ message: "invalid token" }));
};

exports.upload = (req, res, next) => {
  const buffer = req.body.file;

  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: "train",
    },
    (error, result) => {
      if (result) {
        console.log(result);
        req.body.file = result.secure_url;
        next();
      } else {
        return res.status(400).json({ message: error });
      }
    }
  );
  streamifier.createReadStream(buffer).pipe(uploadStream);

  // const file = req.body.file;
  // const mimeType = file.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).,./)[1];
  // let newFileName = `${uuidv4()}.${mimeTypes.detectExtension(mimeType)}`;
  // const base64Data = file.replace(/^data:image\/png;base64,/, "");
  // const imageBuffer = new Buffer.from(base64Data, "base64");

  // fs.writeFile(`public/${uuidv4()}.png`, imageBuffer, (err) => {
  //   if (err) return res.status(400).json({ message: err.message });
  //   req.body.file = `${process.env.CLIENT_BASE_URL}/public/${newFileName}`;
  //   next();
  // });
};
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// ------------------------------------------------------

const dotenv = require("dotenv");
const multer = require("multer");
const crypto = require("crypto");
// const sharp = require("sharp");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

dotenv.config();

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ------------------------------------------------------

exports.getAllPics = catchAsync(async (req, res) => {
  const users = await User.find();
  console.log(users);

  for (const user of users) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: user.repImg,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    user.imgUrl = url;
  }

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getProf = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId);

  const getObjectParams = {
    Bucket: bucketName,
    Key: user.repImg,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  user.imgUrl = url;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

(exports.upload = upload.single("repImg")),
  (request, response, next) => {
    next();
  };

exports.uploadImgs = catchAsync(async (req, res) => {
  if (!req.body.user) req.body.user = req.params.userId;
  const userId = req.params.userId;

  console.log(req.params.userId);

  // const buffer = await sharp(req.file.buffer)
  //   .resize({ height: 1920, width: 1080, fit: "contain" })
  //   .toBuffer();

  const imgName = randomImageName();

  const params = {
    Bucket: bucketName,
    Key: imgName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      repImg: imgName,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

// -------------------------------------------------------

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  console.log(users);

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  if (req.body.role) {
    return next(new AppError("Unauthorized cannot change role", 401));
  }

  // 2. Update user document
  console.log(req.user);
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  // 3. Send back the updated user
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const userDoc = await User.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: userDoc,
  });
});

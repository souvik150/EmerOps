const Report = require("./../models/reportModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

// -------------------------------

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

// --------------------------

exports.getAllReports = catchAsync(async (req, res) => {
  const reports = await Report.find({ user: req.params.userId });

  for (const report of reports) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: report.repImg,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    report.imgUrl = url;
  }

  res.status(200).json({
    status: "success",
    results: reports.length,
    data: {
      reports,
    },
  });
});

(exports.upload = upload.single("repImg")),
  (request, response, next) => {
    next();
  };

exports.uploadReports = catchAsync(async (req, res) => {
  if (!req.body.user) req.body.user = req.params.userId;

  console.log(req.params.userId);

  // const buffer = await sharp(req.file.buffer)
  // .resize({ height: 1920, width: 1080, fit: "contain" })
  // .toBuffer();

  const imgName = randomImageName();

  const params = {
    Bucket: bucketName,
    Key: imgName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  const report = await Report.create({
    repImg: imgName,
    user: req.body.user,
  });

  res.status(200).json({
    status: "success",
    data: {
      report,
    },
  });
});

exports.getReport = catchAsync(async (req, res, next) => {
  const report = await Report.findById(req.params.id);

  res.status(200).json({
    ststus: "success",
    data: report,
  });
});

exports.updateReport = catchAsync(async (req, res, next) => {
  const filter = { _id: req.params.id };
  const update = req.body;

  let doc = await Report.findOneAndUpdate(filter, update, {
    returnOriginal: false,
  });
  console.log(doc);

  res.status(200).json({
    status: "success",
  });
});

exports.deleteReport = catchAsync(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const report = await Report.findById(id);
  ``;
  if (!report) {
    res.status(404).send("Post not found");
    return;
  }

  const params = {
    Bucket: bucketName,
    Key: report.repImg,
  };
  const command = new DeleteObjectCommand(params);
  await s3.send(command);

  await Report.findByIdAndDelete(id);

  res.send({
    status: 204,
  });
});

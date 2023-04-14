const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const BUCKET = process.env.AWS_BUCKET;
const PREFIX_GIF = "name/gifs";
const paramsGif = {
  Bucket: BUCKET,
  Prefix: PREFIX_GIF,
};

const PREFIX_FONTS = "name/fonts";
const paramsFonts = {
  Bucket: BUCKET,
  Prefix: PREFIX_FONTS,
};

exports.getFonts = async (req, res, next) => {
  const s3Objects = await s3.listObjects(paramsFonts).promise();
  const fontURLsByFolder = {};

  s3Objects.Contents.forEach((obj) => {
    const [folder, file] = obj.Key.replace(PREFIX_FONTS, "")
      .split("/")
      .filter((url) => url !== "");

    if (file?.includes(".otf") || file?.includes(".ttf")) {
      const fontProperty = file.split(".")[0].replace("-", "");

      const fontURL = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${PREFIX_FONTS}/${folder}/${file}`;

      if (!fontURLsByFolder[folder]) {
        fontURLsByFolder[fontProperty];
      }

      fontURLsByFolder[fontProperty] = fontURL;
    }
  });

  try {
    res.send({ fontURLs: fontURLsByFolder });
  } catch (err) {
    next(err);
  }
};

exports.getGifs = async (req, res, next) => {
  const s3Objects = await s3.listObjects(paramsGif).promise();

  const gifURLs = [];

  s3Objects.Contents.forEach((obj) => {
    const [, file] = obj.Key.replace(PREFIX_GIF, "").split("/");

    if (file.includes(".json")) {
      gifURLs.push(
        `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${PREFIX_GIF}/${file}`,
      );
    }
  });

  try {
    res.send({ result: "ok", gifURLs });
  } catch (err) {
    next(err);
  }
};

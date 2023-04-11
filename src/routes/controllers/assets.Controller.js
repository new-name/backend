const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const BUCKET = process.env.AWS_BUCKET;
const PREFIX = "name/gifs";
const params = {
  Bucket: BUCKET,
  Prefix: PREFIX,
};

exports.getImages = async (req, res, next) => {
  try {
    res.send({ result: "ok" });
  } catch (err) {
    next(err);
  }
};

exports.getGifs = async (req, res, next) => {
  const s3Objects = await s3.listObjects(params).promise();

  const gifURLs = [];

  s3Objects.Contents.forEach((obj) => {
    const [, file] = obj.Key.replace(PREFIX, "").split("/");

    if (file.includes(".json")) {
      gifURLs.push(
        `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${PREFIX}/${file}`,
      );
    }
  });

  try {
    res.send({ result: "ok", gifURLs });
  } catch (err) {
    next(err);
  }
};

const GIFEncoder = require("gif-encoder-2");
const fs = require("fs");
const sharp = require("sharp");

exports.makeGif = async (req, res, next) => {
  const { encodedFrames, fps, width, height } = req.body;

  try {
    const encoder = new GIFEncoder(Math.round(width), Math.round(height));
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(1000 / fps);

    for (const frame of encodedFrames) {
      const buffer = Buffer.from(frame.split(",")[1], "base64");
      const { data, info } = await sharp(buffer)
        .resize(Math.round(width), Math.round(height), {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });

      if (
        info.width !== Math.round(width) ||
        info.height !== Math.round(height)
      ) {
        console.error(
          `Skipping frame with invalid dimensions: ${info.width}x${info.height}`,
        );
        continue;
      }

      encoder.addFrame(data);
    }

    encoder.finish();
    const gifBuffer = encoder.out.getData();
    fs.writeFileSync("output.gif", gifBuffer);

    res.set("Content-Type", "image/gif");
    res.send({ base64Gif: gifBuffer.toString("base64") });
  } catch (err) {
    console.error("Error processing GIF:", err);
    res
      .status(500)
      .send({ error: "An error occurred while processing the GIF." });
  }
};

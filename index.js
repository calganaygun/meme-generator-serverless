import { api, storage, data, schedule, params } from "@serverless/cloud";
import cors from "cors";
import Jimp from "jimp";
import meme_generator from "./meme_generator.js";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const MAX_AGE_IN_DAYS = parseInt(params.MAX_AGE_IN_DAYS);

const corsOptions = {
     origin: '*',
     optionsSuccessStatus: 200
}

api.use(cors(corsOptions));

api.get("/generate", async (req, res) => {
  if (req.query.image == false) {
    res.send("Please provide an image URL");
    return;
  }
  const isStored = Object.keys(req.query).includes("upload")
  console.log(
    `[MEME] ${req.query.image} - ${req.query.top} - ${req.query.bottom} - Type: ${isStored ? "stored" : "just generated"}`
  );
  try {
    const image = await meme_generator(
      req.query.top,
      req.query.bottom,
      req.query.image
    );

    if (isStored) {
      const endDate = dayjs().add(MAX_AGE_IN_DAYS, "day").format("YYYY-MM-DD");
      const uuid = uuidv4();
      const fileName = `${uuid}.jpg`;
      await storage.write(
        "/memes/" + fileName,
        await image.getBufferAsync(Jimp.MIME_JPEG),
        { type: "image/jpeg" }
      );

      await data.set("storageItem:" + uuid, "/memes/" + fileName, {
        label1: endDate,
      });
      res.send({ url: params.CLOUD_URL + "/meme/" + uuid + ".jpg", expire_in: MAX_AGE_IN_DAYS + " days."});
      return;
    }
    res
      .set("Content-type", "image/jpeg")
      .send(await image.getBufferAsync(Jimp.MIME_JPEG));
  } catch (error) {
    console.error(error);
    res.send({
      message: "Something went wrong while creating image",
      error: error,
    });
  }
});

api.get("/meme/:uuid_image", async (req, res) => {
  if (req.params.uuid_image === undefined) {
    res.status(400).send("Please provide an meme URL.");
    return;
  }

  const uuid = req.params.uuid_image.split(".")[0];
  const storagePath = await data.get("storageItem:" + uuid);
  if (storagePath) {
    res
      .set("Content-type", "image/jpeg")
      .send(await storage.readBuffer(storagePath));
    return;
  }
  res.status(404).send("Meme does not exist or deleted.");
  return;
});

schedule.every("1 day", async () => {
  const today = dayjs().format("YYYY-MM-DD");
  // label1 is the label for the end date.
  const dueItems = await data.getByLabel("label1", today);
  dueItems.items.forEach(async (item) => {
    await storage.remove(item.value);
    await data.remove(item.key);
    console.log(`[DELETE] ${item.key}`);
  });
});

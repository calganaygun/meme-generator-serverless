import Jimp from "jimp";
import fetch from "node-fetch";

export default async (top_text, bottom_text, bg_image_url) => {
    const resp = await fetch(bg_image_url);
    const buff = await resp.buffer();
    const image = await Jimp.read(buff);

    if (image.bitmap.height < 100 || image.bitmap.width < 100) {
        image.scale(10);
    }

    const TOP_POS = 5;
    const BOTTOM_POS = image.bitmap.height - 90;

    const font = await Jimp.loadFont("./fonts/impact_for_meme.fnt");

    image.print(
        font,
        0,
        TOP_POS,
        {
        text: top_text.toUpperCase(),
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        },
        image.bitmap.width,
        image.bitmap.height
    );

    image.print(
        font,
        0,
        BOTTOM_POS,
        {
        text: bottom_text.toUpperCase(),
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        },
        image.bitmap.width,
        image.bitmap.height
    );
    
    return image;
}
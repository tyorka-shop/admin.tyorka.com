import path from "path";
import sharp, { Region } from "sharp";
import { IMAGE_SIZES } from "../consts";
import { Crop } from "../types/Crop";

interface Box {
  width: number;
  height: number;
}

const cropSingle = async (filename: string, width: number, region: Region) => {
  const { dir, name, ext } = path.parse(filename);
  const outputFilename = path.join(dir, `${name}_square_${width}${ext}`);

  return sharp(filename, { failOnError: false })
    .extract(region)
    .resize({
      width,
      height: width,
      position: "centre",
      fit: "cover",
    })
    .toFile(outputFilename);
};

export const getRegion = (box: Box, cropParams?: Crop): Region | undefined => {
  if (!cropParams) {
    return;
  }
  const { factor, anchor } = cropParams;
  const f = (box.width / factor) * 100;
  const region: Region = {
    width: Math.round(f),
    height: Math.round(f),
    left: Math.round(-anchor.x * f),
    top: Math.round(-anchor.y * f),
  };

  if (
    region.left < 0 ||
    region.left + region.width > box.width ||
    region.top < 0 ||
    region.top + region.height > box.height
  ) {
    console.log("  box =", box);
    console.log("  region =", region);
    return;
  }
  return region;
};

export const crop = async (filename: string, cropParams?: Crop) => {
  const meta = await sharp(filename).metadata();
  const box = {
    width: meta.width!,
    height: meta.height!,
  };

  const region = getRegion(box, cropParams);

  if (!region) {
    console.log("  used `centre` region");
  }

  return Promise.all(
    IMAGE_SIZES.map(async (width) =>
      cropSingle(filename, width, region || { left: 0, top: 0, ...box }).catch(
        (e) => {
          console.error(e.message);
          console.error("  box =", box);
          console.error("  region =", region);
        }
      )
    )
  );
};

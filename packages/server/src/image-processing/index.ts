import fs from 'fs';
import path from "path";
import sharp from "sharp";
import { IMAGE_SIZES } from "../consts";

const resizeSingle = async (filename: string, width: number, skipExisting = false) => {
  const { dir, name, ext } = path.parse(filename);
  const outputFilename = path.join(dir, `${name}_${width}${ext}`);
  if(skipExisting && fs.existsSync(outputFilename)){
    return;
  }
  return sharp(filename, { failOnError: false })
    .resize({ width })
    .toFormat("jpg", { quality: 95 })
    .toFile(outputFilename);
};

export const resize = async (filename: string, skipExisting = false) =>
  Promise.all(IMAGE_SIZES.map((width) => resizeSingle(filename, width, skipExisting)));

export const getMeta = async (filename: string) => {
  const meta = await sharp(filename).metadata();

  return {
    width: meta.width!,
    height: meta.height!,
    dominantColor: await getDominantColor(filename),
  };
};

export const getDominantColor = async (filename: string) => {
  const stats = await sharp(filename).stats();

  return rgbToHex(stats.dominant!);
};

interface Color {
  r: number;
  g: number;
  b: number;
}

const rgbToHex = ({ r, g, b }: Color) =>
  "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

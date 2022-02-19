import fs from "fs";
import path from "path";
import sharp from "sharp";

const resizeSingle = async (filename: string, width: number) => {
  const { dir, name, ext } = path.parse(filename);
  const outputFilename = path.join(dir, `${name}_${width}${ext}`);
  return sharp(filename, { failOnError: false })
    .resize({ width })
    .toFile(outputFilename);
};

export const resize = async (filename: string, widths: number[]) =>
  Promise.all(widths.map((width) => resizeSingle(filename, width)));

export const getSize = async (filename: string) => {
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

export const crop_depr = (filename: string, size: number): Promise<string> =>
  new Promise((resolve, reject) => {
    const transformer = sharp().resize({
      width: size,
      height: size,
      position: "centre",
      fit: "cover",
    });
    const readable = fs.createReadStream(filename);

    const { dir, name, ext } = path.parse(filename);

    const outputFilename = path.join(dir, `${name}_${size}${ext}`);

    const writable = fs.createWriteStream(outputFilename);

    readable
      .pipe(transformer)
      .pipe(writable)
      .on("close", () => resolve(outputFilename))
      .on("error", reject);
  });

const cropSingle = (filename: string, width: number) => {
  const { dir, name, ext } = path.parse(filename);
  const outputFilename = path.join(dir, `${name}_${width}${ext}`);
  return sharp(filename, { failOnError: false })
    .resize({
      width,
      height: width,
      position: "centre",
      fit: "cover",
    })
    .toFile(outputFilename);
};

export const crop = (filename: string, widths: number[]) =>
  Promise.all(widths.map(width => cropSingle(filename, width)))

interface Color {
  r: number;
  g: number;
  b: number;
}

export const rgbToHex = ({ r, g, b }: Color) =>
  "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

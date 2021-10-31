import fs from "fs";
import path from "path";
import sharp from "sharp";

const resizeSingle = async (filename: string, width: number) =>
  new Promise((resolve, reject) => {
    const transformer = sharp().resize({ width });
    const readable = fs.createReadStream(filename);

    const { dir, name, ext } = path.parse(filename);

    const outputFilename = path.join(dir, `${name}_${width}${ext}`);

    const writable = fs.createWriteStream(outputFilename);

    readable
      .pipe(transformer)
      .pipe(writable)
      .on("close", resolve)
      .on("error", reject);
  });

export const resize = async (filename: string, widths: number[]) =>
  Promise.all(widths.map((width) => resizeSingle(filename, width)));

export const getSize = async (filename: string) => {
  const meta = await sharp(filename).metadata();
  const stats = await sharp(filename).stats();

  return {
    width: meta.width!,
    height: meta.height!,
    dominantColor: rgbToHex(stats.dominant!),
  };
};

interface Color {
  r: number;
  g: number;
  b: number;
}

const rgbToHex = ({ r, g, b }: Color) =>
  "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

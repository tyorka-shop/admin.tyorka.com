import path from "path";
import sharp from "sharp";

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
  Promise.all(widths.map((width) => cropSingle(filename, width)));

interface Color {
  r: number;
  g: number;
  b: number;
}

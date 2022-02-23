import axios, { AxiosError } from "axios";
import fs from "fs";
import { basename, extname, join } from "path";
import Container from "typedi";
import { Config } from "../config";
import { Post } from "./posts";

export const downloadMedia = async (post: Post): Promise<string> => {
  console.log("Download ", post.media_type);
  switch (post.media_type) {
    case "IMAGE":
    case "CAROUSEL_ALBUM": {
      // console.log(" url:", post.media_url);
      const [pathname] = basename(post.media_url).split("?");
      const ext = extname(pathname);

      return await download(post.media_url, `${post.id}${ext}`);
    }

    case "VIDEO": {
      // console.log(" thumbnail:", post.thumbnail_url);
      const [pathname] = basename(post.thumbnail_url).split("?");
      const ext = extname(pathname);

      return await download(post.thumbnail_url, `${post.id}${ext}`);
    }
  }
};

const download = async (url: string, filename: string) => {
  const { imagesFolder } = Container.get<Config>("config");

  const outputFilename = join(imagesFolder, filename);
  const writer = fs.createWriteStream(outputFilename);

  try {
    const response = await axios.get(url, { responseType: "stream" });

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (e: AxiosError | any) {
    console.log(e?.response || e.message);
  }
  return outputFilename;
};

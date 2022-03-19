import Container from "typedi";
import { basename } from "path";
import { Config } from "../config";
import { crop } from "../image-processing/insta";
import { getDominantColor } from "../image-processing";
import { Store } from "../store";
import { InstaPost } from "../types";
import { downloadMedia } from "./download";
import { getPosts } from "./posts";

export async function syncPosts() {
  console.log("Start syncing instagram posts");
  const { insta } = Container.get<Config>("config");
  const posts = await getPosts({
    access_token: insta.access_token,
    instagram_id: insta.instagram_id,
    limit: 12,
  });

  const processed = await Promise.all(
    posts.map(async (post): Promise<InstaPost> => {
      const filename = await downloadMedia(post);
      await crop(filename, [600]);
      const color = await getDominantColor(filename);
      return {
        id: post.id,
        src: basename(filename),
        url: post.permalink,
        color,
      };
    })
  );

  const store = Container.get(Store);

  store.saveInstaPosts(processed);
}

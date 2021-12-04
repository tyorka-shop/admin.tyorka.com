import "reflect-metadata";
import { syncPosts } from "./insta";
import { setupConfig } from "./config";

export const init = async () => {
  try {
    await setupConfig();
    await syncPosts();
  } catch (e: any) {
    console.log(e.message || e);
  }
};
init();

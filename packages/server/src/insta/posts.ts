import axios, { Axios, AxiosError } from "axios";
import qs from "qs";

interface Options {
  access_token: string;
  instagram_id: string;
  limit?: number;
}

export type MediaType = "IMAGE" | "CAROUSEL_ALBUM" | "VIDEO";

export interface Post {
  media_url: string;
  caption: string;
  media_type: MediaType;
  like_count: number;
  shortcode: string;
  timestamp: string;
  comments_count: number;
  username: string;
  permalink: string;
  id: string;
  thumbnail_url: string;
  children: any;
}

interface Response<T> {
  data: T;
}

const host = "https://graph.facebook.com";

const fields = [
  "media_url",
  "thumbnail_url",
  "caption",
  "media_type",
  "timestamp",
  "children{media_url}",
  "permalink"
];

export async function getPosts({
  access_token,
  instagram_id,
  limit = 10,
}: Options) {
  const query = {
    fields: fields.join(","),
    limit,
    access_token,
  };

  try {
    const response = await axios.get<Response<Post[]>>(
      `${host}/v12.0/${instagram_id}/media?${qs.stringify(query)}`
    );
    return response.data.data;
  } catch (e: AxiosError | any) {
    console.log(e.response);
  }
  return [];
}

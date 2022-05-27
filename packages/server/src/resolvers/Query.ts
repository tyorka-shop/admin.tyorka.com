import { Arg, Query, Resolver, ID, Ctx, Float } from "type-graphql";
import { Inject, Service } from "typedi";
import { ID as IDScalar } from "../types";
import { Store } from "../store";
import { Picture } from "../types/Picture";
import { Product } from "../types/Product";
import { GalleryItem } from "../types/GalleryItem";
import { ShopItem } from "../types/ShopItem";
import { User } from "../types/User";
import { Context } from "../types/Context";
import { BlogPost } from "../types/BlogPost";
import { Builder } from "../builder";
import { Build } from "../types/Build";

@Service()
@Resolver()
export class QueryResolver {
  @Inject(() => Store)
  private store: Store;

  @Inject(() => Builder)
  private builder: Builder;

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return this.store.getProducts();
  }

  @Query(() => Picture)
  async picture(@Arg("id", () => ID) id: IDScalar): Promise<Picture | undefined> {
    return this.store.getPicture(id);
  }

  @Query(() => Product)
  async product(@Arg("id", () => ID) id: IDScalar): Promise<Product | undefined> {
    return this.store.getProduct(id);
  }

  @Query(() => [GalleryItem])
  async gallery(): Promise<GalleryItem[]> {
    return this.store.getGallery();
  }

  @Query(() => [ShopItem])
  async shop(): Promise<ShopItem[]> {
    return this.store.getShop();
  }

  @Query(() => [BlogPost])
  async blog(): Promise<BlogPost[]> {
    return this.store.getInstaPosts();
  }

  @Query(() => User)
  user(@Ctx() ctx: Context): User {
    return {
      email: ctx.email,
    };
  }

  @Query(() => Build, { nullable: true })
  currentBuild(): Build | undefined {
    return this.builder.getStatus();
  }

  @Query(() => [Build])
  async publications(): Promise<Build[]> {
    const result = await this.store.getPublications();
    const current = this.builder.getStatus();
    if (!current) {
      return result;
    }
    return [current, ...result];
  }

  @Query(() => Build, { nullable: true })
  async publication(@Arg("id", () => String) id: string): Promise<Build | undefined> {
    const current = this.builder.getStatus();
    if (current?.id === id) {
      return current;
    }
    return this.store.getPublication(id);
  }

  @Query(() => Float)
  async publicationDuration(): Promise<number> {
    return this.store.getPublicationDuration();
  }

  @Query(() => Boolean)
  async isDraft(): Promise<boolean> {
    return this.store.getIsDraft();
  }
}

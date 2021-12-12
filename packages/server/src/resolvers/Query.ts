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
import { isDraft } from "../types/IsDraft";

@Service()
@Resolver()
export class QueryResolver {
  @Inject(() => Store)
  private store: Store;

  @Inject(() => Builder)
  private builder: Builder;

  @Query(() => [Product])
  products(): Product[] {
    return this.store.getProducts();
  }

  @Query(() => Picture)
  picture(@Arg("id", () => ID) id: IDScalar): Picture | undefined {
    return this.store.getPicture(id);
  }

  @Query(() => Product)
  product(@Arg("id", () => ID) id: IDScalar): Product | undefined {
    return this.store.getProduct(id);
  }

  @Query(() => [GalleryItem])
  gallery(): GalleryItem[] {
    return this.store.getGallery();
  }

  @Query(() => [ShopItem])
  shop(): ShopItem[] {
    return this.store.getShop();
  }

  @Query(() => [BlogPost])
  blog(): BlogPost[] {
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
  publications(): Build[] {
    const result = this.store.getPublications();
    const current = this.builder.getStatus();
    if (!current) {
      return result;
    }
    return [current, ...result];
  }

  @Query(() => Build, { nullable: true })
  publication(@Arg("id", () => String) id: string): Build | undefined {
    const current = this.builder.getStatus();
    if (current?.id === id) {
      return current;
    }
    return this.store.getPublication(id);
  }

  @Query(() => Float)
  publicationDuration(): number {
    return this.store.getPublicationDuration();
  }

  @Query(() => Boolean)
  isDraft(): boolean {
    return this.store.getIsDraft();
  }
}

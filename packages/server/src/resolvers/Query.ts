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
import { Storage } from "../storage";
import { IsNull, Not } from "typeorm";

@Service()
@Resolver()
export class QueryResolver {
  @Inject(() => Store)
  private store: Store;

  @Inject(() => Storage)
  private storage: Storage;

  @Inject(() => Builder)
  private builder: Builder;

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return this.storage.products.find({relations: {cover: true}});
  }

  @Query(() => Picture)
  async picture(@Arg("id", () => ID) id: IDScalar): Promise<Picture | null> {
    return this.storage.pictures.findOne({ where: { id } });
  }

  @Query(() => Product)
  async product(@Arg("id", () => ID) id: IDScalar): Promise<Product | null> {
    return this.storage.products.findOne({ where: { id }, relations: {cover: true} });
  }

  @Query(() => [GalleryItem])
  async gallery(): Promise<GalleryItem[]> {
    // return this.store.getGallery();
    const products = await this.storage.products.find({
      where: {
        showInGallery: true,
        cover: Not(IsNull())
      },
      order: {
        index: 'ASC'
      },
      relations: {
        pictures: true
      }
    });

    return products.map(product => ({
      id: product.id,
      color: product.cover!.color,
      src: product.cover!.src,
      ...product.cover!.originalSize,
    }))
  }

  @Query(() => [ShopItem])
  async shop(): Promise<ShopItem[]> {
    const products = await this.storage.products.find({
      where: {
        showInShop: true,
        cover: Not(IsNull()),
        price: Not(IsNull()),
        title: Not(IsNull()),
      },
    });
    return products.map((product) => ({
      ...product,
      price: product.price!,
    }));
  }

  @Query(() => [BlogPost])
  async blog(): Promise<BlogPost[]> {
    return this.storage.blog.find();
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
  async publication(
    @Arg("id", () => String) id: string
  ): Promise<Build | undefined> {
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

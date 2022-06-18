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
import { BuildStatus } from "../types/BuildStatus";
import { MoreThan } from "typeorm";

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
    return this.storage.products.find({
      relations: { cover: true },
      order: { createdAt: "DESC" },
    });
  }

  @Query(() => Picture)
  async picture(@Arg("id", () => ID) id: IDScalar): Promise<Picture | null> {
    return this.storage.pictures.findOne({ where: { id } });
  }

  @Query(() => Product)
  async product(@Arg("id", () => ID) id: IDScalar): Promise<Product | null> {
    return this.storage.products.findOne({
      where: { id },
      relations: { cover: true },
    });
  }

  @Query(() => [GalleryItem])
  async gallery(): Promise<GalleryItem[]> {
    return this.storage.getGallery();
  }

  @Query(() => [ShopItem])
  async shop(): Promise<ShopItem[]> {
    return this.storage.getShop();
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
  async currentBuild(): Promise<Build | undefined> {
    const result = await this.storage.builds.findOne({
      where: {
        status: BuildStatus.PENDING,
      },
    });
    return result ? Build.fromEntity(result) : undefined;
  }

  @Query(() => [Build])
  async publications(): Promise<Build[]> {
    const result = await this.storage.builds.find({
      order: {
        date: 'DESC'
      }
    });
    return result.map((item) => Build.fromEntity(item));
  }

  @Query(() => Build, { nullable: true })
  async publication(
    @Arg("id", () => String) id: string
  ): Promise<Build | undefined> {
    const result = await this.storage.builds.findOne({
      where: {
        id,
      },
    });
    return result ? Build.fromEntity(result) : undefined;
  }

  @Query(() => Float)
  async publicationDuration(): Promise<number> {
    const done = await this.storage.builds.find({
      where: { status: BuildStatus.DONE, duration: MoreThan(0) },
    });
    if (!done.length) {
      return 60_000;
    }
    return (
      done.reduce(
        (result, publication) => result + (publication.duration || 0),
        0
      ) / done.length
    );
  }

  @Query(() => Boolean)
  async isDraft(): Promise<boolean> {
    const product = await this.storage.products
      .createQueryBuilder("p")
      .select("max(p.updatedAt)", "maxUpdatedAt")
      .where("p.showInGallery = true or p.showInShop = true")
      .getRawOne<{maxUpdatedAt: Date}>();

    const build = await this.storage.builds
      .createQueryBuilder("b")
      .select("max(b.date)", "maxDate")
      .where(`b.status = "DONE"`)
      .getRawOne<{maxDate: Date}>();
    
    if(!product || !product.maxUpdatedAt) {
      return false;
    }

    if(!build || !build.maxDate){
      return true
    }

    return build.maxDate < product.maxUpdatedAt;
  }
}

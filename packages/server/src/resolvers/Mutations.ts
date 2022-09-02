import { Arg, Mutation, ID, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { join } from "path";
import { CropInput } from "../types/Crop";
import { Product, ProductInput } from "../types/Product";
import { ID as IDScalar } from "../types";
import { Picture } from "../types/Picture";
import { GalleryItem } from "../types/GalleryItem";
import { Build } from "../types/Build";
import { Builder } from "../builder";
import { crop as cropSlide } from "../image-processing/square";
import { Config } from "../config";
import { Storage } from "../storage";
import { ShopItem } from "../types/ShopItem";

@Service()
@Resolver()
export class MutationsResolver {
  @Inject(() => Storage)
  private storage: Storage;

  @Inject(() => Builder)
  private builder: Builder;

  @Inject("config")
  private config: Config;

  @Mutation(() => Product, { nullable: true })
  async saveProduct(
    @Arg("product", () => ProductInput)
    product: ProductInput
  ): Promise<Product | undefined> {
    return this.storage.saveProduct(product);
  }

  @Mutation(() => Picture)
  async saveCrop(
    @Arg("id", () => ID) id: IDScalar,
    @Arg("crop", () => CropInput) crop: CropInput
  ): Promise<Picture> {
    const picture = await this.storage.pictures.findOne({ where: { id } });

    if (!picture) {
      throw new Error("Can not find picture");
    }

    await cropSlide(join(this.config.imagesFolder, picture.src), crop);

    picture.crop = crop;

    await this.storage.pictures.save(picture);

    return picture;
  }

  @Mutation(() => [GalleryItem])
  async saveGalleryOrder(
    @Arg("list", () => [ID]) list: IDScalar[]
  ): Promise<GalleryItem[]> {
    await this.storage.saveGalleryOrder(list);
    return this.storage.getGallery();
  }

  @Mutation(() => [ShopItem])
  async saveShopOrder(@Arg("list", () => [ID]) list: IDScalar[]): Promise<ShopItem[]> {
    await this.storage.saveShopOrder(list);
    return this.storage.getShop();
  }

  @Mutation(() => Build, { nullable: true })
  async publish(): Promise<Build | undefined> {
    await this.builder.build();
    const build = this.builder.getStatus();
    return build ? Build.fromEntity(build) : undefined;
  }
}

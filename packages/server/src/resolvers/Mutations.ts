import { Arg, Mutation, ID, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { join } from "path";
import { Store } from "../store";
import { CropInput } from "../types/Crop";
import { Product, ProductInput } from "../types/Product";
import { ID as IDScalar } from "../types";
import { Picture } from "../types/Picture";
import { GalleryItem } from "../types/GalleryItem";
import { Build } from "../types/Build";
import { Builder } from "../builder";
import { crop as cropSlide } from "../image-processing/square";
import { Config } from "../config";

@Service()
@Resolver()
export class MutationsResolver {
  @Inject(() => Store)
  private store: Store;

  @Inject(() => Builder)
  private builder: Builder;

  @Inject("config")
  private config: Config;

  @Mutation(() => Product, { nullable: true })
  async saveProduct(
    @Arg("product", () => ProductInput) product: ProductInput
  ): Promise<Product | undefined> {
    const prevProduct = await this.store.getProduct(product.id)
    await this.store.saveProduct({
      ...product,
      createdAt: prevProduct ? prevProduct.createdAt: +Date.now(),
      updatedAt: +Date.now()
    });

    return this.store.getProduct(product.id);
  }

  @Mutation(() => Picture)
  async saveCrop(
    @Arg("id", () => ID) id: IDScalar,
    @Arg("crop", () => CropInput) crop: CropInput
  ): Promise<Picture> {
    const pic = await this.store.getPicture(id);
    if (!pic) {
      throw new Error("Can not find picture");
    }
    await cropSlide(join(this.config.imagesFolder, pic.src), crop);
    await this.store.saveCrop(id, crop);
    return pic;
  }

  @Mutation(() => [GalleryItem])
  async saveGalleryOrder(@Arg("list", () => [ID]) list: IDScalar[]): Promise<GalleryItem[]> {
    await this.store.saveGalleryOrder(list);
    return this.store.getGallery();
  }

  @Mutation(() => Build, { nullable: true })
  publish(): Build | undefined {
    this.builder.build();
    return this.builder.getStatus();
  }
}

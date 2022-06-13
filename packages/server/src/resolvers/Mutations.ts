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
import { Storage } from "../storage";
import { Product as DBProduct } from "../entity/Product";

@Service()
@Resolver()
export class MutationsResolver {
  @Inject(() => Store)
  private store: Store;

  @Inject(() => Storage)
  private storage: Storage;

  @Inject(() => Builder)
  private builder: Builder;

  @Inject("config")
  private config: Config;

  @Mutation(() => Product, { nullable: true })
  async saveProduct(
    @Arg("product", () => ProductInput)
    { pictures: picIds, coverId, ...value }: ProductInput
  ): Promise<Product | undefined> {
    const pictures = await this.storage.pictures.find({
      where: picIds.map((id) => ({ id })),
    });

    const cover = await this.storage.pictures.findOne({
      where: { id: coverId }
    })
    return this.storage.products.save(
      DBProduct.fromProductInput(value, pictures, cover)
    );
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
  ) {
    const indexes = list.reduce((result, id, index) => ({
      ...result,
      [id]: index
    }), {} as Record<string, number>);

    const products = await this.storage.products.find();

    products.forEach(product => {
      product.index = product.id in indexes ? indexes[product.id] : undefined
    })

    await this.storage.products.save(products);
  }

  @Mutation(() => Build, { nullable: true })
  publish(): Build | undefined {
    this.builder.build();
    return this.builder.getStatus();
  }
}

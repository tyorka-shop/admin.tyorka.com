import { Arg, Mutation, ID, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi';
import { Store } from '../store';
import { Crop, CropInput } from '../types/Crop';
import { Product, ProductInput } from '../types/Product';
import { ID as IDScalar} from '../types'
import { Picture } from '../types/Picture';
import { GalleryItem } from '../types/GalleryItem';
import { Build } from '../types/Build';
import { Builder } from '../builder';

@Service()
@Resolver()
export class MutationsResolver {

  @Inject(() => Store)
  private store: Store

  @Inject(() => Builder)
  private builder: Builder

  @Mutation(() => Product, {nullable: true})
  saveProduct(@Arg('product', () => ProductInput) product: ProductInput): Product | undefined {
    this.store.saveProduct(product);

    return this.store.getProduct(product.id)
  }

  @Mutation(() => Picture, {nullable: true})
  saveCrop(@Arg('id', () => ID) id: IDScalar, @Arg('crop', () => CropInput) crop: CropInput): Picture | undefined {
    this.store.saveCrop(id, crop);
    return this.store.getPicture(id)
  }

  @Mutation(() => [GalleryItem])
  saveGalleryOrder(@Arg('list', () => [ID]) list: IDScalar[]): GalleryItem[] {
    this.store.saveGalleryOrder(list);
    return this.store.getGallery()
  }

  @Mutation(() => Build, {nullable: true}) 
  publish(): Build | undefined{
    this.builder.build();
    return this.builder.getStatus();
  }
}
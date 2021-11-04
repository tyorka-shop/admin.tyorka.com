import { Arg, Mutation, ID, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi';
import { Store } from '../store';
import { Crop, CropInput } from '../types/Crop';
import { Product, ProductInput } from '../types/Product';
import { ID as IDScalar} from '../types'
import { Picture } from '../types/Picture';

@Service()
@Resolver()
export class MutationsResolver {

  @Inject(() => Store)
  private store: Store

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

  @Mutation(() => [Product])
  saveGalleryOrder(@Arg('list', () => [ID]) list: IDScalar[]): Product[] {
    this.store.saveGalleryOrder(list);
    return this.store.getGallery()
  }
}
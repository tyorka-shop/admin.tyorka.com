import { Arg, Query, Resolver, ID } from 'type-graphql'
import { Inject, Service } from 'typedi';
import { ID as IDScalar } from '../types';
import { Store } from '../store';
import { Picture } from '../types/Picture';
import { Product } from '../types/Product';
import { GalleryItem } from '../types/GalleryItem';
import { ShopItem } from '../types/ShopItem';

@Service()
@Resolver()
export class QueryResolver {

  @Inject(() => Store)
  private store: Store

  @Query(() => [Product])
  products(): Product[] {
    return this.store.getProducts();
  }

  @Query(() => Picture)
  picture(@Arg('id', () => ID) id: IDScalar): Picture | undefined {
    return this.store.getPicture(id)
  }  

  @Query(() => Product)
  product(@Arg('id', () => ID) id: IDScalar): Product | undefined {
    return this.store.getProduct(id)
  }

  @Query(() => [GalleryItem])
  gallery(): GalleryItem[] {
    return this.store.getGallery()
  }

  @Query(() => [ShopItem])
  shop(): ShopItem[] {
    return this.store.getShop()
  }
}
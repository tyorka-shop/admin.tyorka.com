import {  Product, ProductInput } from '../../types/gql';

export interface PictureDraft {
  id: string;
  src: string;
}

export interface ProductDraft extends Omit<ProductInput, 'coverId' | 'pictures'> {
  coverId?: string,
  pictures: PictureDraft[],
}
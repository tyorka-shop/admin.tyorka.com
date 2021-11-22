import { State } from "./types/State";

export type ID = String;

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Crop {
  anchor: Position
  factor: number
}

export interface Picture {
  id: ID
  src: string
  originalSize: Size
  crop: Crop
  color: string
}

export interface Product {
  id: ID
  state: State
  pictures: ID[]
  coverId?: ID
  title?: string
  tags?: string[],
  price?: number
  showInGallery: boolean
  showInShop: boolean
  description?: string
}

export interface Schema {
  products: Product[]
  gallery: ID[]
  pictures: Picture[]
}

export type Gallery = Picture[];
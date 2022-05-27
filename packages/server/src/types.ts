import { Build } from "./types/Build";
import { MultiLang } from "./types/MultiLang";
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
  title?: MultiLang
  tags?: string[],
  price?: number
  showInGallery: boolean
  showInShop: boolean
  description?: MultiLang
  createdAt: number
  updatedAt?: number
}

export interface InstaPost {
  id: string
  url: string
  src: string
  color: string
}

export interface Schema {
  products: Product[]
  gallery: ID[]
  pictures: Picture[]
  instaPosts: InstaPost[]
  isDraft: boolean
  publications: Build[]
  migrations?: number
}

export type Gallery = Picture[];
export interface Size {
  width: number
  height: number
}

export interface Crop {
  anchor: {
    x: number
    y: number
  }
  factor: number
}

export interface Config {
  imagesUrl: string
  backendUrl: string
}
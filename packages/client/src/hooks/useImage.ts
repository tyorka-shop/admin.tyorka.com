import React from 'react';
import { Context } from '..'

export type Size = 'small' | 'big'

const sizeToWidth: Record<Size, number> = {
  big: 2000,
  small: 600
}

export const useImage = (src: string, size: Size = 'big', cropped = false) => {
  const { config } = React.useContext(Context);

  const [basename, ext] = src.split('.')
  return `${config.imagesUrl}${basename}${cropped ? '_square' : ''}_${sizeToWidth[size]}.${ext}`;
}
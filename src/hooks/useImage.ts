import React from 'react';
import { Context } from '..'

export type Size = 'small' | 'big'

const sizeToWidth: Record<Size, number> = {
  big: 2000,
  small: 600
}

export const useImage = (src: string, size: Size = 'big', cropped = false) => {
  const { config } = React.useContext(Context);

  return `${config.imagesUrl}${src}${cropped ? '_square' : ''}_${sizeToWidth[size]}.jpg`;
}
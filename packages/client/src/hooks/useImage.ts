import React from 'react';
import { Context } from '..'

export const useImage = (src: string) => {
  const { config } = React.useContext(Context);

  return `${config.imagesUrl}${src}`;
}
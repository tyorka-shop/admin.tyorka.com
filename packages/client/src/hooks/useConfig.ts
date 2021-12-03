import { useContext } from 'react'
import { Context } from '..'

export const useConfig = () => {
  const context = useContext(Context);

  return context.config
}
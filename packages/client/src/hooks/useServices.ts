import { useContext } from 'react'
import { ServicesContext, Services } from '../services'

export const useServices = () => useContext<Services>(ServicesContext)
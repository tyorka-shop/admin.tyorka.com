import {createContext, useContext} from "react"
import { Auth } from './auth'

export const services = {
  auth: new Auth()
}

export type Services = typeof services

export const ServicesContext = createContext<Services>(services)

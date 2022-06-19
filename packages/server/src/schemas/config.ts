import Joi from 'joi'
import { ConfigIndex } from '../interfaces/config';
import { levels } from '../services/LoggerService';

export const InstaConfigSchema = Joi.object({
  instagram_id: Joi.string().required(),
  access_token: Joi.string().required()
}).meta({className: 'InstaConfig'})

export const PublicSiteSchema = Joi.object({
  folder: Joi.string().required()
}).meta({className: 'PublicSiteConfig'})

export const SessionServiceConfigSchema = Joi.object({
  url: Joi.string().required()
}).meta({className: 'SessionServiceConfig'})

export const ConfigSchema = Joi.object<ConfigIndex>({
  sessionService: SessionServiceConfigSchema.required(),
  storeFolder: Joi.string().required(),
  imagesFolder: Joi.string().required(),
  secret: Joi.string().required(),
  insta: InstaConfigSchema.required(),
  publicSite: PublicSiteSchema.required(),
  port: Joi.string().required(),
  logLevel: Joi.string().valid(...levels)
}).meta({className: 'ConfigIndex'})
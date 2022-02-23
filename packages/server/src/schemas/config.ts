import Joi from 'joi'
import { ConfigIndex } from '../interfaces/config';

export const JWTConfigSchema = Joi.object({
  token_lifespan: Joi.number().required(),
  privateKey: Joi.string(),
  cert: Joi.string(),

  private_key_filename: Joi.string().required(),
  public_key_filename: Joi.string().required()
}).meta({className: 'JWTConfig'})

export const GoogleSignInButtonSchema = Joi.object({
  client_id: Joi.string().required()
}).meta({className: 'GoogleSignInButtonConfig'});

export const InstaConfigSchema = Joi.object({
  instagram_id: Joi.string().required(),
  access_token: Joi.string().required()
}).meta({className: 'InstaConfig'})

export const PublicSiteSchema = Joi.object({
  folder: Joi.string().required()
}).meta({className: 'PublicSiteConfig'})

export const ConfigSchema = Joi.object<ConfigIndex>({
  jwt: JWTConfigSchema.required(),
  storeFolder: Joi.string().required(),
  imagesFolder: Joi.string().required(),
  google_sign_in_button: GoogleSignInButtonSchema.required(),
  granted_emails: Joi.array().items(Joi.string().email()).required(),
  client_url: Joi.string().required(),
  builderToken: Joi.string().required(),
  insta: InstaConfigSchema.required(),
  publicSite: PublicSiteSchema.required()
}).meta({className: 'ConfigIndex'})
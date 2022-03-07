/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface ConfigIndex {
  imagesFolder: string;
  insta: InstaConfig;
  port: string;
  publicSite: PublicSiteConfig;
  secret: string;
  sessionService: SessionServiceConfig;
  storeFolder: string;
}

export interface InstaConfig {
  access_token: string;
  instagram_id: string;
}

export interface PublicSiteConfig {
  folder: string;
}

export interface SessionServiceConfig {
  url: string;
}

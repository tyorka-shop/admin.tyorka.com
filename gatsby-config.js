module.exports = {
  siteMetadata: {
    title: `Tyorka admin`,
  },
  flags: {
    // FAST_DEV: true,
    // PARALLEL_SOURCING: true,
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-typescript-checker',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        useResolveUrlLoader: true,
        sassOptions: {
          includePaths: ["src"],
        }
      },
    },
  ],
}

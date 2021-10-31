exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  page.matchPath = `${page.path}/*`.replace(/\/{2,}/g, "/");

  createPage(page);
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /.gql$/i,
          use: "graphql-tag/loader",
        },
      ],
    },
  });
};

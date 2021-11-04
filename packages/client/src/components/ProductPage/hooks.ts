import React from "react";
import { v4 as uuid } from "uuid";
import * as query from "./query.gql";
import {
  ProductQuery as Query,
  ProductQueryVariables as Variables,
} from "./query.types";
import { useQuery } from "@apollo/client";
import { Picture, State } from "../../types/gql";

type Product = Query["product"];

export const useProduct = (id: string | undefined) => {
  const { data, loading } = useQuery<Query, Variables>(query, {
    variables: {
      id: id!,
    },
    skip: !id,
  });

  const [product, setProduct] = React.useState<Product>(createNewProduct());

  React.useEffect(() => {
    data && setProduct(data.product);
  }, [data]);

  const addPic = (pic: Picture) => {
    setProduct((previous) => {
      const newProduct: Product = {
        ...previous,
        pictures: [...previous.pictures, pic],
      };
      if (!newProduct.coverId) {
        newProduct.coverId = pic.id;
      }
      return newProduct;
    });
  };

  const removePic = (id: string) => {
    setProduct((previous) => {
      const newProduct: Product = {
        ...previous,
        pictures: previous.pictures.filter((pic) => pic.id !== id),
      };
      if (newProduct.coverId === id) {
        newProduct.coverId = newProduct.pictures[0]?.id || undefined;
      }
      return newProduct;
    });
  };

  const setCover = (id: string) => {
    setProduct((previous) => ({
      ...previous,
      coverId: id,
    }));
  };

  const reorderPics = (picIds: string[]) => {
    setProduct((previous) => {
      const newProduct: Product = {
        ...previous,
        pictures: picIds.map(id => previous.pictures.find(pic => pic.id === id)!),
      };
      return newProduct;
    });
  };

  return {
    loading,
    product,
    addPic,
    removePic,
    setCover,
    reorderPics,
  };
};

const createNewProduct = (): Product => ({
  id: uuid(),
  state: State.Draft,
  pictures: [],
  title: "",
  showInGallery: false,
  showInShop: false,
  coverId: undefined,
});

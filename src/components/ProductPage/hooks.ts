import React from "react";
import { v4 as uuid } from "uuid";
import * as query from "./query.gql";
import {
  ProductQuery as Query,
  ProductQueryVariables as Variables,
} from "./query.types";
import { useQuery } from "@apollo/client";
import { ProductState } from "../../types/gql";
import { Picture } from "../../types";
import { ProductDraft } from "./types";


export const useProduct = (id: string | undefined) => {
  const { data, loading } = useQuery<Query, Variables>(query, {
    variables: {
      id: id!,
    },
    skip: !id,
  });

  const [product, setProduct] = React.useState<ProductDraft>(createNewProduct());

  React.useEffect(() => {
    data?.product && setProduct({
      ...data.product,
      pictures: data.product.pictures,
      price: data.product.price || undefined,
      coverId: data.product.cover?.id
    });
  }, [data]);

  const addPic = (pic: Picture) => {
    setProduct((previous) => {
      const newProduct: ProductDraft = {
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
      const newProduct: ProductDraft = {
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
    setProduct((previous) => ({
        ...previous,
        pictures: picIds.map(id => previous.pictures.find(pic => pic.id === id)!),
    }));
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

const createNewProduct = (): ProductDraft => ({
  id: uuid(),
  state: ProductState.Draft,
  pictures: [],
  title: {
    ru: "",
    en: ""
  },
  showInGallery: false,
  showInShop: false,
  description: {
    ru: "",
    en: ""
  },
  price: undefined,
  
  coverId: undefined,
});

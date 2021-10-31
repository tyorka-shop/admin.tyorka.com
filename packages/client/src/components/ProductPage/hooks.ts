import React from "react";
import { v4 as uuid } from "uuid";
import { Crop } from "../../types/common";
import * as query from './query.gql';
import { ProductQuery as Query, ProductQueryVariables as Variables } from './query.types';
import { useQuery } from "@apollo/client";
import { Picture, State } from "../../types/gql";

type Product = Query['product']

export const useProduct = (id: string | undefined) => {
  const { data, loading } = useQuery<Query, Variables>(query, {
    variables: {
      id: id!
    },
    skip: !id
  });

  const [product, setProduct] = React.useState<Product>(createNewProduct());

  React.useEffect(() => {
    data && setProduct(data.product);
  }, [data]);

  const addPic = (pic: Picture) => {
    const newProduct: Product = {
      ...product,
      pictures: [...product.pictures, pic],
    };
    if (!newProduct.coverId) {
      newProduct.coverId = pic.id;
    }
    setProduct(newProduct);
  };

  const removePic = (id: string) => {
    const newProduct: Product = {
      ...product,
      pictures: product.pictures.filter((pic) => pic.id !== id),
    };
    if (newProduct.coverId === id) {
      newProduct.coverId = newProduct.pictures[0]?.id || undefined;
    }
    setProduct(newProduct);
  };

  const setCover = (id: string) => {
    const newProduct: Product = {
      ...product,
      coverId: id,
    };
    setProduct(newProduct);
  };

  const setCrop = (id: string, crop: Crop) => {
    const pictures = product.pictures.map((pic) =>
      pic.id === id ? { ...pic, crop } : pic
    );
    const newProduct: Product = {
      ...product,
      pictures,
    };
    setProduct(newProduct);
  };

  return {
    loading,
    product,
    addPic,
    removePic,
    setCover,
    setCrop
  };
};

const createNewProduct = (): Product => ({
  id: uuid(),
  state: State.Draft,
  pictures: [],
  title: "",
  showInGallery: false,
  showInShop: false,
  coverId: undefined
});

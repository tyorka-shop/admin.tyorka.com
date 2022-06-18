import { useMutation } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import {
  SaveProductMutation as Mutation,
  SaveProductMutationVariables as Variables,
} from "./mutation.types";
import * as mutation from "./mutation.gql";
import { FormValues } from ".";
import { State } from "../../../types/gql";
import * as productsQuery from "../../Products/query.gql";
import * as galleryQuery from '../../Gallery/query.gql'
import { ProductInput } from "./types";

export const useSubmit = (product: ProductInput) => {
  const { addToast } = useToasts();
  const [save, { loading, error }] = useMutation<Mutation, Variables>(
    mutation,
    {
      onCompleted: () => addToast("Сохранено", { appearance: "success" }),
    }
  );
  const onSubmit = (values: FormValues) => {
    if (!product.pictures.length) {
      addToast("Добавь фото", { appearance: "warning" });
      return;
    }
    save({
      variables: {
        product: {
          id: product.id,
          title: {
            ru: values.titleRu,
            en: values.titleEn,
          },
          showInGallery: values.showInGallery,
          showInShop: values.showInShop,
          coverId: product.coverId,
          pictures: product.pictures.map((pic) => pic.id),
          state: State.Draft,
          price: +values.price,
          description: {
            en: values.descriptionEn,
            ru: values.descriptionRu,
          },
        },
      },
      refetchQueries: [{ query: productsQuery }, "IsDraft", {query: galleryQuery}],
    });
  };

  return {
    onSubmit,
    submitting: loading,
    error,
  };
};

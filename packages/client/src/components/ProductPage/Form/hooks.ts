import { useMutation } from "@apollo/client";
import {
  SaveProductMutation as Mutation,
  SaveProductMutationVariables as Variables,
} from "./mutation.types";
import * as mutation from "./mutation.gql";
import { FormValues } from ".";
import { State } from "../../../types/gql";
import { FormFragment } from "./fragment.types";
import * as productsQuery from '../../Products/query.gql'

export const useSubmit = (product: FormFragment) => {
  const [save, { loading, error }] = useMutation<Mutation, Variables>(mutation);
  const onSubmit = (values: FormValues) => {
    save({
      variables: {
        product: {
          id: product.id,
          title: {
            ru: values.titleRu,
            en: values.titleEn
          },
          showInGallery: values.showInGallery,
          showInShop: values.showInShop,
          coverId: product.coverId || undefined,
          pictures: product.pictures.map((pic) => pic.id),
          state: State.Draft,
          price: +values.price,
          description: {
            en: values.descriptionEn,
            ru: values.descriptionRu
          }
        },
      },
      refetchQueries: [{query: productsQuery}, 'IsDraft']
    });
  };

  return {
    onSubmit,
    submitting: loading,
    error
  };
};

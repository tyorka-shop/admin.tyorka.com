import { useMutation, useQuery } from "@apollo/client";
import * as query from "./query.gql";
import * as mutation from "./mutation.gql";
import { GalleryQuery } from "./query.types";
import {
  SaveGalleryOrderMutation as Mutation,
  SaveGalleryOrderMutationVariables as Variables,
} from "./mutation.types";

export const useGallery = () => {
  const { data, loading } = useQuery<GalleryQuery>(query);

  const [save, { loading: submitting }] = useMutation<Mutation, Variables>(
    mutation
  );

  const onSave = (list: string[]) =>
    save({
      variables: {
        list,
      },
    });

  return {
    loading,
    gallery: data?.gallery || [],
    onSave
  };
};

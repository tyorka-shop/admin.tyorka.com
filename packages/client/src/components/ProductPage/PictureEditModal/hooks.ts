import { useMutation, useQuery } from "@apollo/client";
import {
  SaveCropMutation as Mutation,
  SaveCropMutationVariables as Variables,
} from "./mutatiion.types";
import * as mutation from "./mutatiion.gql";
import { PictureQuery, PictureQueryVariables } from "./query.types";
import * as query from "./query.gql";
import { Crop } from "../../../types/common";

export const useChangeHandler = (id: string) => {
  const [save, { loading }] = useMutation<Mutation, Variables>(mutation, {
    refetchQueries: ["IsDraft"],
  });

  const onSave = (crop: Crop) => {
    save({
      variables: {
        id,
        crop,
      },
    });
  };

  return {
    loading,
    onSave,
  };
};

export const usePicture = (id: string) => {
  const { data, loading } = useQuery<PictureQuery, PictureQueryVariables>(query, {
    variables: { id },
  });

  return {
    loading,
    picture: data?.picture,
  };
};

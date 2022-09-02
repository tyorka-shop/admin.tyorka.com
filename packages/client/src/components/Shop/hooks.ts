import { useMutation, useQuery } from "@apollo/client";
import { useToasts } from "react-toast-notifications";
import * as query from "./query.gql";
import * as mutation from "./mutation.gql";
import { ShopQuery } from "./query.types";
import {
  SaveShopOrderMutation as Mutation,
  SaveShopOrderMutationVariables as Variables,
} from "./mutation.types";

export const useShop = () => {
  const { data, loading } = useQuery<ShopQuery>(query);
  const { addToast } = useToasts();

  const [save, { loading: submitting }] = useMutation<Mutation, Variables>(
    mutation,
    {
      refetchQueries: ["IsDraft"],
      onCompleted: () => addToast("Сохранено", { appearance: "success" }),
    }
  );

  const onSave = (list: string[]) =>
    save({
      variables: {
        list,
      },
    });

  return {
    loading,
    submitting,
    list: data?.shop || [],
    onSave,
  };
};

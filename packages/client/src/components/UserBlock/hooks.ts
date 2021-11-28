import { useQuery } from "@apollo/client";
import { MeQuery } from "./query.types";
import * as query from "./query.gql";

export const useMe = () => {
  const { data, loading } = useQuery<MeQuery>(query);

  return {
    loading,
    email: data?.user.email
  };
};

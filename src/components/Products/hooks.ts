import { useQuery } from "@apollo/client";
import * as query from "./query.gql";
import { ProductsQuery } from './query.types'

export const useProducts = () => {
  const { data, loading } = useQuery<ProductsQuery>(query);
  return {
    loading,
    products: data?.products || [],
  };
};

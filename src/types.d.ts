import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Crop = {
  __typename: 'Crop';
  anchor: Point;
  factor: Scalars['Float'];
};

export type Mutation = {
  __typename: 'Mutation';
  newProduct: Maybe<Product>;
};


export type MutationNewProductArgs = {
  product: ProductInput;
};

export type Picture = {
  __typename: 'Picture';
  color: Scalars['String'];
  crop: Crop;
  id: Scalars['ID'];
  originalSize: Size;
  src: Scalars['String'];
};

export type Point = {
  __typename: 'Point';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Product = {
  __typename: 'Product';
  coverId: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  pictures: Array<Picture>;
  showInGallery: Scalars['Boolean'];
  showInShop: Scalars['Boolean'];
  state: State;
  title: Maybe<Scalars['String']>;
};

export type ProductInput = {
  coverId: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  pictures: Array<Scalars['ID']>;
  showInGallery: Scalars['Boolean'];
  showInShop: Scalars['Boolean'];
  state: State;
  title: Maybe<Scalars['String']>;
};

export type Query = {
  __typename: 'Query';
  products: Array<Product>;
};

export type Size = {
  __typename: 'Size';
  height: Scalars['Float'];
  width: Scalars['Float'];
};

/** State of product */
export enum State {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename: 'Query', products: Array<{ __typename: 'Product', id: string }> };


export const ProductsDocument = gql`
    query Products {
  products {
    id
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
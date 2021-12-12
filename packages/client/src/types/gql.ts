import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | undefined;
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

export type BlogPost = {
  __typename: 'BlogPost';
  color: Scalars['String'];
  id: Scalars['String'];
  src: Scalars['String'];
  url: Scalars['String'];
};

export type Build = {
  __typename: 'Build';
  date: Scalars['String'];
  id: Scalars['String'];
  log: Scalars['String'];
  status: BuildStatus;
};

/** State of building process */
export enum BuildStatus {
  Done = 'DONE',
  Failure = 'FAILURE',
  Pending = 'PENDING'
}

export type Crop = {
  __typename: 'Crop';
  anchor: Point;
  factor: Scalars['Float'];
};

export type CropInput = {
  anchor: PointInput;
  factor: Scalars['Float'];
};

export type GalleryItem = {
  __typename: 'GalleryItem';
  color: Scalars['String'];
  height: Scalars['Float'];
  /** id of product */
  id: Scalars['ID'];
  src: Scalars['String'];
  width: Scalars['Float'];
};

export type Mutation = {
  __typename: 'Mutation';
  publish: Maybe<Build>;
  saveCrop: Maybe<Picture>;
  saveGalleryOrder: Array<GalleryItem>;
  saveProduct: Maybe<Product>;
};


export type MutationSaveCropArgs = {
  crop: CropInput;
  id: Scalars['ID'];
};


export type MutationSaveGalleryOrderArgs = {
  list: Array<Scalars['ID']>;
};


export type MutationSaveProductArgs = {
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

export type PointInput = {
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Product = {
  __typename: 'Product';
  cover: Picture;
  coverId: Maybe<Scalars['ID']>;
  description: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  pictures: Array<Picture>;
  price: Maybe<Scalars['Float']>;
  showInGallery: Scalars['Boolean'];
  showInShop: Scalars['Boolean'];
  state: State;
  title: Maybe<Scalars['String']>;
};

export type ProductInput = {
  coverId: Maybe<Scalars['ID']>;
  description: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  pictures: Array<Scalars['ID']>;
  price: Maybe<Scalars['Float']>;
  showInGallery: Scalars['Boolean'];
  showInShop: Scalars['Boolean'];
  state: State;
  title: Maybe<Scalars['String']>;
};

export type Query = {
  __typename: 'Query';
  blog: Array<BlogPost>;
  currentBuild: Maybe<Build>;
  gallery: Array<GalleryItem>;
  isDraft: Scalars['Boolean'];
  picture: Picture;
  product: Product;
  products: Array<Product>;
  publication: Maybe<Build>;
  publicationDuration: Scalars['Float'];
  publications: Array<Build>;
  shop: Array<ShopItem>;
  user: User;
};


export type QueryPictureArgs = {
  id: Scalars['ID'];
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryPublicationArgs = {
  id: Scalars['String'];
};

export type ShopItem = {
  __typename: 'ShopItem';
  cover: Picture;
  description: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  pictures: Array<Picture>;
  price: Scalars['Float'];
  title: Scalars['String'];
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

export type User = {
  __typename: 'User';
  email: Scalars['String'];
};

export type SaveGalleryOrderMutationVariables = Exact<{
  list: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type SaveGalleryOrderMutation = { __typename: 'Mutation', saveGalleryOrder: Array<{ __typename: 'GalleryItem', id: string }> };

export type GalleryQueryVariables = Exact<{ [key: string]: never; }>;


export type GalleryQuery = { __typename: 'Query', gallery: Array<{ __typename: 'GalleryItem', id: string, src: string }> };

export type IsDraftQueryVariables = Exact<{ [key: string]: never; }>;


export type IsDraftQuery = { __typename: 'Query', isDraft: boolean };

export type PictureEditorFragment = { __typename: 'Picture', id: string, src: string, crop: { __typename: 'Crop', factor: number, anchor: { __typename: 'Point', x: number, y: number } }, originalSize: { __typename: 'Size', width: number, height: number } };

export type ProductCardCoverFragment = { __typename: 'Picture', id: string, src: string, crop: { __typename: 'Crop', factor: number, anchor: { __typename: 'Point', x: number, y: number } } };

export type ProductCardFragment = { __typename: 'Product', id: string, title: string | null, coverId: string | null, pictures: Array<{ __typename: 'Picture', id: string, src: string, crop: { __typename: 'Crop', factor: number, anchor: { __typename: 'Point', x: number, y: number } } }> };

export type FormFragment = { __typename: 'Product', id: string, title: string | null, showInGallery: boolean, showInShop: boolean, coverId: string | null, price: number | null, description: string | null, pictures: Array<{ __typename: 'Picture', id: string, src: string }> };

export type SaveProductMutationVariables = Exact<{
  product: ProductInput;
}>;


export type SaveProductMutation = { __typename: 'Mutation', saveProduct: { __typename: 'Product', id: string, title: string | null, showInGallery: boolean, showInShop: boolean, coverId: string | null, price: number | null, description: string | null, pictures: Array<{ __typename: 'Picture', id: string, src: string }> } | null };

export type PicFragment = { __typename: 'Picture', id: string, src: string };

export type PictureEditModalFragment = { __typename: 'Picture', id: string, src: string, crop: { __typename: 'Crop', factor: number, anchor: { __typename: 'Point', x: number, y: number } }, originalSize: { __typename: 'Size', width: number, height: number } };

export type SaveCropMutationVariables = Exact<{
  id: Scalars['ID'];
  crop: CropInput;
}>;


export type SaveCropMutation = { __typename: 'Mutation', saveCrop: { __typename: 'Picture', id: string, crop: { __typename: 'Crop', factor: number, anchor: { __typename: 'Point', x: number, y: number } } } | null };

export type ProductQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProductQuery = { __typename: 'Query', product: { __typename: 'Product', id: string, title: string | null, state: State, showInGallery: boolean, showInShop: boolean, coverId: string | null, price: number | null, description: string | null, pictures: Array<{ __typename: 'Picture', id: string, src: string, crop: { __typename: 'Crop', factor: number, anchor: { __typename: 'Point', x: number, y: number } }, originalSize: { __typename: 'Size', width: number, height: number } }> } };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename: 'Query', products: Array<{ __typename: 'Product', id: string, title: string | null, coverId: string | null, pictures: Array<{ __typename: 'Picture', id: string, src: string, crop: { __typename: 'Crop', factor: number, anchor: { __typename: 'Point', x: number, y: number } } }> }> };

export type PublishMutationVariables = Exact<{ [key: string]: never; }>;


export type PublishMutation = { __typename: 'Mutation', publish: { __typename: 'Build', status: BuildStatus, log: string } | null };

export type PublicationFragment = { __typename: 'Build', id: string, date: string, status: BuildStatus };

export type LogQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type LogQuery = { __typename: 'Query', publication: { __typename: 'Build', id: string, status: BuildStatus, log: string, date: string } | null };

export type PublicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicationsQuery = { __typename: 'Query', publicationDuration: number, publications: Array<{ __typename: 'Build', id: string, date: string, status: BuildStatus }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename: 'Query', user: { __typename: 'User', email: string } };

export const ProductCardCoverFragmentDoc = gql`
    fragment ProductCardCover on Picture {
  id
  src
  crop {
    anchor {
      x
      y
    }
    factor
  }
}
    `;
export const ProductCardFragmentDoc = gql`
    fragment ProductCard on Product {
  id
  title
  pictures {
    id
    ...ProductCardCover
  }
  coverId
}
    ${ProductCardCoverFragmentDoc}`;
export const PicFragmentDoc = gql`
    fragment Pic on Picture {
  id
  src
}
    `;
export const FormFragmentDoc = gql`
    fragment Form on Product {
  id
  title
  showInGallery
  showInShop
  coverId
  price
  description
  pictures {
    id
    ...Pic
  }
}
    ${PicFragmentDoc}`;
export const PictureEditorFragmentDoc = gql`
    fragment PictureEditor on Picture {
  id
  src
  crop {
    anchor {
      x
      y
    }
    factor
  }
  originalSize {
    width
    height
  }
}
    `;
export const PictureEditModalFragmentDoc = gql`
    fragment PictureEditModal on Picture {
  id
  ...PictureEditor
}
    ${PictureEditorFragmentDoc}`;
export const PublicationFragmentDoc = gql`
    fragment Publication on Build {
  id
  date
  status
}
    `;
export const SaveGalleryOrderDocument = gql`
    mutation SaveGalleryOrder($list: [ID!]!) {
  saveGalleryOrder(list: $list) {
    id
  }
}
    `;
export type SaveGalleryOrderMutationFn = Apollo.MutationFunction<SaveGalleryOrderMutation, SaveGalleryOrderMutationVariables>;

/**
 * __useSaveGalleryOrderMutation__
 *
 * To run a mutation, you first call `useSaveGalleryOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveGalleryOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveGalleryOrderMutation, { data, loading, error }] = useSaveGalleryOrderMutation({
 *   variables: {
 *      list: // value for 'list'
 *   },
 * });
 */
export function useSaveGalleryOrderMutation(baseOptions?: Apollo.MutationHookOptions<SaveGalleryOrderMutation, SaveGalleryOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveGalleryOrderMutation, SaveGalleryOrderMutationVariables>(SaveGalleryOrderDocument, options);
      }
export type SaveGalleryOrderMutationHookResult = ReturnType<typeof useSaveGalleryOrderMutation>;
export type SaveGalleryOrderMutationResult = Apollo.MutationResult<SaveGalleryOrderMutation>;
export type SaveGalleryOrderMutationOptions = Apollo.BaseMutationOptions<SaveGalleryOrderMutation, SaveGalleryOrderMutationVariables>;
export const GalleryDocument = gql`
    query Gallery {
  gallery {
    id
    src
  }
}
    `;

/**
 * __useGalleryQuery__
 *
 * To run a query within a React component, call `useGalleryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGalleryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGalleryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGalleryQuery(baseOptions?: Apollo.QueryHookOptions<GalleryQuery, GalleryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GalleryQuery, GalleryQueryVariables>(GalleryDocument, options);
      }
export function useGalleryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GalleryQuery, GalleryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GalleryQuery, GalleryQueryVariables>(GalleryDocument, options);
        }
export type GalleryQueryHookResult = ReturnType<typeof useGalleryQuery>;
export type GalleryLazyQueryHookResult = ReturnType<typeof useGalleryLazyQuery>;
export type GalleryQueryResult = Apollo.QueryResult<GalleryQuery, GalleryQueryVariables>;
export const IsDraftDocument = gql`
    query IsDraft {
  isDraft
}
    `;

/**
 * __useIsDraftQuery__
 *
 * To run a query within a React component, call `useIsDraftQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsDraftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsDraftQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsDraftQuery(baseOptions?: Apollo.QueryHookOptions<IsDraftQuery, IsDraftQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsDraftQuery, IsDraftQueryVariables>(IsDraftDocument, options);
      }
export function useIsDraftLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsDraftQuery, IsDraftQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsDraftQuery, IsDraftQueryVariables>(IsDraftDocument, options);
        }
export type IsDraftQueryHookResult = ReturnType<typeof useIsDraftQuery>;
export type IsDraftLazyQueryHookResult = ReturnType<typeof useIsDraftLazyQuery>;
export type IsDraftQueryResult = Apollo.QueryResult<IsDraftQuery, IsDraftQueryVariables>;
export const SaveProductDocument = gql`
    mutation SaveProduct($product: ProductInput!) {
  saveProduct(product: $product) {
    id
    ...Form
  }
}
    ${FormFragmentDoc}`;
export type SaveProductMutationFn = Apollo.MutationFunction<SaveProductMutation, SaveProductMutationVariables>;

/**
 * __useSaveProductMutation__
 *
 * To run a mutation, you first call `useSaveProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveProductMutation, { data, loading, error }] = useSaveProductMutation({
 *   variables: {
 *      product: // value for 'product'
 *   },
 * });
 */
export function useSaveProductMutation(baseOptions?: Apollo.MutationHookOptions<SaveProductMutation, SaveProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveProductMutation, SaveProductMutationVariables>(SaveProductDocument, options);
      }
export type SaveProductMutationHookResult = ReturnType<typeof useSaveProductMutation>;
export type SaveProductMutationResult = Apollo.MutationResult<SaveProductMutation>;
export type SaveProductMutationOptions = Apollo.BaseMutationOptions<SaveProductMutation, SaveProductMutationVariables>;
export const SaveCropDocument = gql`
    mutation SaveCrop($id: ID!, $crop: CropInput!) {
  saveCrop(id: $id, crop: $crop) {
    id
    crop {
      anchor {
        x
        y
      }
      factor
    }
  }
}
    `;
export type SaveCropMutationFn = Apollo.MutationFunction<SaveCropMutation, SaveCropMutationVariables>;

/**
 * __useSaveCropMutation__
 *
 * To run a mutation, you first call `useSaveCropMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveCropMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCropMutation, { data, loading, error }] = useSaveCropMutation({
 *   variables: {
 *      id: // value for 'id'
 *      crop: // value for 'crop'
 *   },
 * });
 */
export function useSaveCropMutation(baseOptions?: Apollo.MutationHookOptions<SaveCropMutation, SaveCropMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveCropMutation, SaveCropMutationVariables>(SaveCropDocument, options);
      }
export type SaveCropMutationHookResult = ReturnType<typeof useSaveCropMutation>;
export type SaveCropMutationResult = Apollo.MutationResult<SaveCropMutation>;
export type SaveCropMutationOptions = Apollo.BaseMutationOptions<SaveCropMutation, SaveCropMutationVariables>;
export const ProductDocument = gql`
    query Product($id: ID!) {
  product(id: $id) {
    id
    title
    state
    ...Form
    pictures {
      id
      ...PictureEditModal
    }
  }
}
    ${FormFragmentDoc}
${PictureEditModalFragmentDoc}`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const ProductsDocument = gql`
    query Products {
  products {
    id
    ...ProductCard
  }
}
    ${ProductCardFragmentDoc}`;

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
export const PublishDocument = gql`
    mutation Publish {
  publish {
    status
    log
  }
}
    `;
export type PublishMutationFn = Apollo.MutationFunction<PublishMutation, PublishMutationVariables>;

/**
 * __usePublishMutation__
 *
 * To run a mutation, you first call `usePublishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishMutation, { data, loading, error }] = usePublishMutation({
 *   variables: {
 *   },
 * });
 */
export function usePublishMutation(baseOptions?: Apollo.MutationHookOptions<PublishMutation, PublishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishMutation, PublishMutationVariables>(PublishDocument, options);
      }
export type PublishMutationHookResult = ReturnType<typeof usePublishMutation>;
export type PublishMutationResult = Apollo.MutationResult<PublishMutation>;
export type PublishMutationOptions = Apollo.BaseMutationOptions<PublishMutation, PublishMutationVariables>;
export const LogDocument = gql`
    query Log($id: String!) {
  publication(id: $id) {
    id
    status
    log
    ...Publication
  }
}
    ${PublicationFragmentDoc}`;

/**
 * __useLogQuery__
 *
 * To run a query within a React component, call `useLogQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLogQuery(baseOptions: Apollo.QueryHookOptions<LogQuery, LogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogQuery, LogQueryVariables>(LogDocument, options);
      }
export function useLogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogQuery, LogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogQuery, LogQueryVariables>(LogDocument, options);
        }
export type LogQueryHookResult = ReturnType<typeof useLogQuery>;
export type LogLazyQueryHookResult = ReturnType<typeof useLogLazyQuery>;
export type LogQueryResult = Apollo.QueryResult<LogQuery, LogQueryVariables>;
export const PublicationsDocument = gql`
    query Publications {
  publications {
    id
    ...Publication
  }
  publicationDuration
}
    ${PublicationFragmentDoc}`;

/**
 * __usePublicationsQuery__
 *
 * To run a query within a React component, call `usePublicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicationsQuery(baseOptions?: Apollo.QueryHookOptions<PublicationsQuery, PublicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicationsQuery, PublicationsQueryVariables>(PublicationsDocument, options);
      }
export function usePublicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicationsQuery, PublicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicationsQuery, PublicationsQueryVariables>(PublicationsDocument, options);
        }
export type PublicationsQueryHookResult = ReturnType<typeof usePublicationsQuery>;
export type PublicationsLazyQueryHookResult = ReturnType<typeof usePublicationsLazyQuery>;
export type PublicationsQueryResult = Apollo.QueryResult<PublicationsQuery, PublicationsQueryVariables>;
export const MeDocument = gql`
    query Me {
  user {
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
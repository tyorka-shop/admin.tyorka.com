import * as Types from '../../../types/gql';

export type ItemFragment = { __typename?: 'Product', id: string, title: { __typename?: 'MultiLang', ru: string }, cover: { __typename?: 'Picture', id: string, src: string } };

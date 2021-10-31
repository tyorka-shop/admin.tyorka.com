import * as Types from '../../types/gql';

export type PictureEditorFragment = { __typename?: 'Picture', id: string, src: string, crop: { __typename?: 'Crop', factor: number, anchor: { __typename?: 'Point', x: number, y: number } }, originalSize: { __typename?: 'Size', width: number, height: number } };

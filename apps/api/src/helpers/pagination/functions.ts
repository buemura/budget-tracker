import { DEFAULT_PAGINATION } from './constants';
import {
  PaginationMetadataProps,
  PaginationMetadataResponse,
  SliceParamsProps,
  SliceParamsResponse,
} from './types';

function getMetadata({
  data,
  page = DEFAULT_PAGINATION.PAGE,
  items = DEFAULT_PAGINATION.ITEMS,
}: PaginationMetadataProps): PaginationMetadataResponse {
  return {
    page,
    items,
    totalPages: Math.ceil(data.length / items),
    totalItems: data.length,
  };
}

function getSliceParams({
  page = DEFAULT_PAGINATION.PAGE,
  items = DEFAULT_PAGINATION.ITEMS,
}: SliceParamsProps): SliceParamsResponse {
  return {
    start: (page - 1) * items,
    end: page * items,
  };
}

export const paginationHelper = {
  getMetadata,
  getSliceParams,
};

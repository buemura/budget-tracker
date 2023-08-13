export class PaginationMetadataProps {
  data: any[];
  page?: number;
  items?: number;
}

export class SliceParamsProps {
  page?: number;
  items?: number;
}

export class SliceParamsResponse {
  start: number;
  end: number;
}

export class PaginationMetadataResponse {
  page: number;
  items: number;
  totalPages: number;
  totalItems: number;
}

export class PaginationQueryParams {
  page?: number;
  items?: number;
}

export interface IFindPaginatedByUser {
  userId: string;
  pagination?: PaginationQueryParams;
}

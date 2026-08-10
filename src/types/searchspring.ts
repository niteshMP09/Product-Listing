export interface Pagination {
  totalResults: number;
  begin: number;
  end: number;
  currentPage: number;
  totalPages: number;
  previousPage: number;
  nextPage: number;
  perPage: number;
  defaultPerPage: number;
}

export interface SortOption {
  field: string;
  direction: "asc" | "desc";
  label: string;
}

export interface Sorting {
  options: SortOption[];
}

export interface ProductBadge {
  tag: string;
  value: string;
}

export interface Product {
  id: string;
  uid: string;

  name: string;
  title?: string[];

  brand?: string;

  thumbnailImageUrl: string;
  imageUrl: string;

  price: string;
  msrp?: string;
  sale_price?: string[];
  ss_sale_price?: string;

  on_sale?: string[];

  color?: string[];
  color_family?: string[];

  size?: string[];

  rating?: string;
  ratingCount?: string;

  badges?: ProductBadge[];

  product_type?: string[];

  description?: string;

  url: string;

  sku?: string;
}

export interface FacetValue {
  active: boolean;
  type: "value" | "range";
  value?: string;
  label: string;
  count: number;

  low?: string;
  high?: string;
}

export interface Facet {
  field: string;
  label: string;
  type: string;
  multiple: string;
  collapse: number;
  facet_active: number;
  hierarchyDelimiter?: string;
  values: FacetValue[];
}

export interface FilterSummary {
  field?: string;
  value?: string;
  label?: string;
}

export interface SearchResponse {
  pagination: Pagination;

  sorting: Sorting;

  resultLayout: "grid" | "list";

  results: Product[];

  facets: Facet[];

  breadcrumbs: unknown[];

  filterSummary: FilterSummary[];

  merchandising?: unknown;
}

export type SelectedFilters = Record<
  string,
  string[]
>;
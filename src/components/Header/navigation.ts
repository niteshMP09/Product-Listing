export interface NavigationItem {
  label: string;
  filterField: string;
  filterValue: string;
}

export const navigationItems: NavigationItem[] = [
  {
    label: "New Arrivals",
    filterField: "ss_category_hierarchy",
    filterValue: "What's New",
  },
  {
    label: "Women",
    filterField: "ss_category_hierarchy",
    filterValue: "Gifts for Her",
  },
  {
    label: "Accessories",
    filterField: "ss_category_hierarchy",
    filterValue: "All Accessories",
  },
];

export const createFilterUrl = (
  field: string,
  value: string,
) => {
  const params = new URLSearchParams();

  params.set(`filter.${field}`, value);
  params.set("page", "1");

  return `/?${params.toString()}`;
};
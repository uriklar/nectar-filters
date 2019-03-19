import { useContext, useCallback } from "react";
import { FilterStoreContext } from "../stores/provider";

export function useFilterCategory({ category }) {
  const filterStore = useContext(FilterStoreContext);
  const isSelected = filterStore.selectedCategory === category;
  const count = Object.keys(filterStore.selectedFilters[category] || {}).length;
  const onSelect = useCallback(() => {
    filterStore.selectCategory(category);
  }, [category]);

  return {
    isSelected,
    count,
    onSelect
  };
}

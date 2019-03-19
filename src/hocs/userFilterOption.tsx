import { useContext, useState, useCallback } from "react";
import { FilterStoreContext } from "../stores/provider";
import { _difference } from "../utils";
import { IFilterOption } from "../data/filter-options";

export function useFilterOptions({ category }) {
  const filterStore = useContext(FilterStoreContext);

  //#region init variables

  const selectedCategoryFilters = filterStore.selectedFilters[category] || {};
  // Initialize local state with global state
  const [selectedOptions, setSelectedOptions] = useState(
    selectedCategoryFilters
  );
  const localKeys = Object.keys(selectedOptions);
  const globalKeys = Object.keys(selectedCategoryFilters);

  //#endregion init variables

  // Only show actions if local state is different from global state
  const showActions =
    _difference([localKeys, globalKeys]).length ||
    _difference([globalKeys, localKeys]).length;

  // Remove key from local state if exists, add it otherwise
  const onSelect = useCallback(
    (option: IFilterOption) => {
      let nextValue;
      if (selectedOptions[option.id]) {
        // TODO
        //@ts-ignore
        const {
          [option.id]: optionToRemove,
          ...remainingOptions
        } = selectedOptions;
        nextValue = remainingOptions;
      } else {
        nextValue = {
          ...selectedOptions,
          [option.id]: true
        };
      }

      setSelectedOptions(nextValue);
    },
    [selectedOptions]
  );

  const reset = useCallback(() => {
    setSelectedOptions(selectedCategoryFilters);
  }, [selectedCategoryFilters]);

  const applyFilters = useCallback(() => {
    filterStore.applyFilters(category, selectedOptions);
  }, [category, selectedOptions, filterStore]);

  return {
    showActions,
    onSelect,
    selectedOptions,
    reset,
    applyFilters
  };
}

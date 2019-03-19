import React from "react";
import { IFilterOption } from "../data/filter-options";
import FilterOption from "./FilterOption";
import styles from "./FilterOptions.module.css";
import { useFilterOptions } from "../hocs/userFilterOption";

interface FilterOptionsProps {
  options: IFilterOption[];
  category: string;
}

const FilterOptions: React.FunctionComponent<FilterOptionsProps> = props => {
  const {
    showActions,
    onSelect,
    selectedOptions,
    reset,
    applyFilters
  } = useFilterOptions(props);
  return (
    <div>
      <div className={styles.options}>
        {props.options.map(option => (
          <FilterOption
            option={option}
            category={props.category}
            key={option.id}
            onSelect={onSelect}
            selected={selectedOptions[option.id]}
          />
        ))}
      </div>

      {showActions ? (
        <div className={styles.actions}>
          <button onClick={reset}>Cancel</button>

          <button onClick={applyFilters}>Apply</button>
        </div>
      ) : null}
    </div>
  );
};

export default FilterOptions;

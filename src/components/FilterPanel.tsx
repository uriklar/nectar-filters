import React, { useContext } from "react";
import FilterCategory from "./FilterCategory";
import styles from "./FilterPanel.module.css";
import { FilterStoreContext } from "../stores/provider";

interface FilterPanelProps {}

const FilterPanel: React.FunctionComponent<FilterPanelProps> = props => {
  const filterStore = useContext(FilterStoreContext);

  return (
    <div className={styles.container}>
      {Object.keys(filterStore.options).map(category => (
        <FilterCategory
          category={category}
          options={filterStore.options[category]}
          key={category}
        />
      ))}
    </div>
  );
};

export default FilterPanel;

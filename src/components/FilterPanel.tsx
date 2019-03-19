import React, { useContext } from "react";
import FilterCategory from "./FilterCategory";
import styles from "./FilterPanel.module.css";
import { FilterStoreContext } from "../stores/provider";
import { useMedia } from "../hocs/useMedia";
import MoreFilters from "./MoreFilters";
import { MOBILE_MEDIA_QUERY } from "../constants";

interface FilterPanelProps {}

const FilterPanel: React.FunctionComponent<FilterPanelProps> = props => {
  const filterStore = useContext(FilterStoreContext);
  const isMobile = useMedia(MOBILE_MEDIA_QUERY);

  if (isMobile) {
    const [first, second, ...rest] = filterStore.categories;

    return (
      <div className={styles.container}>
        <FilterCategory
          category={first}
          options={filterStore.options[first]}
          key={first}
          isMobile={true}
        />
        <FilterCategory
          category={second}
          options={filterStore.options[second]}
          key={second}
          isMobile={true}
        />
        <MoreFilters categories={rest} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {filterStore.categories.map(category => (
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

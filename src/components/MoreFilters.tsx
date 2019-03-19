import React, { useContext, useState } from "react";
import styles from "./MoreFilters.module.css";
import categoryStyles from "./FilterCategory.module.css";
import { FilterStoreContext } from "../stores/provider";
import MobileFilterCategory from "./MobileFilterCategory";
import { useToggle } from "../hocs/useToggle";
import DropdownContainer from "./DropdownContainer";

interface MoreFiltersProps {
  categories: string[];
}

const MoreFilters: React.FunctionComponent<MoreFiltersProps> = props => {
  const filterStore = useContext(FilterStoreContext);
  const { on, toggle } = useToggle();

  return (
    <div className={styles.container}>
      <div
        className={categoryStyles.container}
        onClick={() => {
          toggle();
          filterStore.selectCategory(null);
        }}
      >
        More Filters
      </div>
      {on && (
        <DropdownContainer>
          {props.categories.map(category => (
            <MobileFilterCategory
              category={category}
              options={filterStore.options[category]}
              key={category}
            />
          ))}
        </DropdownContainer>
      )}
    </div>
  );
};

export default MoreFilters;

import React, { useContext } from "react";
import { FilterStoreContext } from "../stores/provider";
import { observer } from "mobx-react-lite";
import FilterOption from "./FilterOption";
import styles from "./AppliedFilters.module.css";
import categoryStyles from "./FilterCategory.module.css";

interface AppliedFiltersProps {}

const AppliedFilters: React.FunctionComponent<AppliedFiltersProps> = observer(
  props => {
    const filterStore = useContext(FilterStoreContext);

    return (
      <div className={styles.container}>
        <span style={{ marginRight: "10px" }}>Applied Filters:</span>
        {filterStore.appliedFilters.map(optionId => {
          const appliedOption = filterStore.optionsHash[optionId];
          return (
            <FilterOption
              option={{ id: appliedOption.id, title: appliedOption.title }}
              category={appliedOption.category}
              removable
            />
          );
        })}
        {!!filterStore.appliedFilters.length && (
          <div
            className={categoryStyles.container}
            onClick={() => filterStore.clearAll()}
          >
            Clear all
          </div>
        )}
      </div>
    );
  }
);

export default AppliedFilters;

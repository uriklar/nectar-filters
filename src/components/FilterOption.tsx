import React, { useContext } from "react";
import { IFilterOption } from "../data/filter-options";
import categoryStyles from "./FilterCategory.module.css";
import appStyles from "../App.module.css";
import styles from "./FilterOption.module.css";
import { FilterStoreContext } from "../stores/provider";

interface FilterOptionProps {
  option: IFilterOption;
  category: string;
  onSelect?: (option: IFilterOption) => void;
  selected?: boolean;
  removable?: boolean;
}

const FilterOption: React.FunctionComponent<FilterOptionProps> = props => {
  const filterStore = useContext(FilterStoreContext);

  return (
    <div
      onClick={() => props.onSelect && props.onSelect(props.option)}
      className={`${styles.container} ${categoryStyles.container} ${
        props.selected ? appStyles.selected : ""
      }`}
    >
      {props.option.title}

      {props.removable && (
        <div
          className={styles.x}
          onClick={() =>
            filterStore.removeFilter(props.category, props.option.id)
          }
        >
          X
        </div>
      )}
    </div>
  );
};

export default FilterOption;

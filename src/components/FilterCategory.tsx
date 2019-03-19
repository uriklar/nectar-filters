import React, { useContext } from "react";
import { IFilterOption } from "../data/filter-options";
import styles from "./FilterCategory.module.css";
import appStyles from "../App.module.css";
import { FilterStoreContext } from "../stores/provider";
import { observer } from "mobx-react-lite";
import DropdownContainer from "./DropdownContainer";
import FilterOptions from "./FilterOptions";

interface FilterCategoryProps {
  category: string;
  options: IFilterOption[];
}

const FilterCategory: React.FunctionComponent<FilterCategoryProps> = observer(
  props => {
    const filterStore = useContext(FilterStoreContext);
    const isSelected = filterStore.selectedCategory === props.category;

    return (
      <div className={styles.wrapper}>
        <div
          onClick={() => filterStore.selectCategory(props.category)}
          className={`${styles.container} ${
            isSelected ? appStyles.selected : ""
          }`}
        >
          {props.category}
        </div>
        {isSelected && (
          <DropdownContainer>
            <FilterOptions options={props.options} category={props.category} />
          </DropdownContainer>
        )}
      </div>
    );
  }
);

export default FilterCategory;

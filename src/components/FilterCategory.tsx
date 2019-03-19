import React from "react";
import { IFilterOption } from "../data/filter-options";
import styles from "./FilterCategory.module.css";
import appStyles from "../App.module.css";
import { observer } from "mobx-react-lite";
import DropdownContainer from "./DropdownContainer";
import FilterOptions from "./FilterOptions";
import { useFilterCategory } from "../hocs/useFilterCategory";

interface FilterCategoryProps {
  category: string;
  options: IFilterOption[];
  isMobile?: boolean;
}

const FilterCategory: React.FunctionComponent<FilterCategoryProps> = observer(
  props => {
    const { isSelected, count, onSelect } = useFilterCategory(props);
    return (
      <div className={props.isMobile ? "" : styles.wrapper}>
        <div
          onClick={onSelect}
          className={`${styles.container} ${
            isSelected ? appStyles.selected : ""
          }`}
        >
          {props.category} {count ? `(${count})` : null}
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

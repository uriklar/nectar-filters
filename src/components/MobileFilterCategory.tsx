import React from "react";
import { IFilterOption } from "../data/filter-options";
import styles from "./MobileFilterCategory.module.css";
import { observer } from "mobx-react-lite";
import FilterOptions from "./FilterOptions";
import { useFilterCategory } from "../hocs/useFilterCategory";

interface MobileFilterCategoryProps {
  category: string;
  options: IFilterOption[];
  isMobile?: boolean;
}

const MobileFilterCategory: React.FunctionComponent<
  MobileFilterCategoryProps
> = observer(props => {
  const { isSelected, count, onSelect } = useFilterCategory(props);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>
          {props.category} {count ? `(${count})` : null}
        </span>
        <span onClick={onSelect}>{isSelected ? "-" : "+"}</span>
      </div>
      {isSelected && (
        <FilterOptions options={props.options} category={props.category} />
      )}
    </div>
  );
});

export default MobileFilterCategory;

import * as React from "react";
import styles from "./DropdownContainer.module.css";

interface DropdownContainerProps {}

const DropdownContainer: React.FunctionComponent<
  DropdownContainerProps
> = props => {
  return <div className={styles.container}>{props.children}</div>;
};

export default DropdownContainer;

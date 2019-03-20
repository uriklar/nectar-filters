import * as React from "react";
import styles from "./DropdownContainer.module.css";
import { useMedia } from "../hocs/useMedia";
import { MOBILE_MEDIA_QUERY } from "../constants";

interface DropdownContainerProps {}

const DropdownContainer: React.FunctionComponent<
  DropdownContainerProps
> = props => {
  const isMobile = useMedia(MOBILE_MEDIA_QUERY);

  return (
    <div
      className={`${styles.container} ${isMobile ? styles.mobile : ""}`}
      data-testid="dropdown-container"
    >
      {props.children}
    </div>
  );
};

export default DropdownContainer;

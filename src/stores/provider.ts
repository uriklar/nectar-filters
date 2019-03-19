import React from "react";
import FilterStore from "./filter.store";
import filterOptions from "../data/filter-options";

const filterStore = new FilterStore(filterOptions);

export const FilterStoreContext = React.createContext(filterStore);

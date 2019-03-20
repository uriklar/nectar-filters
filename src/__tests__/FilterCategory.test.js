import React from "react";

import FilterStore from "../stores/filter.store";
import { render, fireEvent } from "react-testing-library";
import FilterCategory from "../components/FilterCategory";

const OPTIONS = {
  size: [
    { id: "s", title: "S" },
    { id: "m", title: "M" },
    { id: "l", title: "L" }
  ],
  quality: [
    { id: "high", title: "High" },
    { id: "medium", title: "Medium" },
    { id: "low", title: "Low" }
  ]
};

let filterStore;
let FilterStoreContext;

const renderComponent = ({ category, options }) => {
  return render(
    <FilterStoreContext.Provider value={filterStore}>
      <FilterCategory category={category} options={options} />
    </FilterStoreContext.Provider>
  );
};

beforeEach(() => {
  filterStore = new FilterStore(OPTIONS);
  FilterStoreContext = React.createContext(filterStore);
});

test("should show dropdown after clicking category title", () => {
  const { getByTestId, getByText, queryByTestId } = renderComponent({
    category: "quality",
    options: OPTIONS.quality
  });

  expect(queryByTestId("dropdown-container")).toBeNull();

  fireEvent.click(getByText(/quality/i));

  expect(getByTestId("dropdown-container")).toBeTruthy();
});
test("should show dropdown with correct options", () => {
  const { getByText, queryByTestId } = renderComponent({
    category: "size",
    options: OPTIONS.size
  });

  expect(queryByTestId("dropdown-container")).toBeNull();

  fireEvent.click(getByText(/size/i));

  expect(getByText(/M/i)).toBeTruthy();
});

test("should close dropdown when clicking title again", () => {
  const { getByTestId, getByText, queryByTestId } = renderComponent({
    category: "quality",
    options: OPTIONS.quality
  });

  expect(queryByTestId("dropdown-container")).toBeNull();

  fireEvent.click(getByText(/quality/i));

  expect(getByTestId("dropdown-container")).toBeTruthy();

  fireEvent.click(getByText(/quality/i));
  expect(queryByTestId("dropdown-container")).toBeNull();
});

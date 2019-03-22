import React from "react";

import { render, fireEvent } from "react-testing-library";
import FilterCategory from "../components/FilterCategory";
import { FilterStoreContext } from "../stores/provider";
import FilterStore from "../stores/filter.store";

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

const renderComponent = ({ category, options }) => {
  return render(
    <FilterStoreContext.Provider value={new FilterStore(OPTIONS)}>
      <FilterCategory category={category} options={options} />
    </FilterStoreContext.Provider>
  );
};

describe("FilterCategory", () => {
  test("should show dropdown after clicking category title", () => {
    const { getByTestId, getByText, queryByTestId } = renderComponent({
      category: "size",
      options: OPTIONS.size
    });

    expect(queryByTestId("dropdown-container")).toBeNull();

    fireEvent.click(getByText(/size/i));
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
      category: "size",
      options: OPTIONS.size
    });

    expect(queryByTestId("dropdown-container")).toBeNull();

    fireEvent.click(getByText(/size/i));

    expect(getByTestId("dropdown-container")).toBeTruthy();

    fireEvent.click(getByText(/size/i));
    expect(queryByTestId("dropdown-container")).toBeNull();
  });
});

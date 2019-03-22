import React from "react";

import { render, fireEvent } from "react-testing-library";
import FilterOptions from "../components/FilterOptions";

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
  return render(<FilterOptions category={category} options={options} />);
};

describe("FilterOptions", () => {
  test("should show options", () => {
    const { getByText } = renderComponent({
      category: "quality",
      options: OPTIONS.quality
    });

    expect(getByText(/Medium/i)).toBeTruthy();
  });

  test("should select option on click", () => {
    const { getByText } = renderComponent({
      category: "quality",
      options: OPTIONS.quality
    });

    expect(getByText(/Medium/i)).toBeTruthy();
    expect(getByText(/Medium/i).className).not.toContain("selected");

    fireEvent.click(getByText(/Medium/i));
    expect(getByText(/Medium/i).className).toContain("selected");
  });

  test("should show actions once selecting an option", () => {
    const { getByText, queryByText } = renderComponent({
      category: "quality",
      options: OPTIONS.quality
    });

    expect(queryByText(/Apply/i)).toBeNull();

    fireEvent.click(getByText(/Medium/i));

    expect(getByText(/Apply/i)).toBeTruthy();
  });

  test("should clear selected and actions when clicking cancel", () => {
    const { getByText, queryByText } = renderComponent({
      category: "quality",
      options: OPTIONS.quality
    });

    fireEvent.click(getByText(/Medium/i));
    expect(getByText(/Medium/i).className).toContain("selected");

    fireEvent.click(getByText(/Cancel/i));

    expect(queryByText(/Cancel/i)).toBeNull();
    expect(getByText(/Medium/i).className).not.toContain("selected");
  });
});

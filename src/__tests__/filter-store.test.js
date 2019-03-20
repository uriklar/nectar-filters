import FilterStore from "../stores/filter.store";

let filterStore;

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

beforeEach(() => {
  filterStore = new FilterStore(OPTIONS);
});

describe("FilterStore", () => {
  test("it initializes with data", () => {
    expect(filterStore.categories.length).toEqual(2);
  });

  describe("selectCategory", () => {
    test("selects the correct category", () => {
      expect(filterStore.selectedCategory).toBeNull();

      filterStore.selectCategory("size");

      expect(filterStore.selectedCategory).toEqual("size");
    });

    test("can set category to null", () => {
      expect(filterStore.selectedCategory).toBeNull();

      filterStore.selectCategory("size");

      expect(filterStore.selectedCategory).toEqual("size");

      filterStore.selectCategory(null);
      expect(filterStore.selectedCategory).toBeNull();
    });
  });

  describe("applyFilters", () => {
    test("adds filters to store", () => {
      filterStore.applyFilters("size", { s: true });
      filterStore.applyFilters("quality", { low: true, medium: true });

      expect(filterStore.appliedFilters.length).toEqual(3);
      expect(filterStore.appliedFilters.includes("s")).toBeTruthy();
    });
  });

  describe("removeFilter", () => {
    test("removes the filter from the store", () => {
      filterStore.applyFilters("size", { s: true });
      expect(filterStore.appliedFilters.length).toEqual(1);

      filterStore.removeFilter("size", "s");

      expect(filterStore.appliedFilters.length).toEqual(0);
    });

    test("removing a non-existing filter should do nothing", () => {
      filterStore.applyFilters("size", { s: true });
      filterStore.removeFilter("size", "xxl");
      expect(filterStore.appliedFilters.length).toEqual(1);
    });
  });

  describe("clearAll", () => {
    test("should clear all selected filters", () => {
      filterStore.applyFilters("size", { s: true });
      filterStore.applyFilters("quality", { low: true, medium: true });

      filterStore.clearAll();

      expect(filterStore.appliedFilters.length).toEqual(0);
    });
  });
});

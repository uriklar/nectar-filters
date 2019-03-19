import { IFilterOption } from "./../data/filter-options";
import { observable, action, computed } from "mobx";
import { TFilters } from "../data/filter-options";

interface AppliedFilter {
  category: string;
  option: IFilterOption;
}

export default class FilterStore {
  @observable options: TFilters;
  @observable selectedCategory: string | null = null;
  @observable selectedFilters: Record<string, Record<string, boolean>> = {};

  constructor(filterOptions: TFilters) {
    this.options = filterOptions;
  }

  @computed
  get optionsHash() {
    return Object.keys(this.options).reduce((acc, category) => {
      const categoryOptions = this.options[category];

      categoryOptions.forEach(option => {
        // TODO
        // @ts-ignore
        acc[option.id] = { ...option, category };
      });

      return acc;
    }, {});
  }

  @computed
  get categories() {
    return Object.keys(this.options);
  }

  @computed
  get appliedFilters() {
    // TODO
    // @ts-ignore
    return Object.keys(this.selectedFilters).reduce((acc, category) => {
      return [...acc, ...Object.keys(this.selectedFilters[category])];
    }, []);
  }

  @action
  selectCategory(category: string | null) {
    this.selectedCategory =
      this.selectedCategory === category ? null : category;
  }

  @action
  applyFilters(category: string, options: Record<string, boolean>) {
    this.selectedFilters[category] = !this.selectedFilters[category] || {};
    this.selectedFilters[category] = options;
    this.selectedCategory = null;
  }

  @action
  removeFilter(category: string, optionId: string) {
    const {
      [optionId]: optionToRemove,
      ...remainingOptions
    } = this.selectedFilters[category];

    this.selectedFilters[category] = remainingOptions;
  }

  @action
  clearAll() {
    this.selectedFilters = {};
  }
}

import DropDown from '../../components/DropDown';
import type { Component } from '../../interface';
import type { Category, SortBy } from '../../type';
import { FILTER_CATEGORY_OPTIONS, FILTER_SORT_BY_OPTIONS } from '../../utils/constants';

type RestaurantFilterContainerState = {
  category: Category;
  sortBy: SortBy;
  onChangeCategory: (e: Event) => void;
  onChangeSortBy: (e: Event) => void;
};

type RestaurantFilterContainerProps = {
  $parent: HTMLElement;
  category: Category;
  sortBy: SortBy;
  onChangeCategory: (e: Event) => void;
  onChangeSortBy: (e: Event) => void;
};

class RestaurantFilterContainer implements Component<RestaurantFilterContainerState> {
  $target: HTMLElement;
  state: RestaurantFilterContainerState;

  constructor({
    $parent,
    category,
    sortBy,
    onChangeCategory,
    onChangeSortBy,
  }: RestaurantFilterContainerProps) {
    this.$target = document.createElement('section');
    this.$target.classList.add('restaurant-filter-container');

    this.state = {
      category,
      sortBy,
      onChangeCategory,
      onChangeSortBy,
    };

    $parent.append(this.$target);
  }

  setState(newState: RestaurantFilterContainerState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$target.innerHTML = ``;
    new DropDown({
      $parent: this.$target,
      name: 'category',
      id: 'category-filter',
      classNames: 'restaurant-filter',
      selectedOption: this.state.category,
      options: FILTER_CATEGORY_OPTIONS,
      onChangeHandler: this.state.onChangeCategory,
    }).render();
    new DropDown({
      $parent: this.$target,
      name: 'sorting',
      id: 'sorting-filter',
      classNames: 'restaurant-filter',
      options: FILTER_SORT_BY_OPTIONS,
      selectedOption: this.state.sortBy,
      onChangeHandler: this.state.onChangeSortBy,
    }).render();
  }
}

export default RestaurantFilterContainer;
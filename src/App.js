import RestaurantList from './components/RestaurantList';

import Restaurants from './domain/Restaurants';
import Validator from './domain/Validator';

import { $ } from './utils/dom';
import store from './utils/store';

export default class App {
  #restaurants;

  constructor() {
    const restaurantsData = store.getLocalStorage();
    this.#restaurants = new Restaurants(restaurantsData);
    this.renderRestaurantListByFilterOptions();
    this.init();
  }

  init() {
    $('.add-restaurant-form').addEventListener('submit', this.onSubmitAddRestaurantForm.bind(this));
    $('.restaurant-filter-container').addEventListener(
      'change',
      this.renderRestaurantListByFilterOptions.bind(this)
    );
    $('.modal-open-button').addEventListener('click', this.toggleModal);
    $('.modal-close-button').addEventListener('click', this.toggleModal);
  }

  onSubmitAddRestaurantForm(e) {
    e.preventDefault();

    const {
      category: { value: category },
      name: { value: name },
      distance: { value: distance },
      description: { value: description },
      link: { value: link },
    } = e.target.elements;

    try {
      Validator.validateFormData({ category, name, distance });
    } catch ({ message }) {
      alert(message);

      return;
    }

    const restaurant = {
      category,
      name,
      distance,
      description,
      link,
    };

    this.#restaurants.addRestaurant(restaurant);
    store.setLocalStorage(this.#restaurants.getRestaurants());

    e.target.reset();
    this.toggleModal();

    this.renderRestaurantListByFilterOptions();
  }

  renderRestaurantListByFilterOptions() {
    const categoryOption = $('#category-filter').value;
    const sortOption = $('#sorting-filter').value;

    const filterdRestaurants = this.#restaurants.getFilteredRestaurantsByCategory(categoryOption);

    const sortedRestaurants = this.#restaurants.getSortedRestaurants(
      filterdRestaurants,
      sortOption
    );

    RestaurantList.render(sortedRestaurants);
  }

  toggleModal() {
    $('.modal').classList.toggle('modal--open');
  }
}
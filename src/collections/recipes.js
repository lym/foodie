import Backbone from 'backbone';
import Recipe from '../models/recipe';

var { Model, View, Collection, Router, LocalStorage } = Backbone;

class RecipesCollection extends Backbone.Collection.extend({}) {
  constructor(options) {
    super(options);
    this.model = Recipe;
    this.url = "http://127.0.0.1:5000/recipes/";
  }
}

var Recipes = new RecipesCollection();

export default Recipes;

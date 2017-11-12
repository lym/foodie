import Backbone from 'backbone';

var { Model, View, Collection, Router, LocalStorage } = Backbone;


class BaseModel extends Model {
  /*
  constructor() {
    super();
    // this.defaults = {};
    this.idAttribute = 'id';
  }
  */
  url() {
    let links = this.get('links');
    let url   = links && links.self;
    if (!url) {
      // url = Backbone.Model.prototype.url.call(this);
      url = super.url;
    }
    return url;
  }
}

class Recipe extends BaseModel {
  constructor() {
    super();
  }
}

class Recipes extends Collection {
  constructor(options) {
    super(options);
    this.model = Recipe;
    this.url = "http://127.0.0.1:5000/recipes/";
  }
}

export {Recipes};

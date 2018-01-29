import Backbone from 'backbone';

class BaseModel extends Backbone.Model.extend({}) {
  constructor() {
    super();
    this.defaults = {};
    this.idAttribute = 'id';
  }
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

export default Recipe;

import $ from "jquery";
import Backbone from 'backbone';

/* This class declaration looks rather contrived due to the fact that Backbone
 * does not yet fully support ES6 syntax.
 */
class Session extends Backbone.Model.extend({}) {
  /*
  defaults: {
    token: null
  },
  */
  constructor() {
    super();
    this.defaults =  {
      token: null
    }
  }

  initialize(options) {
    this.options = options;
    $.ajaxPrefilter($.proxy(this._setupAuth, this));
    this.load();
  }

  load() {
    var token = localStorage.apiToken;
    if (token) {
        this.set('token', token);
    }
  }

  save(token) {
    this.set('token', token);
    if (token === null) {
        localStorage.removeItem('apiToken');
    }
    else {
        localStorage.apiToken = token;
    }
  }

  delete() {
    this.save(null);
  }

  authenticated() {
    return this.get('token') != null;
  }

  _setupAuth(settings, originalOptions, xhr) {
    if (this.authenticated()) {
      xhr.setRequestHeader(
        'Authorization',
        'Token ' + this.get('token')
      );
    }
  }
}

const session = new Session();

export default session;

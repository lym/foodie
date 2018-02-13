import Backbone from 'backbone';
import BaseModel from './recipe';

class Instruction extends BaseModel {
  constructor(url) {
    super();
    this.modelUrl = url;
  }
  url = () => {
    let result = this.modelUrl;
    return result;
  }
}

export default Instruction;

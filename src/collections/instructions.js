import Backbone from 'backbone';
import Instruction from '../models/instruction';

class InstructionsCollection extends Backbone.Collection.extend({}) {
  constructor(options) {
    super(options);
    this.model = Instruction;
    this.url = options.url;
  }
}

var Instructions = InstructionsCollection;

export default Instructions;

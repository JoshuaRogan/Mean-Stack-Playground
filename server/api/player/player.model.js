'use strict';

import mongoose from 'mongoose';

var PlayerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true},
  team: {type: String, required: true},   //team abbrev
  type: {type: String, requried: true},   //position or player
  dob: {type: Date},
  height: {type: String},
  weight: {type: Number},
  bats: {type: String},
  throws: {type: String}, 
  age: {type: Number}
});

export default mongoose.model('Player', PlayerSchema);

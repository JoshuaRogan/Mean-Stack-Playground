'use strict';

import mongoose from 'mongoose';

var PlayerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  key: {type: String, required: true, lowercase: true},
  slug: {type: String, required: true, lowercase: true},
  team: {type: String, required: true},   //team abbrev
  type: {type: String, requried: true},   //position or player
  dob: {type: Date},
  height: {type: String},
  weight: {type: Number},
  bats: {type: String},
  throws: {type: String}, 
  age: {type: Number},
  yearlyStats: {type: Array}
});

export default mongoose.model('Player', PlayerSchema);

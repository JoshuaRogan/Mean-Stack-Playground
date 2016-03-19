'use strict';

import mongoose from 'mongoose';

var PlayerSchema = new mongoose.Schema({
  name: String,
  desc: String,
  teamAbrv: String, 
  info: String,
  active: Boolean
});

export default mongoose.model('Player', PlayerSchema);

'use strict';

import mongoose from 'mongoose';

var StatisticSchema = new mongoose.Schema({
  type:    {type: String, required: true, lowercase: true}, //e.g. yearly, avg, predicted
  name:    {type: String, required: true, lowercase: true},
  value:   {type: mongoose.Schema.Types.Mixed, required: true, lowercase: true},
  group:   {type: String, lowercase: true}, 
  year:    {type: Number}
});

export default mongoose.model('Statistic', StatisticSchema);

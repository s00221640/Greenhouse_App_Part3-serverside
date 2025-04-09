import mongoose, { Schema } from 'mongoose';

const plantSchema = new Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  plantingDate: { type: Date, default: null },
  wateringFrequency: { type: Number, required: true },
  lightRequirement: { type: String, required: true },
  harvestDate: { type: Date },
  userEmail: { type: String, required: true } // Use email instead of ID
});

const Plant = mongoose.model('Plant', plantSchema);
export default Plant;
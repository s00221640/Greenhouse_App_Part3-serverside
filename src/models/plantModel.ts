import mongoose, { Document, Schema } from 'mongoose';

interface IPlant extends Document {
  name: string;
  species: string;
  plantingDate: Date;
  wateringFrequency: number;
  lightRequirement: string;
  harvestDate?: Date;
  userId: mongoose.Types.ObjectId; // Associate plant with a user
}

const plantSchema = new Schema<IPlant>({
  name: { type: String, required: true },
  species: { type: String, required: true },
  plantingDate: { type: Date, default: Date.now },
  wateringFrequency: { type: Number, required: true },
  lightRequirement: { type: String, required: true },
  harvestDate: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
});

const Plant = mongoose.model<IPlant>('Plant', plantSchema);

export default Plant;

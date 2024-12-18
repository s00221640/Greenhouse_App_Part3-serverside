import mongoose, { Document, Schema } from 'mongoose';

interface IPlant extends Document {
  name: string;
  species: string;
  plantingDate: Date;
  wateringFrequency: number; 
  lightRequirement: string;
  harvestDate?: Date; //could have
}

const plantSchema = new Schema<IPlant>({
  name: { type: String, required: true },
  species: { type: String, required: true },
  plantingDate: { type: Date, default: Date.now }, //current date
  wateringFrequency: { type: Number, required: true },
  lightRequirement: { type: String, required: true },
  harvestDate: { type: Date }, //Optional
});

const Plant = mongoose.model<IPlant>('Plant', plantSchema);

export default Plant;

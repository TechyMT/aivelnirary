import { Schema, model } from 'mongoose';
import { Itinerary, DayWiseData } from '@interfaces/itinerary.interface';

const DayWiseDataSchema = new Schema<DayWiseData>({
  arrival_time: { type: Date, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  place_details: {
    address: { type: String, required: true },
    name: { type: String, required: true },
    position: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  }
}, { _id: false });

const ItinerarySchema = new Schema<Itinerary>({
  start_date: { type: Date, required: true },
  source: { type: String, required: true },
  duration: { type: Number, required: true },
  destination: { type: String, required: true },
  budget: { type: String, required: true },
  cost: { type: String },
  precautions: { type: String, required: true },
  day_wise_data: {
    type: Map,
    of: {
      arrival_time: { type: Date, required: true },
      description: { type: String, required: true },
      type: { type: String, required: true },
      place_details: {
        address: { type: String, required: true },
        name: { type: String, required: true },
        position: {
          lat: { type: Number, required: true },
          lng: { type: Number, required: true },
        },
      },
    },
    imgUrl: { type: String, required: true },
  },
});

export const ItineraryModel = model<Itinerary>('Itinerary', ItinerarySchema);

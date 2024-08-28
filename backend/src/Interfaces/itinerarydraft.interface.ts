import { ItineraryRequest } from "./itinerary.interface";
import { Document } from "mongoose";

export interface ItineraryRequestDocument extends ItineraryRequest, Document {
    state: 'pending' | 'completed' | 'error';
    createdAt: Date;
    updatedAt: Date;
}
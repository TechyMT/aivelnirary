import { Schema, model } from "mongoose";
import { ItineraryRequestDocument } from "@interfaces/itinerarydraft.interface";



// Define the schema for the ItineraryRequest
const ItineraryRequestSchema = new Schema<ItineraryRequestDocument>({
    trip_data: {
        mapImgUrl: { type: String, required: true },
        start_date: { type: String, required: true },
        duration: { type: String, required: true },
        source: { type: String, required: true },
        destination: { type: String, required: true },
        budget: { type: String, required: true },
        places_data: [
            {
                place_details: {
                    name: { type: String, required: true },
                    address: { type: String, required: true },
                    position: {
                        lat: { type: String, required: true },
                        lon: { type: String, required: true }
                    }
                },
                type: { type: String, required: true }
            }
        ]
    },
    user_persona: {
        prefered_activities: {
            sightseeing: { type: Boolean, required: true },
            adventure: { type: Boolean, required: true },
            cultural_experiences: { type: Boolean, required: true },
            nightlife: { type: Boolean, required: true }
        },
        food_preferences: {
            local_cuisine: { type: Boolean, required: true },
            vegetarian: { type: Boolean, required: true }
        },
        tripstyle: { type: String, required: true }
    },
    user: {
        email: { type: String, required: true },
        name: { type: String, required: true },
        id: { type: String, required: true }
    },
    state: {
        type: String,
        enum: ['pending', 'completed', 'error'],
        default: 'pending',
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Before saving the document, update the updatedAt field
ItineraryRequestSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});



// Export the ItineraryRequest model
export const ItineraryDraftRequest = model<ItineraryRequestDocument>('ItineraryDraftRequest', ItineraryRequestSchema);

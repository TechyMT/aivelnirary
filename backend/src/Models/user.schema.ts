import { Schema, model } from 'mongoose';
import { IUser, Persona, PreferredActivities, FoodPreferences } from '../Interfaces/user.interface';

// Define PreferredActivities schema with _id disabled
const PreferredActivitiesSchema = new Schema<PreferredActivities>({
    sightseeing: { type: Boolean, default: undefined },
    adventure: { type: Boolean, default: undefined },
    cultural_experiences: { type: Boolean, default: undefined },
    nightlife: { type: Boolean, default: undefined },
}, { _id: false });  // Disable _id for this subdocument

// Define FoodPreferences schema with _id disabled
const FoodPreferencesSchema = new Schema<FoodPreferences>({
    local_cuisine: { type: Boolean, default: undefined },
    vegetarian: { type: Boolean, default: undefined },
}, { _id: false });  // Disable _id for this subdocument

// Define Persona schema
const PersonaSchema = new Schema<Persona>({
    prefered_activities: { type: PreferredActivitiesSchema, default: {} },
    food_preferences: { type: FoodPreferencesSchema, default: {} },
    tripstyle: { type: String, default: undefined },
}, { _id: false });  // Disable _id for this subdocument

// Define User schema
const UserSchema = new Schema<IUser>({
    name: { type: String, default: undefined },
    age: { type: Number, default: undefined },
    email: { type: String, required: true, unique: true },
    title: { type: String, default: undefined },
    bio: { type: String, default: undefined },
    token: { type: String, default: undefined }, // Optional initially
    persona: { type: PersonaSchema, default: {} }, // Optional initially
    created_at: { type: Date, default: Date.now },
    itineraries: [{ type: Schema.Types.ObjectId, ref: 'Itinerary', default: [] }],
    profile_completed: { type: Boolean, default: false },
});

export const UserModel = model<IUser>('User', UserSchema);

import axios from "axios";
import { configDotenv } from 'dotenv';

configDotenv();
export const generateItinerary = async (itineraryData: any) => {
    const url = `${process.env.ML_API_URL}/generate_itinerary`;
    try {
        const response = await axios.post(url, itineraryData);
        return await response.data;
    } catch (error) {
        console.error('Error generating itinerary:', error);
        throw error;
    }
}

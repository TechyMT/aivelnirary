import axios from 'axios';
import { configDotenv } from 'dotenv';

configDotenv();
// Replace with your actual Geoapify API key
const API_KEY = process.env.GEOAPIFY_API_KEY;

if (!API_KEY) {
    throw new Error('No Geoapify API key provided');
}

// Function to get place details
export const getPlaceDetailsById = async (placeId: string): Promise<any> => {
    const url = `https://api.geoapify.com/v2/place-details?id=${placeId}&apiKey=${API_KEY}`;
    try {
        const response = await axios.get(url);
        return response.data.features[0];
    } catch (error) {
        console.error('Error fetching place details:', error);
        throw error;
    }
};

// Function to get route details
export const getRouteDetails = async (
    waypoints: { lat: number, lon: number }[],
    mode: 'drive' | 'motorcycle' | 'bicycle' | 'walk' = 'drive'
): Promise<any> => {
    const waypointsStr = waypoints.map(point => `${point.lat},${point.lon}`).join('|');
    const url = `https://api.geoapify.com/v1/routing?waypoints=${waypointsStr}&mode=${mode}&apiKey=${API_KEY}`;
    try {
        const response = await axios.get(url);
        return response.data.features[0];
    } catch (error) {
        console.error('Error fetching route details:', error);
        throw error;
    }
};

// Function to get places
export const getPlaceSuggestions = async (

    filter: string,
    limit: number = 20
): Promise<any> => {

    const response = [];
    const categories = [['tourism', 'natural', 'entertainment'], ['catering']];

    for (const category of categories) {
        const url = `https://api.geoapify.com/v2/places?categories=${category.join(",")}&filter=place:${filter}&limit=40&apiKey=${API_KEY}`;
        try {
            const res = await axios.get(url);
            response.push(res.data.features);
        } catch (error) {
            console.error('Error fetching places:', error);
            throw error;
        }
    }

    return response;
};


// Function to autocomplete the address
export const getAutocomplete = async (query: string): Promise<any> => {
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&format=json&apiKey=${API_KEY}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        throw error;
    }
}

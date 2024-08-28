import { PlaceRepository } from '../repositories/place.repository';
import { getPlaceSuggestions, getRouteDetails, getPlaceDetailsById, getAutocomplete } from '@utils/geoapify';
import { Place } from '@interfaces/place.interface';

export class PlaceService {
    private placeRepository: PlaceRepository;

    constructor() {
        this.placeRepository = new PlaceRepository();
    }

    async createPlace(placeData: Place): Promise<Place> {
        try {
            return await this.placeRepository.createOrUpdatePlace(placeData);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-service, createPlace:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in createPlace.");
        }
    }

    async updatePlace(placeId: string, placeData: Partial<Place>): Promise<Place | null> {
        try {
            return await this.placeRepository.update(placeId, placeData);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-service, updatePlace:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in updatePlace.");
        }
    }

    async getPlaceById(placeId: string): Promise<Place | null> {
        try {
            return await this.placeRepository.findById(placeId);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-service, getPlaceById:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in getPlaceById.");
        }
    }

    async getAllPlaces(): Promise<Place[]> {
        try {
            return await this.placeRepository.findAll();
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-service, getAllPlaces:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in getAllPlaces.");
        }
    }

    async deletePlace(placeId: string): Promise<void> {
        try {
            await this.placeRepository.delete(placeId);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-service, deletePlace:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in deletePlace.");
        }
    }

    async fetchSuggestedPlaces(
        filter: string,
        limit: number = 20
    ): Promise<any> {
        try {
            return await getPlaceSuggestions(filter, limit);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in fetchSuggestedPlaces:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in fetchSuggestedPlaces.");
        }
    }

    async fetchRouteDetails(
        waypoints: { lat: number, lon: number }[],
        mode: 'drive' | 'motorcycle' | 'bicycle' | 'walk' = 'drive'
    ): Promise<any> {
        try {
            return await getRouteDetails(waypoints, mode);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in fetchRouteDetails:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in fetchRouteDetails.");
        }
    }

    async fetchPlaceDetailsById(placeId: string): Promise<any> {
        try {
            return await getPlaceDetailsById(placeId);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in fetchPlaceDetailsById:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in fetchPlaceDetailsById.");
        }
    }

    async fetchAutocomplete(query: string): Promise<any> {
        try {
            return await getAutocomplete(query);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in fetchAutocomplete:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in fetchAutocomplete.");
        }
    }
}

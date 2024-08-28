import { Request, Response } from 'express';
import { PlaceService } from '../services/place.service';

export class PlaceController {
    private placeService: PlaceService;

    constructor() {
        this.placeService = new PlaceService();
    }

    async createPlace(req: Request, res: Response): Promise<any> {
        try {
            const place = await this.placeService.createPlace(req.body);
            return res.status(201).json({ place });
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-controller, createPlace:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    async updatePlace(req: Request, res: Response): Promise<any> {
        try {
            const placeId = req.params.id;
            const place = await this.placeService.updatePlace(placeId, req.body);
            return res.status(200).json({ place });
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-controller, updatePlace:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    async getPlaceById(req: Request, res: Response): Promise<any> {
        try {
            const placeId = req.params.id;
            const place = await this.placeService.getPlaceById(placeId);
            if (place) {
                return res.status(200).json({ place });
            } else {
                return res.status(404).json({ message: 'Place not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-controller, getPlaceById:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    async getAllPlaces(req: Request, res: Response): Promise<any> {
        try {
            const places = await this.placeService.getAllPlaces();
            return res.status(200).json({ places });
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-controller, getAllPlaces:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    async deletePlace(req: Request, res: Response): Promise<any> {
        try {
            const placeId = req.params.id;
            await this.placeService.deletePlace(placeId);
            return res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-controller, deletePlace:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    async getPlaceSuggestions(req: Request, res: Response): Promise<any> {
        try {
            const { filter, limit } = req.query;
            const suggestions = await this.placeService.fetchSuggestedPlaces(filter as string, parseInt(limit as string));
            return res.status(200).json({ suggestions });
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-controller, getPlaceSuggestions:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    async getPlaceDetails(req: Request, res: Response): Promise<any> {
        try {
            const placeId = req.params.id;
            const placeDetails = await this.placeService.getPlaceById(placeId);
            return res.status(200).json({ placeDetails });
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-controller, getPlaceDetails:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    async getRouteDetails(req: Request, res: Response): Promise<any> {
        try {
            const { waypoints, mode } = req.body;
            const routeDetails = await this.placeService.fetchRouteDetails(waypoints, mode);
            return res.status(200).json({ routeDetails });
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-controller, getRouteDetails:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    async getAutocomplete(req: Request, res: Response): Promise<any> {
        try {
            const query = req.query.query as string;
            const suggestions = await this.placeService.fetchAutocomplete(query);
            return res.status(200).json({ suggestions });
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in place-controller, getAutocomplete:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

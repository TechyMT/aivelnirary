import { Request, Response } from 'express';
import { ItineraryService } from '../services/itinerary.service';

export class ItineraryController {
    private itineraryService: ItineraryService;

    constructor() {
        this.itineraryService = new ItineraryService();
    }

    async createItinerary(req: Request, res: Response): Promise<any> {
        try {
            const itinerary = await this.itineraryService.createItinerary(req.body);
            return res.status(201).json({ itinerary });
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-controller, createItinerary:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    async getItineraries(req: Request, res: Response): Promise<any> {
        try {
            const itineraries = await this.itineraryService.getItineraries();
            return res.status(200).json({ itineraries });
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-controller, getItineraries:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    async getItineraryById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const itinerary = await this.itineraryService.getItineraryById(id);
            if (!itinerary) {
                return res.status(404).json({ message: "Itinerary not found" });
            }
            return res.status(200).json({ itinerary });
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-controller, getItineraryById:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    async updateItinerary(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const updatedItinerary = await this.itineraryService.updateItinerary(id, req.body);
            if (!updatedItinerary) {
                return res.status(404).json({ message: "Itinerary not found" });
            }
            return res.status(200).json({ updatedItinerary });
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-controller, updateItinerary:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }

    async deleteItinerary(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const deletedItinerary = await this.itineraryService.deleteItinerary(id);
            if (!deletedItinerary) {
                return res.status(404).json({ message: "Itinerary not found" });
            }
            return res.status(200).json({ message: "Itinerary deleted successfully" });
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-controller, deleteItinerary:", error.message);
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

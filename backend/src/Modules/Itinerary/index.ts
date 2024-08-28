import { Router } from 'express';
import { itineraryRoutes } from './routes';

const ItineraryModule = Router();

ItineraryModule.use('/itinerary', itineraryRoutes);

export { ItineraryModule };

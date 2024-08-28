import { Router } from 'express';
import { ItineraryController } from '../controllers/itinerary.controller';

const router = Router();
const itineraryController = new ItineraryController();

router.post('/', (req, res) => itineraryController.createItinerary(req, res));
router.get('/', (req, res) => itineraryController.getItineraries(req, res));
router.get('/:id', (req, res) => itineraryController.getItineraryById(req, res));
router.put('/:id', (req, res) => itineraryController.updateItinerary(req, res));
router.delete('/:id', (req, res) => itineraryController.deleteItinerary(req, res));

export { router };

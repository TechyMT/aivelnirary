import { Router } from 'express';
import { PlaceController } from '../controllers/place.controller';

const router = Router();
const placeController = new PlaceController();


router.get('/suggestions', (req, res) => placeController.getPlaceSuggestions(req, res));
router.get('/details/:id', (req, res) => placeController.getPlaceDetails(req, res));
router.get('/autocomplete', (req, res) => placeController.getAutocomplete(req, res));
router.post('/route', (req, res) => placeController.getRouteDetails(req, res));
router.post('/', (req, res) => placeController.createPlace(req, res));
router.put('/:id', (req, res) => placeController.updatePlace(req, res));
router.get('/:id', (req, res) => placeController.getPlaceById(req, res));
router.get('/', (req, res) => placeController.getAllPlaces(req, res));
router.delete('/:id', (req, res) => placeController.deletePlace(req, res));

export { router };

import { Router } from 'express';
import { PersonaController } from '../controllers/persona.controller';

const router = Router();
const personaController = new PersonaController();

router.post('/:userId', (req, res) => personaController.createPersona(req, res));
router.put('/:userId', (req, res) => personaController.updatePersona(req, res));

export { router };

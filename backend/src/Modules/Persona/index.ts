import { Router } from 'express';
import { personaRoutes } from './routes';

const PersonaModule = Router();

PersonaModule.use('/persona', personaRoutes);

export { PersonaModule };

import { Request, Response } from 'express';
import { PersonaService } from '../services/persona.service';

export class PersonaController {
    private personaService: PersonaService;

    constructor() {
        this.personaService = new PersonaService();
    }

    async createPersona(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;
            const personaData = req.body;
            const persona = await this.personaService.createPersona(userId, personaData);
            res.status(201).json({ persona });
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in persona-controller, createPersona:", error.message);
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Unknown error occurred" });
            }
        }
    }

    async updatePersona(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;
            const personaData = req.body;
            const updatedPersona = await this.personaService.updatePersona(userId, personaData);
            res.status(200).json({ persona: updatedPersona });
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in persona-controller, updatePersona:", error.message);
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Unknown error occurred" });
            }
        }
    }
}

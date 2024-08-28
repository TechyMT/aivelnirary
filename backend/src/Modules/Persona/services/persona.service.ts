import { PersonaRepository } from "../repositories/persona.repository";
import { Persona } from "@interfaces/user.interface";

export class PersonaService {
  private personaRepository: PersonaRepository;

  constructor() {
    this.personaRepository = new PersonaRepository();
  }

  async createPersona(userId: string, personaData: Persona): Promise<Persona> {
    try {
      return await this.personaRepository.createPersona(userId, personaData);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in persona-service, createPersona:", error.message);
        throw error;
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }

  async updatePersona(userId: string, personaData: Partial<Persona>): Promise<Persona> {
    try {
      return await this.personaRepository.updatePersona(userId, personaData);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in persona-service, updatePersona:", error.message);
        throw error;
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }
}

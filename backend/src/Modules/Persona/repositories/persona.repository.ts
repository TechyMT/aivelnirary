import { UserModel } from "@models/user.schema";
import { Persona } from "@interfaces/user.interface";

export class PersonaRepository {
    private userModel: typeof UserModel;

    constructor() {
        this.userModel = UserModel;
    }

    async createPersona(userId: string, personaData: Persona): Promise<Persona> {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            user.persona = personaData;
            await user.save();

            return user.persona;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in persona-repository, createPersona:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred");
        }
    }

    async updatePersona(userId: string, personaData: Partial<Persona>): Promise<Persona> {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            user.persona = { ...user.persona, ...personaData };
            await user.save();

            return user.persona;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in persona-repository, updatePersona:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred");
        }
    }
}

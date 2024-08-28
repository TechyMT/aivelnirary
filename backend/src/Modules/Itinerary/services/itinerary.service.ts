import { ItineraryRepository } from '../repositories';
import { PlaceRepository } from '@modules/Place/repositories';
import { Itinerary, ItineraryRequest, } from '@interfaces/itinerary.interface';
import { generateItinerary } from '@utils/togetherai';
import generatePDF from '@utils/generatePdf';
import { sendItineraryEmail } from '@utils/sendMail';
import { UserRepository } from '@modules/User/repositories';
export class ItineraryService {
    private itineraryRepository: ItineraryRepository;
    private placeRepository: PlaceRepository;
    private userRepository: UserRepository;

    constructor() {
        this.itineraryRepository = new ItineraryRepository();
        this.placeRepository = new PlaceRepository();
        this.userRepository = new UserRepository();
    }

    async createItinerary(itineraryData: ItineraryRequest): Promise<Itinerary> {
        let itineraryDraft;
        try {
            // Fetch the user details
            const user = await this.userRepository.findUserById(itineraryData.user.id);

            if (!user) {
                throw new Error("User not found");
            }

            if (!user.profile_completed) {
                throw new Error("User profile not completed");
            }

            // Mark the itinerary request as 'pending' initially
            itineraryDraft = await this.itineraryRepository.createItineraryRequest({
                ...itineraryData,
                state: 'pending'
            });

            // Generate the itinerary
            const generatedItinerary = await generateItinerary({
                trip_data: itineraryData.trip_data,
                user_persona: itineraryData.user_persona
            });

            if (!generatedItinerary) {
                throw new Error("Error in generating itinerary");
            }

            // Save the generated itinerary
            const savedItinerary = await this.itineraryRepository.createItinerary({ ...generatedItinerary, imgUrl: itineraryData.trip_data.mapImgUrl, startDate: itineraryData.trip_data.start_date });


            if (!savedItinerary) {
                throw new Error("Error in saving itinerary");
            }

            await this.userRepository.updateUserItinerary(user._id.toString(), savedItinerary._id.toString());

            // Generate the PDF
            const filePath = await generatePDF(savedItinerary, user.name, itineraryData.trip_data.mapImgUrl);

            // Send the email with the itinerary
            await sendItineraryEmail({
                email: user.email,
                name: user.name
            }, filePath, `Travel-Itinerary-${user._id}.pdf`);

            // Mark the itinerary request as 'completed'
            await this.itineraryRepository.updateItineraryRequestState(itineraryDraft._id.toString(), 'completed');

            return generatedItinerary;

        } catch (error) {
            // Mark the itinerary request as 'error' in case of failure
            if (itineraryDraft) {
                await this.itineraryRepository.updateItineraryRequestState(itineraryDraft._id.toString(), 'error');
            }

            if (error instanceof Error) {
                console.log("Error in itinerary-service, createItinerary:", error.message);
                throw error;
            }

            throw new Error("An unknown error occurred");
        }
    }

    async getItineraries(): Promise<Itinerary[]> {
        try {
            return await this.itineraryRepository.getItineraries();
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-service, getItineraries:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }

    async getItineraryById(id: string): Promise<Itinerary | null> {
        try {
            return await this.itineraryRepository.getItineraryById(id);
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-service, getItineraryById:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }

    async updateItinerary(id: string, itineraryData: Partial<Itinerary>): Promise<Itinerary | null> {
        try {
            return await this.itineraryRepository.updateItinerary(id, itineraryData);
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-service, updateItinerary:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }

    async deleteItinerary(id: string): Promise<Itinerary | null> {
        try {
            return await this.itineraryRepository.deleteItinerary(id);
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-service, deleteItinerary:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }
}

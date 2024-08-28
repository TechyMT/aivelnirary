import { ItineraryModel } from '@models/itinerary.schema';
import { Itinerary, MLItinerary } from '@interfaces/itinerary.interface';
import { ItineraryRequestDocument } from '@interfaces/itinerarydraft.interface';
import { ItineraryDraftRequest } from '@models/Itinerarydraft.schema';
import { DayWiseData } from '@interfaces/itinerary.interface';
export class ItineraryRepository {
    private itineraryModel: typeof ItineraryModel;
    private itineraryRequestModel: typeof ItineraryDraftRequest;

    constructor() {
        this.itineraryModel = ItineraryModel;
        this.itineraryRequestModel = ItineraryDraftRequest;
    }

    async createItinerary(itineraryData: Partial<MLItinerary>): Promise<Itinerary> {
        try {

            const itinerary = {
                start_date: new Date(itineraryData.startDate),
                source: itineraryData.source,
                destination: itineraryData.destination,
                budget: itineraryData.budget,
                cost: itineraryData.cost,
                precautions: itineraryData.precautions,
                duration: parseInt(itineraryData.duration),
                day_wise_data: Object.entries(itineraryData.dayWiseData).reduce((acc, [day, items], index) => {
                    acc[day] = items.map(item => {
                        // Parse the arrival time suggested by the model
                        const arrivalTime = new Date(item.arrivalTime);
            
                        // Adjust the day based on the start date and the day index
                        const adjustedDate = new Date(itineraryData.startDate);
                        adjustedDate.setDate(adjustedDate.getDate() + index);
            
                        // Set the adjusted day to the arrival time while keeping the time portion
                        arrivalTime.setFullYear(adjustedDate.getFullYear(), adjustedDate.getMonth(), adjustedDate.getDate());
            
                        return {
                            arrival_time: arrivalTime,
                            description: item.description,
                            place_details: {
                                address: item.placeDetails.address,
                                name: item.placeDetails.name,
                                position: {
                                    lat: parseFloat(item.placeDetails.position.lat),
                                    lng: parseFloat(item.placeDetails.position.lon),
                                },
                            },
                            type: item.type,
                            get(key: string): DayWiseData[] {
                                return acc[key];
                            },
                        };
                    });
                    return acc;
                }, {} as { [key: string]: DayWiseData[] }),
                imgUrl: itineraryData.imgUrl,
            };
            

            const newItinerary = new this.itineraryModel(itinerary);

            return (await newItinerary.save()).toJSON();
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-repository, createItinerary:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }

    async getItineraries(): Promise<Itinerary[]> {
        try {
            return await this.itineraryModel.find().populate('places').exec();
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-repository, getItineraries:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }

    async getItineraryById(id: string): Promise<Itinerary | null> {
        try {
            return await this.itineraryModel.findById(id).populate('places').exec();
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-repository, getItineraryById:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }

    async updateItinerary(id: string, itineraryData: Partial<Itinerary>): Promise<Itinerary | null> {
        try {
            return await this.itineraryModel.findByIdAndUpdate(id, itineraryData, { new: true }).exec();
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-repository, updateItinerary:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }

    async deleteItinerary(id: string): Promise<Itinerary | null> {
        try {
            return await this.itineraryModel.findByIdAndDelete(id).exec();
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-repository, deleteItinerary:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }

    async createItineraryRequest(itineraryData: Partial<ItineraryRequestDocument>): Promise<ItineraryRequestDocument> {
        try {
            return await this.itineraryRequestModel.create(itineraryData);
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-repository, saveItineraryRequest:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }

    async getItineraryRequestById(id: string): Promise<ItineraryRequestDocument | null> {
        try {
            const itineraryDraft = await this.itineraryRequestModel.find({ _id: id, state: 'pending' }).exec();
            return itineraryDraft.length ? itineraryDraft[0]
                : null;
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-repository, getItineraryRequestById:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }


    async getPendingItineraryRequests(): Promise<ItineraryRequestDocument[]> {
        try {
            return await this.itineraryRequestModel.find({ state: 'pending' }).exec();
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-repository, getPendingItineraryRequests:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }

    async updateItineraryRequest(id: string, itineraryData: Partial<ItineraryRequestDocument>): Promise<ItineraryRequestDocument | null> {
        try {
            return await this.itineraryRequestModel.findByIdAndUpdate(id, itineraryData, { new: true }).exec();
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-repository, updateItineraryRequest:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }

    async updateItineraryRequestState(id: string, state: 'completed' | 'error'): Promise<ItineraryRequestDocument | null> {
        try {
            return await this.itineraryRequestModel.findByIdAndUpdate
                (id, { state }, { new: true }).exec();
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error in itinerary-repository, updateItineraryRequestState:", error.message);
                throw error;
            }
            throw new Error("An unknown error occurred");
        }
    }
}

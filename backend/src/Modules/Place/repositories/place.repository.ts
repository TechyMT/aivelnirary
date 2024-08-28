import { PlaceModel } from '@models/place.schema';
import { Place } from '@interfaces/place.interface';
import {
    getPlaceDetailsById,
} from '@utils/geoapify';
import { Model } from 'mongoose';

export class PlaceRepository {
    private placeModel: Model<Place>;

    constructor() {
        this.placeModel = PlaceModel;
    }

    // CRUD methods for interacting with the database
    async createOrUpdatePlace(placeData: Partial<Place>): Promise<Place> {
        try {
            const place: Place = {
                ...placeData,
            } as Place;

            const existingPlace = await this.placeModel
                .findOne({ geoapify_place_id: place.geoapify_place_id })
                .exec();

            if (existingPlace) {
                return await this.placeModel
                    .findByIdAndUpdate(existingPlace._id, place, { new: true })
                    .exec();
            } else {
                return await this.placeModel.create(place);
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in createOrUpdatePlace:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in createOrUpdatePlace.");
        }
    }

    async update(
        placeId: string,
        placeData: Partial<Place>
    ): Promise<Place | null> {
        try {
            return await this.placeModel
                .findOneAndUpdate(
                    { geoapify_place_id: placeId },
                    placeData,
                    { new: true }
                )
                .exec();
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in update:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in update.");
        }
    }

    async findById(placeId: string): Promise<Place | null> {
        try {
            return await this.placeModel
                .findOne({ geoapify_place_id: placeId })
                .exec();
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in findById:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in findById.");
        }
    }

    async findAll(): Promise<Place[]> {
        try {
            return await this.placeModel.find().exec();
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in findAll:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in findAll.");
        }
    }

    async delete(placeId: string): Promise<void> {
        try {
            await this.placeModel
                .deleteOne({ geoapify_place_id: placeId })
                .exec();
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in delete:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in delete.");
        }
    }

    // Method to find or create a place using external API and store it in the database
    async findOrCreatePlace(placeId: string): Promise<Place> {
        try {
            let place = await this.placeModel
                .findOne({ geoapify_place_id: placeId })
                .exec();

            if (!place) {
                const placeDetails = await getPlaceDetailsById(placeId);
                const placeFeature = placeDetails.features[0];
                const properties = placeFeature.properties;

                const newPlace: Partial<Place> = {
                    geoapify_place_id: placeFeature.properties.place_id,
                    name: properties.name || 'Unknown',
                    city: properties.city || 'Unknown',
                    country: properties.country || 'Unknown',
                    description: properties.description || '',
                    rating: properties.rating || 0,
                    categories: properties.categories || [],
                    coordinates: {
                        latitude: placeFeature.geometry.coordinates[1],
                        longitude: placeFeature.geometry.coordinates[0],
                    },
                    datasource: {
                        sourcename: properties.datasource.sourcename || 'Unknown',
                        attribution: properties.datasource.attribution || '',
                        license: properties.datasource.license || '',
                        url: properties.datasource.url || '',
                        raw: {
                            shop: properties.datasource.raw.shop || 'Unknown',
                            osm_id: properties.datasource.raw.osm_id || 0,
                            osm_type: properties.datasource.raw.osm_type || 'Unknown',
                            addr_city: properties.datasource.raw.addr_city || '',
                            addr_street: properties.datasource.raw.addr_street || '',
                            addr_postcode: properties.datasource.raw.addr_postcode || 0,
                            addr_housenumber: properties.datasource.raw.addr_housenumber || 0,
                        },
                    },
                    formatted_address: properties.formatted || '',
                    address_line1: properties.address_line1 || '',
                    address_line2: properties.address_line2 || '',
                    house_number: properties.house_number || '',
                    street: properties.street || '',
                    postcode: properties.postcode || '',
                    state: properties.state || '',
                    county: properties.county || '',
                };

                await this.placeModel.create(newPlace);
                place = newPlace as Place;
            }

            return place;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error in findOrCreatePlace:", error.message);
                throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in findOrCreatePlace.");
        }
    }
}

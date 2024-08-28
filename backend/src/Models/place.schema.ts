import { Schema, model } from 'mongoose';
import { Place, Categories, Coordinates, Datasource } from '@interfaces/place.interface';

const CategoriesSchema = new Schema<Categories>({
    field: { type: String, required: true },
});

const CoordinatesSchema = new Schema<Coordinates>({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
});

const DatasourceSchema = new Schema<Datasource>({
    sourcename: { type: String, required: true },
    attribution: { type: String, required: true },
    license: { type: String, required: true },
    url: { type: String, required: true },
    raw: {
        shop: { type: String, required: true },
        osm_id: { type: Number, required: true },
        osm_type: { type: String, required: true },
        addr_city: { type: String, required: true },
        addr_street: { type: String, required: true },
        addr_postcode: { type: Number, required: true },
        addr_housenumber: { type: Number, required: true },
    },
});

const PlaceSchema = new Schema<Place>({
    geoapify_place_id: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    categories: { type: [String], required: true },
    coordinates: { type: CoordinatesSchema, required: true },
    datasource: { type: DatasourceSchema, required: true },
    formatted_address: { type: String, required: true },
    address_line1: { type: String, required: true },
    address_line2: { type: String, required: true },
    house_number: { type: String, required: true },
    street: { type: String, required: true },
    postcode: { type: String, required: true },
    state: { type: String, required: true },
    county: { type: String, required: true },

});

export const PlaceModel = model<Place>('Place', PlaceSchema);

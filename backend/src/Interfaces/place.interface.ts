import { Document } from 'mongoose';

export interface Categories {
  field: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Datasource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
  raw: {
    shop: string;
    osm_id: number;
    osm_type: string;
    addr_city: string;
    addr_street: string;
    addr_postcode: number;
    addr_housenumber: number;
  };
}

export interface Place extends Document {
  _id: string;
  geoapify_place_id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  rating: number;
  categories: string[];
  coordinates: Coordinates;
  datasource: Datasource;
  formatted_address: string;
  address_line1: string;
  address_line2: string;
  house_number: string;
  street: string;
  postcode: string;
  state: string;
  county: string;
  timezone: {
    name: string;
    offset_STD: string;
    offset_STD_seconds: number;
    offset_DST: string;
    offset_DST_seconds: number;
    abbreviation_STD: string;
    abbreviation_DST: string;
  };
}

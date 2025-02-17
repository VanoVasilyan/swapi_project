import { ReactNode } from 'react';

export type Nullable<T> = T | null;

export interface ThemeContextType {
    theme: Record<string, any>;
    isDark: boolean;
    toggleTheme: () => void;
};

export interface ThemeProviderProps {
    children: ReactNode;
};

export interface IPlanet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
};

export interface ICharacter {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
};

export interface IFilm {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string;
    edited: string;
    url: string;
};

export interface ISpecies {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: string;
    homeworld: Nullable<string>;
    language: string;
    people: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
};

export interface IVehicle {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;
    pilots: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
};

export interface IStarship {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
};

export type TBeResponseWithData<T> = {
    count: number;
    next: Nullable<string>;
    previous: Nullable<string>;
    results: T | [];
};

export type TShowFiltersAfterSearch = {
    showFilters: boolean;
};

export type TGlobalStyleProps = {
    thumbColor: string;
    trackColor: string;
};

export type TransformedCardDetails = {
    id: number;
    key: string;
    title: string;
    value: string | string[];
};

export type TFilterItem = {
    id: number;
    title: string;
    items: string[];
};

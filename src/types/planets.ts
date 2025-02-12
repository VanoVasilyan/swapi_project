import { IPlanet, Nullable } from './global';

export type TPlanetsData = {
    count: Nullable<number>;
    next: Nullable<string>;
    previous: Nullable<string>;
    results: Nullable<IPlanet[]> | IPlanet;
};

export type TCharactersData = {
    count: Nullable<number>;
    next: Nullable<string>;
    previous: Nullable<string>;
    results: Nullable<IPlanet[]> | IPlanet;
};

export type TransformedSinglePlanet = {
    id: number;
    key: string;
    title: string;
    value: string | string[];
};

export type TSinglePlanetProps = Partial<{
    name: string,
    rotationPeriod: string,
    diameter: string,
    orbitalPeriod: string,
    gravity: string,
    climate: string,
    surfaceWater: string,
    terrain: string,
    residents: string[],
    films: string[],
    population: string,
}>;

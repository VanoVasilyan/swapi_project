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

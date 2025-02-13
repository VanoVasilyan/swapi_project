import { IFilm, Nullable } from './global';

export type TFilmsData = {
    count: Nullable<number>;
    next: Nullable<string>;
    previous: Nullable<string>;
    results: Nullable<IFilm[]> | IFilm;
};

export type TSingleFilmProps = Partial<{
    title: string,
    openingCrawl: string,
    director: string,
    producer: string,
    releaseDate: string,
    characters: string[],
    planets: string[],
    starships: string[],
    vehicles: string[],
    species: string[],
}>;

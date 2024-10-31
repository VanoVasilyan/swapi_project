import { IFilm, Nullable } from './global';

export type TFilmsData = {
    count: Nullable<number>;
    next: Nullable<string>;
    previous: Nullable<string>;
    results: Nullable<IFilm[]> | IFilm;
};

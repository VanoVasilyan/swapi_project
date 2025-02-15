
import { TransformedCardDetails } from '../../types/global';

export type TSingleFilm = {
    characters?: string[];
    planets?: string[];
    starships?: string[];
    vehicles?: string[];
    species?: string[];
    filmDetails: TransformedCardDetails[];
};

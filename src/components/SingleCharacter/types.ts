
import { TransformedCardDetails } from '../../types/global';

export type TSingleCharacter = {
    films?: string[];
    starships?: string[];
    vehicles?: string[];
    species?: string[];
    characterDetails: TransformedCardDetails[];
};

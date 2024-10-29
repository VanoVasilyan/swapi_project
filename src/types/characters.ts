import { ICharacter, Nullable } from './global';

export type TCharactersData = {
    count: Nullable<number>;
    next: Nullable<string>;
    previous: Nullable<string>;
    results: Nullable<ICharacter[]> | ICharacter;
};

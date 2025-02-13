import { ICharacter, Nullable } from './global';

export type TCharactersData = {
    count: Nullable<number>;
    next: Nullable<string>;
    previous: Nullable<string>;
    results: Nullable<ICharacter[]> | ICharacter;
};

export type TSingleCharacterProps = Partial<{
    name: string,
    height: string,
    mass: string,
    hairColor: string,
    skinColor: string,
    eyeColor: string,
    films: string[],
    species: string[],
    vehicles: string[],
    starships: string[],
}>;

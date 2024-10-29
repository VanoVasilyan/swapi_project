import { TPlanetsData } from './planets';
import { TCharactersData } from './characters';
import { TShowFiltersAfterSearch } from './global';

export type TStore = {
    planets: TPlanetsData;
    characters: TCharactersData;
    showFilters: TShowFiltersAfterSearch
};

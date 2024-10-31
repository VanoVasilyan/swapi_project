import { TPlanetsData } from './planets';
import { TCharactersData } from './characters';
import { TFilmsData } from './films';
import { TShowFiltersAfterSearch } from './global';

export type TStore = {
    planets: TPlanetsData;
    characters: TCharactersData;
    showFilters: TShowFiltersAfterSearch;
    films: TFilmsData;
};

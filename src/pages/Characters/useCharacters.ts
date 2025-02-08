import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetAllCharactersQuery } from '../../store/services/characters';
import { useCharactersAction, useCharactersSelector } from '../../store/slices/characters';
import { useGlobalThemeContext } from '../../context/theme';
import { usePaginate } from '../../hooks/usePaginate';
import { removeObjectEmptyProperties } from '../../utils/removeObjectEmptyProperties';
import { useShowFiltersAction, useShowFiltersSelector } from '../../store/slices/filters';
import { TSingleCharacter } from '../../components/SingleCharacter/types';
import { ICharacter } from '../../types/global';
import { TFilters } from './types';

export const useCharacters = () => {
    const [searchValue, setSearchValue] = useState('');
    const [charactersPage, setCharactersPage] = useState(1);
    const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
    const { toggleTheme } = useGlobalThemeContext();
    const { data, isFetching, refetch } = useGetAllCharactersQuery({ searchValue: debouncedSearchValue, page: charactersPage }, {
        refetchOnMountOrArgChange: true,
    });
    const { results } = useCharactersSelector();
    const { showFilters } = useShowFiltersSelector();
    const { setShowFilters } = useShowFiltersAction();
    const { setCharacters } = useCharactersAction();
    const [selectedFilters, setSelectedFilters] = useState<TFilters>({
        eye_color: [],
        height: []
    });

    const eye_color = useMemo(() => {
        const seen: Record<string, boolean> = {};
        return Array.isArray(data?.results) && data?.results.length ? data?.results
            .map((character: { eye_color: string }) => character.eye_color)
            .filter((eye_color: string | number) => {
                if (!seen[eye_color] && eye_color !== 'unknown') {
                    seen[eye_color] = true;
                    return true;
                }
                return false;
            }) : [];
    }, [data]);

    const height = useMemo(() => {
        const seen: Record<string, boolean> = {};
        return Array.isArray(data?.results) && data?.results.length ? data?.results
            .map((character: { height: string }) => character.height)
            .filter((height: string | number) => {
                if (!seen[height] && height !== 'unknown') {
                    seen[height] = true;
                    return true;
                }
                return false;
            }).sort((a: string, b: string) => Number(a) - Number(b)) : []
    }, [data]);

    const handleSelectChange = (check: string, title: string) => {
        const titleToLowerCase = title.toLocaleLowerCase();

        if (selectedFilters[titleToLowerCase as keyof TFilters].includes(check)) {
            const filteredCheckList = selectedFilters[titleToLowerCase as keyof TFilters].filter(item => item !== check);
            setSelectedFilters(prev => ({ ...prev, [titleToLowerCase]: filteredCheckList }))
        } else {
            setSelectedFilters(prev => ({ ...prev, [titleToLowerCase]: [...selectedFilters[titleToLowerCase as keyof TFilters], check] }))
        }
    };

    const updateFilters = useCallback(() => {
        const filteredArray: ICharacter[] = [];

        if (!selectedFilters.eye_color.length && !selectedFilters.height.length && data?.results) {
            setCharacters(data.results);
            return
        }
        if (selectedFilters.eye_color.length || selectedFilters.height.length) {
            if (selectedFilters.eye_color.length === 1 && selectedFilters.height.length === 1 && Array.isArray(data?.results)) {
                data?.results.forEach((element: ICharacter) => {
                    if (element.eye_color === selectedFilters.eye_color[0] && element.height === selectedFilters.height[0]) {
                        filteredArray.push(element)
                    }
                });
            } else if ((selectedFilters.eye_color.length > 1 && selectedFilters.height.length) || (selectedFilters.height.length > 1 && selectedFilters.eye_color.length)) {
                setCharacters([]);
            } else if (selectedFilters.eye_color.length) {
                selectedFilters.eye_color.forEach(item => {
                    if (data?.results && Array.isArray(data?.results)) {
                        data?.results.forEach((element: ICharacter) => {
                            if (element.eye_color === item) {
                                filteredArray.push(element)
                            }
                        });
                    }
                })
            } else if (selectedFilters.height.length) {
                selectedFilters.height.forEach(item => {
                    if (data?.results && Array.isArray(data?.results)) {
                        data?.results.forEach((element: ICharacter) => {
                            if (element.height === item) {
                                filteredArray.push(element)
                            }
                        });
                    }
                })
            }
        }
        setCharacters(filteredArray);
    }, [data?.results, selectedFilters, setCharacters]);

    const filterItems = useMemo(() => ([
        {
            id: 1,
            title: 'Eye_Color',
            items: eye_color
        },
        {
            id: 2,
            title: 'Height',
            items: height
        },
    ]), [eye_color, height]);

    const finalResults = useMemo(() => {
        return Array.isArray(results) && results.map(result => ({
            name: result.name,
            height: result.height,
            mass: result.mass,
            hairColor: result.hair_color,
            skinColor: result.skin_color,
            eyeColor: result.eye_color,
            films: result.films,
            species: result.species,
            vehicles: result.vehicles,
            starships: result.starships
        })).map(removeObjectEmptyProperties).filter(item => Object.keys(item).length > 1 && (item.eye_color || item.height)) as TSingleCharacter[]
    }, [results]);

    const showClearFilters = useMemo(() => {
        return Boolean(selectedFilters.eye_color.length || selectedFilters.height.length)
    }, [selectedFilters]);

    const clearAllFilters = useCallback((doRefetch: boolean = true) => {
        setSelectedFilters({
            eye_color: [],
            height: []
        });
        if(doRefetch) refetch();
    }, [refetch, setSelectedFilters]);

    const goBack = useCallback(() => {
        setDebouncedSearchValue('');
        setSearchValue('');
        setShowFilters(true);
    }, [setShowFilters]);

    const delayDebounceSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const { page, pageCount, setPage } = usePaginate(
        data?.count || 0,
        10,
        refetch,
        true,
        {},
        charactersPage
    );

    const handlePageChange = useCallback((page: number) => {
        setPage(page);
        setCharactersPage(page);
    }, [setPage]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
        }, 2000);

        return () => clearTimeout(handler);
    }, [searchValue]);

    useEffect(() => {
        updateFilters();
    }, [selectedFilters]);

    useEffect(() => {
        if (data && Array.isArray(data.results) && !data.results.length) {
            setShowFilters(false);
        } else {
            setShowFilters(true);
        }
    }, [data?.results]);

    return {
        page,
        pageCount,
        finalResults,
        isFetching,
        filterItems,
        showFilters,
        showClearFilters,
        searchValue,
        goBack,
        toggleTheme,
        clearAllFilters,
        handlePageChange,
        handleSelectChange,
        delayDebounceSearch,
    }
};

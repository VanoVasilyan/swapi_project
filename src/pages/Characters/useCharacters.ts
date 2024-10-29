import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCharactersNextPageMutation, useCharactersPreviousPageMutation, useLazyGetAllCharactersQuery } from '../../store/services/characters';
import { useCharactersAction, useCharactersSelector } from '../../store/slices/characters';
import { ICharacter } from '../../types/global';
import { TFilters } from './types';
import { removeObjectEmptyProperties } from '../../utils/removeObjectEmptyProperties';
import { TSingleCharacter } from '../../components/SingleCharacter/types';
import { useShowFiltersAction, useShowFiltersSelector } from '../../store/slices/filters';

export const useCharacters = () => {
    const { pathname } = useLocation();
    const [refetch, { data, isFetching }] = useLazyGetAllCharactersQuery();
    const [nextPage, { isLoading: nextPageLoading }] = useCharactersNextPageMutation();
    const [previousPage, { isLoading: previousPageLoading }] = useCharactersPreviousPageMutation();
    const { previous, next, results } = useCharactersSelector();
    const { showFilters } = useShowFiltersSelector();
    const { setShowFilters } = useShowFiltersAction();
    const { setCharacters } = useCharactersAction();
    const [selectedFilters, setSelectedFilters] = useState<TFilters>({
        eye_color: [],
        height: []
    });

    const eye_color = useMemo(() => {
        const seen: Record<string, boolean> = {};
        return (data?.results ?? [])
            .map((character: { eye_color: string }) => character.eye_color)
            .filter((eye_color: string | number) => {
                if (!seen[eye_color]) {
                    seen[eye_color] = true;
                    return true;
                }
                return false;
            });
    }, [data]);

    const height = useMemo(() => {
        const seen: Record<string, boolean> = {};
        return (data?.results ?? [])
            .map((character: { height: string }) => character.height)
            .filter((height: string | number) => {
                if (!seen[height]) {
                    seen[height] = true;
                    return true;
                }
                return false;
            }).sort((a: string, b: string) => Number(a) - Number(b))
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
            if (selectedFilters.eye_color.length === 1 && selectedFilters.height.length === 1) {
                data?.results.forEach((element: ICharacter) => {
                    if (element.eye_color === selectedFilters.eye_color[0] && element.height === selectedFilters.height[0]) {
                        filteredArray.push(element)
                    }
                });
            } else if ((selectedFilters.eye_color.length > 1 && selectedFilters.height.length) || (selectedFilters.height.length > 1 && selectedFilters.eye_color.length)) {
                setCharacters([]);
            } else if (selectedFilters.eye_color.length) {
                selectedFilters.eye_color.forEach(item => {
                    if (data?.results) {
                        data?.results.forEach((element: ICharacter) => {
                            if (element.eye_color === item) {
                                filteredArray.push(element)
                            }
                        });
                    }
                })
            } else if (selectedFilters.height.length) {
                selectedFilters.height.forEach(item => {
                    if (data?.results) {
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
            hair_color: result.hair_color,
            skin_color: result.skin_color,
            eye_color: result.eye_color,
            films: result.films,
            species: result.species,
            vehicles: result.vehicles,
            starships: result.starships
        })).map(removeObjectEmptyProperties).filter(item => Object.keys(item).length > 1) as TSingleCharacter[]
    }, [results]);

    const showClearFilters = useMemo(() => {
        return Boolean(selectedFilters.eye_color.length || selectedFilters.height.length)
    }, [selectedFilters]);

    const clearAllFilters = useCallback(() => {
        setSelectedFilters({
            eye_color: [],
            height: []
        });
        refetch('');
    }, [refetch]);

    const goBack = useCallback(() => {
        if (data?.results) {
            setCharacters(data.results);
            setShowFilters(true);
        }
    }, [data?.results, setCharacters, setShowFilters]);

    useEffect(() => {
        updateFilters();
    }, [selectedFilters]);

    useEffect(() => {
        refetch('');
        setShowFilters(true);
    }, [pathname]);

    return {
        next,
        finalResults,
        previous,
        filterItems,
        isFetching,
        showFilters,
        nextPageLoading,
        showClearFilters,
        previousPageLoading,
        goBack,
        nextPage,
        previousPage,
        clearAllFilters,
        handleSelectChange,
    }
};

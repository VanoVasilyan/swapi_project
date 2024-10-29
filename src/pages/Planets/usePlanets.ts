import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyGetAllPlanetsQuery, usePlanetsNextPageMutation, usePlanetsPreviousPageMutation } from '../../store/services/planets';
import { usePlanetsAction, usePlanetsSelector } from '../../store/slices/planets';
import { useShowFiltersAction, useShowFiltersSelector } from '../../store/slices/filters';
import { removeObjectEmptyProperties } from '../../utils/removeObjectEmptyProperties';
import { TSinglePlanet } from '../../components/SinglePlanet/types';
import { IPlanet } from '../../types/global';
import { TFilters } from './types';

export const usePlanets = () => {
    const { pathname } = useLocation();
    const [refetch, { data, isFetching }] = useLazyGetAllPlanetsQuery();
    const [nextPage, { isLoading: nextPageLoading }] = usePlanetsNextPageMutation();
    const [previousPage, { isLoading: previousPageLoading }] = usePlanetsPreviousPageMutation();
    const { showFilters } = useShowFiltersSelector();
    const { setShowFilters } = useShowFiltersAction();
    const { previous, next, results } = usePlanetsSelector();
    const { setPlanets } = usePlanetsAction();
    const [selectedFilters, setSelectedFilters] = useState<TFilters>({
        climate: [],
        gravity: []
    });

    const climate = useMemo(() => {
        const seen: Record<string, boolean> = {};
        return (data?.results ?? [])
            .map((planet: { climate: string }) => planet.climate)
            .filter((climate: string | number) => {
                if (!seen[climate]) {
                    seen[climate] = true;
                    return true;
                }
                return false;
            });
    }, [data]);

    const gravity = useMemo(() => {
        const seen: Record<string, boolean> = {};
        return (data?.results ?? [])
            .map((planet: { gravity: string }) => planet.gravity)
            .filter((gravity: string | number) => {
                if (!seen[gravity]) {
                    seen[gravity] = true;
                    return true;
                }
                return false;
            })
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
        const filteredArray: IPlanet[] = [];

        if (!selectedFilters.climate.length && !selectedFilters.gravity.length && data?.results) {
            setPlanets(data.results);
            return
        }
        if (selectedFilters.climate.length || selectedFilters.gravity.length) {
            if (selectedFilters.climate.length === 1 && selectedFilters.gravity.length === 1) {
                data?.results.forEach((element: IPlanet) => {
                    if (element.climate === selectedFilters.climate[0] && element.gravity === selectedFilters.gravity[0]) {
                        filteredArray.push(element)
                    }
                });
            } else if ((selectedFilters.climate.length > 1 && selectedFilters.gravity.length) || (selectedFilters.gravity.length > 1 && selectedFilters.climate.length)) {
                setPlanets([]);
            } else if (selectedFilters.climate.length) {
                selectedFilters.climate.forEach(item => {
                    if (data?.results) {
                        data?.results.forEach((element: IPlanet) => {
                            if (element.climate === item) {
                                filteredArray.push(element)
                            }
                        });
                    }
                })
            } else if (selectedFilters.gravity.length) {
                selectedFilters.gravity.forEach(item => {
                    if (data?.results) {
                        data?.results.forEach((element: IPlanet) => {
                            if (element.gravity === item) {
                                filteredArray.push(element)
                            }
                        });
                    }
                })
            }
        }
        setPlanets(filteredArray);
    }, [data?.results, selectedFilters, setPlanets]);


    const filterItems = useMemo(() => ([
        {
            id: 1,
            title: 'Climate',
            items: climate
        },
        {
            id: 2,
            title: 'Gravity',
            items: gravity
        },
    ]), [climate, gravity]);

    const finalResults = useMemo(() => {
        return Array.isArray(results) && results.map(result => ({
            name: result.name,
            rotationPeriod: result.rotation_period,
            orbitalPeriod: result.orbital_period,
            diameter: result.diameter,
            climate: result.climate,
            gravity: result.gravity,
            terrain: result.terrain,
            surfaceWater: result.surface_water,
            population: result.population,
            residents: result.residents,
            Films: result.films
        })).map(removeObjectEmptyProperties).filter(item => Object.keys(item).length > 1) as TSinglePlanet[]
    }, [results]);

    const showClearFilters = useMemo(() => {
        return Boolean(selectedFilters.climate.length || selectedFilters.gravity.length)
    }, [selectedFilters]);

    const clearAllFilters = useCallback(() => {
        setSelectedFilters({
            climate: [],
            gravity: []
        });
        refetch('');
    }, [refetch]);

    const goBack = useCallback(() => {
        if (data?.results) {
            setPlanets(data.results);
            setShowFilters(true);
        }
    }, [data?.results, setPlanets, setShowFilters]);

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

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetAllPlanetsQuery } from '../../store/services/planets';
import { usePlanetsAction, usePlanetsSelector } from '../../store/slices/planets';
import { useShowFiltersAction, useShowFiltersSelector } from '../../store/slices/filters';
import { useGlobalThemeContext } from '../../context/theme';
import { usePaginate } from '../../hooks/usePaginate';
import { useMemoCustom } from '../../hooks/useMemoCustom';
import { removeObjectEmptyProperties } from '../../utils/removeObjectEmptyProperties';
import { TSinglePlanetProps } from '../../types/planets';
import { IPlanet } from '../../types/global';
import { TFilters } from './types';

export const usePlanets = () => {
    const [searchValue, setSearchValue] = useState('');
    const [planetsPage, setPlanetsPage] = useState(1);
    const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
    const { toggleTheme } = useGlobalThemeContext();
    const { data, isFetching, refetch } = useGetAllPlanetsQuery({ searchValue: debouncedSearchValue, page: planetsPage }, {
        refetchOnMountOrArgChange: true,
    });
    const { showFilters } = useShowFiltersSelector();
    const { setShowFilters } = useShowFiltersAction();
    const { results } = usePlanetsSelector();
    const { setPlanets } = usePlanetsAction();
    const [selectedFilters, setSelectedFilters] = useState<TFilters>({
        climate: [],
        gravity: []
    });
    const climate = useMemoCustom(data!, 'climate');
    const gravity = useMemoCustom(data!, 'gravity');

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
            if (selectedFilters.climate.length === 1 && selectedFilters.gravity.length === 1 && Array.isArray(data?.results)) {
                data?.results.forEach((element: IPlanet) => {
                    if (element.climate === selectedFilters.climate[0] && element.gravity === selectedFilters.gravity[0]) {
                        filteredArray.push(element)
                    }
                });
            } else if ((selectedFilters.climate.length > 1 && selectedFilters.gravity.length) || (selectedFilters.gravity.length > 1 && selectedFilters.climate.length)) {
                setPlanets([]);
            } else if (selectedFilters.climate.length) {
                selectedFilters.climate.forEach(item => {
                    if (data?.results && Array.isArray(data?.results)) {
                        data?.results.forEach((element: IPlanet) => {
                            if (element.climate === item) {
                                filteredArray.push(element)
                            }
                        });
                    }
                })
            } else if (selectedFilters.gravity.length) {
                selectedFilters.gravity.forEach(item => {
                    if (data?.results && Array.isArray(data?.results)) {
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
        return Array.isArray(results) && results.map((result) => ({
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
            films: result.films
        })).map(removeObjectEmptyProperties).filter((item) => Object.keys(item).length > 1 && (item.climate || item.gravity)) as TSinglePlanetProps[]
    }, [results]);

    const showClearFilters = useMemo(() => {
        return Boolean(selectedFilters.climate.length || selectedFilters.gravity.length)
    }, [selectedFilters]);

    const clearAllFilters = useCallback((doRefetch: boolean = true) => {
        setSelectedFilters({
            climate: [],
            gravity: []
        });
        if (doRefetch) refetch();
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
        planetsPage,
        null,
        false,
        true
    );

    const handlePageChange = useCallback((page: number) => {
        setPage(page);
        setPlanetsPage(page);
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
        } else if (Array.isArray(finalResults) && !finalResults.length && searchValue) {
            setShowFilters(false);
        } else {
            setShowFilters(true);
        }
    }, [data?.results, finalResults]);

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

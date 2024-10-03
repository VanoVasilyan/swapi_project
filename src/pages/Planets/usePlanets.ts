import { useEffect, useMemo, useState } from 'react';
import { useLazyGetAllPlanetsQuery, usePlanetsNextPageMutation, usePlanetsPreviousPageMutation } from '../../store/services/planets';
import { usePlanetsAction, usePlanetsSelector } from '../../store/slices/planets';

export const usePlanets = () => {
    const [refetch, { data, isLoading }] = useLazyGetAllPlanetsQuery();
    const { previous, next, results } = usePlanetsSelector();
    const { setPlanets } = usePlanetsAction();
    const [nextPage, { isLoading: nextPageLoading }] = usePlanetsNextPageMutation();
    const [previousPage, { isLoading: previousPageLoading }] = usePlanetsPreviousPageMutation();
    const [selectedFilters, setSelectedFilters] = useState<Array<{ [key: string]: string }>>([]);

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
            });
    }, [data]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, title: string) => {
        const titleToLowerCase = title.toLocaleLowerCase();
        const updatedFilters = selectedFilters.some(filter => filter.hasOwnProperty(titleToLowerCase))
            ? selectedFilters.filter(filter => !filter.hasOwnProperty(titleToLowerCase))
            : selectedFilters;
        setSelectedFilters([...updatedFilters, { [titleToLowerCase]: event.target.value }]);
    };

    useEffect(() => {
        if (selectedFilters.length > 0 && data?.results) {
            const filteredResults = data.results.filter((planet: any) =>
                selectedFilters.every(filter => {
                    const [key, value] = Object.entries(filter)[0];
                    return planet[key] === value;
                })
            );
            setPlanets(filteredResults);
        } else if (data?.results) {
            setPlanets(data.results);
        }
    }, [selectedFilters, data]);

    useEffect(() => {
        if (!Array.isArray(results)) {
            refetch('')
        }
    }, [results]);

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

    return {
        next,
        isLoading,
        results,
        previous,
        filterItems,
        nextPageLoading,
        previousPageLoading,
        nextPage,
        previousPage,
        handleSelectChange,
    }
};

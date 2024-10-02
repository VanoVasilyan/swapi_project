import { useEffect, useMemo } from 'react';
import { useLazyGetAllPlanetsQuery, usePlanetsNextPageMutation, usePlanetsPreviousPageMutation } from '../../store/services/planets';
import { usePlanetsAction, usePlanetsSelector } from '../../store/slices/planets';

export const usePlanets = () => {
    const [refetch, { data, isLoading }] = useLazyGetAllPlanetsQuery();
    const { previous, next, results } = usePlanetsSelector();
    const { setPlanets } = usePlanetsAction();
    const [nextPage, { isLoading: nextPageLoading }] = usePlanetsNextPageMutation();
    const [previousPage, { isLoading: previousPageLoading }] = usePlanetsPreviousPageMutation();

    const climates = useMemo(() => {
        const obj: Record<string, boolean> = {};
        return data?.results?.map((item: { climate: string; }) => ({ climate: item.climate })).reduce((acc: { climate: string }[], curr: { climate: string; }) => {
            if (!obj[curr.climate]) {
                obj[curr.climate] = true
                acc.push(curr)
            }
            return acc
        }, [] as { climate: string }[]) || []
    }, [data]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const filteredByClimatesData = data?.results?.filter((el: { climate: string; }) => el.climate === selectedValue);
        setPlanets(filteredByClimatesData)
    };

    useEffect(() => {
        if (!Array.isArray(results)) {
            refetch('')
        }
    }, [results]);

    return {
        next,
        isLoading,
        results,
        previous,
        climates,
        nextPageLoading,
        previousPageLoading,
        nextPage,
        previousPage,
        handleSelectChange,
    }
};

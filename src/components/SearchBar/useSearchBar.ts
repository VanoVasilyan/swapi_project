import { useEffect, useState } from 'react';
import { useSearchPlanetsMutation } from '../../store/services/planets';

export const useSearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchPlanets, { isLoading }] = useSearchPlanetsMutation();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchValue.trim()) {
                searchPlanets({ name: searchValue })
                    .unwrap()
                    .then(data => {
                        console.log('data', data)
                    })
            }
        }, 2000)

        return () => clearTimeout(delayDebounceFn)
    }, [searchPlanets, searchValue])

    return {
        searchValue,
        isLoading,
        handleChange
    }
};

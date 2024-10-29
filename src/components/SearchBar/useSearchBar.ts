import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchPlanetsMutation } from '../../store/services/planets';
import { useSearchCharactersMutation } from '../../store/services/characters';
import { useShowFiltersAction } from '../../store/slices/filters';

export const useSearchBar = () => {
    const { pathname } = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const { setShowFilters } = useShowFiltersAction();
    const [searchPlanets, { isLoading }] = useSearchPlanetsMutation();
    const [searchCharacters, { isLoading: isCharactersLoading }] = useSearchCharactersMutation();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchValue.trim()) {
                try {
                    if (pathname.slice(1) === 'planets') {
                        searchPlanets({ name: searchValue })
                            .unwrap()
                            .then(data => {
                                if (data && Array.isArray(data.results) && !data.results.length) {
                                    setShowFilters(false);
                                    setSearchValue('');
                                }
                            })
                    } else if (pathname.slice(1) === 'characters') {
                        searchCharacters({ name: searchValue })
                            .unwrap()
                            .then(data => {
                                if (data && Array.isArray(data.results) && !data.results.length) {
                                    setShowFilters(false);
                                    setSearchValue('');
                                }
                            })
                    }
                } catch (error) {
                    console.log('error', error)
                }
            }
        }, 2000);

        return () => clearTimeout(delayDebounceFn);
    }, [pathname, searchCharacters, searchPlanets, searchValue]);

    useEffect(() => {
        setSearchValue('');
    }, [pathname])

    return {
        searchValue,
        isLoading,
        isCharactersLoading,
        handleChange
    }
};

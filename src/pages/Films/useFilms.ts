import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetAllFilmsQuery } from '../../store/services/films';
import { useShowFiltersAction, useShowFiltersSelector } from '../../store/slices/filters';
import { useFilmsAction, useFilmsSelector } from '../../store/slices/films';
import { useGlobalThemeContext } from '../../context/theme';
import { usePaginate } from '../../hooks/usePaginate';
import { useMemoCustom } from '../../hooks/useMemoCustom';
import { removeObjectEmptyProperties } from '../../utils/removeObjectEmptyProperties';
import { useFilterItems } from '../../hooks/useFilterItems';
import { TSingleFilmProps } from './../../types/films';
import { IFilm } from '../../types/global';
import { TFilters } from './types';

export const useFilms = () => {
    const [searchValue, setSearchValue] = useState('');
    const [filmsPage, setFilmsPage] = useState(1);
    const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
    const { toggleTheme } = useGlobalThemeContext();
    const { data, isFetching, refetch } = useGetAllFilmsQuery({ searchValue: debouncedSearchValue, page: filmsPage }, {
        refetchOnMountOrArgChange: true,
    });
    const { showFilters } = useShowFiltersSelector();
    const { setShowFilters } = useShowFiltersAction();
    const { results } = useFilmsSelector();
    const { setFilms } = useFilmsAction();
    const [selectedFilters, setSelectedFilters] = useState<TFilters>({
        release_date: [],
        producer: []
    });
    const releaseDate = useMemoCustom(data!, 'release_date', (release_date: string) => release_date.split('-')[0], 'map');
    const producer = useMemoCustom(data!, 'producer');
    const filterItems = useFilterItems([releaseDate, producer], 'Release_Date', 'Producer');

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
        const filteredArray: IFilm[] = [];

        if (!selectedFilters.release_date.length && !selectedFilters.producer.length && data?.results) {
            setFilms(data.results);
            return
        }
        if (selectedFilters.release_date.length || selectedFilters.producer.length) {
            if (selectedFilters.release_date.length === 1 && selectedFilters.producer.length === 1 && Array.isArray(data?.results)) {
                data?.results.forEach((element: IFilm) => {
                    if (element.release_date.split('-')[0] === selectedFilters.release_date[0] && element.producer === selectedFilters.producer[0]) {
                        filteredArray.push(element)
                    }
                });
            } else if ((selectedFilters.release_date.length > 1 && selectedFilters.producer.length) || (selectedFilters.producer.length > 1 && selectedFilters.release_date.length)) {
                setFilms([]);
            } else if (selectedFilters.release_date.length) {
                selectedFilters.release_date.forEach(item => {
                    if (data?.results && Array.isArray(data?.results)) {
                        data?.results.forEach((element: IFilm) => {
                            if (element.release_date.split('-')[0] === item) {
                                filteredArray.push(element)
                            }
                        });
                    }
                })
            } else if (selectedFilters.producer.length) {
                selectedFilters.producer.forEach(item => {
                    if (data?.results && Array.isArray(data?.results)) {
                        data?.results.forEach((element: IFilm) => {
                            if (element.producer === item) {
                                filteredArray.push(element)
                            }
                        });
                    }
                })
            }
        }
        setFilms(filteredArray);
    }, [data?.results, selectedFilters, setFilms]);

    const finalResults = useMemo(() => {
        return Array.isArray(results) && results.map(result => ({
            title: result.title,
            openingCrawl: result.opening_crawl,
            director: result.director,
            producer: result.producer,
            releaseDate: result.release_date,
            characters: result.characters,
            planets: result.planets,
            starships: result.starships,
            vehicles: result.vehicles,
            species: result.species,
        })).map(removeObjectEmptyProperties).filter(item => Object.keys(item).length > 1 && (item.release_date || item.producer)) as TSingleFilmProps[]
    }, [results]);

    const showClearFilters = useMemo(() => {
        return Boolean(selectedFilters.release_date.length || selectedFilters.producer.length)
    }, [selectedFilters]);

    const clearAllFilters = useCallback((doRefetch: boolean = true) => {
        setSelectedFilters({
            release_date: [],
            producer: []
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
        filmsPage
    );

    const handlePageChange = useCallback((page: number) => {
        setPage(page);
        setFilmsPage(page);
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

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetAllFilmsQuery } from '../../store/services/films';
import { useShowFiltersAction, useShowFiltersSelector } from '../../store/slices/filters';
import { useFilmsAction, useFilmsSelector } from '../../store/slices/films';
import { useGlobalThemeContext } from '../../context/theme';
import { usePaginate } from '../../hooks/usePaginate';
import { removeObjectEmptyProperties } from '../../utils/removeObjectEmptyProperties';
import { TSingleFilm } from '../../components/SingleFilm/types';
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

    const releaseDate = useMemo(() => {
        const seen: Record<string, boolean> = {};
        return Array.isArray(data?.results) && data?.results.length ? data?.results
            .map((film: { release_date: string }) => film.release_date)
            .filter((release_date: string | number) => {
                if (!seen[release_date] && release_date !== 'unknown') {
                    seen[release_date] = true;
                    return true;
                }
                return false;
            }).map((release_date: string) => release_date.split('-')[0]) : [];
    }, [data]);

    const producer = useMemo(() => {
        const seen: Record<string, boolean> = {};
        return Array.isArray(data?.results) && data?.results.length ? data?.results
            .map((film: { producer: string }) => film.producer)
            .filter((producer: string | number) => {
                if (!seen[producer] && producer !== 'unknown') {
                    seen[producer] = true;
                    return true;
                }
                return false;
            }) : [];
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

    const filterItems = useMemo(() => ([
        {
            id: 1,
            title: 'Release_Date',
            items: releaseDate
        },
        {
            id: 2,
            title: 'Producer',
            items: producer
        },
    ]), [releaseDate, producer]);

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
        })).map(removeObjectEmptyProperties).filter(item => Object.keys(item).length > 1 && (item.release_date || item.producer)) as TSingleFilm[]
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

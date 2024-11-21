import { useEffect, useMemo, useState } from 'react';
import { useLazyGetSingleCharacterQuery } from '../../store/services/characters';
import { useLazyGetSingleFilmQuery } from '../../store/services/films';
import { ICharacter, IFilm } from '../../types/global';

export const useSinglePlanet = (films: string[], residents: string[]) => {
    const [filmsData, setFilmsData] = useState<IFilm[]>([]);
    const [residentsData, setResidentsData] = useState<ICharacter[]>([]);
    const [refetch, { isFetching }] = useLazyGetSingleFilmQuery();
    const [refetchResident, { isFetching: isResidentFetching }] = useLazyGetSingleCharacterQuery();

    const filmsId = useMemo(() => {
        return films?.map((item: string) => item?.split('/').filter(el => el && !Number.isNaN(Number(el))))
    }, [films]);

    const filmTitlesMemoized = useMemo(() => {
        return filmsData?.map((film: { title: string }) => film?.title)
    }, [filmsData]);

    const residentsId = useMemo(() => {
        return residents?.map((item: string) => item?.split('/').filter(el => el && !Number.isNaN(Number(el))))
    }, [residents]);

    const residentsNamesMemoized = useMemo(() => {
        return residentsData?.map((resident: { name: string }) => resident?.name)
    }, [residentsData]);

    useEffect(() => {
        const fetchFilms = async () => {
            filmsId && await Promise.all(
                filmsId?.map((url) => refetch({ id: url[0] }))
            ).then((data) => {
                const newData = [...data?.map(item => item.data)];
                setFilmsData(newData as unknown as IFilm[]);
            }).catch(error => console.log('Error', error));
        };

        const fetchResidents = async () => {
            residentsId && await Promise.all(
                residentsId?.map((url) => refetchResident({ id: url[0] }))
            ).then((data) => {
                const newData = [...data?.map(item => item.data)];
                setResidentsData(newData as unknown as ICharacter[]);
            }).catch(error => console.log('Error', error));
        };

        fetchFilms();
        fetchResidents();
    }, [filmsId, residentsId]);

    return {
        isFetching,
        isResidentFetching,
        filmTitlesMemoized,
        residentsNamesMemoized
    }
};

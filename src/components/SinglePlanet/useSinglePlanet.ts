import { useMemo, useState } from 'react';
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

    const getFilmsAndResidents = async () => {
        try {
            if (filmsId?.length) {
                const filmResponses = await Promise.all(
                    filmsId.map((url) => refetch({ id: `${url[0]}/` }))
                );
                const filmData = filmResponses.map(item => item.data);
                setFilmsData(filmData as unknown as IFilm[]);
            };
            if (residentsId?.length) {
                const residentResponses = await Promise.all(
                    residentsId.map((url) => refetchResident({ id: `${url[0]}/` }))
                )
                const residentData = residentResponses.map(item => item.data);
                setResidentsData(residentData as unknown as ICharacter[]);
            };
        } catch (error) {
            console.error('Error fetching data:', error);
        };
    };

    return {
        isFetching,
        filmsId,
        residentsId,
        isResidentFetching,
        filmTitlesMemoized,
        residentsNamesMemoized,
        getFilmsAndResidents,
    }
};

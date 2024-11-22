import { useMemo, useState } from 'react';
import { useLazyGetSingleFilmQuery } from '../../store/services/films';
import { useLazyGetSingleSpeciesQuery, useLazyGetSingleStarshipQuery, useLazyGetSingleVehicleQuery } from '../../store/services/characters';
import { IFilm, ISpecies, IStarship, IVehicle } from '../../types/global';

export const useSingleCharacter = (films: string[], species: string[], vehicles: string[], starships: string[]) => {
    const [filmsData, setFilmsData] = useState<IFilm[]>([]);
    const [speciesData, setSpeciesData] = useState<ISpecies[]>([]);
    const [vehiclesData, setVehiclesData] = useState<IVehicle[]>([]);
    const [starshipsData, setStarshipsData] = useState<IStarship[]>([]);
    const [refetch, { isFetching }] = useLazyGetSingleFilmQuery();
    const [refetchSpecies, { isFetching: isSpeciesFetching }] = useLazyGetSingleSpeciesQuery();
    const [refetchVehicles, { isFetching: isVehiclesFetching }] = useLazyGetSingleVehicleQuery();
    const [refetchStarships, { isFetching: isStarshipsFetching }] = useLazyGetSingleStarshipQuery();

    const filmsId = useMemo(() => {
        return films?.map((item: string) => item?.split('/').filter(el => el && !Number.isNaN(Number(el))))
    }, [films]);

    const filmTitlesMemoized = useMemo(() => {
        return filmsData?.map((film: { title: string }) => film?.title)
    }, [filmsData]);

    const speciesId = useMemo(() => {
        return species?.map((item: string) => item?.split('/').filter(el => el && !Number.isNaN(Number(el))))
    }, [species]);

    const speciesNamesMemoized = useMemo(() => {
        return speciesData?.map((speciesData: { name: string }) => speciesData?.name)
    }, [speciesData]);

    const vehiclesId = useMemo(() => {
        return vehicles?.map((item: string) => item?.split('/').filter(el => el && !Number.isNaN(Number(el))))
    }, [vehicles]);

    const vehicleNamesMemoized = useMemo(() => {
        return vehiclesData?.map((vehicle: { name: string }) => vehicle?.name)
    }, [vehiclesData]);

    const starshipsId = useMemo(() => {
        return starships?.map((item: string) => item?.split('/').filter(el => el && !Number.isNaN(Number(el))))
    }, [starships]);

    const starshipNamesMemoized = useMemo(() => {
        return starshipsData?.map((vehicle: { name: string }) => vehicle?.name)
    }, [starshipsData]);

    const getFilmsSpeciesVehiclesStarships = async () => {
        if (filmsId?.length) {
            const filmResponses = await Promise.all(
                filmsId.map((url) => refetch({ id: url[0] }))
            );
            const filmData = filmResponses.map(item => item.data);
            setFilmsData(filmData as unknown as IFilm[]);
        };
        if (speciesId?.length) {
            const speciesResponse = await Promise.all(
                speciesId.map(url => refetchSpecies({ id: url[0] }))
            );
            const speciesData = speciesResponse.map(item => item.data);
            setSpeciesData(speciesData as unknown as ISpecies[]);
        };
        if (vehiclesId?.length) {
            const vehiclesResponse = await Promise.all(
                vehiclesId.map(url => refetchVehicles({ id: url[0] }))
            )
            const vehiclesData = vehiclesResponse.map(item => item.data);
            setVehiclesData(vehiclesData as unknown as IVehicle[]);
        };
        if (starshipsId?.length) {
            const starshipsResponse = await Promise.all(
                starshipsId.map(url => refetchStarships({ id: url[0] }))
            )
            const starshipsData = starshipsResponse.map(item => item.data);
            setStarshipsData(starshipsData as unknown as IStarship[]);
        };
    };

    return {
        isFetching,
        isSpeciesFetching,
        isVehiclesFetching,
        isStarshipsFetching,
        filmTitlesMemoized,
        speciesNamesMemoized,
        vehicleNamesMemoized,
        starshipNamesMemoized,
        getFilmsSpeciesVehiclesStarships,
    }
};

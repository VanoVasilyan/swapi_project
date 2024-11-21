import { useEffect, useMemo, useState } from 'react';
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

    useEffect(() => {
        const fetchFilms = async () => {
            filmsId && await Promise.all(
                filmsId?.map((url) => refetch({ id: url[0] }))
            ).then((data) => {
                const newData = [...data?.map(item => item.data)];
                setFilmsData(newData as unknown as IFilm[]);
            }).catch(error => console.log('Error', error));
        };

        const fetchSpecies = async () => {
            speciesId && await Promise.all(
                speciesId?.map((url) => refetchSpecies({ id: url[0] }))
            ).then((data) => {
                const newData = [...data?.map(item => item.data)];
                setSpeciesData(newData as unknown as ISpecies[]);
            }).catch(error => console.log('Error', error));
        };

        const fetchVehicles = async () => {
            vehiclesId && await Promise.all(
                vehiclesId?.map((url) => refetchVehicles({ id: url[0] }))
            ).then((data) => {
                const newData = [...data?.map(item => item.data)];
                setVehiclesData(newData as unknown as IVehicle[]);
            }).catch(error => console.log('Error', error));
        };

        const fetchStarships = async () => {
            starshipsId && await Promise.all(
                starshipsId?.map((url) => refetchStarships({ id: url[0] }))
            ).then((data) => {
                const newData = [...data?.map(item => item.data)];
                setStarshipsData(newData as unknown as IStarship[]);
            }).catch(error => console.log('Error', error));
        };

        fetchFilms();
        fetchSpecies();
        fetchVehicles();
        fetchStarships();
    }, [filmsId, speciesId, vehiclesId, starshipsId]);

    return {
        isFetching,
        isSpeciesFetching,
        isVehiclesFetching,
        isStarshipsFetching,
        filmTitlesMemoized,
        speciesNamesMemoized,
        vehicleNamesMemoized,
        starshipNamesMemoized
    }
};

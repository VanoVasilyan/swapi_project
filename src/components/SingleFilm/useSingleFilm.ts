import { useEffect, useMemo, useState } from 'react';
import { useLazyGetSinglePlanetQuery } from '../../store/services/planets';
import { useLazyGetSingleCharacterQuery, useLazyGetSingleSpeciesQuery, useLazyGetSingleStarshipQuery, useLazyGetSingleVehicleQuery } from '../../store/services/characters';
import { ICharacter, IPlanet, ISpecies, IStarship, IVehicle } from '../../types/global';

export const useSingleFilm = (characters: string[], planets: string[], starships: string[], vehicles: string[], species: string[]) => {
    const [showMore, setShowMore] = useState(false);
    const [charactersData, setCharactersData] = useState<ICharacter[]>([]);
    const [planetsData, setPlanetsData] = useState<IPlanet[]>([]);
    const [starshipsData, setStarshipsData] = useState<IStarship[]>([]);
    const [vehiclesData, setVehiclesData] = useState<IVehicle[]>([]);
    const [speciesData, setSpeciesData] = useState<ISpecies[]>([]);
    const [refetchResident, { isFetching: isCharacterFetching }] = useLazyGetSingleCharacterQuery();
    const [refetchStarships, { isFetching: isStarshipsFetching }] = useLazyGetSingleStarshipQuery();
    const [refetchSpecies, { isFetching: isSpeciesFetching }] = useLazyGetSingleSpeciesQuery();
    const [refetchVehicles, { isFetching: isVehiclesFetching }] = useLazyGetSingleVehicleQuery();
    const [refetchPlanet, { isFetching: isPlanetFetching }] = useLazyGetSinglePlanetQuery();

    const handleShowMore = () => {
        setShowMore(prev => !prev);
    };

    const charactersId = useMemo(() => {
        return characters?.map((item: string) => item?.split('/').filter(el => el && !Number.isNaN(Number(el))))
    }, [characters]);

    const characterNamesMemoized = useMemo(() => {
        return charactersData?.map((character: { name: string }) => character?.name)
    }, [charactersData]);

    const planetsId = useMemo(() => {
        return planets?.map((item: string) => item?.split('/').filter(el => el && !Number.isNaN(Number(el))))
    }, [planets]);

    const planetNamesMemoized = useMemo(() => {
        return planetsData?.map((planet: { name: string }) => planet?.name)
    }, [planetsData]);

    const starshipsId = useMemo(() => {
        return starships?.map((item: string) => item?.split('/').filter(el => el && !Number.isNaN(Number(el))))
    }, [starships]);

    const starshipNamesMemoized = useMemo(() => {
        return starshipsData?.map((starship: { name: string }) => starship?.name)
    }, [starshipsData]);

    const vehiclesId = useMemo(() => {
        return vehicles?.map((item: string) => item?.split('/').filter(el => el && !Number.isNaN(Number(el))))
    }, [vehicles]);

    const vehicleNamesMemoized = useMemo(() => {
        return vehiclesData?.map((vehicle: { name: string }) => vehicle?.name)
    }, [vehiclesData]);

    const speciesId = useMemo(() => {
        return species?.map((item: string) => item?.split('/').filter(el => el && !Number.isNaN(Number(el))))
    }, [species]);

    const speciesNamesMemoized = useMemo(() => {
        return speciesData?.map((speciesData: { name: string }) => speciesData?.name)
    }, [speciesData]);

    useEffect(() => {
        const fetchCharacters = async () => {
            charactersId && await Promise.all(
                charactersId?.map((url) => refetchResident({ id: url[0] }))
            ).then((data) => {
                const newData = [...data?.map(item => item.data)];
                setCharactersData(newData as unknown as ICharacter[]);
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

        const fetchPlanets = async () => {
            planetsId && await Promise.all(
                planetsId?.map((url) => refetchPlanet({ id: url[0] }))
            ).then((data) => {
                const newData = [...data?.map(item => item.data)];
                setPlanetsData(newData as unknown as IPlanet[]);
            }).catch(error => console.log('Error', error));
        };

        fetchCharacters();
        fetchSpecies();
        fetchVehicles();
        fetchStarships();
        fetchPlanets();
    }, [charactersId, speciesId, vehiclesId, starshipsId, planetsId]);

    return {
        showMore,
        handleShowMore,
        isCharacterFetching,
        isStarshipsFetching,
        isSpeciesFetching,
        isVehiclesFetching,
        isPlanetFetching,
        characterNamesMemoized,
        planetNamesMemoized,
        starshipNamesMemoized,
        vehicleNamesMemoized,
        speciesNamesMemoized
    }
};

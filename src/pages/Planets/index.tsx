import React, { FC } from 'react';
import { usePlanets } from './usePlanets';
import SinglePlanet from '../../components/SinglePlanet';
import Loading from '../../components/Loading';
import * as SC from './styles';

const Planets: FC = () => {
    const {
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
    } = usePlanets();

    if (isLoading || nextPageLoading || previousPageLoading) {
        return <Loading $top='30%' $left='50%' $width='80px' $height='80px' />
    }

    return (
        <SC.StyledPlanetsPageMainBlock>
            {Array.isArray(results) && !!results?.length ? (
                <>
                    {results.map(item => (
                        <SinglePlanet key={item.name} {...item} />
                    ))}
                    <button disabled={!previous} onClick={() => {
                        previousPage({ url: previous })
                            .unwrap()
                            .then(() => {
                                console.log('Success', results)
                            })
                    }}>Previous</button>
                    <button disabled={!next} onClick={() => {
                        nextPage({ url: next })
                            .unwrap()
                            .then(() => {
                                console.log('Success', results)
                            })
                    }}>Next</button>
                    {!!climates.length && (
                        <>
                            <select onChange={handleSelectChange}>
                                <option hidden>Climates</option>
                                {climates.map(({ climate }: { climate: string }) => (
                                    <option key={climate} value={climate}>{climate}</option>
                                ))}
                            </select>
                        </>
                    )}
                </>
            ) : <div>Nothing found !!!</div>}
        </SC.StyledPlanetsPageMainBlock>
    )
};

export default Planets

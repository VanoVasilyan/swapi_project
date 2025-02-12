import { splitWords } from './splitWords';
import { TransformedSinglePlanet, TSinglePlanetProps } from '../types/planets';

export const createArrayOfObjectsFromProperties = (singlePlanet: TSinglePlanetProps) => {
    let uniqId = 0;
    const arrayOfObjectProperties = Object.entries(singlePlanet);
    const finalResult: TransformedSinglePlanet[] = [];

    for (let i = 0; i < arrayOfObjectProperties.length; i++) {
        if (!Array.isArray(arrayOfObjectProperties[i][1])) {
            const item = {} as TransformedSinglePlanet;
            item.id = uniqId;
            item.key = arrayOfObjectProperties[i][0];
            item.title = splitWords(arrayOfObjectProperties[i][0]);
            item.value = arrayOfObjectProperties[i][1];

            finalResult.push(item);
            uniqId += 1
        }
    };

    return finalResult;
};

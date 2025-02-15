import { splitWords } from './splitWords';
import { TransformedCardDetails } from '../types/global';

export const createArrayOfObjectsFromProperties = <T extends Record<string, any>>(singleObject: T) => {
    let uniqId = 0;
    const arrayOfObjectProperties = Object.entries(singleObject);
    const finalResult: TransformedCardDetails[] = [];

    for (let i = 0; i < arrayOfObjectProperties.length; i++) {
        if (!Array.isArray(arrayOfObjectProperties[i][1])) {
            const item: TransformedCardDetails = {
                id: uniqId,
                key: arrayOfObjectProperties[i][0],
                title: splitWords(arrayOfObjectProperties[i][0]),
                value: arrayOfObjectProperties[i][1] as T[keyof T],
            };

            finalResult.push(item);
            uniqId += 1;
        }
    }

    return finalResult;
};

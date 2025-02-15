import { useMemo } from 'react';
import { TBeResponseWithData } from '../types/global';

export const useMemoCustom = <T,>(
    data: TBeResponseWithData<T>,
    prop: keyof T,
    helperAfterFilter?: ((value: string) => string) | ((a: string, b: string) => number),
    methodName?: 'map' | 'sort'
) => {
    return useMemo(() => {
        if (!Array.isArray(data?.results) || !data.results.length) {
            return [];
        }

        const seen = new Set<string>();
        const rawValues = data.results.map((item) => item[prop]);
       
        const filteredValues = rawValues.filter((value) => {
            if (value === "unknown" || seen.has(value)) {
                return false;
            }
            seen.add(value);
            return true;
        });

        if (methodName === "map" && typeof helperAfterFilter === "function") {
            return filteredValues.map(helperAfterFilter as (value: string) => string);
        };
        if (methodName === "sort" && typeof helperAfterFilter === "function") {
            return filteredValues.sort(helperAfterFilter as (a: string, b: string) => number);
        };

        return filteredValues;
    }, [data?.results, helperAfterFilter, methodName, prop]);
};

import { useMemo } from 'react';
import { TFilterItem } from '../types/global';

export const useFilterItems = (args: string[][], ...names: string[]): TFilterItem[] => {
    return useMemo(() => {
        return names.map((cur, ind) => ({
            id: ind + 1,
            title: cur,
            items: args[ind]
        }));
    }, [args, names]);
};

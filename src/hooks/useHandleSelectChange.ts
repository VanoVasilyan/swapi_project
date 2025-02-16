import { useCallback } from 'react';
import { TFilterState } from '../types/global';

export const useHandleSelectChange = <T extends TFilterState>(setState: React.Dispatch<React.SetStateAction<T>>) => {
    return useCallback(
        (check: string, title: string) => {
            const key = title.toLowerCase() as keyof T;

            setState(prev => {
                const currentValues = prev[key] || [];
                const updatedValues = currentValues.includes(check)
                    ? currentValues.filter(item => item !== check)
                    : [...currentValues, check];

                return { ...prev, [key]: updatedValues };
            });
        },
        [setState]
    );
};

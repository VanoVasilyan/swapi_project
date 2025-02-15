import { TFilterItem } from '../../types/global';

export interface IFilters {
    showClearFilters: boolean;
    clearAllFilters: (doRefetch?: boolean) => void;
    handleSelectChange: (check: string, title: string) => void;
    filterItems: TFilterItem[];
};

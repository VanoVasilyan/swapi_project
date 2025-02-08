export type TFilterItem = {
    id: number;
    title: string;
    items: string[];
};

export interface IFilters {
    showClearFilters: boolean;
    clearAllFilters: (doRefetch?: boolean) => void;
    handleSelectChange: (check: string, title: string) => void;
    filterItems: TFilterItem[];
};

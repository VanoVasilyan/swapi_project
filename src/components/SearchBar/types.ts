export type TSearch = Partial<{
    searchvalue: string;
    delayDebounceSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}>;
